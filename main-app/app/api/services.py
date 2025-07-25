from fastapi import APIRouter, Request, Response
import redis, time

from app.core.logging import logger

r = redis.Redis(host="localhost", decode_responses=True)
WINDOW = 60          # секунд
LIMIT  = 30


service_router = APIRouter()


@service_router.get('/')
def get_list_services(request: Request):
    print(request.client)
    logger.info(f'Поступил запрос')
    return ['еуче']