import { Center, Flex, Box } from '@chakra-ui/react';
import React, { lazy, useContext, useState, useEffect } from 'react';
import {
  DEFAULT_BORDER_RADIUS,
  DEFAULT_BOX_SHADOW,
  DEFAULT_BORDER,
} from '../../config';
import { ChakraImage } from 'utils/images';
import { UserContext } from 'contexts/UserProvider';
import { getDocByRef } from 'services/firestore';

const CenterCard = ({ label, image, count }) => {
  return (
    <>
      <Center
        bg="white"
        h="205px"
        w="200px"
        border={DEFAULT_BORDER}
        borderRadius={DEFAULT_BORDER_RADIUS}
        boxShadow={DEFAULT_BOX_SHADOW}
      >
        <Flex flexDirection={'column'} alignItems={'center'}>
          <Box>
            <ChakraImage src={image} width="110px" height="110px" />
          </Box>
          <Box fontWeight={'semibold'} fontSize={'16px'}>
            {label}
          </Box>
          <Box fontWeight={'bold'} color={'#0071BD'}>
            {count}
          </Box>
        </Flex>
      </Center>
    </>
  );
};

export default function Stats({}) {
  const {
    contextValue: { user },
  } = useContext(UserContext);
  const totalPlans = user.company?.planRefs?.length;
  const [planProgress, setPlanProgress] = useState(0);
  const [completedQuestions, setCompletedQuestions] = useState(0);
  const planRef = user.company.planRef;
  useEffect(() => {
    const initData = async () => {
      console.log('fkfkfkkf', planRef);
      if (planRef && planRef != undefined) {
        const plan = await getDocByRef(planRef);
        const { planSectionRefs } = plan;
        const sections = await Promise.all(
          planSectionRefs.map(async (ref) => await getDocByRef(ref))
        );
        const totalAnswereds = sections.map((s, i) => {
          const totalAnswered = s[`section${i + 1}`].totalAnswered;
          return totalAnswered ? totalAnswered : 0;
        });
        const completedQuestions = totalAnswereds.reduce(
          (sum, value) => sum + value,
          0
        );

        setCompletedQuestions(completedQuestions);
        const progresses = sections.map((s, i) => {
          const progress = s[`section${i + 1}`].progress;
          return progress ? progress : 0;
        });
        const completedProgress = progresses.reduce((sum, value) => {
          if (value == 100) return sum + +value;
          return sum + 0;
        }, 0);
        const planProgress = Math.ceil(completedProgress) / progresses.length;
        setPlanProgress(planProgress.toFixed());
      } else {
        setCompletedQuestions(0);
        setPlanProgress(0);
      }
    };
    initData();
  }, [planRef, user.company]);
  const stats = [
    {
      image: require('assets/images/01-total-questions.png'),
      label: 'Total Questions',
      count: 63,
    },
    {
      image: require('assets/images/02-completed-questions.png'),
      label: 'Completed Questions',
      count: completedQuestions,
    },
    {
      image: require('assets/images/03-in-progress.png'),
      label: 'Plan Progress',
      count: `${planProgress}%`,
    },
    {
      image: require('assets/images/04-not-started.png'),
      label: 'Current Plans',
      count: totalPlans ? totalPlans : 0,
    },
  ];
  return (
    <>
      <Flex justifyContent={'space-evenly'}>
        {stats.map(({ image, label, count }, i) => (
          <CenterCard key={i} image={image} label={label} count={count} />
        ))}
      </Flex>
    </>
  );
}
