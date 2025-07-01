# 📌 Praella Task Management System

A full-stack task management system with project-based task creation, authentication, and comment support — built for Praella Assessment using **Node.js**, **React**, **PostgreSQL**, and **Tailwind CSS**.

---

## 🌍 Live URLs

- 🖥️ **Frontend**: [https://praella-task-management-system.vercel.app](https://praella-task-management-system.vercel.app)
- (May experience occasional load issues due to limitations of free-tier hosting)
- 🔗 **Backend**: [https://praella-task-management-system-1.onrender.com](https://praella-task-management-system-1.onrender.com)


### 🌐 Custom Domain (AWS)

- 🖥️ **Frontend (Custom - Vercel)**: [https://praella-task-managment-ui.score-book.com](https://praella-task-managment-ui.score-book.com)
- (Runs smoothly and loads faster as it's connected to our custom AWS infrastructure)
- 🔗 **Backend (Custom - AWS EC2 + NGINX + PM2)**: [https://praella-task-managment.score-book.com](https://praella-task-managment.score-book.com)
- (Deployed on our own AWS EC2 instance with optimized performance and uptime)

---
## 🛠️ Tech Stack Used

### 🔧 Backend

- **Node.js** `v20.5.1`
- **Express** `v5.1.0`
- **PostgreSQL** via `pg@8.16.0`
- **bcrypt** `6.0.0`
- **jsonwebtoken** `9.0.2` (for Authentication)
- **multer** `2.0.1` & **multer-s3** `3.0.1` (for file uploads)
- **AWS SDK v2** `2.1692.0` and **AWS SDK v3** `@aws-sdk/client-s3@3.832.0`, `@aws-sdk/s3-request-presigner@3.832.0`
- **dotenv** `16.5.0` (for environment variables)
- **cors** `2.8.5`, **express-validator** `7.2.1`
- **nodemon** `3.1.10`
- **jest** `30.0.0`, **supertest** `7.1.1`
- **node-pg-migrate** `7.7.1`



### 🎨 Frontend

- **React** `v19.1.0`
- **TypeScript**
- **Tailwind CSS** `v4.1.10`
- **Vite** `v6.3.5`
- **React Router DOM** `v7.6.2`
- **Lucide React**
- **Axios**

---

## ⚙️ Project Setup Instructions (locally)
### 🔧 Backend Setup
### 1. Clone the Repository

```bash
git clone https://github.com/Danish-Belal/praella_task_management_system.git
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
- Hosred on AWS ec2 instancw with custome domain.
- Implemented ci/ci pipeline to auto deploy on aws machine
  
---

### ❌ What Could Be Improved

- Multiple users can be assigned a single project to work together.
- Didn’t implement CI/CD pipelines or custom domain setup   (In Progress) --> (Done now) Added an ci/cd pipeline to auto deploy whenever backend files changes.)
- Self-hosted deployment flow (with own infrastructure) was not completed    (Done Now)

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

---


## 🚀 Self-Hosting on AWS (Backend Deployment Guide)

Want to host the backend on your own cloud infrastructure? Follow this guide to deploy the Express backend on an AWS EC2 instance with a custom domain, SSL, and persistent process management.

---

### ✅ Prerequisites

- A GitHub repo for your backend
- A domain name (e.g., from Namecheap)
- AWS account with EC2 permissions
- PEM key file for SSH login

---

### 🔧 1. Create an EC2 Instance (Ubuntu)

- Launch a new EC2 instance (Ubuntu 22.04 LTS)
- Set inbound rules to allow ports: **22 (SSH), 80 (HTTP), 443 (HTTPS)**
- Download and use the `.pem` key to connect:

```bash
ssh -i your-key.pem ubuntu@your-ec2-public-ip
```

### 📦 2. Install Required Software
```
  sudo apt update && sudo apt upgrade -y
  
  # Install Node.js & npm
  curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
  sudo apt install -y nodejs
  
  # Install Git
  sudo apt install git
  
  # Install PM2 globally
  npm install -g pm2

```

### 📁 3. Clone Your Backend Repository

```
 git clone https://github.com/Danish-Belal/praella_task_management_system.git
 cd praella-task-management-system/backend
```
### 🔐 4. Add Environment Variables
   Create a .env file:
 ```
touch .env
nano .env
```

Add Secrets in .env
```
DATABASE_URL="your_postgresql_connection_string"  (from neon db)
  PORT=3000
  JWT_SECRET=your_jwt_secret
  
  AWS_ACCESS_KEY_ID=your_aws_access_key
  AWS_SECRET_ACCESS_KEY=your_aws_secret_key
  AWS_REGION=your_aws_region
  S3_BUCKET=your_bucket_name
  
 # FRONTEND_URL=http://localhost:5173    #uncomment this if you want to run from local.
 # NODE_ENV=DEVELOPMENT  (for deploy, set production)

 FRONTEND_URL= your vercel frontend link, your custom domain frontend link.  #if you want to run your frontend from a hosted link
 NODE_ENV=Production
```
## 📦 5. Install Dependencies

```
npm install

```

## 🚀 6. Start Backend with PM2
```
pm2 start server.js --name backend
pm2 startup
pm2 save

```

## 🌐 7. Setup NGINX Reverse Proxy
```
sudo apt install nginx
sudo nano /etc/nginx/nginx.conf

```
Paste this configuration:
```
events {}

http {
  server {
    listen 80;
    server_name your-subdomain.yourdomain.com;

    location / {
      proxy_pass http://localhost:3000;    
      proxy_http_version 1.1;
      proxy_set_header Upgrade $http_upgrade;
      proxy_set_header Connection 'upgrade';
      proxy_set_header Host $host;
      proxy_cache_bypass $http_upgrade;
    }
  }
}

```

Test & reload:
```
sudo nginx -t
sudo systemctl reload nginx

```

## 🔒 8. Add HTTPS with Certbot
```
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d your-subdomain.yourdomain.com

```

Follow prompts to complete SSL setup

Certbot auto-renews the certificate every 90 days

## 🌍 9. Connect Domain to AWS
  Go to your domain provider (e.g., Namecheap):
   
```
 Add an A Record:
Host: your-subdomain
Value: your-ec2-public-ip
TTL: Automatic
```

## 🧪 10. Verify Everything
```
curl -I https://your-subdomain.yourdomain.com
curl http://localhost:3000

```

## 🔁 Restart on Changes
```
pm2 restart backend

```


## ✅ Deployment Summary

You’ve now successfully deployed your backend to AWS with the following setup:

- **Custom Domain**
- **HTTPS (SSL)** via Let’s Encrypt
- **NGINX** as a Reverse Proxy
- **PM2** for Node.js Process Management

---

### ✅ Next Steps

- ✅ Hit your backend URL in the browser or via Postman  
- 🌐 Example: `https://your-subdomain.yourdomain.com/api/auth/login`  
- 🔐 Test login with valid credentials to confirm everything works

    
---
### 🧑‍💻 Built & Developed By

Crafted with focus, clean code, and attention to detail by **Danish Belal**.

For any queries, feel free to reach out on [danishexplore019@gmail.com](mailto:danishexplore019@gmail.com).
