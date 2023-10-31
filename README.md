# Node React Challenge
This project showcases a complete web application with a frontend, backend, and a database. It is developed using Node.js, React, and PostgreSQL, and includes authentication and tabular data display. 

## Getting Started

### Requirements
- This project is tested with `node v20.5.1`.
- Require PostgreSQL

## Run backend server

### Go into backend directory
```sh
cd server
```

### Install dependencies 
```sh
npm install
```

### Configure database connection
open up `.env` and config the database connection

```sh
DB_USER="YOUR_DATABASE_USERNAME"
DB_HOST="YOUR_HOSTNAME"
DB_DATABASE="YOUR_DATABASE_NAME"
DB_PASSWORD="YOUR_DATABASE_PASSWORD"
DB_PORT=YOUR_DATABASE_PORT
```

### Run backend server
```sh
npm run serve
```

## Run frontend server

### Go into frontend directory
```sh
cd frontend
```

### Install dependencies 
```sh
npm install
```

### Run frontend server
```sh
npm run serve
```

## Setup Demo Data
Run the SQL query inside `sql` directory to create some dummy data.

### Using the application
After the frontend, backend and database are set up properly, you should able to log in with the following username and password.

```sh
username: calrance
password: calrance
```
