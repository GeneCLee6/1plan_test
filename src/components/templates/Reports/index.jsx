import React, { useState, useEffect, useRef, useContext } from 'react';
import {
  Box,
  Text,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Flex,
  Center,
} from '@chakra-ui/react';
import usePlanSectionsAccordionItems from './configs';
import './styles.css';
import { useSearchParams } from 'react-router-dom';
import { UserContext } from 'contexts/UserProvider';
import { SectionsContext } from 'contexts/SectionsProvider';
import { getPlanAllPlanSections } from 'services/firestore';

export default function Reports() {
  const {
    contextValue: { user },
  } = useContext(UserContext);
  const { contextValue, setSection } = useContext(SectionsContext);
  const isMounted = useRef(false);

  const planSectionsAccordionItems = usePlanSectionsAccordionItems();
  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;

      // handleDownload();
    }
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

  const [searchParams, setSearchParams] = useSearchParams();
  const queryReportIndex = searchParams.get('report-index');
  const defaultIndex = queryReportIndex ? [+queryReportIndex] : [];
  return (
    <>
      <Box bgColor="#FFFFFF" h="100%" p={6} rounded="md" boxShadow="base">
        <Accordion
          allowToggle
          className="reports-container"
          defaultIndex={defaultIndex}
        >
          {planSectionsAccordionItems.map((x, i) => (
            <AccordionItem key={i} mb="14px">
              <h2>
                <AccordionButton bgColor={x.labelBgColor}>
                  <Flex justifyContent={'space-between'} w="100%" color="white">
                    <Text>{x.label}</Text>
                    <Text>{x.description}</Text>
                  </Flex>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <Center>
                <AccordionPanel pb={4} overflowX={'auto'}>
                  {x.content}
                </AccordionPanel>
              </Center>
            </AccordionItem>
          ))}
        </Accordion>
      </Box>
    </>
  );
}
