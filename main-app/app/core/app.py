from fastapi import FastAPI

from app.api.services import service_router
from app.middlewares.rate_limit import RateLimitMiddleware

ROUTERS = {
    '/services': service_router
}


def set_routes(app: FastAPI):
    for prefix, router in ROUTERS.items():
        app.include_router(prefix=prefix, router=router)


def get_app():
    app = FastAPI()
    app.add_middleware(RateLimitMiddleware, limit=60, window=60)
    set_routes(app)
    return app