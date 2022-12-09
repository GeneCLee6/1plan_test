import React, { lazy } from 'react';
import { Box, Text, Grid, GridItem } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const Row1 = lazy(() => import('./Row1'));
const Row2 = lazy(() => import('./Row2'));

export default function VisionOfSuccess() {
  const navigate = useNavigate();
  const handleNavigation = (step) => {
    navigate(`/start-plan/vision-of-success?step=${step}&from=report`);
  };
  return (
    <>
      <Text fontWeight={'bold'}>BUSINESS PLAN TO YEAR 2027</Text>
      <Grid templateColumns="repeat(4, 350px)" gap={6}>
        <Row1 handleNavigation={handleNavigation} />
        <Row2 handleNavigation={handleNavigation} />
      </Grid>
    </>
  );
}
