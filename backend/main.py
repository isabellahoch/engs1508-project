from typing import Union

from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get("/companies/{cik}")
def return_company_info(cik: str, q: Union[str, None] = None):
    return {"cik": cik, "q": q}