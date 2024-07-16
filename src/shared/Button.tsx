import { Button } from 'primereact/button';

function ButtonElem({label, disabled, className, handleClick}: {label: string, disabled: boolean, className?: string, handleClick: () => void}) {

    return (
        <Button label={label} className={className} disabled={disabled} onClick={handleClick} size='small'/>
    )
}

export default ButtonElem;