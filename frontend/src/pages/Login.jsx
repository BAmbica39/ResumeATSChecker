import React, { useState } from "react";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) return;
    
    setLoading(true);
    try {
      // Simulating API call for demo
      await new Promise(resolve => setTimeout(resolve, 1000));
      onLogin?.("mock-token");
    } catch (err) {
      alert("Error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleLogin();
  };

  return (
    <div className="login-page">
      <style>{`
        .login-page {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          padding: 20px;
          box-sizing: border-box;
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
        }

        .login-container {
          width: 320px;
          max-width: 100%;
          padding: 32px;
          border-radius: 12px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          box-shadow: 0 10px 25px rgba(0,0,0,0.2);
          text-align: center;
        }

        .login-container h2 {
          margin-bottom: 24px;
          color: white;
          font-weight: 600;
          font-size: 28px;
        }

        .login-container input {
          width: 100%;
          padding: 14px 16px;
          margin: 10px 0;
          border: none;
          border-radius: 8px;
          font-size: 15px;
          background: rgba(255,255,255,0.9);
          transition: all 0.3s ease;
          box-sizing: border-box;
        }

        .login-container input:focus {
          outline: none;
          background: white;
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
        }

        .login-container input::placeholder {
          color: #888;
        }

        .login-container button {
          width: 100%;
          padding: 14px;
          margin-top: 20px;
          background: linear-gradient(135deg, #ff6b6b, #ee5a24);
          color: white;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-size: 16px;
          font-weight: 600;
          transition: all 0.3s ease;
          opacity: ${loading ? '0.7' : '1'};
        }

        .login-container button:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(238, 90, 36, 0.4);
        }

        .login-container button:disabled {
          cursor: not-allowed;
        }

        .login-container p {
          margin-top: 20px;
          font-size: 14px;
          color: rgba(255,255,255,0.8);
        }

        .login-container a {
          color: #ffeaa7;
          text-decoration: none;
          font-weight: 500;
          transition: color 0.3s ease;
          cursor: pointer;
        }

        .login-container a:hover {
          color: white;
        }
      `}</style>

      <div className="login-container">
        <h2>Welcome Back</h2>
        <input
          placeholder="Email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button 
          onClick={handleLogin}
          disabled={loading || !email || !password}
        >
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
        <p>
          Don't have an account? <a href="/signup">Create one</a>
        </p>
      </div>
    </div>
  );
}