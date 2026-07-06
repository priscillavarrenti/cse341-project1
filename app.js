require("dotenv").config();

const express = require("express");
const contactRoutes = require("./routes/contacts");

const app = express();
const port = process.env.PORT || 3000;

const { initDb } = require("./data/database");

// Middleware
app.use(express.json());

app.use("/contacts", contactRoutes);

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