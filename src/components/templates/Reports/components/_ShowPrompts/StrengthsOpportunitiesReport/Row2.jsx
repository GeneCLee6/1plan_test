import React, { lazy } from 'react';
import { GridItem, Text } from '@chakra-ui/react';
import { CARD_PROPS, CARD5, CARD6, CARD7, CARD8, CARD9 } from './configs';
import sectionData from './useSectionData.js';

const Card5 = lazy(() => import('./CardType2'));
const Card6 = lazy(() => import('./CardType2'));
const Card7 = lazy(() => import('./CardType2'));
const Card8 = lazy(() => import('./CardType2'));
const Card9 = lazy(() => import('./CardType2'));

const NewProps = {
	cursor: 'pointer',
	...CARD_PROPS,
};

export default function Row2({ handleNavigation }) {
	return (
		<>
			<GridItem {...NewProps} onClick={() => handleNavigation(3.2)}>
				<Card5 {...CARD5} />
			</GridItem>
			<GridItem {...CARD_PROPS}>
				<Card6 {...CARD6} />
			</GridItem>
			<GridItem {...NewProps} onClick={() => handleNavigation(3.3)}>
				<Card7 {...CARD7} />
			</GridItem>
			<GridItem {...NewProps} onClick={() => handleNavigation(3.4)}>
				<Card8 {...CARD8} />
			</GridItem>
			<GridItem {...NewProps} onClick={() => handleNavigation(3.5)}>
				<Card9 {...CARD9} />
			</GridItem>
		</>
	);
}
