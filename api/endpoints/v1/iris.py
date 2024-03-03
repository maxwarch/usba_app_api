from pydantic import BaseModel
from typing import List
from sklearn.pipeline import Pipeline
from joblib import load

from fastapi import APIRouter

class Result(BaseModel):
    result: List[int]
    
class Iris(BaseModel):
    sepal_length: float
    sepal_width: float
    petal_length: float
    petal_width: float
    
class ParamIris(BaseModel):
    iris: List[Iris]


router = APIRouter()

@router.post('/predict')
async def predict(p: ParamIris):
    model: Pipeline = load('./model.pkl')
    
    X = []
    for iris in p.iris:
        X.append([iris.sepal_length, iris.sepal_width, iris.petal_length, iris.petal_width])
    
    # sepal length (cm), sepal width (cm), petal length (cm), petal width (cm)
    res = model.predict(X)
    result: Result = res.tolist()

    return {'result': result}