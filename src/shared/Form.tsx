import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import ButtonElem from './Button';
import DatePickerElem from './DatePicker';
import { Controller, useForm } from 'react-hook-form';

interface FormProps {
    updatingValue?: any,
    edit: boolean,
    handleCancelClick: () => void;
    handleSaveClick?: (value: any) => void;
    handleUpdateClick?: (value: any) => void;
}

function Form({updatingValue, edit, handleSaveClick, handleUpdateClick, handleCancelClick}: FormProps) {
    const {assign = '', dueTo = new Date().toLocaleDateString(), task = '', id} = updatingValue || {};
    const {control, register, getValues } = useForm({
        defaultValues: { assign, dueTo, task}
    })

    const handleEvent = (edit ? handleUpdateClick : handleSaveClick) as Function

    return (
    <>
     <form>
         <label htmlFor="assign" className='flex flex-col mb-3'>Assign
         <InputText id="assign" 
                    aria-describedby="username-help" 
                    className='mt-2' 
                    {...register('assign', {required: true})}/>
         </label>
         <label htmlFor="due" 
                className='flex flex-col mb-3'>Due to
        <Controller name='dueTo' 
                    control={control}
                    rules={{required: true}}
                    render={({field}) => (
                    <DatePickerElem date={new Date(dueTo)} setDate={field.onChange}/>
                   )}
                  />
         </label>
         <label htmlFor="task" 
                className='flex flex-col mb-3'>Task
         <InputTextarea 
                rows={5} 
                cols={30} 
                className='mt-2' 
                {...register('task', {required: true})}/>
         </label>
      </form>
      <div className='float-right'>
         <ButtonElem label={edit ? 'update' : 'save'}
                     className="mr-2"
                     disabled={false} 
                     handleClick={() => handleEvent({...getValues(), id})}/>
         <ButtonElem label='cancel' 
                     disabled={false} 
                     handleClick={() => handleCancelClick()}/>
      </div>
    </>
    )
}

export default Form