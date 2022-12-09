import React, { lazy } from 'react';
import { GridItem, Text } from '@chakra-ui/react';
import { CARD_PROPS, CARD1, CARD2, CARD3, CARD4 } from './configs';
import sectionData from './useSectionData.js';

const Card1 = lazy(() => import('./CardType1'));
const Card2 = lazy(() => import('./CardType2'));
const Card3 = lazy(() => import('./CardType2'));
const Card4 = lazy(() => import('./CardType3'));

const NewProps = {
  cursor: 'pointer',
  ...CARD_PROPS,
};

export default function Row1({ handleNavigation }) {
  return (
    <>
      <GridItem {...CARD_PROPS}>
        <Card1 {...sectionData().CARD1} />
      </GridItem>
      <GridItem {...NewProps} onClick={() => handleNavigation(2.6)}>
        <Card2 {...sectionData().CARD2} />
      </GridItem>
      <GridItem {...NewProps} onClick={() => handleNavigation(2.7)}>
        <Card3 {...sectionData().CARD3} />
      </GridItem>
      <GridItem {...NewProps} onClick={() => handleNavigation(1.5)}>
        <Card4 {...sectionData().CARD4} />
      </GridItem>
    </>
  );
}
