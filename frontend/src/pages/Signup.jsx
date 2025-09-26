import React, { useState } from "react";

export default function Signup({ onSignup }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if (!name || !email || !password) return;
    
    setLoading(true);
    try {
      // Simulating API calls for demo
      await new Promise(resolve => setTimeout(resolve, 1000)); // signup
      await new Promise(resolve => setTimeout(resolve, 500));  // login
      onSignup?.("mock-token");
    } catch (err) {
      alert("Error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSignup();
  };

  return (
    <div className="signup-page">
      <style>{`
        .signup-page {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background: linear-gradient(135deg, #f093fb 0%, #f5576c 50%, #4facfe 100%);
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          padding: 20px;
          box-sizing: border-box;
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
        }

        .signup-container {
          width: 380px;
          max-width: 100%;
          padding: 40px;
          border-radius: 16px;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.1), 0 0 0 1px rgba(255,255,255,0.2);
          text-align: center;
        }

        .signup-container h2 {
          margin-bottom: 28px;
          color: #2c3e50;
          font-size: 32px;
          font-weight: 700;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .signup-container input {
          width: 100%;
          padding: 16px 20px;
          margin: 12px 0;
          border: 2px solid transparent;
          border-radius: 12px;
          font-size: 15px;
          background: rgba(255,255,255,0.8);
          transition: all 0.3s ease;
          box-sizing: border-box;
        }

        .signup-container input:focus {
          outline: none;
          border-color: #667eea;
          background: white;
          transform: translateY(-3px);
          box-shadow: 0 8px 25px rgba(102, 126, 234, 0.15);
        }

        .signup-container input::placeholder {
          color: #7f8c8d;
          font-weight: 400;
        }

        .signup-container button {
          width: 100%;
          padding: 16px;
          margin-top: 24px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          border-radius: 12px;
          cursor: pointer;
          font-size: 17px;
          font-weight: 600;
          transition: all 0.3s ease;
          opacity: ${loading ? '0.8' : '1'};
        }

        .signup-container button:hover:not(:disabled) {
          transform: translateY(-3px);
          box-shadow: 0 12px 30px rgba(102, 126, 234, 0.4);
        }

        .signup-container button:disabled {
          cursor: not-allowed;
        }

        .signup-container p {
          margin-top: 24px;
          font-size: 15px;
          color: #5a6c7d;
        }

        .signup-container a {
          color: #667eea;
          text-decoration: none;
          font-weight: 600;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .signup-container a:hover {
          color: #764ba2;
          text-decoration: none;
        }
      `}</style>

      <div className="signup-container">
        <h2>Create Account</h2>
        <input
          placeholder="Full Name"
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <input
          placeholder="Email Address"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <input
          type="password"
          placeholder="Create Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button 
          onClick={handleSignup}
          disabled={loading || !name || !email || !password}
        >
          {loading ? 'Creating Account...' : 'Create Account'}
        </button>
        <p>
          Already have an account? <a href="/login">Sign in here</a>
        </p>
      </div>
    </div>
  );
}