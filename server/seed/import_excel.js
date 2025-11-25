import fs from 'fs';
import { parse } from 'csv-parse/sync';
import pkg from 'pg';
import dotenv from 'dotenv';

dotenv.config();
const { Pool } = pkg;

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false,
});

async function seedDatabase() {
    try {
        console.log('🚀 Starting database seeding...');

        // Step 1: Create tables
        console.log('📋 Creating tables...');
        const createTableSQL = fs.readFileSync('./sql/create_table.sql', 'utf-8');
        await pool.query(createTableSQL);
        console.log('✅ Tables created successfully');

        // Step 2: Read and parse CSV
        console.log('📂 Reading CSV file...');
        const csvContent = fs.readFileSync('./master_data.csv', 'utf-8');
        const records = parse(csvContent, {
            columns: true,
            skip_empty_lines: true,
            trim: true,
        });
        console.log(`📊 Found ${records.length} student records`);

        // Step 3: Insert student data in batches
        console.log('💾 Inserting student data...');
        const batchSize = 500;
        for (let i = 0; i < records.length; i += batchSize) {
            const batch = records.slice(i, i + batchSize);
            const values = batch.map(r => `(
        '${r.student_name?.replace(/'/g, "''")}',
        '${r.gender}',
        '${r.ward}',
        '${r.school_name?.replace(/'/g, "''")}',
        '${r.medium}',
        '${r.class || ''}',
        '${r.reading_level}',
        '${r.writing_level}',
        '${r.numeracy_level}',
        '${r.attendance || 'Present'}'
      )`).join(',');

            await pool.query(`
        INSERT INTO student_performance 
        (student_name, gender, ward, school_name, medium, "class", reading_level, writing_level, numeracy_level, attendance)
        VALUES ${values}
      `);
            console.log(`  ✓ Inserted batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(records.length / batchSize)}`);
        }

        // Step 4: Populate ward_attendance table
        console.log('📊 Calculating ward attendance...');
        await pool.query(`
      INSERT INTO ward_attendance (ward, total_students, present, absent, long_absent)
      SELECT 
        ward,
        COUNT(*) as total_students,
        SUM(CASE WHEN attendance = 'Present' THEN 1 ELSE 0 END) as present,
        SUM(CASE WHEN attendance = 'Absent' THEN 1 ELSE 0 END) as absent,
        SUM(CASE WHEN attendance = 'Long Absent' THEN 1 ELSE 0 END) as long_absent
      FROM student_performance
      GROUP BY ward
      ON CONFLICT (ward) DO UPDATE SET
        total_students = EXCLUDED.total_students,
        present = EXCLUDED.present,
        absent = EXCLUDED.absent,
        long_absent = EXCLUDED.long_absent;
    `);
        console.log('✅ Ward attendance calculated');

        // Step 5: Verify data
        const countResult = await pool.query('SELECT COUNT(*) FROM student_performance');
        const wardCountResult = await pool.query('SELECT COUNT(*) FROM ward_attendance');

        console.log('\n🎉 Seeding completed successfully!');
        console.log(`   📌 Total students: ${countResult.rows[0].count}`);
        console.log(`   📌 Total wards: ${wardCountResult.rows[0].count}`);

    } catch (error) {
        console.error('❌ Error seeding database:', error.message);
        process.exit(1);
    } finally {
        await pool.end();
    }
}

seedDatabase();
