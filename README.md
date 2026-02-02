# Simulation-M3

Order Management Web System – Frontend Simulation

Frontend project simulating the complete order flow of a restaurant, using Vanilla JavaScript, a JSON Server as a mock API, and LocalStorage for session and role management.

This project was developed as a performance test, meeting criteria for authentication, roles, persistence, logical security, and separation of views.

# Technologies Used

HTML5
CSS3
Bootstrap 5
Vanilla JavaScript (ES Modules)
JSON Server (Mock API)
LocalStorage (session management)
No real backend used
No frameworks used (React, Vue, etc.)

# General Description

The application allows:

User registration and login

Role management (admin and user)

Data consumption from a mock API

Task and status management

Administrative panel with metrics

Session persistence

Role-based route protection

The design and logic are geared towards simulating a real-world task environment without relying on a production backend.

System Roles
User

View tasks

Add tasks to a list

Modify statuses

Check task status

Administrator

Access the administrative dashboard

View general metrics

Change order statuses

Create and list tasks

Monitor all tasks
# Project structure
/index.html
/pages
  ├── admin.html
  └── task.html
/js
  ├── main.js
  ├── login.js
  ├── register.js
  ├── admin.js
  └── users.js
/db.json
/README.md
# JSON database structure
DataBase
{
  "users": [],
  "task": [],
}
Users
{
  "id": 1,
  "username": "admin",
  "password": "1234",
  "role": "admin"
}
Task:
{
  "id": 1,
  "name": "make a task",
  "description": "test a program developed",
  "state": "how goes a task",
  "priority": "to know how urgent it is"
}

# Instalar Ejecucion
Instalar dependencias:
                        npm install json-server
Ejecutar en una terminal el JSONSERVER
                        npx json-server --watch db.json --port 3000
