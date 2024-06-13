USE Shop;

CREATE TABLE Products
(
    id VARCHAR(255) PRIMARY KEY,
    productName VARCHAR(255),
    productPrice INT,
    productDescription VARCHAR(255),
    categoryId VARCHAR (255) FOREIGN KEY REFERENCES Categories(id)
);