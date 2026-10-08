import mysql from "mysql2/promise";

const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: ""
});

await connection.query(`
    CREATE DATABASE IF NOT EXISTS AnterStore
`);

await connection.end();

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "AnterStore",
    waitForConnections: true,
    connectionLimit: 10
});

await pool.query(`
    CREATE TABLE IF NOT EXISTS Suppliers (
                                             SupplierID INT PRIMARY KEY AUTO_INCREMENT,
                                             SupplierName VARCHAR(100),
        ContactNumber VARCHAR(20)
        )
`);

await pool.query(`
    CREATE TABLE IF NOT EXISTS Products (
                                            ProductID INT PRIMARY KEY AUTO_INCREMENT,
                                            ProductName VARCHAR(100),
        Price DECIMAL(10,2),
        StockQuantity INT,
        SupplierID INT,

        FOREIGN KEY (SupplierID)
        REFERENCES Suppliers(SupplierID)
        )
`);

await pool.query(`
    CREATE TABLE IF NOT EXISTS Sales (
                                         SaleID INT PRIMARY KEY AUTO_INCREMENT,
                                         ProductID INT,

                                         QuantitySold INT,
                                         SaleDate DATE,

                                         FOREIGN KEY (ProductID)
        REFERENCES Products(ProductID)
        )
`);

console.log("Database connected");
console.log("Tables created");

export default pool;