import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const WelcomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 120px); // Subtracting header and footer height
  padding: 2rem;
`;

const ContentWrapper = styled.div`
  text-align: center;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  max-width: 800px;
  width: 100%;
`;

const Title = styled.h1`
  color: #0047ab;
  font-size: 2.5rem;
  margin-bottom: 1rem;
`;

const Subtitle = styled.h2`
  color: #1e90ff;
  font-size: 1.5rem;
  margin-bottom: 2rem;
`;

const Description = styled.p`
  color: #4169e1;
  font-size: 1.1rem;
  margin-bottom: 2rem;
  line-height: 1.6;
`;

const StyledLink = styled(Link)`
  display: inline-block;
  padding: 0.8rem 1.5rem;
  background-color: #0047ab;
  color: #ffffff;
  text-decoration: none;
  border-radius: 5px;
  font-weight: bold;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #1e90ff;
  }
`;

const WelcomeScreen = () => {
  return (
    <WelcomeContainer>
      <Title>Welcome to Space Missions Manager</Title>
      <Subtitle>Explore the Final Frontier</Subtitle>
      <Description>
        Embark on a journey through the cosmos! Our Space Missions Manager allows you to view, add, and manage exciting space missions. 
        From Moon landings to Mars explorations, keep track of humanity's greatest adventures beyond Earth.
      </Description>
      <StyledLink to="/missions">Launch Mission Control</StyledLink>
    </WelcomeContainer>
  );
};

export default WelcomeScreen;
