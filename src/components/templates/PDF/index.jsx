import React, { lazy, useEffect, useRef, useContext } from 'react';

import {
  Box,
  Button,
  Spinner,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Flex,
} from '@chakra-ui/react';
import html2pdf from 'html2pdf.js';
import { useNavigate } from 'react-router';
import { useSearchParams } from 'react-router-dom';
import { UserContext } from 'contexts/UserProvider';
import { SectionsContext } from 'contexts/SectionsProvider';
import { getPlanAllPlanSections } from 'services/firestore';
const A4P1 = lazy(() => import('./components/A4P1'), { ssr: false });
const A4P2 = lazy(() => import('./components/A4P2'), { ssr: false });
const A4P1Mac = lazy(() => import('./components/Mac/A4P1'), { ssr: false });
const A4P2Mac = lazy(() => import('./components/Mac/A4P2'), { ssr: false });

export default function PDF() {
  const {
    contextValue: { os, user },
  } = useContext(UserContext);
  const { contextValue, setSection } = useContext(SectionsContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const queryFormat = searchParams.get('format');

  const navigate = useNavigate();
  const isMounted = useRef(false);
  useEffect(() => {
    const loadPlan = async () => {
      if (user?.company?.planRef) {
        const [section1, section2, section3, section4, section5] = (
          await getPlanAllPlanSections(user?.company?.planRef)
        ).map((s, i) => s[`section${i + 1}`]);
        setSection('quickStart', section1);
        setSection('rewardsCelebrations', section2);
        setSection('strengthsOpportunities', section3);
        setSection('visionOfSuccess', section4);
        setSection('numbers', section5);
      }
    };
    loadPlan();
  }, [user]);

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      // handleDownload();
    }
  }, []);
  // console.log(contextValue);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleDownload = async () => {
    onOpen();
    //a4 format
    let opt = {
      margin: 0,
      filename: `1plan.pdf`,
      image: { type: 'png', quality: 1 },
      html2canvas: {
        dpi: 192,
        scale: 4,
        width: 831,
        height: 1175 * 2,
      },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    };
    //a3 format
    if (queryFormat == 'a3') {
      opt = {
        margin: 0,
        filename: `1plan.pdf`,
        image: { type: 'png', quality: 1 },
        html2canvas: {
          dpi: 192,
          scale: 4,
          width: 1662,
          height: 1175,
        },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'landscape' },
      };
    }

    await html2pdf()
      .set(opt)
      .from(document.getElementById('pdfContainer'))
      .save();
    onClose();
    // navigate(-1);
  };
  const renderLayout = () => {
    switch (os) {
      case 'Windows':
        return (
          <>
            <A4P1 />
            {queryFormat == 'a4' && <br />}
            <A4P2 />
          </>
        );
        break;

      case 'Mac':
        return (
          <>
            <A4P1Mac />
            {queryFormat == 'a4' && <br />}
            <A4P2Mac />
          </>
        );
        break;
    }
  };
  return (
    <>
      <Button onClick={handleDownload} mb="20px">
        Download
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} border="1px solid red">
        <ModalOverlay />
        <ModalContent bgColor="transparent" boxShadow={'none'}>
          <ModalBody display={'flex'} justifyContent="center">
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
            />
          </ModalBody>
        </ModalContent>
      </Modal>

      <Box>
        {/* <Box position="absolute" bgColor="white" h="40cm" w="100%"></Box> */}
        <Box id="pdfContainer">
          <Flex direction={queryFormat == 'a4' ? 'column' : 'row'}>
            {renderLayout()}
          </Flex>
        </Box>
      </Box>
    </>
  );
}
