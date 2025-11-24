import express from "express";
import pool from "../db.js";

const router = express.Router();

/* ============================================================
   1️⃣  Get Students (Pagination + Filters)
   ============================================================ */
router.get("/", async (req, res) => {
  try {
    const {
      student_name = "",
      ward = "",
      school_name = "",
      medium = "",
      class: studentClass = "",
      page = 1,
      limit = 20,
    } = req.query;

    console.log("📌 Incoming Filters:", req.query);

    const pageNum = Math.max(parseInt(page) || 1, 1);
    const limitNum = Math.max(parseInt(limit) || 20, 1);
    const offset = (pageNum - 1) * limitNum;

    const filters = [];
    const values = [];
    let idx = 1;

    // STUDENT NAME
    if (student_name) {
      filters.push(`student_name ILIKE $${idx++}`);
      values.push(`%${student_name}%`);
    }

    // WARD
    if (ward) {
      filters.push(`ward ILIKE $${idx++}`);
      values.push(`%${ward}%`);
    }

    // SCHOOL NAME
    if (school_name) {
      filters.push(`school_name ILIKE $${idx++}`);
      values.push(`%${school_name}%`);
    }

    // MEDIUM
    if (medium) {
      filters.push(`medium ILIKE $${idx++}`);
      values.push(`%${medium}%`);
    }

    // CLASS (SQL FIX – MUST USE QUOTES)
    if (studentClass) {
      filters.push(`"class" ILIKE $${idx++}`);
      values.push(`%${studentClass}%`);
    }

    const whereClause = filters.length ? `WHERE ${filters.join(" AND ")}` : "";
    console.log("📌 WHERE Clause:", whereClause);
    console.log("📌 Values:", values);

    const query = `
      SELECT 
        id, 
        student_name, 
        gender, 
        ward, 
        school_name, 
        medium,
        "class" AS student_class,
        reading_level, 
        writing_level, 
        numeracy_level, 
        attendance
      FROM student_performance
      ${whereClause}
      ORDER BY id
      LIMIT $${idx++} OFFSET $${idx++};
    `;

    const result = await pool.query(query, [...values, limitNum, offset]);

    const countQuery = `
      SELECT COUNT(*) 
      FROM student_performance
      ${whereClause};
    `;

    const totalCount = await pool.query(countQuery, values);
    const total = Number(totalCount.rows[0].count);

    res.json({
      page: pageNum,
      limit: limitNum,
      total,
      totalPages: Math.ceil(total / limitNum),
      data: result.rows,
    });

  } catch (err) {
    console.error("❌ Error fetching students:", err.message);
    res.status(500).send("Server Error");
  }
});

/* ============================================================
   2️⃣ Level Distribution (L0–L5 Only)
   ============================================================ */
router.get("/levels/:subject", async (req, res) => {
  const subject = req.params.subject.toLowerCase();
  const valid = ["reading", "writing", "numeracy"];
  const { class: studentClass, ward } = req.query;

  if (!valid.includes(subject))
    return res.status(400).json({ error: "Invalid subject" });

  const col = `${subject}_level`;

  try {
    const params = [];
    let pIdx = 1;

    // Conditions for the main query (numerator) - specific levels only
    let filterConditions = [`${col} IN ('L0','L1','L2','L3','L4','L5')`, "attendance = 'Present'"];

    // Conditions for the denominator - all students with valid levels (to ensure 100% sum)
    let baseConditions = [`${col} IN ('L0','L1','L2','L3','L4','L5')`, "attendance = 'Present'"];

    if (studentClass) {
      filterConditions.push(`"class" = $${pIdx}`);
      baseConditions.push(`"class" = $${pIdx}`);
      params.push(studentClass);
      pIdx++;
    }

    if (ward) {
      filterConditions.push(`ward = $${pIdx}`);
      baseConditions.push(`ward = $${pIdx}`);
      params.push(ward);
      pIdx++;
    }

    const mainWhere = filterConditions.join(" AND ");
    const denomWhere = baseConditions.join(" AND ");

    const sql = `
      SELECT ${col} AS level,
             COUNT(*) AS total_students,
             ROUND(
               COUNT(*)::decimal * 100 /
               NULLIF((SELECT COUNT(*) FROM student_performance WHERE ${denomWhere}), 0),
               2
             ) AS percentage
      FROM student_performance
      WHERE ${mainWhere}
      GROUP BY ${col}
      ORDER BY ${col};
    `;

    const result = await pool.query(sql, params);
    res.json(result.rows);

  } catch (err) {
    console.error("❌ Error in level distribution:", err.message);
    res.status(500).send("Server Error");
  }
});

/* ============================================================
   3️⃣ Category Breakdown
   ============================================================ */
