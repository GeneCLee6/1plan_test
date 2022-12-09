import React from 'react';
import {
  Box,
  Heading,
  Flex,
  Text,
  TableContainer,
  Table,
  Tbody,
  Tr,
  Td,
  Image,
  Grid,
} from '@chakra-ui/react';
import './cardType1.css';
import { useNavigate } from 'react-router-dom';

export default function SectionType1({
  title,
  info,
  revenue,
  cost,
  ebit,
  data,
}) {
  const navigate = useNavigate();
  const handleNavigationCol1 = (i) => {
    switch (i) {
      case 0:
        navigate(`/start-plan/numbers?step=1&from=report`);
        break;
      case 1:
        navigate(`/start-plan/numbers?step=2&from=report`);
        break;
      case 2:
        navigate(`/start-plan/numbers?step=2&from=report`);
        break;
    }
  };
  const handleNavigationCol2 = (i) => {
    switch (i) {
      case 0:
        navigate(`/start-plan/numbers?step=6&from=report`);
        break;
      case 1:
        navigate(`/start-plan/numbers?step=2&from=report`);
        break;
      case 2:
        navigate(`/start-plan/numbers?step=5&from=report`);
        break;
    }
  };
  const handleNavigationRow3 = (i) => {
    switch (i) {
      case 0:
        navigate(`/start-plan/numbers?step=3&from=report`);
        break;
      case 1:
        navigate(`/start-plan/numbers?step=4&from=report`);
        break;
      case 2:
        navigate(`/start-plan/numbers?step=4&from=report`);
      case 3:
        navigate(`/start-plan/numbers?step=5&from=report`);
        break;
    }
  };
  const handleNavigationRow4 = (i) => {
    switch (i) {
      case 0:
        navigate(`/start-plan/numbers?step=5&from=report`);
        break;
      case 1:
        navigate(`/start-plan/numbers?step=6&from=report`);
        break;
      case 2:
        navigate(`/start-plan/numbers?step=6&from=report`);
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
      <Box ml="8px">
        <TableContainer>
          <Table variant="unstyled" className="table">
            <Tbody>
              {info.map(({ label1, content1, label2, content2 }, i) => (
                <Tr key={i}>
                  <Td p="0">
                    <Text
                      color="#4D4343"
                      fontSize={'12px'}
                      my="7px"
                      whiteSpace={'normal'}
                    >
                      {label1}
                    </Text>
                  </Td>
                  <Td>
                    <Text
                      bgColor="#F1F3F6"
                      fontSize={'12px'}
                      my="7px"
                      whiteSpace={'normal'}
                      onClick={() => handleNavigationCol1(i)}
                      cursor={'pointer'}
                      w={'68px'}
                      h={'25px'}
                    >
                      {content1}
                    </Text>
                  </Td>
                  <Td p="0">
                    <Text
                      color="#4D4343"
                      fontSize={'12px'}
                      my="7px"
                      ml="3px"
                      whiteSpace={'normal'}
                    >
                      {label2}
                    </Text>
                  </Td>
                  <Td>
                    <Text
                      bgColor="#F1F3F6"
                      fontSize={'12px'}
                      my="7px"
                      whiteSpace={'normal'}
                      cursor={'pointer'}
                      w={'68px'}
                      h={'25px'}
                      onClick={() => handleNavigationCol2(i)}
                    >
                      {content2}
                    </Text>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>

      <Box ml="8px">
        <TableContainer>
          <Table variant="unstyled" className="table">
            <Tbody>
              <Tr>
                <Td p="0">
                  <Text
                    color="#4D4343"
                    fontSize={'12px'}
                    my="7px"
                    whiteSpace={'normal'}
                  >
                    Revenue
                  </Text>
                </Td>
                <Td>
                  <Text
                    bgColor="#F1F3F6"
                    fontSize={'12px'}
                    my="7px"
                    whiteSpace={'normal'}
                    textAlign={'end'}
                    h={'25px'}
                    ml="48px"
                    minWidth={'70px'}
                  >
                    {revenue}
                  </Text>
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
      </Box>

      <Box ml="8px">
        <TableContainer>
          <Table variant="unstyled" className="table">
            <Tbody>
              {cost.map(({ label, percentage, money }, i) => (
                <Tr key={i}>
                  <Td p="0">
                    <Text
                      color="#4D4343"
                      fontSize={'12px'}
                      my="7px"
                      whiteSpace={'normal'}
                      w="100px"
                    >
                      {label}
                    </Text>
                  </Td>
                  <Td>
                    <Text
                      bgColor="#F1F3F6"
                      fontSize={'12px'}
                      my="7px"
                      whiteSpace={'normal'}
                      w="100%"
                      px="3px"
                      py="3px"
                      cursor={'pointer'}
                      h={'25px'}
                      minWidth={'40px'}
                      onClick={() => handleNavigationRow3(i)}
                    >
                      {percentage}
                    </Text>
                  </Td>
                  <Td>
                    <Text
                      bgColor="#F1F3F6"
                      fontSize={'12px'}
                      my="7px"
                      whiteSpace={'normal'}
                      w="100%"
                      px="3px"
                      py="3px"
                      textAlign={'end'}
                      h={'25px'}
                      minWidth={'80px'}
                    >
                      {money}
                    </Text>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
      <Box ml="8px">
        <TableContainer>
          <Table variant="unstyled" className="table">
            <Tbody>
              <Tr>
                <Td p="0">
                  <Text
                    color="#4D4343"
                    fontSize={'12px'}
                    my="7px"
                    whiteSpace={'normal'}
                  >
                    EBIT
                  </Text>
                </Td>
                <Td>
                  <Text
                    bgColor="#F1F3F6"
                    textAlign={'end'}
                    fontSize={'12px'}
                    my="7px"
                    minWidth={'33px'}
                    h={'25px'}
                    whiteSpace={'normal'}
                  >
                    {ebit}
                  </Text>
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
      </Box>

      <Box ml="8px">
        <TableContainer>
          <Table variant="unstyled" className="table">
            <Tbody>
              {data.map(({ label1, content1, label2, content2 }, i) => (
                <Tr key={i}>
                  <Td p="0">
                    <Text
                      color="#4D4343"
                      fontSize={'12px'}
                      my="7px"
                      whiteSpace={'normal'}
                    >
                      {label1}
                    </Text>
                  </Td>
                  <Td>
                    <Text
                      bgColor="#F1F3F6"
                      fontSize={'12px'}
                      my="7px"
                      whiteSpace={'normal'}
                      cursor={'pointer'}
                      h={'25px'}
                      minWidth={'30px'}
                      onClick={() => handleNavigationRow4(i)}
                    >
                      {content1}
                    </Text>
                  </Td>
                  <Td p="0">
                    <Text
                      color="#4D4343"
                      fontSize={'12px'}
                      my="7px"
                      ml="3px"
                      whiteSpace={'normal'}
                    >
                      {label2}
                    </Text>
                  </Td>
                  <Td>
                    <Text
                      bgColor="#F1F3F6"
                      fontSize={'12px'}
                      h={'25px'}
                      minWidth={'30px'}
                      my="7px"
                      whiteSpace={'normal'}
                    >
                      {content2}
                    </Text>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}
