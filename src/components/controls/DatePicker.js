/* eslint-disable no-unused-vars */
import React from 'react'
import 'date-fns'
import DateFnsUtils from '@date-io/date-fns'
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers'

export default function DatePicker (props) {
  const { name, label } = props
  const [selectedDate, setSelectedDate] = React.useState(new Date())

  const handleDateChange = (date) => {
    setSelectedDate(date)
  }
  return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker variant="inline" inputVariant="outlined"
            margin="normal"
            label={label}
            name={name}
            format="MM/dd/yyyy"
            value={selectedDate}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              'aria-label': 'change date'
            }}
            />
    </MuiPickersUtilsProvider>
  )
}
