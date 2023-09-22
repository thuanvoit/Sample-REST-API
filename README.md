# Electronic Items Management

Please copy this markdown and use [markdownlivepreview.com](https://markdownlivepreview.com) to view it.

## Software Requirements

- NodeJS
- Postman
- Installed NPM Packages: `express, Joi, fs`

## How to run

1. Install [NodeJS](https://nodejs.org/en/download)
2. Go to the NodeJS app folder. Run the following command on Unix/Linux shell/Windows Powershell:

```
node script.js
```

3. This will run on `localhost`, port `8080`

Example:

![run](https://i.imgur.com/82h85c9.png)

> On Windows, you need to run Powershell as Administrator.

## How to send request

1. Open Postman desktop application.
2. Create a new HTTP.
3. Set the METHOD to the desired request method.
4. Put the URL to the desired API url.
5. Press SEND button to run.

Example:

![postman](https://i.imgur.com/8IEBZjW.png)

## Features

### Display the list of all products

1. In Postman, set METHOD to `GET`
2. Set URL to:

   ```
   localhost:8080/api/products
   ```

3. Click SEND button
4. **This will return a JSON of products, each product has id, name, and quantity.**

Example:

![getall](https://imgur.com/iv6VKtb.png)

### Display the information of a specific product when the request contains an ID

1. In Postman, set METHOD to `GET`
2. Set URL to:

   ```
   localhost:8080/api/products/PRODUCT_ID
   ```

    where the `PRODUCT_ID` is the product ID you're looking for.

3. Click SEND button
4. **This will return an information of the product ID you're looking for (inlude product id, name, and quantity)**

Example:

![getid](https://i.imgur.com/p7PGxWE.png)


### Create a new product with information

1. In Postman, set METHOD to `POST`
2. Set URL to
    `localhost:8080/api/products`
3. Select the `Body` tab under the URL.
4. Fill the text box with the new product information:

    ``` json
    {
        "name": "PRODUCT_NAME",
        "quantity": PRODUCT_QUANTITY
    }
    ```
    where `PRODUCT_NAME` is a string, in double-quote, must at least 2 characters; and `PRODUCT_QUANTITY` is an integer number.

5. **This will return the information of product you just added with a new assigned `ID`**

Example:

![postid](https://i.imgur.com/wvrxxSX.png)


### Update the details of an existing product

1. In Postman, set METHOD to `PUT`
2. Set URL to
    `localhost:8080/api/products/PRODUCT_ID`
3. Select the `Body` tab under the URL.
4. Fill the text box with the new product information:

    ``` json
    {
        "name": "NEW_PRODUCT_NAME",
        "quantity": NEW_PRODUCT_QUANTITY
    }
    ```
    where `PRODUCT_NAME` is a string, in double-quote,
    and `PRODUCT_QUANTITY` is an integer number.

    If `NEW_PRODUCT_NAME` is `NA` or `na`, the `PRODUCT_NAME` will not be modified.

    If `NEW_PRODUCT_QUANTITY` is `-1`, the `PRODUCT_QUANTITY` will not be modified.

5. **This will return the information of product you just modified with an `ID`**

Example:

![putid](https://i.imgur.com/j73YmAA.png)


### Delete a product from the database

1. In Postman, set METHOD to `DELETE`
2. Set URL to:

   ```
   localhost:8080/api/products/PRODUCT_ID
   ```

    where the `PRODUCT_ID` is the product ID you're deleting.

3. Click SEND button
4. **This will return an information of the product ID you deleted.**

Example:

![deleteid](https://i.imgur.com/7sUiv1r.png)