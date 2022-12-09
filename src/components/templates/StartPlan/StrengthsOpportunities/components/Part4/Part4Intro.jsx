import { Box, Button, Flex, Text, Heading } from '@chakra-ui/react';
import React from 'react';
import { ArrowForwardIcon, ArrowBackIcon } from '@chakra-ui/icons';

export default function Part4Intro({ setStep }) {
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
        Part 4 – ATTRACTING INVESTORS & VALUING YOUR BUSINESS
      </Heading>
      <Box p={'4'} bg="white" border={'1px solid #E4E5E7'}>
        <Box pl={'6'} pr={'10'}>
          <Text>
            You have all watched “Shark Tank” or the like. The thing is Why
            would someone buy into your business? And how does the market value
            your business? As such, you need to be ready to answer the upcoming
            questions.
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
                setStep(3.12);
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
                  setStep(4.2);
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
