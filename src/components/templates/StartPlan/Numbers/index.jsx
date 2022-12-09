import {
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  Progress,
  Text,
  Switch,
} from '@chakra-ui/react';
import { SectionsContext } from 'contexts/SectionsProvider';
import { UserContext } from 'contexts/UserProvider';
import React, { useState, useEffect, useContext } from 'react';
import * as c from './components';
import { introduction, overview, subtitle, title } from './config';
import { getSection5 } from './query';
import { getProgressColour } from '../utils';
import { useSearchParams } from 'react-router-dom';

export default function Numbers() {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryStep = searchParams.get('step');
  const queryFrom = searchParams.get('report');
  const [step, setStep] = useState(queryStep ? queryStep : 1);
  const [isShowPlaceholder, setIsShowPlaceholder] = useState(true);

  const {
    contextValue: {
      numbers: {
        progress,
        totalAnswered,
        page1,
        page2,
        page3,
        page4,
        page5,
        page6,
      },
    },
    setSection,
  } = useContext(SectionsContext);
  const {
    contextValue: { user },
  } = useContext(UserContext);
  useEffect(() => {
    if (user.company) {
      const loadSection = async () => {
        const planRef = user?.company?.planRef;
        if (planRef) {
          const { _id, section5 } = await getSection5(planRef);
          await setSection('numbers', {
            _id,
            progress,
            totalAnswered,
            ...section5,
          });
        }
      };
      loadSection();
    }
  }, [user]);
  useEffect(() => {
    if (queryStep) {
      setStep(queryStep);
      if (queryFrom && queryFrom == 'report') setSearchParams('');
    }
  }, [queryStep]);
  return (
    <>
      <Grid templateColumns={'500px 3fr'} h="100vh">
        <GridItem w={'100'} px="7" border={'1px solid rgba(0,0,0,0.15)'}>
          <br />
          <c.Intros
            title={title}
            subtitle={subtitle}
            overview={overview}
            intro={introduction}
            isCard2ListFormat={true}
          />
          <Box py={'8'} px={'2'} minH="30rem">
            <c.Forum />
          </Box>
        </GridItem>
        <GridItem w={'100%'} bg="#F1F3F6">
          <br />
          <Box px={'5'}>
            <Box mb={'5'}>
              <Flex w="100%" alignItems={'center'}>
                <Box bgColor="#F5F5F5" w="100%">
                  <Progress
                    width={`${progress}%`}
                    height={'8px'}
                    bgColor={getProgressColour(progress)}
                    borderRadius={'6px'}
                  />
                </Box>
                <Text
                  ml="5"
                  color={getProgressColour(progress)}
                  fontWeight={'bold'}
                >
                  {progress}%
                </Text>
              </Flex>
              <Flex
                justifyContent={'end'}
                alignItems="center"
                pt="20px"
                pr="10px"
              >
                <Switch
                  defaultChecked
                  onChange={(e) => {
                    setIsShowPlaceholder(e.target.checked);
                  }}
                />
                <Text ml="10px">
                  {`${isShowPlaceholder ? 'Hide' : 'Show'} hints`}
                </Text>
              </Flex>
            </Box>
            <Box minH={'30rem'}>
              <Heading
                px={'5'}
                py="7"
                fontSize={'16px'}
                bg="#F7F9FA"
                border={'1px solid #E4E5E7'}
              >
                Key Financial Targets
              </Heading>
              {step == 1 && (
                <c.Part1
                  values={page1}
                  setStep={setStep}
                  isShowPlaceholder={isShowPlaceholder}
                />
              )}
              {step == 2 && (
                <c.Part2
                  values={page2}
                  setStep={setStep}
                  isShowPlaceholder={isShowPlaceholder}
                />
              )}
              {step == 3 && (
                <c.Part3
                  values={page3}
                  setStep={setStep}
                  isShowPlaceholder={isShowPlaceholder}
                />
              )}
              {step == 4 && (
                <c.Part4
                  values={page4}
                  setStep={setStep}
                  isShowPlaceholder={isShowPlaceholder}
                />
              )}
              {step == 5 && (
                <c.Part5
                  values={page5}
                  setStep={setStep}
                  isShowPlaceholder={isShowPlaceholder}
                />
              )}
              {step == 6 && (
                <c.Part6
                  values={page6}
                  setStep={setStep}
                  isShowPlaceholder={isShowPlaceholder}
                />
              )}
            </Box>
          </Box>
        </GridItem>
      </Grid>
    </>
  );
}
