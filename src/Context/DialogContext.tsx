import { createContext, useContext, useState } from "react";

export interface DialogContextValue {
    value: {show: boolean, edit: boolean};
    setShow: (value: {show: boolean, edit: boolean}) => void;
  }

const DialogContext = createContext<DialogContextValue | undefined>({value: {show: false, edit: false}, setShow: () => {}});


function DialogProvider({children}: any) {
    const [value, setShow] = useState({show: false, edit: false});

    return <DialogContext.Provider value={{value, setShow}}>
        {children}
    </DialogContext.Provider>
}

const useDialog = () => useContext(DialogContext);

export {DialogProvider, useDialog}