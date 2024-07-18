import { useState } from "react"
import { FILTER_BY_STATUS_OPTIONS } from "../helpers"
import ButtonElem from "../shared/Button"
import Select from "../shared/Select"
import DialogElem from "../shared/Dialog";
import DatePickerElem from "../shared/DatePicker";
import Form from "../shared/Form";
import TaskTable from "./TaskTable";
import { useDispatch, useSelector } from "react-redux";
import { AsyncThunkMap, filterByDate, filterByStatus } from "../Slice/taskSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { StateModel } from "../core/models/state-model";
import { TaskModel } from "../core/models/task-model";
import { AsyncThunkType } from "../core/enums/async-thunk-type";
import '../styles/header.css';

function Header() {
    const selectedStatus = useSelector((state: StateModel) => state.selectedStatus)
    const dispatch = useDispatch<any>();
    const [show, setShow] = useState(false);
    const date = new Date();

    const handleSaveClick = (data: TaskModel) => { 
        const newTask = {...data, completed: false, id: Math.floor(Math.random() * 21312)};
        
        dispatch(AsyncThunkMap.get(AsyncThunkType.ADD_TASK)(newTask))
        .then(unwrapResult)
        .then(() => setShow(false))
    }
   
    const setDate = (value: string) => {
        dispatch(filterByDate(value))
    }

    return (
    <section>
        <header className="header">
           <h1 className="text-2xl">Tasks</h1>
            <div className="container">
           <Select options={FILTER_BY_STATUS_OPTIONS} 
                   selected={selectedStatus} 
                   handleSelect={(status: number) => dispatch(filterByStatus(status))} 
                   placeholder='Filter'/>
           <DatePickerElem date={date} 
                           setDate={setDate}/>
           <ButtonElem label="Add new" 
                       handleClick={() => setShow(true)} 
                       disabled={false}/>
           {show && (
            <DialogElem header={'New task'}>
               <Form edit={false} 
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