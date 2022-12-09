import React, { lazy } from 'react';
import { GridItem } from '@chakra-ui/react';
import { CARD_PROPS, CARD7, CARD8, CARD9 } from './configs';
import sectionData from './useSectionData.js';

const Card7 = lazy(() => import('./CardType1'));
const Card8 = lazy(() => import('./CardType2'));
const Card9 = lazy(() => import('./CardType3'));
export default function Row3({ handleNavigationToVision }) {
  return (
    <>
      <GridItem {...CARD_PROPS} onClick={() => handleNavigationToVision(4.14)}>
        <Card7 {...sectionData().CARD7} />
      </GridItem>
      <GridItem {...CARD_PROPS} onClick={() => handleNavigationToVision(4.15)}>
        <Card8 {...sectionData().CARD8} />
      </GridItem>
      <GridItem {...CARD_PROPS} onClick={() => handleNavigationToVision(4.14)}>
        <Card9 {...sectionData().CARD9} />
      </GridItem>
    </>
  );
}
