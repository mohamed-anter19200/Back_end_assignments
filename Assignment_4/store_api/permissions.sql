CREATE USER 'store_manager'@'localhost' IDENTIFIED BY 'Store@123';

GRANT SELECT, INSERT, UPDATE
ON AnterStore.* TO 'store_manager'@'localhost';

REVOKE UPDATE
    ON AnterStore.*
    FROM 'store_manager'@'localhost';
GRANT DELETE
ON AnterStore.Sales
TO 'store_manager'@'localhost';

SHOW GRANTS FOR 'store_manager'@'localhost';