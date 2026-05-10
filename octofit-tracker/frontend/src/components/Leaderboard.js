import React, { useEffect, useState } from 'react';

const CODESPACE_NAME = process.env.REACT_APP_CODESPACE_NAME;
const API_BASE_URL = CODESPACE_NAME
  ? `https://${CODESPACE_NAME}-8000.app.github.dev/api`
  : 'http://localhost:8000/api';

function Leaderboard() {
  const [leaders, setLeaders] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(0);
  const [filterText, setFilterText] = useState('');
  const endpoint = `${API_BASE_URL}/leaderboard/`;

  useEffect(() => {
    setLoading(true);
    console.log('Leaderboard endpoint:', endpoint);
    fetch(endpoint)
      .then((response) => response.json())
      .then((data) => {
        console.log('Leaderboard fetch response:', data);
        const normalized = Array.isArray(data)
          ? data
          : data?.results ?? data?.data ?? [];
        setLeaders(normalized);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Leaderboard fetch error:', err);
        setError(err.message || 'Failed to fetch leaderboard data');
        setLoading(false);
      });
  }, [endpoint, reload]);

  const items = leaders.filter((leader) =>
    JSON.stringify(leader).toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <div className="container py-4">
      <div className="card shadow-sm">
        <div className="card-header d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3">
          <div>
            <h2 className="h4 mb-1">Leaderboard</h2>
            <p className="text-muted small mb-0">Endpoint: {endpoint}</p>
          </div>
          <div className="btn-toolbar gap-2">
            <button type="button" className="btn btn-primary" onClick={() => setReload((prev) => prev + 1)}>
              Refresh
            </button>
            <a className="btn btn-outline-secondary" href={endpoint} target="_blank" rel="noreferrer">
              Open API
            </a>
          </div>
        </div>
        <div className="card-body">
          <form className="row gy-2 gx-2 align-items-center mb-3" onSubmit={(e) => e.preventDefault()}>
            <div className="col-md-8">
              <label htmlFor="leaderboardFilter" className="form-label visually-hidden">
                Filter leaderboard
              </label>
              <input
                id="leaderboardFilter"
                type="text"
                className="form-control"
                placeholder="Filter leaderboard..."
                value={filterText}
                onChange={(e) => setFilterText(e.target.value)}
              />
            </div>
            <div className="col-auto">
              <button type="button" className="btn btn-outline-secondary" onClick={() => setFilterText('')}>
                Clear
              </button>
            </div>
          </form>

          {error && <div className="alert alert-danger">Error: {error}</div>}
          {loading ? (
            <div className="alert alert-info mb-0">Loading leaderboard data...</div>
          ) : items.length === 0 ? (
            <div className="alert alert-warning mb-0">No leaderboard results found.</div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover table-bordered align-middle mb-0">
                <thead className="table-light">
                  <tr>
                    <th style={{ width: '5%' }}>#</th>
                    <th style={{ width: '25%' }}>Name</th>
                    <th>Details</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((leader, index) => (
                    <tr key={leader.id ?? index}>
                      <td>{index + 1}</td>
                      <td>{leader.name || leader.username || `Leader ${index + 1}`}</td>
                      <td>
                        <pre className="mb-0 small text-break">{JSON.stringify(leader, null, 2)}</pre>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Leaderboard;
