import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const WelcomeContainer = styled.div`
  text-align: center;
  padding: 20px;
`;

const Title = styled.h1`
  color: #282c34;
`;

const Subtitle = styled.h2`
  color: #61dafb;
`;

const StyledLink = styled(Link)`
  display: inline-block;
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #61dafb;
  color: #282c34;
  text-decoration: none;
  border-radius: 5px;
  &:hover {
    background-color: #45b7d8;
  }
`;

const WelcomeScreen = () => {
  return (
    <WelcomeContainer>
      <Title>Welcome to Space Missions Manager</Title>
      <Subtitle>Explore and Manage Space Missions</Subtitle>
      <p>This application allows you to view, add, and manage space missions.</p>
      <StyledLink to="/missions">View Missions</StyledLink>
    </WelcomeContainer>
  );
};

export default WelcomeScreen;
