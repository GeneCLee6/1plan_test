import React from 'react';
import { Box, Heading, Flex, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

export default function SectionType1({ title, list }) {
  const navigate = useNavigate();
  const handleNavigation = (questionIndex) => {
    switch (questionIndex) {
      case 0:
        navigate(`/start-plan/vision-of-success?step=1.3`);
        break;
      case 1:
        navigate(`/start-plan/vision-of-success?step=1.3`);
        break;
      case 2:
        navigate(`/start-plan/vision-of-success?step=1.4`);
        break;
    }
  };
  return (
    <>
      <Box>
        <Heading size="sm" py="2" textAlign={'center'} bgColor="#EFF1F1">
          {title}
        </Heading>
      </Box>
      <Box py="2" px="5">
        {list.map(({ label, question, answer }, i) => (
          <Flex
            flexDirection="column"
            key={i}
            mb="7px"
            onClick={() => handleNavigation(i)}
          >
            <Text fontSize={'13px'} fontWeight="bold" w="100%">
              {label}
            </Text>
            <Text fontSize={'13px'} w="100%">
              {question}
            </Text>
            <Text
              fontSize={'13px'}
              bgColor={'#F1F3F6'}
              my="2"
              py="2"
              px="2"
              w="100%"
              cursor={'pointer'}
              h={'98px'}
            >
              {answer}
            </Text>
          </Flex>
        ))}
      </Box>
    </>
  );
}
