import 'react';
import Header from './components/Header";            // form

function Homepage() {
  const [matchesState([]);
  const, useState } from';
import UpdateMatch from "./Update";   // ✅ use "./UpdateMatch" if your file is UpdateMatch.jsx
import { jwtDecode } from "jwt-decode";
import Site from "./Site ✅ Import Site upload, setMatches] = useCurrentDate] = use  const [isAdminState(false);
  const [selectedMatchId, setSelectedMatch [currentDate, setState(new Date());
, setIsAdmin] = useId] = useState(null);

  useEffect(() if (token) {
     (token);
        (err) {
        console.error("('http://localhost:5000/auth/sites      .then(data => {
        set })
      .catch(err => console.error('Error fetching matches:', err));
  }, []);

  // ✅ Delete handler
  const handleDelete {
    try {
      fetch(`http://localhost => {
    const token = localStorage.getItem("token");
    try {
        const decoded = jwtDecode setIsAdmin(decoded.status === "admin");
      } catchError decoding token:", err);
      }
    }

    fetch')
      .then(res => res.json())
Matches(data);
      = async (id) => const res = await method: "DELETE",
        headers: { "Content-Type:5000/auth/sites/${id}`, {
       ": "application/json if (res.ok) {
        setMatches(prev => prev.filter(m" }
      });

      => m._id !== id));
      } else {
        console delete match");
      }
    } catch (err) {
      console.error("Error deleting    }
  };

  const weekday: 'long'Date = currentDate.toLocaleDateString.error("Failed to match:", err);
 dayName = currentDate.toLocaleDateString('en-US', { });
  const formatted('en-US', { 
    weekday: 'long', day: 'numeric',  const goBack = () => {
    const prev = new Date(currentDate);
    prev.setDate(prev    setCurrentDate month: 'long', year: 'numeric' 
  });

.getDate() - 1);
 goForward = () =>(prev);
  };

  constDate);
    next.setDate(next.getDate {
    const next = new Date(current() + 1);
    set = matches.filter) return true;
    return (
      matchCurrentDate(next);
  };

  const filteredMatches(m => {
    if (!m.predictionDate const matchDate = new Date(m.predictionDate);
   Date.getFullYear() === currentDate      matchDate.getDate.getMonth() &&
      matchDate.getDate() === current Stats calculation.filter(m => 
   .getFullYear() &&
Month() === currentDate.getDate()
    );
  });

  // ✅ based on DB status values
  const total = filteredMatches.length;

  const won = filteredMatches.toLowerCase().includes('won')
  ).length;

  const lost = m.status && m.status m.status && m.status filteredMatches.filter(m => 
   .toLowerCase().includes('lost')
  ).length;

  const winRate = total > 0 ? (().toFixed(1) + '%' (
    <div>
      */}
      <div className="homes">won / total) * 100 : '0%';

  return <Header />

      {/* Day navigation
          <button onClick={goBack}>
        <div className="day2" style={{ display: 'flex', alignItems: 'center', gap: '20px',color:'blueviolet' }}>
          <button onClick={goForward}>&lt;</button>
          <div>
            <h2>{dayName}</h2>
            <p>{formattedDate}</p>
          </div>&gt;</button>
        </div>

        */}
        <div className="day">
          <div className="total" ><h2 style={{color:'blue'}}>{total}</h2><p style={{color:'blueviolet',fontWeight:'bold'}}>Total</p></div>
 {/* Stats section          <div className="won"><h2 style={{color:'green'}}> <div className="lost">{won}</h2><p>Won{lost}</h2><p style={{color:'brown'}}>{winRate}</h2><p style={{color:'green'}}>Win rate</p></div>
        </div>
      </div>

      <div className="tables">Matches.length ===</p></div>
         <h2 style={{color:'red'}}>Lost</p></div>
          <div className="rate"><h2 style={{color:'blueViolet',fontWeight:'bold'}}>
        {filtered 0 ? (
          <div style={{ textAlign: 'center', marginTop: '20px' }}>No predictions</h3> <table border="1" cellPadding="5" style={{ width: '80%', margin: '10px auto' }}>
            <h3>
          </div>
        ) : (
         
            <thead>
              <tr>
                <th>Time</th>
                <th>Match</th>
                <th>League</th>
                
                <th>Score</th>
<th>Prediction</th> <th>Odds</th>
                                               {isAdmin && <th>Action</th>}
             <th>Status</th>
.map(m => (
                <tr key={m._id}> <td data-label="Time" style={{fontSize:'15px'}}><p>{m.time}</p></td> <td data-label="League" style={{fontSize:'15px'}}> </tr>
            </thead>
            <tbody>
              {filteredMatches
                 
                 <p>{m.league}</p></td>
                 <h4>{m.home} vs {m.away}</h4></td>
                 <h4>{m.prediction}</h4></td>
                  <td data-label="Match"> <td data-label="Prediction" style={{color:'red',fontWeight:'bolder'}}><h4>{m.odds}</h4></td>
                 —'}</h4></td>
                  <td data-label="Odds"> <td data-label="Score"><h4>{m.score || '<h4>{m.status}</h4></td>
                  {isAdmin && (
                    <td data-label="Action">
                      <button 
                        onClick={() => set style={{ padding:'green',color:':'none', marginRight:'5px' }}
                      Update
                      <button 
                        onClick={() => handle                        style={{ padding: '5px 10px', cursor:'red',color:'white',borderRadius:'0.5rem',border:'none' }}
                      Delete
                      <td data-label="Status" style={{color:'blue', fontWeight:'bold'}}>SelectedMatchId(m._id)} 
                       : '5px 10px', cursor: 'pointer',backgroundwhite',borderRadius:'0.5rem',border >
                        </button>
                     Delete(m._id)} 
: 'pointer',background >
                        ))}
            </table>
        )}
      </div> update panel outside the table */}
      {isAdmin && selectedMatchId && (
        </button>
                    </td>
                  )}
                </tr>
              </tbody>
         

      {/* ✅ Render <div style={{ width: '80%', margin: '20px auto', background: '#f9f9f9', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 6px rgba(0,0,0,0.1)' }}>
          <UpdateMatch matchId={selectedMatchId} />      )}

      {isAdmin && (
        <div style={{ width: '80%', margin: '20px auto' }}>
          <Site />      )}
    </div>
  );
}

export default’s added
- `handle at the top.  
- A **Delete button
        </div>

        </div>
 Homepage;
