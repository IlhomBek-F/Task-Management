import { Dropdown } from "primereact/dropdown";

function Select({options, selected, handleSelect, placeholder}: any) {

    return (
        <div className="card flex justify-content-center">
        <Dropdown value={selected} onChange={(e) => handleSelect(e.value)} options={options} optionLabel="status"
            placeholder={placeholder} className="w-full md:w-14rem" />
    </div>
    )
}

export default Select;