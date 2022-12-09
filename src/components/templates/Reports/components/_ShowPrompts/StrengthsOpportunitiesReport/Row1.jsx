import React, { lazy } from 'react';
import { GridItem, Text } from '@chakra-ui/react';
import { CARD_PROPS, CARD1, CARD2, CARD3, CARD4 } from './configs';
import sectionData from './useSectionData.js';

const Card1 = lazy(() => import('./CardType1'));
const Card2 = lazy(() => import('./CardType1'));
const Card3 = lazy(() => import('./CardType1'));
const Card4 = lazy(() => import('./CardType1'));

const NewProps = {
	cursor: 'pointer',
	...CARD_PROPS,
};

export default function Row1({ handleNavigation }) {
	return (
		<>
			<GridItem {...NewProps} onClick={() => handleNavigation(1.2)}>
				<Card1 {...CARD1} />
			</GridItem>
			<GridItem {...NewProps} onClick={() => handleNavigation(1.2)}>
				<Card2 {...CARD2} />
			</GridItem>
			<GridItem {...NewProps} onClick={() => handleNavigation(2.2)}>
				<Card3 {...CARD3} />
			</GridItem>
			<GridItem {...NewProps} onClick={() => handleNavigation(2.2)}>
				<Card4 {...CARD4} />
			</GridItem>
		</>
	);
}
