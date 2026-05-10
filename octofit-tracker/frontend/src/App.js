import './App.css';
import { BrowserRouter as Router, NavLink, Routes, Route, Navigate } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';
import logo from './assets/octofitapp-small.png';

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
          <div className="container-fluid">
            <NavLink className="navbar-brand d-flex align-items-center gap-2 fw-bold" to="/activities">
              <img src={logo} alt="OctoFit" className="app-logo" />
              <span>OctoFit Tracker</span>
            </NavLink>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                {[
                  { path: '/activities', label: 'Activities' },
                  { path: '/leaderboard', label: 'Leaderboard' },
                  { path: '/teams', label: 'Teams' },
                  { path: '/users', label: 'Users' },
                  { path: '/workouts', label: 'Workouts' },
                ].map((item) => (
                  <li className="nav-item" key={item.path}>
                    <NavLink
                      to={item.path}
                      className={({ isActive }) =>
                        `nav-link${isActive ? ' active' : ''}`
                      }
                    >
                      {item.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </nav>

        <main className="container mt-4">
          <Routes>
            <Route path="/" element={<Navigate to="/activities" replace />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/users" element={<Users />} />
            <Route path="/workouts" element={<Workouts />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
