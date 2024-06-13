CREATE OR ALTER PROCEDURE getCategoryProducts(@categoryId VARCHAR(255))
AS
BEGIN
    SELECT *
    FROM Products
    WHERE categoryId=@categoryId
END