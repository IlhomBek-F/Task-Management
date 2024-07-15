import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import ButtonElem from './Button';
import DatePickerElem from './DatePicker';

function Form({edit}: {edit?: boolean}) {
    const handleClick = () => {

    }

    return (
    <>
     <form>
         <label htmlFor="assign" className='flex flex-col mb-3'>Assign
         <InputText id="assign" aria-describedby="username-help" className='mt-2'/>
         </label>
         <label htmlFor="assign" className='flex flex-col mb-3'>Due to
         <DatePickerElem date={new Date()} setDate={(value) => {}}/>
         </label>
         <label htmlFor="assign" className='flex flex-col mb-3'>Task
         <InputTextarea  rows={5} cols={30} className='mt-2'/>
         </label>
      </form>
      <div className=''>
         <ButtonElem label={`${edit ? 'Edit' : 'New'} task`} 
                     disabled={false} 
                     handleClick={handleClick}/>
         <ButtonElem label='Cancel' 
                     disabled={false} 
                     handleClick={handleClick}/>
      </div>
    </>
    )
}

export default Form