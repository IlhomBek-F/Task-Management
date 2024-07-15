import { createContext, useContext, useState } from "react";

export interface DialogContextValue {
    show: boolean;
    setShow: (show: boolean) => void;
  }

const DialogContext = createContext<DialogContextValue | undefined>(undefined);


function DialogProvider({children}: any) {
    const [show, setShow] = useState<boolean>(false);

    return <DialogContext.Provider value={{show, setShow}}>
        {children}
    </DialogContext.Provider>
}

const useDialog = () => useContext(DialogContext);

export {DialogProvider, useDialog}