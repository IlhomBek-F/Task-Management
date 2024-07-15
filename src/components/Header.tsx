import { useState } from "react"
import { FILTER_BY_STATUS_OPTIONS } from "../helpers"
import ButtonElem from "../shared/Button"
import Select from "../shared/Select"
import DialogElem from "../shared/Dialog";
import AddNewTask from "./AddNewTask";
import { DialogContextValue, useDialog } from "../Context/DialogContext";
import DatePickerElem from "../shared/DatePicker";

function Header() {
    const [selected, setSelected] = useState<string>('all');
    const {show, setShow} = useDialog() as DialogContextValue;
    const date = new Date();

    const handleSelect = (value: string) => {
        setSelected(value)
    }

    const addNewTask = () => {
        setShow(true)
    }

    const setDate = (value: string) => {
          console.log('date', value)
    }

    return (
        <header className="flex justify-between items-center  bg-white w-[62rem] rounded-md p-2">
           <h1 className="text-2xl">Tasks</h1>
           <div className="flex justify-between w-[33rem]">
           <Select options={FILTER_BY_STATUS_OPTIONS} selected={selected} handleSelect={handleSelect} placeholder='Filter'/>
           <DatePickerElem date={date} setDate={setDate}/>
           <ButtonElem label="Add new" handleClick={addNewTask} disabled={false}/>
           {show && <AddNewTask />}
           </div>
        </header>
    )
}

export default Header