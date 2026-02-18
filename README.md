# 🟦 Shape Designer Web Application

## 📌 Overview

The Shape Designer Web Application is a full-stack web system that allows users to:

- Create geometric shapes
- Visualize shapes dynamically
- Modify dimensions in real-time
- Calculate and display area
- Persist shapes in a MySQL database

#### _The application follows a RESTful architecture using React (frontend), Spring Boot (backend), and MySQL (database)._

## 🛠️ Technology Stack

### Frontend

- React
- HTML5 Canvas API

### Backend

- Java Spring Boot
- Spring Data JPA
- Hibernate

### Database

- MySQL

### Architecture

- RESTful API

## 🚀 Features

### Frontend Features

- Select shape type:
  - Rectangle
  - Circle
  - Triangle
- Modify shape dimensions dynamically
- Real-time area calculation
- Canvas-based shape rendering
- View all saved shapes
- Edit existing shapes
- Delete shapes

### Backend Features

The backend exposes the following REST endpoints:

| Method | Endpoint         | Description           |
| ------ | ---------------- | --------------------- |
| POST   | /api/shapes      | Create new shape      |
| GET    | /api/shapes      | Retrieve all shapes   |
| GET    | /api/shapes/{id} | Retrieve shape by ID  |
| PUT    | /api/shapes/{id} | Update existing shape |
| DELETE | /api/shapes/{id} | Delete shape          |

## 🔄 Pre-configured Shapes

When the database is empty, the system automatically inserts:

- Default Rectangle (100x100)
- Default Circle (radius 50)
- Default Triangle (100x80)

#### _These are inserted only once and are not duplicated on restart._

## ⚙️ Setup Instructions

### 1️⃣ Clone Repository

```sh
git clone <repository-link>
```

### 2️⃣ Database Setup

Create MySQL database:

```sh
CREATE DATABASE shape_designer;
```

Update

```
 application.properties:
```

```sh
spring.datasource.url=jdbc:mysql://localhost:3306/shape_designer
spring.datasource.username=your_username
spring.datasource.password=your_password
```

### 3️⃣ Run Backend

From backend directory:

Windows:

```
.\mvnw.cmd spring-boot:run
```

Mac/Linux:

```
./mvnw spring-boot:run
```

Backend runs on:

```
http://localhost:8080
```

### 4️⃣ Run Frontend

From frontend directory:

```sh
npm install
npm start
```

Frontend runs on:

```sh
http://localhost:3000
```

## 🧪 Testing the Application

1. Create a new shape
2. Modify dimensions
3. Save shape
4. Edit shape
5. Delete shape
6. Restart backend to confirm persistence

## 🏗 Architecture Overview

Frontend (React)

⬇️ REST API Calls

Backend (Spring Boot)

⬇️ JPA/Hibernate

MySQL Database
