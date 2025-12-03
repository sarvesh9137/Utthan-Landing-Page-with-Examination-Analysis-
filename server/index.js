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

// Request Logger
app.use((req, res, next) => {
  console.log(`📢 [${req.method}] ${req.url}`);
  next();
});

// Register routes AFTER app is created
app.use("/api/auth", authRoutes);
app.use("/api/students", studentRoutes); // example

app.get("/", (req, res) => {
  res.send("API running...");
});

const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

export default app;
