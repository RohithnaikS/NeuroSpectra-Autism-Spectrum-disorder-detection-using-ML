from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pandas as pd
import numpy as np
from sklearn.svm import SVC
from sklearn.preprocessing import MinMaxScaler
import pickle
import os

app = FastAPI()

# Enable CORS to allow frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define input model for validation
class AutismInput(BaseModel):
    A1_Score: int
    A2_Score: int
    A3_Score: int
    A4_Score: int
    A5_Score: int
    A6_Score: int
    A7_Score: int
    A8_Score: int
    A9_Score: int
    A10_Score: int
    age: float
    gender: str
    ethnicity: str
    jundice: str
    austim: str
    contry_of_res: str
    result: float
    relation: str

# Load the trained model
def load_model():
    model_path = "../MLModels/svm_model.pkl"
    columns_path = "../MLModels/feature_columns.pkl"
    if not os.path.exists(model_path) or not os.path.exists(columns_path):
        raise FileNotFoundError("Model or feature columns file not found. Please generate them in Jupyter.")
    with open(model_path, 'rb') as file:
        model = pickle.load(file)
    with open(columns_path, 'rb') as file:
        feature_columns = pickle.load(file)
    return model, feature_columns

model, feature_columns = load_model()

@app.get("/")
def home():
    return {"message": "Autism Detection API is running. Visit /docs for API details!"}

@app.post("/predict")
def predict(data: AutismInput):
    try:
        # Convert input to DataFrame
        input_data = data.dict()
        input_df = pd.DataFrame([input_data])

        # Preprocess: Apply MinMaxScaler
        scaler = MinMaxScaler()
        num_cols = ['age', 'result']
        input_df[num_cols] = scaler.fit_transform(input_df[num_cols])

        # One-Hot Encoding
        input_final = pd.get_dummies(input_df)

        # Align columns with trained model
        for col in feature_columns:
            if col not in input_final.columns:
                input_final[col] = 0
        input_final = input_final[feature_columns]

        # Predict
        prediction = model.predict(input_final.values)[0]
        result = "YES" if prediction == "YES" else "NO"

        return {"prediction": result}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))