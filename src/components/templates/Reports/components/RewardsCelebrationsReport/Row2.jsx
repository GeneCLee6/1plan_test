import React, { lazy } from 'react';
import { GridItem } from '@chakra-ui/react';
import { CARD_PROPS, CARD4, CARD5, CARD6 } from './configs';
import sectionData from './useSectionData.js';

const Card4 = lazy(() => import('./CardType1'));
const Card5 = lazy(() => import('./CardType2'));
const Card6 = lazy(() => import('./CardType3'));
export default function Row2({ handleNavigation }) {
  return (
    <>
      <GridItem {...CARD_PROPS} onClick={() => handleNavigation(4)}>
        <Card4 {...sectionData().CARD4} />
      </GridItem>
      <GridItem {...CARD_PROPS} onClick={() => handleNavigation(5)}>
        <Card5 {...sectionData().CARD5} />
      </GridItem>
      <GridItem {...CARD_PROPS} onClick={() => handleNavigation(4)}>
        <Card6 {...sectionData().CARD6} />
      </GridItem>
    </>
  );
}
