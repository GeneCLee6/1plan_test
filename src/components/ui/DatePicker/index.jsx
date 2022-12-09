import { useField, useFormikContext } from 'formik';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './style.css';

export const DatePickerField = (props) => {
	const { setFieldValue } = useFormikContext();
	const [field] = useField(props);
	return (
		<>
			<div className="customDatePickerWidth">
				<DatePicker
					{...field}
					{...props}
					dateFormat="dd/MM/yyyy"
					placeholderText="DD/MM/YYYY"
					selected={(field.value && new Date(field.value)) || null}
					onChange={(val) => {
						setFieldValue(field.name, val);
					}}
				/>
			</div>
		</>
	);
};
