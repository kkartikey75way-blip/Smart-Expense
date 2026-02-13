# 💰 Smart Expense Tracker

Smart Expense Tracker is a full-stack finance management application built using the MERN stack with TypeScript (Strict Mode). The application allows users to track daily expenses, manage categories, upload bank statements, and automatically categorize transactions.

---

## 🚀 Overview

This application helps users:
- Track daily spending
- Categorize expenses
- Upload bank statements (CSV format)
- Automatically detect debit transactions
- Automatically categorize imported expenses
- View expenses in a structured dashboard

The project follows a clean backend structure and strict TypeScript typing for production-level reliability.

---

## 🛠 Tech Stack

Frontend:
- React
- TypeScript (Strict Mode)
- Axios

Backend:
- Node.js
- Express
- MongoDB
- Mongoose
- TypeScript (Strict Mode)

File Processing:
- Multer (File upload handling)
- csv-parser (CSV parsing)

---

## ✨ Features

Authentication:
- User Registration
- User Login
- JWT-based Authentication
- Protected Routes

Expense Management:
- Add Expense
- Edit Expense
- Delete Expense
- Category-based tracking
- Dashboard analytics

Bank Statement Upload:
- Upload CSV bank statement
- Parse transaction data
- Detect debit transactions
- Automatically categorize expenses
- Bulk insert into MongoDB
- Return import summary

---

## 📊 Bank Statement Import Workflow

1. User uploads CSV file.
2. Backend reads file from memory using Multer.
3. CSV is parsed into structured rows.
4. Debit transactions are filtered (negative amounts).
5. Category is auto-detected based on description.
6. Expenses are saved in MongoDB.
7. Summary response is returned to the user.

---

## 🧾 Supported CSV Format

CSV must follow this structure:

Date,Description,Amount  
2026-02-01,UPI SWIGGY,-450  
2026-02-02,UPI UBER,-220  
2026-02-03,Salary,50000  

Rules:
- Negative amount → Debit → Saved as Expense
- Positive amount → Credit → Ignored

---

## 🧠 Auto Categorization Logic

Current keyword-based categorization:

- swiggy, zomato → Food
- uber, ola → Travel
- amazon, flipkart → Shopping
- netflix, spotify → Entertainment
- Others → Others

This logic can later be upgraded to AI/ML-based classification.

---

## 📁 Project Structure

src/
 ├── controllers/
 ├── models/
 ├── routes/
 ├── middlewares/
 ├── services/
 └── app.ts

---

## ⚙️ Installation Guide

1. Clone Repository

git clone <your-repo-url>  
cd smart-expense-tracker  

2. Install Backend Dependencies

cd backend  
npm install  

3. Create .env File

PORT=5000  
MONGO_URI=your_mongodb_connection  
JWT_SECRET=your_secret  

4. Run Backend

npm run dev  

5. Run Frontend

cd frontend  
npm install  
npm run dev  

---

## 📌 API Endpoint

Upload Bank Statement:

POST /api/statements/upload  

Form-data:
file: <csv-file>  

Example Response:

{
  "message": "Statement imported successfully",
  "totalImported": 12,
  "skipped": 3
}

---

## 🔒 Security Features

- JWT-based authentication
- Protected upload endpoint
- CSV file type validation
- Strict TypeScript typing
- Structured backend architecture

---

## 📈 Future Improvements

- AI-based expense categorization
- PDF statement parsing
- Duplicate transaction detection
- Recurring expense detection
- Budget prediction system
- UPI SMS integration (Mobile support)

---

## 🎯 Project Highlights

- Built using strict TypeScript
- Clean and scalable backend structure
- Real-world financial use case
- Automated expense ingestion
- Production-ready approach

---

## 👨‍💻 Author

Kartikeya Srivastava  
Full Stack Developer | MERN | AI Enthusiast

---

## 📜 License

This project is created for educational and learning purposes.
