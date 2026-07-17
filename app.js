require("dotenv").config();

const express = require("express");
const contactRoutes = require("./routes/contacts");
const swaggerRoutes = require("./routes/swagger");

const app = express();
const port = process.env.PORT || 3000;

const { initDb } = require("./data/database");

// Middleware
app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
    );
    res.setHeader(
        'Access-Control-Allow-Methods', 
        'GET, POST, PUT, DELETE, OPTIONS'
    );
    next();
});

app.use("/contacts", contactRoutes);

app.use("/", swaggerRoutes);

// Ruta de prueba
app.get("/", (req, res) => {
  res.send("Contacts API is running!");
});

initDb()
    .then(() => {
        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    })
    .catch((err) => {
        console.error("Database connection failed:", err);
    });

