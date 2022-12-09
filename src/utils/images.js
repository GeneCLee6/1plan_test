import { chakra, Image } from '@chakra-ui/react';

export const ChakraImage = chakra(Image, {
	shouldForwardProp: (prop) =>
		[
			'width',
			'height',
			'src',
			'alt',
			'objectFit',
			'layout',
			'id',
			'rounded',
			'priority',
			'roundedTop',
			'rounded',
		].includes(prop),
});
