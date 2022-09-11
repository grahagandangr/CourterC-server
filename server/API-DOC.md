## Endpoints :

List of available endpoints:

Customer :

- `POST /customer/login`
- `POST /customer/register`
- `GET /customer/venues`
- `GET /customer/courts`
- `Get /customer/courts-radius`
- `GET /customer/:id`
- `GET /customer/profile`
- `POST /customer/top-up`
- `POST /customer/top-up/update-balance`
- `POST /customer/pay-orders`
- `POST /customer/courts-orderList`
- `POST /customer/courts/cancelOrder/:orderDetailId`

Owner :

- `POST /owner/login`
- `POST /owner/register`
- `GET /owner/courts`
- `POST /owner/courts`
- `Get /owner/courtsCategories`
- `GET /owner/courtsCategories/:id`
- `PUT /owner/courtsCategories/:id`
- `DELETE /owner/courtsCategories/:id`
- `POST /owner/courts-orderLists`
- `POST /owner/claimPayment/:orderDetailId`

&nbsp;

## Endpoints Customer :

## 1. POST /customer/register

Description:

- Add new Customer

Request:

- body:

```json
{
  "username": "string",
  "email": "string",
  "password": "string",
  "role": "string",
  "phoneNumber": "string",
  "address": "string",
  "balance": "integer",
  "location": "array of integer"
}
```

_Response (201 - Created)_

```json
{
    "message": "Success register"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": [
    "Username is required"
    ]
}

OR
{
  "message": [
   "Email already Registered"
    ]
}
OR
{
  "message": [
    "Phone Number is Required"
    ]
}
OR
{
  "message": [
    "Address is Required"
    ]
}
```

## 2. POST /customer/login

Description:

- Get in to Existing Account

Request:

- body:

```json
{
  "email": "string",
  "password": "string"
}
```

_Response (200 - OK)_

```json
{
  "access_token": "<access_token>"
}
```


_Response (401 - No Token)_

```json
{
  "message": "Please Login"
}
```

_Response (400 - Bad Request)_

```json

{
  "message": [
    "Invalid User/Email"
    ]
}
OR
{
  "message": [
   "Email already Registered"
    ]
}
OR
{
  "message": [
    "Password is required"
    ]
}
```

