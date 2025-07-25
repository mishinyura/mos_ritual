import uvicorn

from app.core.app import get_app


def main():
    app = get_app()
    uvicorn.run(app, host='localhost', port=8000)


if __name__ == '__main__':
    main()