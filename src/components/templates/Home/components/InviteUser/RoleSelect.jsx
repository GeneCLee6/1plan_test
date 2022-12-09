import React from 'react';
import { Select } from '@chakra-ui/react';

export default function RoleSelect(props) {
	const roleTypes = ['Advisor', 'Standard User', 'Subscriber'];
	return (
		<>
			<Select {...props}>
				{roleTypes.map((t, i) => (
					<option key={i} value={t}>
						{t}
					</option>
				))}
			</Select>
		</>
	);
}
