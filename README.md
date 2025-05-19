# Bazar.com

Bazar.com is an **online bookstore** that allows users to search for books and make purchases. It is built using a **microservices architecture** to improve modularity and scalability.

---

## 🛠️ Tech Stack

- **Node.js** with **Express.js** – Backend services
- **SQLite** – Lightweight database
- **Axios** – Service-to-service communication
- **Docker** – Containerization of services

---

## 🧩 Microservices Design

This project consists of **three separate services**, each running on its own server:

- `catalog-service` – Runs on **port 3000**, handles book search
- `order-service` – Runs on **port 3001**, handles book purchases
- `frontend-service` – Runs on **port 3002**, acts as an API gateway

**Request Flow:**

- Search queries → forwarded to `catalog-service`
- Purchase requests → forwarded to `order-service`
- `order-service` communicates with `catalog-service` to verify stock

---

## 🖥️ Installation and Running the App

### 1. Clone the repository

```bash
cloane the repo
make sure you inside Book_Store
