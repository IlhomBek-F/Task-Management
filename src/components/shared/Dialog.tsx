import { Dialog } from "primereact/dialog";

function DialogElem({children, header}: any) {
    return (
        <Dialog header={header} visible={true} style={{ width: '25vw' }} closable={false} onHide={() => {}} draggable={false}>
               {{...children}}
        </Dialog>
    )
}

export default DialogElem