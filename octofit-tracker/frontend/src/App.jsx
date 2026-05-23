import React from 'react'
import { NavLink, Routes, Route } from 'react-router-dom'
import Activities from './components/Activities'
import Leaderboard from './components/Leaderboard'
import Teams from './components/Teams'
import Users from './components/Users'
import Workouts from './components/Workouts'

function Home() {
  return (
    <div className="container mt-4">
      <h1>OctoFit Tracker</h1>
      <p>Welcome to OctoFit — your activity tracker.</p>
      <p className="text-muted">Use the navigation bar to explore activities, users, teams, workouts, and the leaderboard.</p>
    </div>
  )
}

export default function App() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/">OctoFit</NavLink>
          <div>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 d-flex flex-row gap-3">
              <li className="nav-item">
                <NavLink className="nav-link" to="/activities">Activities</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/workouts">Workouts</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/teams">Teams</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/leaderboard">Leaderboard</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/users">Users</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/workouts" element={<Workouts />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/users" element={<Users />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </div>
  )
}
