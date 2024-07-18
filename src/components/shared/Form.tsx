import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import ButtonElem from './Button';
import DatePickerElem from './DatePicker';
import { Controller, useForm } from 'react-hook-form';
import '../styles/form.css';
import { FormProps } from '../../core/models/form-props-model';

function Form({updatingValue, edit, handleSaveClick, handleUpdateClick, handleCancelClick}: FormProps) {
    const {assign = '', dueTo = new Date().toLocaleDateString(), task = '', id} = updatingValue || {};

    const {control, register, handleSubmit, getFieldState, formState} = useForm({
        defaultValues: { assign, dueTo, task}
    });

    const assignFieldInvalid = getFieldState('assign', formState).invalid;
    const taskFieldInvalid = getFieldState('task', formState).invalid;

    const handleEvent = (edit ? handleUpdateClick : handleSaveClick) as Function
    const onSubmit = (data: any) => handleEvent({...data, id});

    return (
    <>
     <form>
         <label htmlFor="assignFor" className='label'>Assign *
         <InputText 
                    aria-describedby="username-help" 
                    className='mt-2' 
                    invalid={assignFieldInvalid}
                    {...register('assign', {required: true})}/>
         </label>
         <label htmlFor="dueTo" 
                className='label'>Due to *
        <Controller name='dueTo' 
                    control={control}
                    rules={{required: true}}
                    render={({field}) => (
                    <DatePickerElem date={new Date(dueTo)} setDate={field.onChange}/>
                   )}
                  />
         </label>
         <label htmlFor="task" 
                className='label'>Task *
         <InputTextarea 
                rows={5} 
                cols={30} 
                className='mt-2' 
                invalid={taskFieldInvalid}
                {...register('task', {required: true})}/>
         </label>
      </form>
      <div className='float-right'>
         <ButtonElem label={edit ? 'update' : 'save'}
                     className="mr-2"
                     disabled={false} 
                     handleClick={handleSubmit(onSubmit)}/>
         <ButtonElem label='cancel' 
                     disabled={false} 
                     handleClick={() => handleCancelClick()}/>
      </div>
    </>
    )
}

export default Form