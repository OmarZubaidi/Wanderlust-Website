import React from 'react';
import { LandingPageHeader } from './LandingPageHeader';
import { LandingPageSections } from './LandingPageSections';

export const LandingPage: React.FC = () => {
  return (
    <main className='landingContainer'>
      <LandingPageHeader />
      <LandingPageSections />
    </main>
  );
};
