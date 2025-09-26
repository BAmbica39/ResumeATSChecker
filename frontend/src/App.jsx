import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import api from "./services/api";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [file, setFile] = useState(null);
  const [candidates, setCandidates] = useState([]);

  const handleSetToken = (newToken) => {
    setToken(newToken);
    localStorage.setItem("token", newToken);
  };

  const handleUpload = async () => {
    if (!file) return alert("Please select a file");
    const formData = new FormData();
    formData.append("file", file);

    try {
      await api.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token}`,
        },
      });
      fetchCandidates();
    } catch (err) {
      alert(err.response?.data?.message || "Upload failed");
    }
  };

  const fetchCandidates = async () => {
    try {
      const res = await api.get("/upload", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCandidates(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (token) fetchCandidates();
  }, [token]);

  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={!token ? <Login onLogin={handleSetToken} /> : <Navigate to="/" />} />
        <Route path="/signup" element={!token ? <Signup onSignup={handleSetToken} /> : <Navigate to="/" />} />

        {/* Protected home route */}
        <Route
          path="/"
          element={
            token ? (
              <div style={{ 
                minHeight: "100vh", 
                width:"100%",
                display: "flex", 
                flexDirection: "column", 
                alignItems: "center", 
                justifyContent: "flex-start", 
                padding: "40px 20px",
                backgroundColor: "#f5f5f5",
                fontFamily: "Arial, sans-serif"
              }}>
                <div style={{
                  maxWidth: "1200px",
                  width: "100%",
                  backgroundColor: "white",
                  borderRadius: "10px",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  padding: "30px"
                }}>
                  <h2 style={{
                    textAlign: "center",
                    color: "#333",
                    marginBottom: "30px",
                    fontSize: "28px",
                    fontWeight: "bold"
                  }}>Resume ATS Checker</h2>

                  <div style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    marginBottom: "40px"
                  }}>
                    <input 
                      type="file" 
                      accept="application/pdf" 
                      onChange={(e) => setFile(e.target.files[0])}
                      style={{
                        marginBottom: "15px",
                        padding: "10px",
                        border: "2px solid #ddd",
                        borderRadius: "5px",
                        fontSize: "14px"
                      }}
                    />
                    <button 
                      onClick={handleUpload}
                      style={{
                        backgroundColor: "#007bff",
                        color: "white",
                        padding: "12px 30px",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                        fontSize: "16px",
                        fontWeight: "bold",
                        transition: "background-color 0.3s"
                      }}
                      onMouseOver={(e) => e.target.style.backgroundColor = "#0056b3"}
                      onMouseOut={(e) => e.target.style.backgroundColor = "#007bff"}
                    >
                      Upload Resume
                    </button>
                  </div>

                  <h3 style={{
                    textAlign: "center",
                    color: "#333",
                    marginBottom: "20px",
                    fontSize: "22px"
                  }}>Candidates</h3>
                  
                  <div style={{ overflowX: "auto" }}>
                    <table style={{
                      width: "100%",
                      borderCollapse: "collapse",
                      backgroundColor: "white",
                      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                      borderRadius: "8px",
                      overflow: "hidden"
                    }}>
                      <thead>
                        <tr style={{ backgroundColor: "#f8f9fa" }}>
                          <th style={{
                            padding: "15px",
                            textAlign: "left",
                            borderBottom: "2px solid #dee2e6",
                            color: "#495057",
                            fontWeight: "600"
                          }}>Email</th>
                          <th style={{
                            padding: "15px",
                            textAlign: "left",
                            borderBottom: "2px solid #dee2e6",
                            color: "#495057",
                            fontWeight: "600"
                          }}>Skills</th>
                          <th style={{
                            padding: "15px",
                            textAlign: "center",
                            borderBottom: "2px solid #dee2e6",
                            color: "#495057",
                            fontWeight: "600"
                          }}>ATS Score</th>
                          <th style={{
                            padding: "15px",
                            textAlign: "left",
                            borderBottom: "2px solid #dee2e6",
                            color: "#495057",
                            fontWeight: "600"
                          }}>Observations</th>
                        </tr>
                      </thead>
                      <tbody>
                        {candidates.map((c, i) => (
                          <tr key={i} style={{
                            borderBottom: "1px solid #dee2e6",
                            transition: "background-color 0.2s"
                          }}
                          onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#f8f9fa"}
                          onMouseOut={(e) => e.currentTarget.style.backgroundColor = "white"}
                          >
                            <td style={{ padding: "15px", color: "#495057" }}>{c.email}</td>
                            <td style={{ padding: "15px", color: "#495057" }}>{c.skills.join(", ")}</td>
                            <td style={{ 
                              padding: "15px", 
                              textAlign: "center",
                              fontWeight: "bold",
                              color: c.atsScore >= 70 ? "#28a745" : c.atsScore >= 50 ? "#ffc107" : "#dc3545"
                            }}>{c.atsScore}%</td>
                            <td style={{ padding: "15px", color: "#495057" }}>{c.observations}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {candidates.length === 0 && (
                    <div style={{
                      textAlign: "center",
                      color: "#6c757d",
                      fontStyle: "italic",
                      marginTop: "30px",
                      padding: "40px",
                      backgroundColor: "#f8f9fa",
                      borderRadius: "8px"
                    }}>
                      No candidates uploaded yet. Upload a resume to get started!
                    </div>
                  )}

                  <div style={{
                    textAlign: "center",
                    marginTop: "40px"
                  }}>
                    <button
                      onClick={() => {
                        setToken("");
                        localStorage.removeItem("token");
                        setCandidates([]);
                      }}
                      style={{
                        backgroundColor: "#dc3545",
                        color: "white",
                        padding: "12px 30px",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                        fontSize: "16px",
                        fontWeight: "bold",
                        transition: "background-color 0.3s"
                      }}
                      onMouseOver={(e) => e.target.style.backgroundColor = "#c82333"}
                      onMouseOut={(e) => e.target.style.backgroundColor = "#dc3545"}
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* Redirect any unknown routes */}
        <Route path="*" element={<Navigate to={token ? "/" : "/login"} />} />
      </Routes>
    </Router>
  );
}

export default App;