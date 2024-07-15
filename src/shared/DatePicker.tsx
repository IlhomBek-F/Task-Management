import { Calendar } from "primereact/calendar";

function DatePickerElem({date = new Date(), setDate}: {date: Date, setDate: (value: string) => void;}) {

    return ( 
        <Calendar value={date} onChange={(e) => setDate(e.value as any)}  />
    )
}

export default DatePickerElem