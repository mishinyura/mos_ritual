from abc import abstractmethod, ABC
from typing import Any

from sqlalchemy.ext.asyncio import AsyncSession


class BaseCRUD(ABC):
    @abstractmethod
    async def create(self, obj: Any, session: AsyncSession) -> int: ...

    @abstractmethod
    async def get(self, obj_id: int, session: AsyncSession) -> Any: ...

    # @abstractmethod
    # async def update(self, obj_id: int, data: dict, session: AsyncSession) -> None: ...
    #
    # @abstractmethod
    # async def delete(self, obj_id: int, session: AsyncSession) -> None: ...