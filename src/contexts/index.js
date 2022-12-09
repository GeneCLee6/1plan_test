import React from 'react';
import SectionsProvider from './SectionsProvider';
import SnackbarProvider from './SnackbarProvider';
import UserProvider from './UserProvider';
import ReportProvider from './ReportProvider';

export default function Contexts(props) {
	return (
		<UserProvider>
			<SnackbarProvider>
				<SectionsProvider>
					<ReportProvider>{props.children}</ReportProvider>
				</SectionsProvider>
			</SnackbarProvider>
		</UserProvider>
	);
}
