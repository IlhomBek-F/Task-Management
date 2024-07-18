export interface FormProps {
    updatingValue?: any,
    edit: boolean,
    handleCancelClick: () => void;
    handleSaveClick?: (value: any) => void;
    handleUpdateClick?: (value: any) => void;
}