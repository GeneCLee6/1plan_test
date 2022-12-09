import { Box, Button, Flex, Text, Heading } from '@chakra-ui/react';
import React from 'react';
import { ArrowForwardIcon, ArrowBackIcon } from '@chakra-ui/icons';

export default function Part3Intro({ setStep }) {
  return (
    <>
      <Heading
        px={'5'}
        py="7"
        fontSize={'20px'}
        fontWeight={'700'}
        bg="#F7F9FA"
        border={'1px solid #E4E5E7'}
      >
        Part 3 – DRIVERS AND KPIs
      </Heading>
      <Box p={'4'} bg="white" border={'1px solid #E4E5E7'}>
        <Box pl={'6'} pr={'10'}>
          <Text>
            In this section, we drill down on what makes your business "tick".
            We will look at natural constraints such as trading days in a year,
            as well as the processes required to bring your product or service
            to market and collect payment. Understanding your business is
            critical, as not all businesses are created equal. Increasing
            advertising to drive sales for a subscription business may have a
            very different outcome if the same strategy is applied to a Labour
            Hire company.
          </Text>
          <br />
          <Flex my={'49px'} justifyContent="end">
            <Button
              name="submitBtn"
              type="submit"
              w="10rem"
              bgColor="rgba(1,113,187,0.9)"
              borderRadius="20px"
              leftIcon={<ArrowBackIcon boxSize="1.3rem" color={'white'} />}
              value={'Previous'}
              onClick={() => {
                setStep(2.2);
              }}
            >
              <Text color={'white'} fontSize="1.1rem" fontWeight="bold">
                Previous
              </Text>
            </Button>
            <Box mx={'5'}>
              <Button
                name="submitBtn"
                type="submit"
                w="10rem"
                bgColor="rgba(1,113,187,0.9)"
                borderRadius="20px"
                rightIcon={
                  <ArrowForwardIcon boxSize="1.3rem" color={'white'} />
                }
                value={'Continue'}
                onClick={() => {
                  setStep(3.2);
                }}
              >
                <Text color={'white'} fontSize="1.1rem" fontWeight="bold">
                  Continue
                </Text>
              </Button>
            </Box>
          </Flex>
        </Box>
      </Box>
    </>
  );
}
