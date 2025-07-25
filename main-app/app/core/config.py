from dynaconf import Dynaconf
from pydantic import BaseModel


class AppConfig(BaseModel):
    version: str
    name: str
    host: str
    port: int
    mount: str


class DBConfig(BaseModel):
    name: str
    user: str
    password: str
    host: str
    port: int

    @property
    def url(self):
        path = 'postgresql+asyncpg://{0}:{1}@{2}:{3}/{4}'.format(
            self.user,
            self.password,
            self.host,
            self.port,
            self.name
        )
        return path


class Settings(BaseModel):
    app: AppConfig
    db: DBConfig


dyna_settings = Dynaconf(settings_files=['settings.toml'])

settings = Settings(
    app=dyna_settings['app_settings'],
    db=dyna_settings['db_settings']
)