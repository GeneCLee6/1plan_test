import React, { lazy } from 'react';
import { GridItem, Text } from '@chakra-ui/react';
import { CARD_PROPS, CARD1, CARD2, CARD3 } from './configs';
import sectionData from './useSectionData.js';

const Card1 = lazy(() => import('./CardType1'));
const Card2 = lazy(() => import('./CardType2'));
const Card3 = lazy(() => import('./CardType3'));
export default function Row1({ handleNavigation }) {
  return (
    <>
      <GridItem {...CARD_PROPS} onClick={() => handleNavigation(2)}>
        <Card1 {...sectionData().CARD1} />
      </GridItem>
      <GridItem {...CARD_PROPS} onClick={() => handleNavigation(3)}>
        <Card2 {...sectionData().CARD2} />
      </GridItem>
      <GridItem {...CARD_PROPS} onClick={() => handleNavigation(2)}>
        <Card3 {...sectionData().CARD3} />
      </GridItem>
    </>
  );
}
