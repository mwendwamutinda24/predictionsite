import React from 'react'
import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import './Site.css';

function Site() {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    time: '',
    home: '',
    away: '',
    league: '',
    prediction: '',
    odds: '',
  })

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("https://predictionsite-3.onrender.com/auth/site", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if (res.ok) {
        toast.success('Prediction posted', { autoClose: 2000 });
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        toast.error(data.message || "Couldn't post the prediction");
      }
    } catch (error) {
      console.error("Frontend error:", error);
      toast.error('Server error — try again in a moment');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="post-form">
      <h3 className="post-form-title">Post a prediction</h3>

      <form onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="time">Start time</label>
          <input
            id="time"
            type="text"
            name="time"
            placeholder="e.g. 20:45"
            onChange={handleChange}
            required
          />
        </div>

        <div className="field-row">
          <div className="field">
            <label htmlFor="home">Home team</label>
            <input
              id="home"
              type="text"
              name="home"
              placeholder="Home team"
              onChange={handleChange}
              required
            />
          </div>
          <span className="vs-divider">vs</span>
          <div className="field">
            <label htmlFor="away">Away team</label>
            <input
              id="away"
              type="text"
              name="away"
              placeholder="Away team"
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="field">
          <label htmlFor="league">League</label>
          <input
            id="league"
            type="text"
            name="league"
            placeholder="e.g. Premier League"
            onChange={handleChange}
            required
          />
        </div>

        <div className="field-row">
          <div className="field">
            <label htmlFor="prediction">Prediction</label>
            <input
              id="prediction"
              type="text"
              name="prediction"
              placeholder="e.g. Over 2.5 goals"
              onChange={handleChange}
              required
            />
          </div>
          <div className="field field-narrow">
            <label htmlFor="odds">Odds</label>
            <input
              id="odds"
              type="text"
              name="odds"
              placeholder="1.85"
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <button className="post-submit" type="submit" disabled={submitting}>
          {submitting ? 'Posting…' : 'Post prediction'}
        </button>
      </form>
    </div>
  )
}

export default Site
