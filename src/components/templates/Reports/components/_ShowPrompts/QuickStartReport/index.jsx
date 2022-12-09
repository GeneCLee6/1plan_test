import React, { lazy } from 'react';
import { Box, Text, Grid, GridItem, useDisclosure } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { DownloadIcon } from '@chakra-ui/icons';
import html2pdf from 'html2pdf.js';

const Row1 = lazy(() => import('./Row1'));
const Row2 = lazy(() => import('./Row2'));

export default function QuickStart() {
  const navigate = useNavigate();
  const handleNavigation = (step) => {
    navigate(`/start-plan/quick-start?step=${step}&from=report`);
  };
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleDownload = async () => {
    onOpen();
    let opt = {
      margin: [5, 25, 0, 0],
      filename: `QuickStartReport.pdf`,
      image: { type: 'png', quality: 1 },
      html2canvas: {
        dpi: 192,
        scale: 4,
        width: 1500,
        height: 1000,
      },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'landscape' },
    };
    await html2pdf().set(opt).from(document.getElementById('hey')).save();
    onClose();
    // navigate(-1);
  };
  return (
    <>
      <Text fontWeight={'bold'}>
        INDUSTRY: Fast moving goods distribution (
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
      <Grid id="hey" templateColumns="repeat(4, 350px)" gap={6}>
        <Row1 handleNavigation={handleNavigation} />
        <Row2 handleNavigation={handleNavigation} />
      </Grid>
    </>
  );
}
