CREATE OR ALTER PROCEDURE updateProduct(@id VARCHAR(255),
    @productName VARCHAR (255),
    @productPrice VARCHAR (255),
    @productDescription VARCHAR(255),
    @categoryId VARCHAR(255))
AS
BEGIN
    UPDATE Products SET productName=@productName,productPrice=@productPrice,productDescription=@productDescription,categoryId=@categoryId
WHERE id=@id
END