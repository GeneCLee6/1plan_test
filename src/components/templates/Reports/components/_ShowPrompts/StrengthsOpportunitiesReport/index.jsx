import React, { lazy } from 'react';
import { Box, Text, Grid, GridItem, useDisclosure } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { DownloadIcon } from '@chakra-ui/icons';
import html2pdf from 'html2pdf.js';

const Row1 = lazy(() => import('./Row1'));
const Row2 = lazy(() => import('./Row2'));
const Row3 = lazy(() => import('./Row3'));
const Row4 = lazy(() => import('./Row4'));

export default function StrenthsOpportunity() {
  const navigate = useNavigate();
  const handleNavigation = (step) => {
    navigate(`/start-plan/strengths-opportunities?step=${step}&from=report`);
  };
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleDownload = async () => {
    onOpen();
    let opt = {
      margin: [5, 25, 0, 0],
      filename: `StrengthOpportunitiesReport.pdf`,
      image: { type: 'png', quality: 1 },
      html2canvas: {
        dpi: 192,
        scale: 4,
        width: 2300,
        height: 1500,
        alignItems: 'center',
      },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'landscape' },
    };
    await html2pdf().set(opt).from(document.getElementById('SOpdf')).save();
    onClose();
    // navigate(-1);
  };
  return (
    <>
      <Text fontWeight={'bold'}>
        What have we got to work with and what are our valuation drivers?(
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
      <Grid id="SOpdf">
        <Grid templateColumns="repeat(4, 350px)" gap={6}>
          <Row1 handleNavigation={handleNavigation} />
        </Grid>
        <br></br>
        <Text fontWeight={'bold'}>{`BUSINESS DRIVERS & PROCESSES`}</Text>
        <br></br>
        <Grid templateColumns="repeat(5, 278px)" gap={5}>
          <Row2 handleNavigation={handleNavigation} />
          <Row3 handleNavigation={handleNavigation} />
        </Grid>
        <Grid templateColumns="repeat(3, 467px)" mt="5" gap={6}>
          <Row4 handleNavigation={handleNavigation} />
        </Grid>
      </Grid>
    </>
  );
}
