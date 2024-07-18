import { Calendar } from "primereact/calendar";

function DatePickerElem({date = new Date(), setDate}: {date?: Date, setDate: (value: any) => void}) {
    return (
        <Calendar value={date}  onChange={(date) => setDate(date.value?.toLocaleDateString())}/>
    )
}

export default DatePickerElem