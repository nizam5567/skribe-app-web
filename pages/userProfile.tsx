import { Box, Step, StepLabel, Stepper, Typography } from '@mui/material';
import { NextPage } from 'next';
import React, { useState } from 'react';
import TickWithCircle from '../components/svg-components/TickWithCircle';
import Organization from '../components/UserProfile/Organization';
import PersonalInformation from '../components/UserProfile/PersonalInformation';

const UserProfile: NextPage = () => {
  const stepper: string[] = ['Personal Information', 'Organization', 'Packages'];
  const [currentStepper, setCurrentStepper] = useState<string>('Personal Information');
  return (
    <Box sx={{ 'backgroundColor': '#F8F9F9', 'minHeight': '100vh' }}>
      <Box sx={{ 'height': '4.75rem', 'borderBottom': '1px solid #ebebea' }} py="1.7rem">
        <Box px="24vw">
          <Stepper>
            {stepper.map((step: string) => (
                <Step key={step} completed={step === currentStepper} onClick={() => setCurrentStepper(step)}>
                  <StepLabel
                    StepIconComponent={TickWithCircle}
                    sx={{
                      'color': `${step === currentStepper ? '#4285f4' : '#B5B9BD'}`
                    }}
                  >
                    <Typography color={`${step === currentStepper ? '#4285f4' : '#000'}`}>{step}</Typography>
                  </StepLabel>
                </Step>
            ))}
          </Stepper>
        </Box>
      </Box>
      {currentStepper === 'Personal Information' && (
        <PersonalInformation
          setCurrentStepper={(step: string) => {
            setCurrentStepper(step);
          }}
        />
      )}
      {currentStepper === 'Organization' && (
        <Organization
          setCurrentStepper={(step: string) => {
            setCurrentStepper(step);
          }}
        />
      )}
    </Box>
  );
};

export default UserProfile;

export async function getServerSideProps () {
  return {
    'props': {
      'auth': true
    }
  };
}
