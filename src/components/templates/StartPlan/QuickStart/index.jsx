import React, { useEffect, useState, useContext } from 'react';
import {
  Grid,
  GridItem,
  Box,
  Progress,
  Text,
  Flex,
  Switch,
} from '@chakra-ui/react';
import { title, overview, introduction } from './configs';
import { getSection1 } from './query';
import * as c from './components';
import { SectionsContext } from 'contexts/SectionsProvider';
import { UserContext } from 'contexts/UserProvider';
import { getProgressColour } from '../utils';
import { useSearchParams } from 'react-router-dom';

export default function QuickStart() {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryStep = searchParams.get('step');
  const queryFrom = searchParams.get('report');
  const [step, setStep] = useState(queryStep ?? 1);
  const [intros, setIntros] = useState({
    title,
    subtitle: 'Introduction',
    overview,
    intro: introduction,
    isCard1ListFormat: false,
    isCard2ListFormat: false,
  });

  const {
    contextValue: {
      quickStart: { progress, totalAnswered, part1, part2, part3 },
    },
    setSection,
  } = useContext(SectionsContext);
  const {
    contextValue: { user },
  } = useContext(UserContext);

  const [isShowPlaceholder, setIsShowPlaceholder] = useState(true);
  useEffect(() => {
    if (user.company) {
      const loadSection = async () => {
        const planRef = user?.company?.planRef;
        if (planRef) {
          const { _id, section1 } = await getSection1(planRef);
          await setSection('quickStart', {
            _id,
            progress,
            totalAnswered,
            ...section1,
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
      <Grid templateColumns="500px 3fr" h="100vh">
        <GridItem w="100%" px="7">
          <br />
          <c.Intros {...intros} />
          <Box py="8" px="2" minH="30rem">
            <c.Forum />
          </Box>
        </GridItem>
        <GridItem w="100%" bg="#F1F3F6">
          <br />
          <Box px="5">
            <Box mb="5">
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
                  fontWeight="bold"
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
            <Box minH="30rem">
              {step == 1 && (
                <c.Part1
                  values={part1?.q1?.answers}
                  setStep={setStep}
                  isShowPlaceholder={isShowPlaceholder}
                />
              )}
              {step == 2.1 && (
                <c.Part2Q2
                  values={part2?.q2?.answers}
                  setStep={setStep}
                  setIntros={setIntros}
                  isShowPlaceholder={isShowPlaceholder}
                />
              )}
              {step == 2.2 && (
                <c.Part2Q3
                  values={part2?.q3?.answers}
                  setStep={setStep}
                  setIntros={setIntros}
                  isShowPlaceholder={isShowPlaceholder}
                />
              )}
              {step == 2.3 && (
                <c.Part2Q4
                  values={part2?.q4?.answers}
                  setStep={setStep}
                  setIntros={setIntros}
                  isShowPlaceholder={isShowPlaceholder}
                />
              )}
              {step == 2.4 && (
                <c.Part2Q5
                  values={part2?.q5?.answers}
                  setStep={setStep}
                  setIntros={setIntros}
                  isShowPlaceholder={isShowPlaceholder}
                />
              )}
              {step == 2.5 && (
                <c.Part2Q6
                  values={part2?.q6?.answers}
                  setStep={setStep}
                  setIntros={setIntros}
                  isShowPlaceholder={isShowPlaceholder}
                />
              )}
              {step == 2.6 && (
                <c.Part2Q7
                  values={part2?.q7?.answers}
                  setStep={setStep}
                  setIntros={setIntros}
                  isShowPlaceholder={isShowPlaceholder}
                />
              )}
              {step == 3 && (
                <c.Part3
                  values={part3}
                  setStep={setStep}
                  setIntros={setIntros}
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
