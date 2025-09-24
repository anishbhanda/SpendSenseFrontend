import { useState } from "react";
import api from "./api";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await api.post("/auth/login", { email, password });
      alert(res.data.message);
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  const handleProfile = async () => {
    try {
      const res = await api.get("/auth/profile");
      console.log(res.data);
      alert("Profile loaded! Check console.");
    } catch (err) {
      alert("Not authorized");
    }
  };

  const handleLogout = async () => {
    await api.post("/auth/logout");
    alert("Logged out");
  };

  return (
    <div>
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      /><br/>
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      /><br/>
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleProfile}>Get Profile</button>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
