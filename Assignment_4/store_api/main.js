import express from "express";
import pool from "./db/db.js";

const app = express();

app.use(express.json());

 app.post("/products", async (req, res) => {
    try {
        const {ProductName, Price, StockQuantity, SupplierID} = req.body;
        const [result] = await pool.query(`INSERT INTO Products (ProductName, Price, StockQuantity, SupplierID)
         VALUES (?, ?, ?, ?)`, [ProductName, Price, StockQuantity, SupplierID]
        );
        res.status(201).json({
            message: "Product created successfully",
            ProductID: result.insertId
        });
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});
// Get All Products
app.get("/products", async (req, res) => {
    try {
        const [products] = await pool.query(`SELECT * FROM Products`);
        res.json(products);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

app.get("/products/:id", async (req, res) => {
    try {
        const [products] = await pool.query(`SELECT * FROM Products WHERE ProductID = ?`, [req.params.id]);
        if (products.length === 0) {
            return res.status(404).json({
                message: "Product not found"
            });
        }
        res.json(products[0]);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

app.put("/products/:id", async (req, res) => {
    try {
        const {ProductName, Price, StockQuantity, SupplierID} = req.body;
        const [result] = await pool.query(
            `UPDATE Products SET
                ProductName = ?,
                Price = ?,
                StockQuantity = ?,
                SupplierID = ?
            WHERE ProductID = ?
            `,
            [ProductName, Price, StockQuantity, SupplierID, req.params.id]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Product not found"
            });
        }
        res.json({message: "Product updated successfully"});
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

app.delete("/products/:id", async (req, res) => {
    try {
        const [result] = await pool.query(`
            DELETE FROM Products
            WHERE ProductID = ?
            `,
            [req.params.id]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Product not found"
            });
        }
        res.json({message: "Product deleted successfully"});
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

app.post("/suppliers", async (req, res) => {
    try {
        const {SupplierName, ContactNumber} = req.body;
        const [result] = await pool.query(`
                INSERT INTO Suppliers
                    (SupplierName, ContactNumber)
                VALUES (?, ?)
            `,
            [SupplierName, ContactNumber]
        );
        res.status(201).json({
            message: "Supplier created successfully",
            SupplierID: result.insertId
        });
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

app.get("/suppliers", async (req, res) => {
    try {
        const [suppliers] = await pool.query(`SELECT * FROM Suppliers`);
        res.json(suppliers);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

app.put("/suppliers/:id", async (req, res) => {
    try {
        const {SupplierName, ContactNumber} = req.body;
        const [result] = await pool.query(`
            UPDATE Suppliers SET SupplierName = ?, ContactNumber = ? WHERE SupplierID = ?`,
            [ SupplierName, ContactNumber, req.params.id ]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Supplier not found"
            });
        }
        res.json({
            message: "Supplier updated successfully"
        });
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

app.delete("/suppliers/:id", async (req, res) => {
    try {
        const [result] = await pool.query(` DELETE FROM Suppliers WHERE SupplierID = ?`, [req.params.id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Supplier not found"
            });
        }
        res.json({
            message: "Supplier deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            error: error.message
        });

    }
});

app.post("/sales", async (req, res) => {
    try {
        const {ProductID, QuantitySold, SaleDate} = req.body;
        const [result] = await pool.query(`
                INSERT INTO Sales
                    (ProductID, QuantitySold, SaleDate)
                VALUES (?, ?, ?)
            `,
            [ProductID, QuantitySold, SaleDate]
        );
        res.status(201).json({
            message: "Sale recorded successfully",
            SaleID: result.insertId
        });
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

app.get("/sales", async (req, res) => {
    try {
        const [sales] = await pool.query(`SELECT * FROM Sales`);
        res.json(sales);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

app.get("/sales/product/:id", async (req, res) => {
    try {
        const [sales] = await pool.query(`SELECT * FROM SalesWHERE ProductID = ?`, [req.params.id]);
        res.json(sales);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

app.post("/add-category", async (req, res) => {
    try {
        await pool.query(` ALTER TABLE Products ADD COLUMN Category VARCHAR(100)`);
        res.json({message: "Category added successfully"});
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

app.delete("/remove-category", async (req, res) => {
    try {
        await pool.query(`ALTER TABLE ProductsDROP COLUMN Category`);
        res.json({message: "gategory removed successfully"});
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

app.get("/reports/highest-stock", async (req, res) => {
    try {
        const [result] = await pool.query(` SELECT * FROM Products ORDER BY StockQuantity DESCLIMIT 1`);
        res.json(result);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

app.get("/reports/suppliers-f", async (req, res) => {
    try {
        const [result] = await pool.query(` SELECT * FROM Suppliers WHERE SupplierName LIKE 'F%'`);
        res.json(result);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

app.get("/reports/never-sold", async (req, res) => {

    try {

        const [result] = await pool.query(`
            SELECT p.*
            FROM Products p

                     LEFT JOIN Sales s
                               ON p.ProductID = s.ProductID

            WHERE s.ProductID IS NULL
        `);

        res.json(result);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

});

app.get("/reports/sales-details", async (req, res) => {

    try {

        const [result] = await pool.query(`
            SELECT
                p.ProductName,
                s.QuantitySold,
                s.SaleDate

            FROM Sales s

                     INNER JOIN Products p
                                ON s.ProductID = p.ProductID
        `);

        res.json(result);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

});



app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});