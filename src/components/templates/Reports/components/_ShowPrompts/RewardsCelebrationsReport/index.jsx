import React, { lazy } from 'react';
import { Box, Text, Grid, GridItem, useDisclosure } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { DownloadIcon } from '@chakra-ui/icons';
import html2pdf from 'html2pdf.js';

const Row1 = lazy(() => import('./Row1'));
const Row2 = lazy(() => import('./Row2'));
const Row3 = lazy(() => import('./Row3'));

export default function RewardsCelebration() {
  const navigate = useNavigate();
  const handleNavigation = (page) => {
    navigate(`/start-plan/rewards-celebrations?page=${page}`);
  };
  const handleNavigationToVision = (step) => {
    navigate(`/start-plan/vision-of-success?step=${step}&from=report`);
  };
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleDownload = async () => {
    onOpen();
    let opt = {
      margin: [5, 25, 0, 0],
      filename: `RewardsCelebrationsReport.pdf`,
      image: { type: 'png', quality: 1 },
      html2canvas: {
        dpi: 192,
        scale: 4,
        width: 2000,
        height: 1300,
      },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'landscape' },
    };
    await html2pdf()
      .set(opt)
      .from(document.getElementById('rewardspdf'))
      .save();
    onClose();
    // navigate(-1);
  };
  return (
    <>
      <Text fontWeight={'bold'}>
        How do we measure our success? (
        {
          <DownloadIcon
            color={'red'}
            onClick={handleDownload}
            cursor={'pointer'}
          />
        }
        )
      </Text>
      <br></br>
      <Grid id="rewardspdf" templateColumns="550px 300px 550px" gap={6}>
        <Row1 handleNavigation={handleNavigation} />
        <Row2 handleNavigation={handleNavigation} />
        <Row3 handleNavigationToVision={handleNavigationToVision} />
      </Grid>
    </>
  );
}
