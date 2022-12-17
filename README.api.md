## 1- Create User

### POST:http://localhost:4000/api/users

##### Request Body Example

```json
{
  "user_name": "Admin",
  "passworde": "4529784612",
  "first_name": "Admin1",
  "last_name": "Admin1"
}
```

## 1- Login

### POST:http://localhost:4000/api/users/login

##### Request Body Example

```json
{
  "user_name": "Admin",
  "passworde": "4529784612"
}
```

# product Apis

## 1- Create product

### POST:http://localhost:4000/api/product

#### Authorization (require authorization header):

       `Authorization: 'Bearer ' + Token`

##### Request Body Example

```json
{
  "product_name": "computer",
  "product_price": "3000"
}
```

## 2- Get product

### GET:http://localhost:4000/api/product/:product_id

#### Authorization (require authorization header):

       `Authorization: 'Bearer ' + Token`

## 3- Get All products

### GET:http://localhost:4000/api/product

#### Authorization (require authorization header):

       `Authorization: 'Bearer ' + Token`

## 4- Update product

### PUT:http://localhost:4000/api/product/:product_id

#### Authorization (require authorization header):

       `Authorization: 'Bearer ' + Token`

##### Request Body Example

```json
{
 {
  "product_name": "laptop",
  "product_price": "50000"
}
}
```

## 5- Get product

### DELETE:http://localhost:4000/api/product/:product_id

#### Authorization (require authorization header):

       `Authorization: 'Bearer ' + Token`

# User Apis

# Order Apis

## 1- Create Order

### POST:http://localhost:4000/api/order

#### Authorization (require authorization header):

       `Authorization: 'Bearer ' + Token`

##### Request Body Example

```json
{
  "products": [
    {
      "id": 3,
      "quantity": 66
    },
    {
      "id": 4,
      "quantity": 222
    }
  ]
}
```

## 2- Get Order

### GET:http://localhost:4000/api/order/:id

#### Authorization (require authorization header):

       `Authorization: 'Bearer ' + Token`

## 3- Get All Orders

### GET:http://localhost:4000/api/order

#### Authorization (require authorization header):

       `Authorization: 'Bearer ' + Token`

## 4- Update Order

### PUT:http://localhost:4000/api/order/:id

#### Authorization (require authorization header):

       `Authorization: 'Bearer ' + Token`

##### Request Body Example

```json
{
  "order_statues": "complete",
  "products": [
    {
      "id": 3,
      "quantity": 66
    },
    {
      "id": 4,
      "quantity": 222
    }
  ]
}
```

## 5- Get Order

### DELETE:http://localhost:4000/api/order/:id

#### Authorization (require authorization header):

       `Authorization: 'Bearer ' + Token`

## 6- Add-NewProduct

### POST:http://localhost:4000/api/order/:id/Add-NewProduct

#### Authorization (require authorization header):

       `Authorization: 'Bearer ' + Token`

##### Request Body Example

```json
{
  "product_id": "3",
  "quantity": "400"
}
```
