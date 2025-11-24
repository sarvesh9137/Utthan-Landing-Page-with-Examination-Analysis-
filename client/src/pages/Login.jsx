// Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const nav = useNavigate();

  async function submit(e) {
    e.preventDefault();
    setErr("");
    try {
      const res = await login(username, password);
      if (res.token) {
        localStorage.setItem("auth_token", res.token);
        nav("/examination");
      } else {
        setErr(res.error || "Login failed");
      }
    } catch (err) {
      setErr("Login error");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 pt-20 transition-colors duration-300">
      <form onSubmit={submit} className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-xl w-full max-w-md border dark:border-slate-700 transition-colors duration-300">
        <h2 className="text-2xl font-bold mb-4 dark:text-white">Sign in</h2>
        <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" className="w-full p-3 border dark:border-slate-600 rounded mb-3 dark:bg-slate-700 dark:text-white focus:ring-2 focus:ring-indigo-500 transition-colors duration-300" />
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" className="w-full p-3 border dark:border-slate-600 rounded mb-3 dark:bg-slate-700 dark:text-white focus:ring-2 focus:ring-indigo-500 transition-colors duration-300" />
        {err && <div className="text-red-600 dark:text-red-400 mb-2">{err}</div>}
        <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded transition-colors duration-300">Sign in</button>
      </form>
    </div>
  );
}
