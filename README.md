# 🧠 NeuroSpectra — Autism Spectrum Disorder Detection Using Machine Learning

> **Revolutionizing early ASD detection through AI-powered behavioral screening.**

---

## 📖 Table of Contents

- [Overview](#overview)
- [Motivation](#motivation)
- [Features](#features)
- [Project Structure](#project-structure)
- [Dataset](#dataset)
- [Machine Learning Models](#machine-learning-models)
- [Tech Stack](#tech-stack)
- [System Architecture](#system-architecture)
- [Installation & Setup](#installation--setup)
- [Usage](#usage)
- [API Reference](#api-reference)
- [Results](#results)
- [Screenshots](#screenshots)
- [Future Work](#future-work)
- [License](#license)

---

## 🔍 Overview

**NeuroSpectra** is an end-to-end machine learning web application designed to assist in the early detection of **Autism Spectrum Disorder (ASD)**. It takes behavioral screening data (AQ-10 questionnaire responses) and demographic information as inputs, processes them through a trained **Support Vector Machine (SVM)** model, and returns a binary prediction: whether the individual is likely to have ASD or not.

The system comprises:
- A **Jupyter Notebook** for exploratory data analysis, model training, and evaluation
- A **FastAPI** backend that serves the trained SVM model as a REST API
- Two **HTML/CSS/JS frontends** — a landing/showcase site (NeuroSpectra) and an interactive prediction form (Model-FrontEnd)

---

## 💡 Motivation

Autism Spectrum Disorder (ASD) is a neurodevelopmental condition affecting communication, social interaction, and behavior. Key facts driving this project:

| Statistic | Value |
|---|---|
| Children diagnosed with ASD (US) | 1 in 36 |
| More prevalent in | Boys (4× more than girls) |
| Average age of diagnosis | 2–4 years |
| Improved outcomes with early intervention | ~85% |

Traditional diagnosis is:
- Time-consuming (months-long waiting periods)
- Expensive and resource-heavy
- Dependent on clinical specialists

NeuroSpectra addresses this gap by providing a fast, accessible, and cost-effective **first-pass screening tool** that can help healthcare professionals and individuals prioritize formal clinical evaluations.

---

## ✨ Features

- 🤖 **Multi-model ML comparison** — SVM, Random Forest, Decision Tree, Logistic Regression, Naive Bayes, KNN
- 🏆 **Best model deployed** — SVM with highest test accuracy
- ⚡ **FastAPI backend** — blazing-fast REST API with auto-generated `/docs` (Swagger UI)
- 🌐 **Two frontends** — a polished landing page (NeuroSpectra) + a focused prediction form
- 📊 **Visual analytics** — feature importance plots, performance comparisons, distribution charts
- 🔄 **CORS-enabled** — frontend and backend can run on separate servers
- 📦 **Pickle-serialized model** — pre-trained model and feature column schema persisted for reuse

---

## 📁 Project Structure

```
NeuroSpectra-Autism-Spectrum-disorder-detection-using-ML/
│
├── MLModels/
│   ├── autism_data.csv              # Dataset (705 records, 21 features)
│   ├── autism_detection.ipynb       # Jupyter Notebook: EDA, training, evaluation
│   ├── autism_detection.pdf         # Exported notebook PDF
│   ├── Autism_Detection_Report.pdf  # Full project report
│   ├── svm_model.pkl                # Serialized trained SVM model
│   ├── feature_columns.pkl          # Serialized feature column schema
│   └── visuals.py                   # Visualization helper functions
│
├── BackEnd/
│   ├── app.py                       # FastAPI application (prediction endpoint)
│   └── requirements.txt             # Backend Python dependencies
│
├── NeuroSpectraFrontEnd/            # Landing/showcase website
│   ├── index.html
│   ├── styles.css
│   ├── script.js
│   └── Images/
│
├── Model-FrontEnd/                  # ASD prediction form UI
│   ├── index.html
│   ├── styles.css
│   ├── script.js
│   └── *.mp4                        # Background videos
│
├── Images/                          # Shared image assets
├── Major Project.pdf                # Full major project report
└── README.md
```

---

## 📊 Dataset

- **Source:** Autistic Spectrum Disorder Screening Dataset (publicly available)
- **Records:** 704 adult entries
- **Features:** 21 attributes

### Feature Description

| Feature | Description |
|---|---|
| `A1_Score` – `A10_Score` | AQ-10 questionnaire binary responses (0 or 1) |
| `age` | Age of the individual |
| `gender` | Male / Female |
| `ethnicity` | Self-reported ethnicity |
| `jundice` | Whether the individual had jaundice at birth (yes/no) |
| `austim` | Family history of autism (yes/no) |
| `contry_of_res` | Country of residence |
| `result` | Cumulative AQ-10 score (0–10) |
| `relation` | Who filled out the screening (self, parent, etc.) |
| **`Class/ASD`** | **Target variable — YES or NO** |

### Preprocessing

- **Numerical scaling:** MinMaxScaler applied to `age` and `result`
- **Categorical encoding:** One-Hot Encoding for all categorical features
- **Column alignment:** Prediction input is aligned to the exact feature columns seen during training (missing columns filled with 0)

---

## 🤖 Machine Learning Models

All six models were trained and evaluated across 1%, 10%, and 100% training set sizes:

| Model | Notes |
|---|---|
| **Support Vector Machine (SVM)** | ✅ Best performer — deployed in production |
| Random Forest | Strong ensemble baseline |
| Decision Tree | Fast, interpretable |
| Logistic Regression | Linear baseline |
| Naive Bayes | Probabilistic baseline |
| K-Nearest Neighbors (KNN) | Instance-based learner |

### Evaluation Metrics

For each model and training set size, the following were measured:
- **Training time** (seconds)
- **Prediction time** (seconds)
- **Accuracy score** — on training subset and test set
- **F1-score** — on training subset and test set

SVM consistently achieved the highest accuracy and F1-score on the test set.

---

## 🛠️ Tech Stack

### Machine Learning & Data
| Library | Purpose |
|---|---|
| `scikit-learn` | ML models, preprocessing, metrics |
| `pandas` | Data manipulation |
| `numpy` | Numerical operations |
| `matplotlib` / `seaborn` | Visualization |
| `pickle` | Model serialization |

### Backend
| Technology | Purpose |
|---|---|
| `FastAPI` | REST API framework |
| `uvicorn` | ASGI server |
| `pydantic` | Request validation |

### Frontend
| Technology | Purpose |
|---|---|
| HTML5 / CSS3 / JavaScript | Landing page & prediction form |
| Font Awesome | Icons |
| Canvas API | Interactive demo visualizations |

---

## 🏗️ System Architecture

```
┌─────────────────────────────────┐
│         User (Browser)          │
└────────────┬────────────────────┘
             │ HTTP (form submit)
             ▼
┌─────────────────────────────────┐
│     Model-FrontEnd              │
│   (index.html + script.js)      │
│  Collects AQ-10 + demographics  │
└────────────┬────────────────────┘
             │ POST /predict (JSON)
             ▼
┌─────────────────────────────────┐
│       FastAPI Backend           │
│   app.py @ localhost:8000       │
│                                 │
│  1. Validate input (Pydantic)   │
│  2. Scale numerical features    │
│  3. One-hot encode categoricals │
│  4. Align to training columns   │
│  5. Predict via svm_model.pkl   │
└────────────┬────────────────────┘
             │ {"prediction": "YES"/"NO"}
             ▼
┌─────────────────────────────────┐
│   Result displayed to user      │
└─────────────────────────────────┘
```

---

## ⚙️ Installation & Setup

### Prerequisites

- Python 3.9+
- pip
- A modern web browser

### 1. Clone the Repository

```bash
git clone https://github.com/RohithnaikS/NeuroSpectra-Autism-Spectrum-disorder-detection-using-ML.git
cd NeuroSpectra-Autism-Spectrum-disorder-detection-using-ML
```

### 2. Set Up the Backend

```bash
cd BackEnd
pip install -r requirements.txt
```

**`requirements.txt` contents:**
```
fastapi
uvicorn
scikit-learn
pandas
numpy
pydantic
```

### 3. Train the Model (Optional — pre-trained `.pkl` files are included)

Open and run the Jupyter Notebook:

```bash
cd ../MLModels
jupyter notebook autism_detection.ipynb
```

This will regenerate `svm_model.pkl` and `feature_columns.pkl` in the `MLModels/` folder.

### 4. Start the Backend Server

```bash
cd BackEnd
uvicorn app:app --reload
```

The API will be available at: `http://127.0.0.1:8000`
Swagger docs at: `http://127.0.0.1:8000/docs`

### 5. Launch the Frontend

Open the prediction form directly in your browser:

```
Model-FrontEnd/index.html
```

Or browse the full landing site:

```
NeuroSpectraFrontEnd/index.html
```

> **Note:** The Model-FrontEnd makes API calls to `http://127.0.0.1:8000/predict`, so the backend must be running.

---

## 🖥️ Usage

1. Navigate to `Model-FrontEnd/index.html` in your browser.
2. Fill in the AQ-10 questionnaire responses (A1–A10), each scored as `0` or `1`.
3. Enter demographic details: age, gender, ethnicity, country of residence, jaundice history, family autism history, AQ total result score, and relation.
4. Click **Predict**.
5. The result (`YES` — likely ASD, or `NO` — unlikely ASD) is displayed on screen.

---

## 🔌 API Reference

### `GET /`

Health check endpoint.

**Response:**
```json
{
  "message": "Autism Detection API is running. Visit /docs for API details!"
}
```

---

### `POST /predict`

Submit a screening record and receive an ASD prediction.

**Request Body (JSON):**

```json
{
  "A1_Score": 1,
  "A2_Score": 0,
  "A3_Score": 1,
  "A4_Score": 1,
  "A5_Score": 0,
  "A6_Score": 1,
  "A7_Score": 1,
  "A8_Score": 0,
  "A9_Score": 1,
  "A10_Score": 1,
  "age": 28.0,
  "gender": "m",
  "ethnicity": "White-European",
  "jundice": "no",
  "austim": "no",
  "contry_of_res": "India",
  "result": 7.0,
  "relation": "Self"
}
```

**Response:**
```json
{
  "prediction": "YES"
}
```

**Error Response (400):**
```json
{
  "detail": "<error description>"
}
```

---

## 📈 Results

SVM was selected as the best-performing model based on:

- Highest **accuracy** on the test set
- Highest **F1-score**, indicating strong balance between precision and recall
- Competitive **prediction time**, suitable for real-time inference

The `visuals.py` module provides:
- Feature distribution histograms
- Side-by-side comparison of all 6 model performance metrics (training time, accuracy, F1) at 1%, 10%, 100% training set sizes
- Feature importance bar chart (top 11 most predictive features)

---

## 🌟 Future Work

- [ ] **Deploy to cloud** (AWS / GCP / Render) for public access
- [ ] **Add children/adolescent dataset** support (currently adult-only)
- [ ] **Model explainability** — integrate SHAP or LIME for per-prediction explanations
- [ ] **Authentication** and audit logging for clinical use
- [ ] **Mobile-responsive** prediction form improvements
- [ ] **Expand to deep learning** — CNN/LSTM on EEG or facial recognition data
- [ ] **Multi-language support** for global accessibility

---

## ⚠️ Disclaimer

> NeuroSpectra is a **screening assistance tool** and is **not a clinical diagnostic instrument**. Results should not be interpreted as a formal medical diagnosis. Always consult a licensed healthcare professional for ASD assessment and diagnosis.

---

## 👨‍💻 Author

**Rohithnaik S**
- GitHub: [@RohithnaikS](https://github.com/RohithnaikS)
- Email: rohithnaiks2003@gmail.com

---

## 📄 License

This project is open-source. Please check the repository for license details or contact the author for usage permissions.

---

*Built with ❤️ to make early ASD detection more accessible.*