router.get("/categories/:subject", async (req, res) => {
  const subject = req.params.subject.toLowerCase();
  const valid = ["reading", "writing", "numeracy"];

  if (!valid.includes(subject))
    return res.status(400).json({ error: "Invalid subject" });

  const col = `${subject}_level`;

  try {
    const query = `
    SELECT
    CASE
          WHEN ${col} IN('L0', 'L1', 'L2') THEN 'Needs Improvement'
          WHEN ${col} IN('L3', 'L4') THEN 'Developing Stage'
          WHEN ${col} = 'L5' THEN 'Mainstream'
        END AS category,
      COUNT(*) AS total_students,
        ROUND(
          COUNT(*):: decimal * 100 /
        (SELECT COUNT(*) FROM student_performance WHERE attendance = 'Present'),
        2
        ) AS percentage
      FROM student_performance
      WHERE ${col} IN('L0', 'L1', 'L2', 'L3', 'L4', 'L5')
      AND attendance = 'Present'
      GROUP BY category
      ORDER BY category;
`;

    const result = await pool.query(query);
    res.json(result.rows);
  } catch (err) {
    console.error("❌ Error in category breakdown:", err.message);
    res.status(500).send("Server Error");
  }
});

/* ============================================================
   4️⃣ Ward-wise Average Levels
   ============================================================ */
router.get("/ward-average/:subject", async (req, res) => {
  const subject = req.params.subject.toLowerCase();
  const valid = ["reading", "writing", "numeracy"];

  if (!valid.includes(subject))
    return res.status(400).json({ error: "Invalid subject" });

  const col = `${subject} _level`;

  try {
    const query = `
      SELECT ward,
  COUNT(*) AS total_students,
    ROUND(
      AVG(
        CASE ${col}
                   WHEN 'L0' THEN 0
                   WHEN 'L1' THEN 1
                   WHEN 'L2' THEN 2
                   WHEN 'L3' THEN 3
                   WHEN 'L4' THEN 4
                   WHEN 'L5' THEN 5
                 END
      ), 2
    ) AS avg_level
      FROM student_performance
      WHERE ${col} IN('L0', 'L1', 'L2', 'L3', 'L4', 'L5')
      AND attendance = 'Present'
      GROUP BY ward
      ORDER BY ward;
`;

    const result = await pool.query(query);
    res.json(result.rows);
  } catch (err) {
    console.error("❌ Error in ward average:", err.message);
    res.status(500).send("Server Error");
  }
});

/* ============================================================
   5️⃣ Ward Attendance
   ============================================================ */
router.get("/ward-attendance", async (req, res) => {
  try {
    const query = `
      SELECT ward, total_students, present, absent, long_absent
      FROM ward_attendance
      ORDER BY ward ASC;
`;
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (err) {
    console.error("❌ Error fetching ward attendance:", err.message);
    res.status(500).send("Server Error");
  }
});

/* ============================================================
   6️⃣ Subject Totals
   ============================================================ */
router.get("/subject-totals", async (req, res) => {
  try {
    const query = `
SELECT
  (SELECT COUNT(*) FROM student_performance WHERE attendance = 'Present' AND reading_level IS NOT NULL) AS reading,
    (SELECT COUNT(*) FROM student_performance WHERE attendance = 'Present' AND writing_level IS NOT NULL) AS writing,
      (SELECT COUNT(*) FROM student_performance WHERE attendance = 'Present' AND numeracy_level IS NOT NULL) AS numeracy
        `;

    const result = await pool.query(query);
    res.json({
      reading: Number(result.rows[0].reading),
      writing: Number(result.rows[0].writing),
      numeracy: Number(result.rows[0].numeracy),
    });
  } catch (err) {
    console.error("❌ Error fetching subject totals:", err.message);
    res.status(500).send("Server Error");
  }
});

/* ============================================================
   7️⃣ Class Attendance Summary
   ============================================================ */
router.get("/class-attendance", async (req, res) => {
  try {
    const query = `
      SELECT "class",
  COUNT(*) AS total_students,
    SUM(CASE WHEN attendance = 'Present' THEN 1 ELSE 0 END) AS present,
      SUM(CASE WHEN attendance = 'Absent' THEN 1 ELSE 0 END) AS absent,
        SUM(CASE WHEN attendance = 'Long Absent' THEN 1 ELSE 0 END) AS long_absent
      FROM student_performance
      WHERE "class" IS NOT NULL
      GROUP BY "class"
      ORDER BY "class" ASC;
`;

    const result = await pool.query(query);
    res.json(result.rows);
  } catch (err) {
    console.error("❌ Error fetching class attendance:", err.message);
    res.status(500).send("Server Error");
  }
});

export default router;
