import { FormWrapper } from "./FormWrapper";
import { useEffect, useRef } from "react";

type AddressData = {
    street: string
    city: string
    state: string
    zip: number
}

type AddressFormProps = AddressData & {
    updateFields: (fields: Partial<AddressData>) => void
}

export function AddressForm({ street, city, state, zip, updateFields }: AddressFormProps) {
    const dataLoaded = useRef(false);
    useEffect(() => {
        if(!dataLoaded.current){
        const savedData = localStorage.getItem("addressFormData")
            if (savedData) {
                try {
                    const parsedData = JSON.parse(savedData)
                    updateFields(parsedData)
                } catch (error) {
                    console.error("Failed to parse addressFormData:", error)
                    localStorage.removeItem("addressFormData")
                }
            }
            dataLoaded.current = true;
        }
    }, [updateFields])

    useEffect(() => {
        const AddressData: AddressData = { street, city, state, zip }
        const jsonstring = JSON.stringify(AddressData)
        localStorage.setItem("addressFormData", jsonstring )
    }, [street, city, state, zip])
    return (
        <FormWrapper title="Address">
            <label>Street</label>
            <input autoFocus required type="text" value={street} onChange={e => updateFields({street: e.target.value})} />
            <label>City</label>
            <input required type="text" value={city} onChange={e => updateFields({city: e.target.value})} />
            <label>State</label>
            <input required type="text"value={state} onChange={e => updateFields({state: e.target.value})} />
            <label>Zip</label>
            <input required type="text" value={zip} onChange={e => updateFields({zip: Number(e.target.value)})} />
        </FormWrapper>
    )
}