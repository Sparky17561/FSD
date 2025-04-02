import React, { useState, useEffect, useRef } from "react";
import { useUser } from "@clerk/clerk-react";
import gsap from "gsap";
import "./UserForm.css";

const UserForm = () => {
  const { user } = useUser();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [groqApiKey, setGroqApiKey] = useState("");
  const [responseMsg, setResponseMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const formRef = useRef(null);

  useEffect(() => {
    gsap.to(formRef.current, { opacity: 1, y: 0, duration: 1, ease: "power3.out" });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user || !user.id) {
      setResponseMsg("User not authenticated.");
      return;
    }
    setLoading(true);
    const userData = { clerkId: user.id, email, name, groqApiKey };
    try {
      const response = await fetch("http://localhost:5000/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });
      const resData = await response.json();
      if (response.ok) {
        setResponseMsg("✅ User created successfully!");
        gsap.fromTo(".response-msg", { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5 });
      } else {
        setResponseMsg(`❌ Error: ${resData.error}`);
      }
    } catch (error) {
      setResponseMsg("❌ Network error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-wrapper">
      <div ref={formRef} className="form-container">
        <h2>Create Your Account</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>

          <div className="input-group">
            <label>Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>

          <div className="input-group">
            <label>Groq API Key</label>
            <input type="text" value={groqApiKey} onChange={(e) => setGroqApiKey(e.target.value)} required />
          </div>

          <button type="submit" className="submit-btn">
            {loading ? "Submitting..." : "Create Account"}
          </button>
        </form>

        {responseMsg && <p className="response-msg">{responseMsg}</p>}
      </div>
    </div>
  );
};

export default UserForm;
