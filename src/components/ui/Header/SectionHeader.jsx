import {
  Box,
  Center,
  Flex,
  Icon,
  Text,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Tooltip,
  Button,
} from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from 'react';
import { AiOutlineHome } from 'react-icons/ai';
import { FaBook } from 'react-icons/fa';
import { TriangleDownIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router';
import { getPlanAllPlanSections } from 'services/firestore';
import { UserContext } from 'contexts/UserProvider';
export default function SectionHeader(path) {
  const navigate = useNavigate();
  const [section1Progress, setSection1Progress] = useState(0);
  const {
    contextValue: { user },
  } = useContext(UserContext);
  useEffect(() => {
    const loadPlanSections = async () => {
      if (user.company.planRef) {
        const [section1] = (
          await getPlanAllPlanSections(user.company.planRef)
        ).map((s, i) => s[`section${i + 1}`]);
        console.log('s', section1);
        const { progress: progress1 } = section1;
        if (progress1) setSection1Progress(progress1);
      }
    };
    loadPlanSections();
  });
  return (
    <>
      <Center ml={'81px'} mr={'81px'} width={'60%'}>
        <Flex
          width={'100%'}
          justifyContent={'space-evenly'}
          alignItems={'center'}
        >
          <Box w={'140px'} cursor={'pointer'}>
            <Menu>
              <MenuButton
                border={'1px solid #D9D9D9'}
                p={2}
                w={'140px'}
                borderRadius={'8px'}
              >
                Start Here
                <TriangleDownIcon ml={2} />
              </MenuButton>
              <MenuList mt={2}>
                <MenuItem
                  onClick={() => {
                    navigate('/start-plan/quick-start?step=1');
                  }}
                >
                  <Text textAlign={'center'} w="100%">
                    Quick Start
                  </Text>
                </MenuItem>
                <hr />

                <MenuItem>
                  <Tooltip
                    label={
                      section1Progress > 0
                        ? ''
                        : 'Please start Quick Start Section first'
                    }
                    fontSize="lg"
                    placement="top"
                    bg="blue.300"
                  >
                    <Box w="100%">
                      <Button
                        variant="unstyled"
                        isDisabled={section1Progress <= 0}
                        onClick={() => {
                          navigate('/start-plan/rewards-celebrations?page=1');
                        }}
                        textAlign="center"
                        w="100%"
                      >
                        <Text
                          textAlign={'center'}
                          w="100%"
                          fontWeight={'normal'}
                        >
                          Rewards & Celebrations
                        </Text>
                      </Button>
                    </Box>
                  </Tooltip>
                </MenuItem>

                <hr />
                <MenuItem
                  onClick={() => {
                    navigate('/start-plan/strengths-opportunities?step=1.1');
                  }}
                >
                  <Text textAlign={'center'} w="100%">
                    Strength & Oppotunities
                  </Text>
                </MenuItem>
                <hr />
                <MenuItem
                  onClick={() => {
                    navigate('/start-plan/vision-of-success?step=1.1');
                  }}
                >
                  <Text textAlign={'center'} w="100%">
                    Vision of Success
                  </Text>
                </MenuItem>
                <hr />
                <MenuItem
                  onClick={() => {
                    navigate('/start-plan/numbers?step=1');
                  }}
                >
                  <Text textAlign={'center'} w="100%">
                    Numbers
                  </Text>
                </MenuItem>
              </MenuList>
            </Menu>
          </Box>
          <Box
            border={'1px solid #D9D9D9'}
            p={'2'}
            w={'140px'}
            borderRadius={'8px'}
            cursor={'pointer'}
            onClick={() => {
              navigate('/home/dashboard');
            }}
          >
            <Flex justifyContent={'center'}>
              <Icon as={AiOutlineHome} w={6} h={6}></Icon>
              <Text ml={2} fontSize={'16px'}>
                Dashboard
              </Text>
            </Flex>
          </Box>
          <Box
            border={'1px solid #D9D9D9'}
            p={'2'}
            w={'140px'}
            borderRadius={'8px'}
            cursor={'pointer'}
            onClick={() => {
              navigate('/reports');
            }}
          >
            <Flex justifyContent={'center'}>
              <Avatar size="xs" src={require('assets/images/icon.png')} />
              <Text ml={2} fontSize={'16px'} whiteSpace={'nowrap'}>
                1 Plan
              </Text>
            </Flex>
          </Box>
          {/* <Box
            border={'1px solid #D9D9D9'}
            p={'2'}
            w={'140px'}
            borderRadius={'8px'}
            cursor={'pointer'}
          >
            <Flex justifyContent={'center'}>
              <Icon as={FaBook} w={6} h={6}></Icon>
              <Text ml={2} fontSize={'16px'}>
                Reports
              </Text>
            </Flex>
          </Box> */}
        </Flex>
      </Center>
    </>
  );
}
