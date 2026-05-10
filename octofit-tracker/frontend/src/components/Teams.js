import React, { useEffect, useState } from 'react';

const CODESPACE_NAME = process.env.REACT_APP_CODESPACE_NAME;
const API_BASE_URL = CODESPACE_NAME
  ? `https://${CODESPACE_NAME}-8000.app.github.dev/api`
  : 'http://localhost:8000/api';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(0);
  const [filterText, setFilterText] = useState('');
  const endpoint = `${API_BASE_URL}/teams/`;

  useEffect(() => {
    setLoading(true);
    console.log('Teams endpoint:', endpoint);
    fetch(endpoint)
      .then((response) => response.json())
      .then((data) => {
        console.log('Teams fetch response:', data);
        const normalized = Array.isArray(data)
          ? data
          : data?.results ?? data?.data ?? [];
        setTeams(normalized);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Teams fetch error:', err);
        setError(err.message || 'Failed to fetch teams');
        setLoading(false);
      });
  }, [endpoint, reload]);

  const items = teams.filter((team) =>
    JSON.stringify(team).toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <div className="container py-4">
      <div className="card shadow-sm">
        <div className="card-header d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3">
          <div>
            <h2 className="h4 mb-1">Teams</h2>
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
              <label htmlFor="teamsFilter" className="form-label visually-hidden">
                Filter teams
              </label>
              <input
                id="teamsFilter"
                type="text"
                className="form-control"
                placeholder="Filter teams..."
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
            <div className="alert alert-info mb-0">Loading teams...</div>
          ) : items.length === 0 ? (
            <div className="alert alert-warning mb-0">No teams found.</div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover table-bordered align-middle mb-0">
                <thead className="table-light">
                  <tr>
                    <th style={{ width: '5%' }}>#</th>
                    <th style={{ width: '25%' }}>Team</th>
                    <th>Details</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((team, index) => (
                    <tr key={team.id ?? index}>
                      <td>{index + 1}</td>
                      <td>{team.name || team.team_name || `Team ${index + 1}`}</td>
                      <td>
                        <pre className="mb-0 small text-break">{JSON.stringify(team, null, 2)}</pre>
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

export default Teams;
