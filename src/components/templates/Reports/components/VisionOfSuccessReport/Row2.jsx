import React, { lazy } from 'react';
import { GridItem } from '@chakra-ui/react';
import { CARD_PROPS } from './configs';
import sectionData from './useSectionData.js';

const Card5 = lazy(() => import('./CardType4'));
const Card6 = lazy(() => import('./CardType5'));
const Card7 = lazy(() => import('./CardType5'));
const Card8 = lazy(() => import('./CardType5'));

const NewProps = {
  cursor: 'pointer',
  ...CARD_PROPS,
};

export default function Row2({ handleNavigation }) {
  return (
    <>
      <GridItem {...NewProps} onClick={() => handleNavigation(1.4)}>
        <Card5 {...sectionData().CARD5} />
      </GridItem>
      <GridItem {...NewProps} onClick={() => handleNavigation('3.11')}>
        <Card6 {...sectionData().CARD6} />
      </GridItem>
      <GridItem {...NewProps} onClick={() => handleNavigation('3.10')}>
        <Card7 {...sectionData().CARD7} />
      </GridItem>
      <GridItem {...NewProps} onClick={() => handleNavigation(3.9)}>
        <Card8 {...sectionData().CARD8} />
      </GridItem>
    </>
  );
}
