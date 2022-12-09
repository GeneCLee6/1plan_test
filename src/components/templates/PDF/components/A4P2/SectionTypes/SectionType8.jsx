import { ChakraImage } from 'utils/images';
import { useEffect, useRef } from 'react';
const sectionStyles = {
	container: {
		display: 'flex',
		flexDirection: 'column',
		fontSize: '0.6rem',
		textAlign: 'center',
		width: '6cm',
		height: '100%',
	},
	header: {
		padding: '3px',
		height: '25px',
		width: '100%',
		backgroundColor: '#FBEFF5',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	content: {
		fontSize: '8.5px',
		border: '0.1px solid grey',
		height: '100px',
		display: 'flex',
		justifyContent: 'center',
	},
};
const SectionType8 = ({ headerTitle, content, styles }) => {
	const isMounted = useRef(false);
	const imgRef = useRef(null);
	useEffect(() => {
		if (!isMounted.current) {
			isMounted.current = true;
			loadImage(content);
		}
	}, []);
	const loadImage = async (imageLink) => {
		console.log(imageLink);
		const response = await fetch(imageLink);
		const blob = await response.blob();
		const url = URL.createObjectURL(blob.slice(0, 4000));
		imgRef.current.src = url;
	};
	return (
		<>
			<div style={sectionStyles.container}>
				<div style={{ ...sectionStyles.header, ...styles?.header }}>
					<span>{headerTitle}</span>
				</div>

				<div style={{ ...sectionStyles.content, ...styles?.content }}>
					<ChakraImage ref={imgRef} objectFit="cover" height="100%" />
				</div>
			</div>
		</>
	);
};

export default SectionType8;
