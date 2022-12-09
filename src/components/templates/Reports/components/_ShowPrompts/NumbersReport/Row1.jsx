import React, { lazy } from 'react';
import { GridItem, Text } from '@chakra-ui/react';
import { CARD_PROPS, CARD1, CARD2, CARD3, CARD4 } from './configs';
import sectionData from './useSectionData.js';

const Card1 = lazy(() => import('./CardType1'));
const Card2 = lazy(() => import('./CardType1'));
const Card3 = lazy(() => import('./CardType1'));
const Card4 = lazy(() => import('./CardType1'));
export default function Row1() {
	return (
		<>
			<GridItem {...CARD_PROPS}>
				<Card1 {...CARD1} />
			</GridItem>
			<GridItem {...CARD_PROPS}>
				<Card2 {...CARD2} />
			</GridItem>
			<GridItem {...CARD_PROPS}>
				<Card3 {...CARD3} />
			</GridItem>
			<GridItem {...CARD_PROPS}>
				<Card4 {...CARD4} />
			</GridItem>
		</>
	);
}
