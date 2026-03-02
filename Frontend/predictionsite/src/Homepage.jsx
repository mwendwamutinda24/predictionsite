import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import UpdateMatch from "./UpdateMatch";   // ✅ make sure filename matches
import { jwtDecode } from "jwt-decode";
import Site from "./Site";                 // ✅ Import Site upload form

function Homepage() {
  const [matches, setMatches] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isAdmin, setIsAdmin] = useState(false);
  const [selectedMatchId, setSelectedMatchId] = useState(null);
  const [error, setError] = useState(null);

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
      .then(res => {
        if (!res.ok) {
          throw new Error(`Server error: ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        if (Array.isArray(data)) {
          setMatches(data);
        } else {
          console.error("Expected array, got:", data);
          setMatches([]);
          setError("Invalid data format from server");
        }
      })
      .catch(err => {
        console.error('Error fetching matches:', err);
        setError("Failed to load matches. Please try again later.");
        setMatches([]);
      });
  }, []);

  const dayName = currentDate.toLocaleDateString('en-US', { weekday: 'long' });
  const formattedDate = currentDate.toLocaleDateString('en-US', { 
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' 
  });

  const goBack = () => {
    const prev = new Date(currentDate);
    prev.setDate(prev.getDate() - 1);
    setCurrentDate(prev);
  };

  const goForward = () => {
    const next = new Date(currentDate);
    next.setDate(next.getDate() + 1);
    setCurrentDate(next);
  };

  const filteredMatches = Array.isArray(matches) ? matches.filter(m => {
    if (!m.predictionDate) return true;
    const matchDate = new Date(m.predictionDate);
    return (
      matchDate.getFullYear() === currentDate.getFullYear() &&
      matchDate.getMonth() === currentDate.getMonth() &&
      matchDate.getDate() === currentDate.getDate()
    );
  }) : [];

  const total = filteredMatches.length;
  const won = filteredMatches.filter(m => 
    m.status && m.status.toLowerCase().includes('won')
  ).length;
  const lost = filteredMatches.filter(m => 
    m.status && m.status.toLowerCase().includes('lost')
  ).length;
  const winRate = total > 0 ? ((won / total) * 100).toFixed(1) + '%' : '0%';

  return (
    <div>
      <Header />

      {/* Day navigation */}
      <div className="homes">
        <div className="day2" style={{ display: 'flex', alignItems: 'center', gap: '20px', color:'blueviolet' }}>
          <button onClick={goBack}>&lt;</button>
          <div>
            <h2>{dayName}</h2>
            <p>{formattedDate}</p>
          </div>
          <button onClick={goForward}>&gt;</button>
        </div>

        {/* Stats section */}
        <div className="day">
          <div className="total"><h2 style={{color:'blue'}}>{total}</h2><p style={{color:'blueviolet',fontWeight:'bold'}}>Total</p></div>
          <div className="won"><h2 style={{color:'green'}}>{won}</h2><p>Won</p></div>
          <div className="lost"><h2 style={{color:'red'}}>{lost}</h2><p style={{color:'brown'}}>Lost</p></div>
          <div className="rate"><h2 style={{color:'blueViolet',fontWeight:'bold'}}>{winRate}</h2><p style={{color:'green'}}>Win rate</p></div>
        </div>
      </div>

      <div className="tables">
        {error ? (
          <div style={{ textAlign: 'center', marginTop: '20px', color: 'red' }}>
            <h3>{error}</h3>
          </div>
        ) : filteredMatches.length === 0 ? (
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <h3>No predictions</h3>
          </div>
        ) : (
          <table border="1" cellPadding="5" style={{ width: '80%', margin: '10px auto' }}>
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
                  <td data-label="Time" style={{fontSize:'15px'}}><p>{m.time}</p></td>
                  <td data-label="League" style={{fontSize:'15px'}}><p>{m.league}</p></td>
                  <td data-label="Match"><h4>{m.home} vs {m.away}</h4></td>
                  <td data-label="Prediction" style={{color:'red',fontWeight:'bolder'}}><h4>{m.prediction}</h4></td>
                  <td data-label="Odds"><h4>{m.odds}</h4></td>
                  <td data-label="Score"><h4>{m.score || '—'}</h4></td>
                  <td data-label="Status" style={{color:'blue', fontWeight:'bold'}}><h4>{m.status}</h4></td>
                  {isAdmin && (
                    <td data-label="Action">
                      <button 
                        onClick={() => setSelectedMatchId(m._id)} 
                        style={{ padding: '5px 10px', cursor: 'pointer', background:'green', color:'white', borderRadius:'0.5rem', border:'none' }}
                      >
                        Update
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* ✅ Render update panel outside the table */}
      {isAdmin && selectedMatchId && (
        <div style={{ width: '80%', margin: '20px auto', background: '#f9f9f9', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 6px rgba(0,0,0,0.1)' }}>
          <UpdateMatch matchId={selectedMatchId} />
        </div>
      )}

      {isAdmin && (
        <div style={{ width: '80%', margin: '20px auto' }}>
          <Site />
        </div>
      )}
    </div>
  );
}

export default Homepage;
