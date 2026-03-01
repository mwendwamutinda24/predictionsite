import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import UpdateMatch from "./Update";
import { jwtDecode } from "jwt-decode";
import Site from "./Site";

function Homepage() {
  const [matches, setMatches] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isAdmin, setIsAdmin] = useState(false);
  const [selectedMatchId, setSelectedMatchId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setIsAdmin(decoded.status === "admin");
      } catch (err) {
        console.error("Error decoding token:", err);
      }
    }

    fetch('https://predictionsite-2.onrender.com/auth/sites')
      .then(res => res.json())
      .then(data => setMatches(data))
      .catch(err => console.error('Error fetching matches:', err));
  }, []);

  // ✅ Delete handler
  const handleDelete = async (id) => {
    try {
      const res = await fetch(`https://predictionsite-2.onrender.com/auth/sites/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" }
      });

      if (res.ok) {
        // remove deleted match from state
        setMatches(prev => prev.filter(m => m._id !== id));
      } else {
        console.error("Failed to delete match");
      }
    } catch (err) {
      console.error("Error deleting match:", err);
    }
  };

  // ✅ Stats calculation
  const filteredMatches = matches.filter(m => {
    if (!m.predictionDate) return true;
    const matchDate = new Date(m.predictionDate);
    return (
      matchDate.getFullYear() === currentDate.getFullYear() &&
      matchDate.getMonth() === currentDate.getMonth() &&
      matchDate.getDate() === currentDate.getDate()
    );
  });

  const total = filteredMatches.length;
  const won = filteredMatches.filter(m => m.status && m.status.toLowerCase().includes('won')).length;
  const lost = filteredMatches.filter(m => m.status && m.status.toLowerCase().includes('lost')).length;
  const winRate = total > 0 ? ((won / total) * 100).toFixed(1) + '%' : '0%';

  return (
    <div>
      <Header />

      {/* ... Day navigation + Stats section unchanged ... */}

      <div className="tables">
        {filteredMatches.length === 0 ? (
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <h3>No predictions</h3>
          </div>
        ) : (
          <table className="tables">
            <thead>
              <tr>
                <th>Time</th>
                <th>Match</th>
                <th>League</th>
                <th>Prediction</th>
                <th>Odds</th>
                <th>Score</th>
                <th>Status</th>
                {isAdmin && <th>Action</th>}
              </tr>
            </thead>
            <tbody>
              {filteredMatches.map(m => (
                <tr key={m._id}>
                  <td data-label="Time">{m.time}</td>
                  <td data-label="Match"><h4>{m.home} vs {m.away}</h4></td>
                  <td data-label="League"><p>{m.league}</p></td>
                  <td data-label="Prediction" style={{color:'red',fontWeight:'bolder'}}>{m.prediction}</td>
                  <td data-label="Odds"><h4>{m.odds}</h4></td>
                  <td data-label="Score"><h4>{m.score || '—'}</h4></td>
                  <td data-label="Status" style={{color:'blue', fontWeight:'bold'}}>{m.status}</td>
                  {isAdmin && (
                    <td data-label="Action">
                      <button 
                        onClick={() => setSelectedMatchId(m._id)} 
                        style={{ padding: '5px 10px', marginRight:'5px', cursor: 'pointer', background:'green', color:'white', borderRadius:'0.5rem', border:'none' }}
                      >
                        Update
                      </button>
                      <button 
                        onClick={() => handleDelete(m._id)} 
                        style={{ padding: '5px 10px', cursor: 'pointer', background:'red', color:'white', borderRadius:'0.5rem', border:'none' }}
                      >
                        Delete
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Update panel + Site upload unchanged */}
      {isAdmin && selectedMatchId && (
        <div className="update-panel">
          <UpdateMatch matchId={selectedMatchId} />
        </div>
      )}

      {isAdmin && (
        <div className="site-upload">
          <Site />
        </div>
      )}
    </div>
  );
}

export default Homepage;
