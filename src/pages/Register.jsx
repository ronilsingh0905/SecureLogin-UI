import { useState } from "react";
import { Link } from "react-router-dom";

const API_BASE = "https://securelogin-production.up.railway.app";

function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("REGISTER CLICKED");

    try {
      console.log("SENDING REQUEST...");

      const res = await fetch(`${API_BASE}/api/v1/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      console.log("RESPONSE RECEIVED:", res.status);

      const data = await res.json();
      console.log("DATA:", data);

      if (!res.ok) {
        throw new Error(data?.error || "Registration failed");
      }

      localStorage.setItem("token", data.token);

      console.log("SUCCESS");
      alert("Registration successful");

    } catch (err) {
      console.error("ERROR:", err);
      alert(err.message);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Register</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Name"
          onChange={handleChange}
          required
        />
        <br /><br />

        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <br /><br />

        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />
        <br /><br />

        <button type="submit">Register</button>
      </form>

      <p style={{ marginTop: "10px" }}>
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </div>
  );
}

export default Register;