import React, { lazy, useContext, useEffect, useRef } from 'react';
import { ChakraImage } from 'utils/images';
import { UserContext } from 'contexts/UserProvider';
import { SectionsContext } from 'contexts/SectionsProvider';

const Row1 = lazy(() => import('./Rows/Row1'));
const Row2 = lazy(() => import('./Rows/Row2'));
const Row3 = lazy(() => import('./Rows/Row3'));
const Row4 = lazy(() => import('./Rows/Row4'));
const Row5 = lazy(() => import('./Rows/Row5'));
const Row6 = lazy(() => import('./Rows/Row6'));

const styles = {
	page: {
		display: 'flex',
		flexDirection: 'column',
		maxWidth: '22cm',
	},
	header: {
		width: '22cm',
		padding: '0 0 2px 3px',
		display: 'flex',
		justifyContent: 'space-between',
	},
	headerTitle: {
		color: '#0088CC',
		fontWeight: '35px',
		paddingBottom: '3px',
	},
};
export default function A4P1() {
	const {
		contextValue: { user },
	} = useContext(UserContext);
	const {
		contextValue: { visionOfSuccess },
	} = useContext(SectionsContext);
	const yearOfBusiness = visionOfSuccess?.part1?.q1?.answers[0].split(' ')[0];
	const headerTitle = `${yearOfBusiness} year business plan`;

	const isMounted = useRef(false);
	const imgRef = useRef(null);
	useEffect(() => {
		if (!isMounted.current) {
			isMounted.current = true;
			loadImage(user?.company?.logoUrl);
		}
	}, []);
	const loadImage = async (imageLink) => {
		const response = await fetch(imageLink);
		const blob = await response.blob();
		const url = URL.createObjectURL(blob.slice(0, 4000));
		imgRef.current.src = url;
	};
	return (
		<>
			<div style={styles.page}>
				<div style={styles.header}>
					<div style={{ padding: '2px 0 0 35px' }}>
						<ChakraImage
							ref={imgRef}
							alt="logo.png"
							width="30px"
							height="20px"
							objectFit="contain"
						/>
					</div>
					<div style={styles.headerTitle}>{headerTitle}</div>
					<div style={{ ...styles.headerTitle, paddingRight: '30px' }}>
						{user?.company?.businessName}
					</div>
				</div>
				<Row1 />
				<Row2 />
				<Row3 />
				<Row4 />
				<Row5 />
				<Row6 />
			</div>
		</>
	);
}
