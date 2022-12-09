import React, { lazy } from 'react';
import { GridItem } from '@chakra-ui/react';
import { CARD_PROPS, CARD5, CARD6, CARD7, CARD8 } from './configs';
import sectionData from './useSectionData.js';

const Card5 = lazy(() => import('./CardType4'));
const Card6 = lazy(() => import('./CardType4'));
const Card7 = lazy(() => import('./CardType4'));
const Card8 = lazy(() => import('./CardType4'));

export default function Row2({ handleNavigation }) {
	return (
		<>
			<GridItem {...CARD_PROPS} onClick={() => handleNavigation(2.4)}>
				<Card5 {...CARD5} />
			</GridItem>
			<GridItem {...CARD_PROPS} onClick={() => handleNavigation(2.5)}>
				<Card6 {...CARD6} />
			</GridItem>
			<GridItem {...CARD_PROPS} onClick={() => handleNavigation(2.6)}>
				<Card7 {...CARD7} />
			</GridItem>
			<GridItem {...CARD_PROPS} onClick={() => handleNavigation(2.1)}>
				<Card8 {...CARD8} />
			</GridItem>
		</>
	);
}
