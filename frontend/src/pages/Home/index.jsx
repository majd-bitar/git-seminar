import React from 'react';
import { useNavigate } from 'react-router-dom';
import Hero from '../../components/Hero/index'

export default function Home() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    // Navigate to /visualizer route
    navigate('/visualizer');
  };

  return (
    <>
      <Hero />
    </>
  );
}
