from pydantic import BaseModel
from typing import List
from sklearn.pipeline import Pipeline
from joblib import load

from fastapi import APIRouter, Depends
from utils.auth_bearer import JWTBearer
import pandas as pd

class ResultIris(BaseModel):
    result: List[int]
    
class Iris(BaseModel):
    sepalLength: float
    sepalWidth: float
    petalLength: float
    petalWidth: float
    
class ParamIris(BaseModel):
    iris: List[Iris]


router = APIRouter()

@router.post('/iris', dependencies=[Depends(JWTBearer())])
async def predict_iris(p: ParamIris):
    model: Pipeline = load('./model_iris.pkl')
    
    X = []
    for iris in p.iris:
        X.append([iris.sepalLength, iris.sepalWidth, iris.petalLength, iris.petalWidth])
    
    # sepal length (cm), sepal width (cm), petal length (cm), petal width (cm)
    res = model.predict(X)
    result: ResultIris = res.tolist()

    return {'result': result}



class Usba(BaseModel):
    ApprovalDate: str
    Term: int
    NoEmp: int
    FranchiseCode: str
    ApprovalFY: int
    Naics: str
    NewExist: str
    LowDoc: str
    GrAppv: int
    CreateJob: int
    RetainedJob: int
    UrbanRural: str
    RevLineCr: str

class ResultUsba(BaseModel):
    result : int

@router.post('/usba', dependencies=[Depends(JWTBearer())])
async def predict_usba(p: Usba):
    model: Pipeline = load('./model_usba.pkl')

    data_dict = p.dict()
    input_df = pd.DataFrame([data_dict])
    result = model.predict(input_df)

    return {'result': result}