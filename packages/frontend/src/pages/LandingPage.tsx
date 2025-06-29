import React from 'react';
import { GridContainer } from '../shared/ui/GridContainer';
import { Button } from '../shared/ui/button';
import { useNavigate } from 'react-router-dom';
import { Heading1, Paragraph } from '../shared/ui/typography';
import { Grid } from '../shared/ui/grid';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/ffice.webp')" }} // שנה לנתיב התמונה שלך
    >
      <div className="flex flex-col items-center justify-center text-center p-10 bg-white bg-opacity-60 rounded-lg shadow-lg">
        <Heading1>תתכונני. תתנסי. תצליחי.</Heading1>
        <Paragraph className="mt-4 text-lg">מערכת חכמה להכנה אישית לראיון עבודה.</Paragraph>
        <Button variant="primary-dark" onClick={() => navigate('/login')} className="text-lg mt-4">
          התחבר למערכת
        </Button>
      </div>

    </div>
  );
};

export default LandingPage;
