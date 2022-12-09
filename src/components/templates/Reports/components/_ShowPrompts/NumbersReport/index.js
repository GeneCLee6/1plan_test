import React, { lazy } from 'react';

import {
  Box,
  Text,
  Grid,
  GridItem,
  MenuButton,
  Button,
  useDisclosure,
  Center,
  Flex,
  Spacer,
  Icon,
} from '@chakra-ui/react';
import { DownloadIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router';
import html2pdf from 'html2pdf.js';

const Row1 = lazy(() => import('./Row1'));

export default function Number() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleDownload = async () => {
    onOpen();
    let opt = {
      margin: 0,
      filename: `NumbersReport.pdf`,
      image: { type: 'png', quality: 1 },
      html2canvas: {
        dpi: 192,
        scale: 4,
        width: 1500,
        height: 700,
      },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'landscape' },
    };
    await html2pdf()
      .set(opt)
      .from(document.getElementById('pdfContainer'))
      .save();
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
      <br />
      <br />
      <Grid id="pdfContainer" templateColumns="repeat(4, 350px)" gap={6}>
        <Row1 />
      </Grid>
    </>
  );
}
