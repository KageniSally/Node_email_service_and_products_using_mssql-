CREATE OR ALTER PROCEDURE addCategory(@id VARCHAR(255),
@categoryName VARCHAR(255),
@categoryDescription VARCHAR(255))
AS 
BEGIN
INSERT INTO Categories VALUES(@id,@categoryName,@categoryDescription)
END