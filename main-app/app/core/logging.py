import logging

LOG_FORMAT = "%(asctime)s | %(levelname)s | %(name)s | %(message)s"
logging.basicConfig(
    level=logging.INFO,          # DEBUG / INFO / WARNING …
    format=LOG_FORMAT,
    handlers=[
        logging.StreamHandler(),                 # консоль
        logging.FileHandler("logs.log", mode="a") # файл
    ]
)

logger = logging.getLogger("main-app")   # общий логгер