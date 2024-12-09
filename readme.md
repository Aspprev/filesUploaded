# API Documentation for File Management

## Overview
This API allows users to upload and delete files to/from an AWS S3 bucket. It includes authentication and rate limiting features.

## Base URL

""

## Endpoints

### Upload File
- **URL:** `/files`
- **Method:** `POST`
- **Headers:**
  - `Authorization: Bearer <token>`
- **Body:**
  - `file: <file>` (multipart/form-data)
- **Success Response:**
  - **Code:** `200 OK`
  - **Content:** `URL of the uploaded file`
- **Error Responses:**
  - **Code:** `400 Bad Request`
  - **Content:** `{"status": "error", "statusCode": 400, "message": "Nenhum arquivo enviado!"}`
  - **Code:** `401 Unauthorized`
  - **Content:** `{"status": "error", "statusCode": 400, "message": "Token não fornecido!"}`

### Delete File
- **URL:** `/files/:fileName`
- **Method:** `DELETE`
- **Headers:**
  - `Authorization: Bearer <token>`
- **Success Response:**
  - **Code:** `200 OK`
  - **Content:** `Arquivo deletado com sucesso!`
- **Error Responses:**
  - **Code:** `400 Bad Request`
  - **Content:** `{"status": "error", "statusCode": 400, "message": "Nome do arquivo não fornecido!"}`
  - **Code:** `401 Unauthorized`
  - **Content:** `{"status": "error", "statusCode": 400, "message": "Token não fornecido!"}`

## Error Handling
All errors are handled by a centralized error handler which returns a JSON response with the following structure:
```json
{
  "status": "error",
  "statusCode": "<statusCode>",
  "message": "<errorMessage>"
}
```
## Rate Limiting
The API is rate-limited to 50 requests per 15 minutes per IP address.

## Environment Variables
The following environment variables need to be set in a `.env` file:

```
AWS_ACCESS_KEY_ID=<your-aws-access-key-id>
AWS_SECRET_ACCESS_KEY=<your-aws-secret-access-key>
AWS_REGION=<your-aws-region>
AWS_BUCKET_NAME=<your-aws-bucket-name>
```
## Setup

Clone the repository.
Install dependencies:

```bash
npm install
```
Create a .env file in the root directory and add your AWS credentials and bucket information.
Start the server:

```bashstart
npm start
```
## Dependencies
- express
- express-rate-limit
- multer
- @aws-sdk/client-s3
- @aws-sdk/lib-storage
- dotenv
- cors



