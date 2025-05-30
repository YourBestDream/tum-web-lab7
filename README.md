# Car Parts API

A RESTful API for managing car parts inventory, built with FastAPI.

## Features

- CRUD operations for car parts
- JWT-based authentication with role-based access control
- Pagination support
- Swagger UI documentation
- SQLite database (can be easily changed to other databases)

## Setup

1. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Run the application:
```bash
uvicorn app.main:app --reload
```

The API will be available at http://localhost:8000

## API Documentation

Once the application is running, you can access:
- Swagger UI documentation: http://localhost:8000/docs
- ReDoc documentation: http://localhost:8000/redoc

## Authentication

The API uses JWT tokens for authentication. To get a token:

1. Make a POST request to `/api/v1/token` with a list of permissions:
```json
{
    "permissions": ["READ", "WRITE"]
}
```

2. Use the returned token in the Authorization header for subsequent requests:
```
Authorization: Bearer <your_token>
```

## Available Endpoints

- `GET /api/v1/car-parts/` - List all car parts (with pagination)
- `POST /api/v1/car-parts/` - Create a new car part
- `GET /api/v1/car-parts/{id}` - Get a specific car part
- `PUT /api/v1/car-parts/{id}` - Update a car part
- `DELETE /api/v1/car-parts/{id}` - Delete a car part
- `POST /api/v1/car-parts/{id}/like` - Like a car part

## Permissions

- `READ`: Required for GET operations
- `WRITE`: Required for POST, PUT, DELETE operations

## Development

The project structure is organized as follows:

```
app/
├── api/
│   └── car_parts.py
├── auth/
│   └── jwt.py
├── models/
│   ├── database.py
│   └── car_part.py
├── schemas/
│   └── car_part.py
└── main.py
```