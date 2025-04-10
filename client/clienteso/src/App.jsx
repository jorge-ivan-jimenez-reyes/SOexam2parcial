import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import styled from 'styled-components';
import WelcomeScreen from './components/WelcomeScreen';
import MissionsManager from './components/MissionsManager';
import './App.css';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f0f8ff;
  max-width: 1308px;
  margin: 0 auto;
`;

const NavBar = styled.nav`
  background-color: #0047ab;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
  width: 100%;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 1rem;
`;

const NavLink = styled(Link)`
  color: #ffffff;
  text-decoration: none;
  font-weight: bold;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #1e90ff;
  }
`;

const MainContent = styled.main`
  flex: 1;
  padding: 2rem;
  width: 100%;
`;

const Footer = styled.footer`
  background-color: #0047ab;
  color: #ffffff;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const FooterContent = styled.div`
  width: 100%;
  text-align: center;
`;

const App = () => {
  return (
    <Router>
      <AppContainer>
        <NavBar>
          <NavLinks>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/missions">Missions</NavLink>
          </NavLinks>
        </NavBar>

        <MainContent>
          <Routes>
            <Route path="/" element={<WelcomeScreen />} />
            <Route path="/missions" element={<MissionsManager />} />
          </Routes>
        </MainContent>

        <Footer>
          <FooterContent>
            <p>&copy; 2025 UP - Sistemas Operativos</p>
          </FooterContent>
        </Footer>
      </AppContainer>
    </Router>
  );
};

export default App;
