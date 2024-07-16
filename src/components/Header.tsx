import { useState } from "react"
import { FILTER_BY_STATUS_OPTIONS } from "../helpers"
import ButtonElem from "../shared/Button"
import Select from "../shared/Select"
import DialogElem from "../shared/Dialog";
import DatePickerElem from "../shared/DatePicker";
import Form from "../shared/Form";
import TaskTable from "./TaskTable";
import { saveTask } from "../service";

function Header() {
    const [selected, setSelected] = useState<number>(2);
    const [show, setShow] = useState(false);
    const [tasks, setTask] = useState([] as any);
    const date = new Date();

    const handleSelect = (value: number) => {
        setSelected(value);
        if(value === 2) {
          setTask(tasks);
          return;
        }

        const filterByStatus = tasks.filter((task: any) => task.complete === Boolean(value))
        setTask(filterByStatus);
    }

    const handleSaveClick = (data: any) => { 
        const newTask = {...data, completed: false, id: Math.floor(Math.random() * 21312)};
        saveTask(newTask)
         .then(() => {
            setTask([...tasks, newTask]);
            setShow(false);
         })
         .catch(console.log) 
    }
   
    const setDate = (value: string) => {
          console.log('date', value)
    }

    return (
    <section>
        <header className="flex justify-between items-center  bg-white w-[62rem] rounded-md p-2 mb-4">
           <h1 className="text-2xl">Tasks</h1>
            <div className="flex justify-between w-[29rem]">
           <Select options={FILTER_BY_STATUS_OPTIONS} selected={selected} handleSelect={handleSelect} placeholder='Filter'/>
           <DatePickerElem date={date} setDate={setDate}/>
           <ButtonElem label="Add new" handleClick={() => setShow(true)} disabled={false}/>
           {show && (
            <DialogElem header={'New task'}>
               <Form 
                  edit={false} 
                  handleSaveClick={handleSaveClick} 
                  handleCancelClick={() => setShow(false)}
                />
           </DialogElem>
           )}
            </div>
        </header>
        <TaskTable />
    </section>
    )
}

export default Header