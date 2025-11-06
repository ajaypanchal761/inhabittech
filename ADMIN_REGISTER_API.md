# Admin Registration API

## Endpoint

**URL:** `http://localhost:5000/api/admin/register`  
**Method:** `POST`  
**Content-Type:** `application/json`

## Request Body

```json
{
  "name": "Admin Name",
  "email": "admin@inhabittech.com",
  "password": "your_password_here",
  "role": "admin"
}
```

### Required Fields:
- `name` (String) - Admin's full name
- `email` (String) - Admin's email address (must be unique)
- `password` (String) - Password (minimum 6 characters)

### Optional Fields:
- `role` (String) - Either `"admin"` or `"superadmin"` (default: `"admin"`)

## Success Response (201 Created)

```json
{
  "success": true,
  "message": "Admin registered successfully",
  "data": {
    "admin": {
      "_id": "admin_id_here",
      "name": "Admin Name",
      "email": "admin@inhabittech.com",
      "role": "admin",
      "isActive": true,
      "createdAt": "2025-01-XX...",
      "updatedAt": "2025-01-XX..."
    },
    "token": "jwt_token_here"
  }
}
```

## Error Responses

### 400 Bad Request - Missing Fields
```json
{
  "success": false,
  "message": "Name, email, and password are required"
}
```

### 409 Conflict - Email Already Exists
```json
{
  "success": false,
  "message": "Admin with this email already exists"
}
```

## Example Requests

### Using cURL
```bash
curl -X POST http://localhost:5000/api/admin/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Admin Name",
    "email": "admin@inhabittech.com",
    "password": "12345678",
    "role": "admin"
  }'
```

### Using PowerShell
```powershell
$body = @{
    name = "Admin Name"
    email = "admin@inhabittech.com"
    password = "12345678"
    role = "admin"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:5000/api/admin/register" -Method POST -Body $body -ContentType "application/json"
```

### Using JavaScript/Fetch
```javascript
fetch('http://localhost:5000/api/admin/register', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: 'Admin Name',
    email: 'admin@inhabittech.com',
    password: '12345678',
    role: 'admin'
  })
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));
```

### Using Postman
1. Method: `POST`
2. URL: `http://localhost:5000/api/admin/register`
3. Headers: `Content-Type: application/json`
4. Body (raw JSON):
```json
{
  "name": "Admin Name",
  "email": "admin@inhabittech.com",
  "password": "12345678",
  "role": "admin"
}
```

## Notes

- Email is automatically converted to lowercase
- Password is automatically hashed using bcrypt
- Password must be at least 6 characters long
- Email must be unique (no duplicate admins)
- The response includes a JWT token that can be used for authentication
- Token expires in 7 days (configurable via `JWT_EXPIRE` environment variable)

