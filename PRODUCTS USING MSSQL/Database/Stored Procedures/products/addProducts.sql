CREATE OR ALTER PROCEDURE addProduct(@id VARCHAR(255),
@productName VARCHAR(255),
@productDescription VARCHAR(255), 
@productPrice VARCHAR(255),
@categoryId VARCHAR(255))
AS 
BEGIN 
INSERT INTO Products(id,productName,productDescription,productPrice,categoryId) 
VALUES(@id,@productName,@productDescription,@productPrice,@categoryId)
END