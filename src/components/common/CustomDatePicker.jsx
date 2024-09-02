import React from "react";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { ko } from "date-fns/locale/ko";
function CustomDatePicker(props) {
    const validDate = props.value instanceof Date ? date : null;
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={ko}>
            <DemoContainer components={['DatePicker']}>
                <DatePicker 
                    label={validDate} 
                    format="YYYY-MM-DD"
                    value={props.value}
                    onChange={(newValue) => props.handleChange(newValue)}
                />
            </DemoContainer>
        </LocalizationProvider>
    );
}

export default CustomDatePicker;