import React, { useState, useEffect } from "react";
import api from "./services/api";

function App() {
  const [file, setFile] = useState(null);
  const [candidates, setCandidates] = useState([]);

  const handleUpload = async () => {
    if (!file) return alert("Please select a file");
    const formData = new FormData();
    formData.append("file", file);

    await api.post("/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" }
    });

    fetchCandidates();
  };

  const fetchCandidates = async () => {
    const res = await api.get("/upload");
    setCandidates(res.data);
  };

  useEffect(() => {
    fetchCandidates();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Resume ATS Checker</h2>
      <input type="file" accept="application/pdf" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload}>Upload</button>

      <h3>Candidates</h3>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Email</th>
            <th>Skills</th>
            <th>ATS Score</th>
            <th>Observations</th>
          </tr>
        </thead>
        <tbody>
          {candidates.map((c, i) => (
            <tr key={i}>
              <td>{c.email}</td>
              <td>{c.skills.join(", ")}</td>
              <td>{c.atsScore}%</td>
              <td>{c.observations}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
