from pydantic import BaseModel


class ServiceSchema(BaseModel):
    title: str
    short_description: str
    description: str


class ServiceShortOutSchema(BaseModel):
    title: str
    short_description: str
