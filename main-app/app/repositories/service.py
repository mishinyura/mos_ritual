from typing import Any

from sqlalchemy.ext.asyncio import AsyncSession

from app.repositories.base import BaseCRUD
from app.schemas.service import ServiceSchema


class ServiceCRUD(BaseCRUD):
    async def create(self, obj: Any, session: AsyncSession) -> int:
        pass

    async def get(self, obj_id: int, session: AsyncSession) -> ServiceSchema:
        pass


service_repo = ServiceCRUD()