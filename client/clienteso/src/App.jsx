import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import styled from 'styled-components';
import WelcomeScreen from './components/WelcomeScreen';
import MissionsManager from './components/MissionsManager';
import './App.css';

const NavBar = styled.nav`
  background-color: #282c34;
  padding: 10px;
`;

const NavLink = styled(Link)`
  color: white;
  margin-right: 15px;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const App = () => {
  return (
    <Router>
      <div className="App">
        <NavBar>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/missions">Missions</NavLink>
        </NavBar>

        <main className="App-main">
          <Routes>
            <Route path="/" element={<WelcomeScreen />} />
            <Route path="/missions" element={<MissionsManager />} />
          </Routes>
        </main>

        <footer className="App-footer">
          <p>&copy; 2025 UP - Sistemas Operativos</p>
        </footer>
      </div>
    </Router>
  );
};

export default App;
