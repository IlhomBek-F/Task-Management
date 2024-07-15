import { Button } from 'primereact/button';

function ButtonElem({label, disabled, handleClick}: {label: string, disabled: boolean, handleClick: () => void}) {

    return (
        <Button label={label} disabled={disabled} onClick={handleClick} size='small'/>
    )
}

export default ButtonElem;