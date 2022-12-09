import React, { lazy, useContext, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import AppWrapper from './AppWrapper';
import { ChakraProvider } from '@chakra-ui/react';

const Contexts = lazy(() => import('contexts'));
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<ChakraProvider resetCSS>
			<Contexts>
				<AppWrapper />
			</Contexts>
		</ChakraProvider>
	</React.StrictMode>
);
