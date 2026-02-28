import React, { useEffect, useState } from 'react';

function UpdateMatch({ matchId }) {
  const [match, setMatch] = useState(null);
  const [score, setScore] = useState('');
  const [status, setStatus] = useState('pending');

  useEffect(() => {
    console.log("Fetching match with ID:", matchId);
    if (!matchId) return;
    fetch(`https://predictionsite-2.onrender.com/auth/sites/${matchId}`)
      .then(res => res.json())
      .then(data => {
        console.log("Fetched match:", data);
        setMatch(data);
        setScore(data.score || '');
        setStatus(data.status || 'pending');
      })
      .catch(err => console.error('Error fetching match:', err));
  }, [matchId]);

  const handleUpdate = () => {
    fetch(`https://predictionsite-2.onrender.com/auth/sites/${matchId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ score, status })
    })
      .then(res => res.json())
      .then(data => {
        console.log('Updated:', data);
        setMatch(data); 
        setScore(data.score || '');
        setStatus(data.status || 'pending');
      })
      .catch(err => console.error(err));
  };

  if (!match) {
    return <p>Loading match...</p>;
  }

  return (
    <div style={{ border: '1px solid #ccc', padding: '15px', marginTop: '20px' }}>
      <h3>Update Match</h3>
      <p><strong>{match.home}</strong> vs <strong>{match.away}</strong></p>
      <p>League: {match.league}</p>
      <p>Prediction: {match.prediction}</p>
      <p>Odds: {match.odds}</p>
      <p>Game Time: {match.time}</p>

      {/* ✅ Show updated values */}
      <p>Score: {match.score || '—'}</p>
      <p>Status: {match.status}</p>

      <div>
        <input
          value={score}
          onChange={e => setScore(e.target.value)}
          placeholder="Score"
        />
      </div>

      <div>
        <select value={status} onChange={e => setStatus(e.target.value)}>
          <option value="pending">Pending</option>
          <option value="winning">Winning</option>
          <option value="won">Won</option>
          <option value="lost">Lost</option>
        </select>
      </div>

      <button onClick={handleUpdate}>Update</button>
    </div>
  );
}

export default UpdateMatch;
