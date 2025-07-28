from typing import Any

from sqlalchemy.ext.asyncio import AsyncSession

from app.repositories.base import BaseRepository
from app.schemas.service import ServiceSchema


class ServiceCRUD(BaseRepository):
    async def create(self, obj: Any, session: AsyncSession) -> int:
        pass

    async def get(self, obj_id: int, session: AsyncSession) -> ServiceSchema:
        result = ServiceSchema(
            title='my title',
            short_description='sh descr',
            description='descr'
        )
        return result


service_repo = ServiceCRUD()