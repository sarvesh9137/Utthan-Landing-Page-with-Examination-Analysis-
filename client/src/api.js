const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api/students";

/* ------------------------------------------------------
   🔒 Safe Fetch Wrapper (Handles errors globally)
------------------------------------------------------ */
async function safeFetch(url, options = {}) {
  try {
    const res = await fetch(url, options);

    if (!res.ok) {
      console.error("❌ API Error:", url, res.status);
      return null;
    }

    return await res.json();
  } catch (err) {
    console.error("❌ Network error ->", url, err.message);
    return null;
  }
}

/* ------------------------------------------------------
   1️⃣ FETCH STUDENTS (Pagination + Filters)
------------------------------------------------------ */
export async function getStudents(params = {}) {
  const query = new URLSearchParams(params).toString();
  const res = await safeFetch(`${API}?${query}`);

  if (!res || typeof res !== "object") {
    return {
      page: 1,
      limit: params.limit || 10,
      total: 0,
      totalPages: 1,
      data: [],
    };
  }

  return {
    page: res.page ?? 1,
    limit: res.limit ?? (params.limit || 10),
    total: res.total ?? 0,
    totalPages: res.totalPages ?? 1,
    data: Array.isArray(res.data) ? res.data : [],
  };
}

/* ------------------------------------------------------
   2️⃣ LEVEL DISTRIBUTION (L0-L5)
------------------------------------------------------ */
export async function getLevels(subject, params = {}) {
  const query = new URLSearchParams(params).toString();
  const data = await safeFetch(`${API}/levels/${subject}?${query}`);
  return Array.isArray(data) ? data : [];
}

/* ------------------------------------------------------
   3️⃣ CATEGORY BREAKDOWN (Needs Improvement / Developing / Mainstream)
------------------------------------------------------ */
export async function getCategories(subject) {
  const data = await safeFetch(`${API}/categories/${subject}`);
  return Array.isArray(data) ? data : [];
}

/* ------------------------------------------------------
   4️⃣ WARD-WISE AVERAGE (If implemented in backend)
------------------------------------------------------ */
export async function getWardAverage(subject) {
  const data = await safeFetch(`${API}/ward-average/${subject}`);
  return Array.isArray(data) ? data : [];
}

/* ------------------------------------------------------
   5️⃣ WARD-WISE ATTENDANCE TABLE
------------------------------------------------------ */
export async function getWardAttendance() {
  const data = await safeFetch(`${API}/ward-attendance`);
  return Array.isArray(data) ? data : [];
}

/* ------------------------------------------------------
   6️⃣ SUBJECT TOTALS (Correct present-student totals)
------------------------------------------------------ */
export async function getSubjectTotals() {
  const data = await safeFetch(`${API}/subject-totals`);
  return data || { reading: 0, writing: 0, numeracy: 0 };
}

/* ------------------------------------------------------
   8️⃣ CLASS-WISE ATTENDANCE
------------------------------------------------------ */
export async function getClassAttendance() {
  const data = await safeFetch(`${API}/class-attendance`);
  return Array.isArray(data) ? data : [];
}

/* ------------------------------------------------------
   9️⃣ LOGIN ENDPOINT
------------------------------------------------------ */
export async function login(credentials) {
  return safeFetch("http://localhost:5000/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });
}
