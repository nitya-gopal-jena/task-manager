## **MERN Task Manager 📝**  

A **role-based task management system** built using the **MERN stack** (MongoDB, Express.js, React, Node.js) with **OAuth2 authentication** and JWT security.  

### **🚀 Features**
- **User Roles**: `ADMIN` & `USER`  
- **Authentication**: OAuth2 with JWT (expires in 30 mins)  
- **Task Management**:  
  - Users can create & view their own tasks  
  - Admins can assign tasks to users  
  - Task filtering (by assignedTo & assignedBy)  
- **Security**: Prevent brute-force attacks on registration API  

---

### **🛠 Setup & Run**
#### **1️⃣ Clone the Repo**
```sh
git clone https://github.com/your-username/mern-task-manager.git
cd task-manager
```

#### **2️⃣ Install Dependencies**
```sh
npm run build-app #will install necessary package
npm run build # Runs both frontend & backend
```

#### **3️⃣ Set Up Environment Variables**

#### **4️⃣ Start the App**
```sh
npm start  # Runs both frontend & backend
```

---

### **📌 API Endpoints**
| Method | Endpoint         | Description |
|--------|----------------|-------------|
| `POST` | `/register`     | Register a new user |
| `POST` | `/login`        | Login & get JWT token |
| `POST` | `/tasks`        | Create a task |
| `GET`  | `/tasks`        | Get tasks (Admin can filter by `assignedTo` & `assignedBy`) |
