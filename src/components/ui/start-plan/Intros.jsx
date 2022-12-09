import React from 'react';
import { Box, Heading, Text, OrderedList, ListItem } from '@chakra-ui/react';

const Card = ({ title, description, isListFormat }) => {
  return (
    <>
      <Box bg="#F1F3F6" maxW="500px" borderRadius={'10px'} px="4" py="3">
        <Heading fontSize="24px" color={'#0978C4'}>
          {title}
        </Heading>
        <Box my="3" px="5">
          <hr />
        </Box>
        {!isListFormat ? (
          <Text>{description}</Text>
        ) : (
          <OrderedList>
            {description.map((d, i) => (
              <ListItem key={i} mb="10px">
                {d}
              </ListItem>
            ))}
          </OrderedList>
        )}
      </Box>
    </>
  );
};

export default function Intros({
  title,
  subtitle,
  overview,
  intro,
  isCard1ListFormat,
  isCard2ListFormat,
}) {
  if (title == 'Quartly Priorities') {
    return (
      <>
        <Card
          title={title}
          description={overview}
          isListFormat={isCard1ListFormat}
        />
        <br />
      </>
    );
  } else {
    return (
      <>
        <Card
          title={title}
          description={overview}
          isListFormat={isCard1ListFormat}
        />
        <br />
        <Card
          title={subtitle}
          description={intro}
          isListFormat={isCard2ListFormat}
        />
      </>
    );
  }
}
