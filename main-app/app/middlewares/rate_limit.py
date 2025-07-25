from fastapi import Request, HTTPException
from starlette.middleware.base import BaseHTTPMiddleware
import time
import redis

redis_client = redis.Redis(host="localhost", port=6379, decode_responses=True)


class RateLimitMiddleware(BaseHTTPMiddleware):
    def __init__(self, app, limit: int = 30, window: int = 60):
        super().__init__(app)
        self.limit = limit
        self.window = window

    async def dispatch(self, request: Request, call_next):
        ip = request.headers.get("x-forwarded-for", request.client.host).split(",")[0].strip()
        key = f"rate:{ip}"
        now = int(time.time() * 1000)

        pipe = redis_client.pipeline()
        await pipe.zremrangebyscore(key, 0, now - self.window * 1000)
        await pipe.zcard(key)
        await pipe.zadd(key, {now: now})
        await pipe.expire(key, self.window + 5)
        *_, count, _, _ = pipe.execute()

        if count >= self.limit:
            raise HTTPException(status_code=429, detail="Rate limit exceeded")

        response = await call_next(request)
        return response