import { Text, Box, Flex, Button, Heading } from '@chakra-ui/react';
import { ArrowForwardIcon, ArrowBackIcon } from '@chakra-ui/icons';

import React from 'react';

export default function Part2Intro({ setStep }) {
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
        Part 2 – OPPORTUNITIES AND THREATS
      </Heading>
      <Box p={'4'} bg="white" border={'1px solid #E4E5E7'}>
        <Box pl={'6'} pr={'10'}>
          <Text>
            In this section, we are focusing on external factors. These are
            factors beyond your control. Consider trends, and factors like the
            environment (global warming), changing government policies (energy
            policy), new technologies (renewables). Think about the impact the
            factors you identified are having on your business. Classic examples
            of businesses that did not make the change are Yellow Pages vs
            Google, the printing industry vs the Internet, Kodak Film vs digital
            cameras, followed by mobile phone cameras. The list is endless so
            make sure your business is on the right side of history. Classic
            examples of businesses that did not make the change are Yellow Pages
            vs Google, the printing industry vs the Internet, Kodak Film vs
            digital cameras, followed by mobile phone cameras. The list is
            endless, so make sure your business is on the right side of history.
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
              onClick={(value) => {
                setStep(1.2);
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
                onClick={(value) => {
                  setStep(2.2);
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
