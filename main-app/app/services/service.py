from sqlalchemy.ext.asyncio import AsyncSession
from fastapi import Depends

from app.repositories.service import service_repo
from app.schemas.service import ServiceShortOutSchema
from app.core.database import get_session


class ServiceSrv:
    def __init__(self):
        self.crud = service_repo()

    async def get_one_short_service(self, session: AsyncSession = Depends(get_session)):
        service = await self.crud.get(1, session)
        a = ServiceShortOutSchema(
            title=service.title,
            short_description=service.short_description
        )

        return a


service_services = ServiceSrv()