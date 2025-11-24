import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";   // <-- import here
import studentRoutes from "./routes/students.js"; // example
import pool from "./db.js";  // your pg pool    

dotenv.config();

const app = express();        // <-- MUST come before app.use()

app.use(cors());
app.use(express.json());

// Register routes AFTER app is created
app.use("/api/auth", authRoutes);
app.use("/api/students", studentRoutes); // example

app.get("/", (req, res) => {
  res.send("API running...");
});

// Temporary route to initialize DB
app.get("/api/init-db", async (req, res) => {
  try {
    const sql = `
      CREATE TABLE IF NOT EXISTS student_performance (
          id SERIAL PRIMARY KEY,
          student_name VARCHAR(200),
          gender VARCHAR(20),
          ward VARCHAR(20),
          school_name VARCHAR(200),
          medium VARCHAR(50),
          student_class VARCHAR(10),
          reading_level VARCHAR(10),
          writing_level VARCHAR(10),
          numeracy_level VARCHAR(10),
          attendance VARCHAR(20)
      );
    `;
    await pool.query(sql);
    res.send("Database initialized successfully!");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error initializing DB: " + err.message);
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
