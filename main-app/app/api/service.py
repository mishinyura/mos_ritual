from fastapi import APIRouter, Request

from app.core.logging import logger

from app.services.service import service_services


service_router = APIRouter()


@service_router.get('/')
async def get_list_services(request: Request):
    logger.info(request.client)
    result = await service_services.get_one_short_service()
    return result