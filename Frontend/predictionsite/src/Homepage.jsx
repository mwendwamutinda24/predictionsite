import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import UpdateMatch from "./Update";   // ✅ make sure filename matches
import { jwtDecode } from "jwt-decode";
import Site from "./Site";                 // ✅ Import Site upload form


function Homepage() {
  const [matches, setMatches] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isAdmin, setIsAdmin] = useState(false);
  const [selectedMatchId, setSelectedMatchId] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

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

    fetch('https://predictionsite-3.onrender.com/auth/sites')
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
      })
      .finally(() => setLoading(false));
  }, []);

  const dayName = currentDate.toLocaleDateString('en-US', { weekday: 'long' });
  const formattedDate = currentDate.toLocaleDateString('en-US', {
    day: 'numeric', month: 'long', year: 'numeric'
  });
  const isToday = currentDate.toDateString() === new Date().toDateString();

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

  const goToday = () => setCurrentDate(new Date());

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
  const winRate = total > 0 ? ((won / total) * 100).toFixed(1) + '%' : '—';

  const statusClass = (status) => {
    const s = (status || '').toLowerCase();
    if (s.includes('won')) return 'pill pill-won';
    if (s.includes('lost')) return 'pill pill-lost';
    if (s.includes('pending') || s.includes('live')) return 'pill pill-pending';
    return 'pill pill-neutral';
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this prediction? This can't be undone.")) return;
    try {
      const res = await fetch(`https://predictionsite-3.onrender.com/auth/sites/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      });

      const data = await res.json().catch(() => null);

      if (res.ok) {
        setMatches(prev => prev.filter(m => m._id !== id));
      } else {
        setError(data?.message || "Failed to delete match");
      }
    } catch (err) {
      console.error("Error deleting match:", err);
      setError("Error deleting match");
    }
  };

  return (
    <div className="scoreboard-page">
      <Header />

      <div className="scoreboard-shell">
        {/* Day navigation */}
        <div className="day-strip">
          <button className="day-nav-btn" onClick={goBack} aria-label="Previous day">‹</button>
          <div className="day-strip-label">
            <span className="day-name">{dayName}</span>
            <span className="day-date">{formattedDate}</span>
          </div>
          <button className="day-nav-btn" onClick={goForward} aria-label="Next day">›</button>
          {!isToday && (
            <button className="today-btn" onClick={goToday}>Today</button>
          )}
        </div>

        {/* Stats row */}
        <div className="stat-row">
          <div className="stat-block">
            <span className="stat-figure">{total}</span>
            <span className="stat-label">Total</span>
          </div>
          <div className="stat-block">
            <span className="stat-figure stat-won">{won}</span>
            <span className="stat-label">Won</span>
          </div>
          <div className="stat-block">
            <span className="stat-figure stat-lost">{lost}</span>
            <span className="stat-label">Lost</span>
          </div>
          <div className="stat-block stat-block-accent">
            <span className="stat-figure">{winRate}</span>
            <span className="stat-label">Win rate</span>
          </div>
        </div>

        {/* Fixtures */}
        <div className="fixtures-panel">
          {loading ? (
            <div className="fixtures-empty">
              <p>Loading today's fixtures…</p>
            </div>
          ) : error ? (
            <div className="fixtures-empty fixtures-error">
              <p>{error}</p>
            </div>
          ) : filteredMatches.length === 0 ? (
            <div className="fixtures-empty">
              <p>No predictions posted for this day yet.</p>
            </div>
          ) : (
            <div className="fixtures-table-wrap">
              <table className="fixtures-table">
                <thead>
                  <tr>
                    <th>Time</th>
                    <th>Fixture</th>
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
                      <td className="cell-time">{m.time}</td>
                      <td className="cell-fixture">{m.home} <span className="vs">vs</span> {m.away}</td>
                      <td className="cell-muted">{m.league}</td>
                      <td className="cell-prediction">{m.prediction}</td>
                      <td className="cell-odds">{m.odds}</td>
                      <td className="cell-muted">{m.score || '—'}</td>
                      <td><span className={statusClass(m.status)}>{m.status || 'Pending'}</span></td>
                      {isAdmin && (
                        <td className="cell-actions">
                          <button
                            className="action-btn action-update"
                            onClick={() => setSelectedMatchId(m._id)}
                          >
                            Update
                          </button>
                          <button
                            className="action-btn action-delete"
                            onClick={() => handleDelete(m._id)}
                          >
                            Delete
                          </button>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Update panel */}
        {isAdmin && selectedMatchId && (
          <div className="edit-panel">
            <div className="edit-panel-header">
              <h3>Update prediction</h3>
              <button className="edit-panel-close" onClick={() => setSelectedMatchId(null)} aria-label="Close">×</button>
            </div>
            <UpdateMatch matchId={selectedMatchId} />
          </div>
        )}

        {isAdmin && (
          <div className="post-panel">
            <Site />
          </div>
        )}
      </div>
    </div>
  );
}

export default Homepage;
