import React, { lazy } from 'react';
import { GridItem, Text } from '@chakra-ui/react';
import { CARD_PROPS, CARD10, CARD11, CARD12, CARD13, CARD14 } from './configs';
import sectionData from './useSectionData.js';

const Card10 = lazy(() => import('./CardType2'));
const Card11 = lazy(() => import('./CardType2'));
const Card12 = lazy(() => import('./CardType2'));
const Card13 = lazy(() => import('./CardType2'));
const Card14 = lazy(() => import('./CardType2'));

const NewProps = {
  cursor: 'pointer',
  ...CARD_PROPS,
};

export default function Row3({ handleNavigation }) {
  return (
    <>
      <GridItem {...NewProps} onClick={() => handleNavigation(3.7)}>
        <Card10 {...sectionData().CARD10} />
      </GridItem>
      <GridItem {...NewProps} onClick={() => handleNavigation(3.8)}>
        <Card11 {...sectionData().CARD11} />
      </GridItem>
      <GridItem {...NewProps} onClick={() => handleNavigation(3.9)}>
        <Card12 {...sectionData().CARD12} />
      </GridItem>
      <GridItem {...NewProps} onClick={() => handleNavigation(3.11)}>
        <Card13 {...sectionData().CARD13} />
      </GridItem>
      <GridItem {...NewProps} onClick={() => handleNavigation(3.12)}>
        <Card14 {...sectionData().CARD14} />
      </GridItem>
    </>
  );
}
