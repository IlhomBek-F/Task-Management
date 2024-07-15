import { Dialog } from "primereact/dialog";
import { DialogContextValue, useDialog } from "../Context/DialogContext";


function DialogElem({children}: any) {
    const {show, setShow} = useDialog() as DialogContextValue;

    return (
        <Dialog header="Header" visible={show} style={{ width: '25vw' }} onHide={() => setShow(false)}>
               {{...children}}
        </Dialog>
    )
}

export default DialogElem