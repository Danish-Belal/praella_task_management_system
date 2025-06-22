# 📌 Praella Task Management System

A full-stack task management system with project-based task creation, authentication, and comment support — built for Praella Assessment using **Node.js**, **React**, **PostgreSQL**, and **Tailwind CSS**.

---

## 🌍 Live URLs

- 🖥️ **Frontend**: [https://praella-task-management-system.vercel.app](https://praella-task-management-system.vercel.app)
- 🔗 **Backend**: [https://praella-task-management-system-1.onrender.com](https://praella-task-management-system-1.onrender.com)

---
## 🛠️ Tech Stack Used

### 🔧 Backend

- **Node.js** `v18`
- **Express** `v5.1.0`
- **PostgreSQL** (via `pg`)
- **bcrypt** `v6.0.0`
- **jsonwebtoken** `v9.0.2` for Authentication
- **multer** & **multer-s3** for file upload
- **AWS SDK** `v2.1692.0` for S3 integration
- **dotenv** for environment variables
- **CORS**, **express-validator**
- **nodemon**, **jest**, **supertest**
- **node-pg-migrate** for DB migrations

### 🎨 Frontend

- **React** `v19.1.0`
- **TypeScript**
- **Tailwind CSS** `v4.1.10`
- **Vite** `v6.3.5`
- **React Router DOM** `v7.6.2`
- **Lucide React**
- **Axios**

---

## ⚙️ Project Setup Instructions
### 🔧 Backend Setup
### 1. Clone the Repository

```bash
git clone https://github.com/Danish-Belal/praella_task_management_system
cd praella-task-management-system/backend

```
 ### 2. Install Dependencies
 ```
 npm install
```
### 3. Create Environment File
Inside the /backend directory, create a file named .env and add the following content:

```
  DATABASE_URL="your_postgresql_connection_string"  (from neon db)
  PORT=3000
  JWT_SECRET=your_jwt_secret
  
  AWS_ACCESS_KEY_ID=your_aws_access_key
  AWS_SECRET_ACCESS_KEY=your_aws_secret_key
  AWS_REGION=your_aws_region
  S3_BUCKET=your_bucket_name
  
  FRONTEND_URL=http://localhost:5173
  NODE_ENV=DEVELOPMENT  (for deploy, set production)

```
### 4. Run Migrations
```
npx node-pg-migrate up
```

### 5. Start the Development Server
```
npm run dev
```

### 🎨 Frontend Setup
### 1. Navigate to Frontend Folder
```
cd ../frontend
```
 ### 2. Install Dependencies
 ```
 npm install
```
### 3. Create Environment File
Inside the /frontend directory, create a file named .env and add the following content:
```
VITE_API_BASE_URL=http://localhost:3000/api
```

### 5. Start the Development Server
```
npm run dev
```

---
## 🧪 Sample Data for Local Testing

To load test data into your local PostgreSQL database, run:

```bash
psql -U your_db_user -d your_db_name -f backend/sample.sql
```
This will insert a test user, a demo project, one task, and one comment.

## 📬 Postman API Collection

A complete Postman collection is provided to help you quickly test the API endpoints.

🗂️ **Location**: `postman_collection.json` (in the root of this repository)

You can import it into Postman using:

1. Open Postman
2. Click on **Import**
3. Select the file `postman_collection.json` from the project root
4. Use the test credentials or register a new user to authenticate requests

This collection includes:
- Auth APIs (Signup/Login)
- Project & Task CRUD
- Comments
  
---
## 🧪 Test Credentials (For Deployed Version Only)

Use the following credentials **only on the deployed URLs**:

- **Email**: `danishexplore019@gmail.com`  
- **Password**: `Danish*111`

⚠️ These credentials are set up only for demo purposes on the live deployment. They may not work in your local environment without seed data.


---
## ✅ Features Implemented

- 👤 **Authentication**
  - Signup with name/email/password
  - Login and receive token
  - Authenticated route protection
  - Logout clears session

- 📁 **Projects**
  - Create, update, delete projects  
  - Fetch project list on login

- ✅ **Tasks**
  - Add tasks to specific project  (Only project owner can)
  - Edit, update, delete tasks
  - Priority, deadline, and status support

- 💬 **Comments** (Only project owner can)
  - Add comments to tasks and can also attach file (Max-5MB)
  - Delete comments

- 🔔 **Toasts**
  - Visual feedback on every action (success/fail)

---

## 🧠 My Approach & Reflections

I structured the backend using the **MVC pattern** and focused on keeping controller logic clean and testable. I ensured API security using **JWT tokens**, and used **pg** along with **node-pg-migrate** for handling database schemas and migrations. On the frontend, I followed modular component architecture using **React + Vite**, styled using **Tailwind CSS** for rapid development, and ensured responsiveness across devices.

---

### ✅ What Went Well

- Clean and consistent REST API design  
- Secure authentication with role-based token handling  
- Frontend structure with reusable and modular components  
- Neatly managed forms, validations, and UI feedback (toast)
- attaching files on aws s3 bucket and retriving it.
  
---

### ❌ What Could Be Improved

- Multiple users can be assigned a single project to work together.
- Didn’t implement CI/CD pipelines or custom domain setup
- Self-hosted deployment flow (with own infrastructure) was not completed  

✅ Note: File upload to **AWS S3** is already implemented and tested successfully.

---

### 🧩 Issues Faced

- CORS configuration issues between frontend (Vercel) and backend (Render)
- Managing AWS credentials securely across environments
- File upload region mismatch and S3 bucket permission handling in dev vs prod
- Sort of time, to many thigs to imporve.

---

### ⏱️ Estimated Completion Time

**~14 to 16 hours**, including development, testing, and deployment.

### 🧑‍💻 Built & Developed By

Crafted with focus, clean code, and attention to detail by **Danish Belal**.

For any queries, feel free to reach out on [danishexplore019@gmail.com](mailto:danishexplore019@gmail.com).
