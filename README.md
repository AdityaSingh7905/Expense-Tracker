# Personal Expense Tracker

## 🚀 Introduction
The **Personal Expense Tracker** is a full-stack web application designed to help users track their income, expenses, and budget. It provides **interactive charts, category-wise breakdowns, and spending insights** to make financial management easier.

## 🛠️ Tech Stack
### **Frontend:**
- **Next.js** (App Router) – React framework for server-side rendering and static generation.
- **Tailwind CSS** – For styling and responsiveness.
- **shadcn/ui** – For elegant UI components.
- **Recharts** – For visualizing financial data with graphs.
- **Context API** – For global state management.

### **Backend:**
- **Node.js** – JavaScript runtime for the backend.
- **Express.js** – Web framework for building APIs.
- **MongoDB (Mongoose)** – NoSQL database for storing transactions.

### **Deployment:**
- **Frontend:** Vercel (https://expense-tracker-psi-blue.vercel.app/)
- **Database:** MongoDB Atlas

---
## 🎯 Features
### **🌟 Stage 1: Basic Transaction Tracking**
- ✅ Add, edit, delete transactions.
- ✅ View a list of all transactions.
- ✅ Monthly expenses bar chart.
- ✅ Form validation.

### **📊 Stage 2: Categorization & Dashboard Enhancements**
- ✅ Predefined transaction categories.
- ✅ Category-wise **Pie Chart**.
- ✅ Dashboard with:
  - Total expenses summary.
  - Category breakdown.
  - Most recent transactions.

### **💰 Stage 3: Budgeting & Insights**
- ✅ Set monthly budgets for each category.
- ✅ Budget vs. actual comparison chart.
- ✅ Spending insights.

---
## 🚀 Setup & Installation
### **1️⃣ Clone the Repository**
```bash
git clone https://github.com/AdityaSingh7905/Expense-Tracker.git
cd Expense-Tracker
```

### **2️⃣ Install Dependencies**
#### Frontend:
```bash
npm install
```
#### Backend:
```bash
cd backend
npm install
```

### **3️⃣ Set Up Environment Variables**
Create a `.env` file in the`backend` folder with the following values:

#### **Backend (.env)**
```
MONGO_URI=your-mongodb-connection-string
PORT=8000
```

### **4️⃣ Run the Application**
#### Start Backend Server:
```bash
cd backend
nodemon index.js or node index.js
```
#### Start Frontend Server:
```bash
npm run dev
```
Now, visit **`http://localhost:3000`** to see the application in action!

---
## 📜 API Endpoints
| Method | Endpoint | Description |
|--------|---------|-------------|
| **GET** | `/api/budgets` | Get all budgets |
| **POST** | `/api/budgets` | Add a new category budget |
| **GET** | `/api/transactions` | Get all transactions |
| **POST** | `/api/transactions` | Add a new transaction |
| **PUT** | `/api/transactions/:id` | Update a transaction |
| **DELETE** | `/api/transactions/:id` | Delete a transaction |




