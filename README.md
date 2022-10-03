
# BE Challenge Solution

## Installing dependencies

Run `npm install` in the root directory.

## Setup

  - Create an empty MySql database.
  - Update database configurations in ".env" file placed at project root.

## Execute

Run `npm run dev` in project root to start the server. Server will be listening on port specified in the ".env" file.

## Test

Add 2 or 3 dummy products in the products table.

Make the request with following format

`POST localhost:<port>/orders`

#### Body

```
{
  "items": [
    {"product_id": 1, "quantity": 5},
    {"product_id": 2, "quantity": 15}
  ],
  "cardNo": "12312312312",
  "expiryDate": "12/12",
  "cvc": 123
}
```

#### Header for maintaining idempotence

Send a header named `x-idempotence-key` along the request with some UUID to maintain idempotence.