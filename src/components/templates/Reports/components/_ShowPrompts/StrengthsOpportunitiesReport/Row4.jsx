import React, { lazy } from 'react';
import { GridItem, Text } from '@chakra-ui/react';
import {
  CARD_PROPS,
  CARD_THIRD_PROPS,
  CARD15,
  CARD16,
  CARD17,
} from './configs';
import sectionData from './useSectionData.js';

const Card15 = lazy(() => import('./CardType4'));
const Card16 = lazy(() => import('./CardType4'));
const Card17 = lazy(() => import('./CardType4'));

const NewProps = {
  cursor: 'pointer',
  ...CARD_THIRD_PROPS,
};

export default function Row4({ handleNavigation }) {
  return (
    <>
      <GridItem {...NewProps} onClick={() => handleNavigation(4.2)}>
        <Card15 {...CARD15} />
      </GridItem>
      <GridItem {...NewProps} onClick={() => handleNavigation(4.3)}>
        <Card16 {...CARD16} />
      </GridItem>
      <GridItem {...NewProps} onClick={() => handleNavigation(4.4)}>
        <Card17 {...CARD17} />
      </GridItem>
    </>
  );
}
