import { useEffect, useRef } from "react";
import { FormWrapper } from "./FormWrapper";
// import { json } from "stream/consumers";

type UserData = {
    firstname: string
    lastname: string
    age: number
}

type UserFormProps = UserData & {
    updateFields: (fields: Partial<UserFormProps>) => void
}

export function UseForm({ firstname, lastname, age, updateFields }: UserFormProps) {
    const dataLoaded = useRef(false);
    useEffect(() => {
        if(!dataLoaded.current) {
            const savedData = localStorage.getItem("userFormData")
        console.log(savedData)
            if (savedData) {
                try {
                    const parsedData: UserData = JSON.parse(savedData)
                    updateFields(parsedData)
                } catch (error) {
                    console.error("Failed to parse UserData:", error)
                    localStorage.removeItem("userFormData")
                }
            }
            dataLoaded.current = true;
        }
    }, [updateFields])

    useEffect(() => {
        const UserData: UserData = { firstname, lastname, age }
        const jsonstring = JSON.stringify(UserData)
        localStorage.setItem("userFormData", jsonstring)
    }, [firstname, lastname, age])

    return (
        <FormWrapper title="User Details">
            <label>First Name</label>
            <input autoFocus required type="text" value={firstname} onChange={e => updateFields({firstname: e.target.value})} /> 
            <label>Last Name</label>
            <input required type="text" value={lastname} onChange={e => updateFields({lastname: e.target.value})} />
            <label>Age</label>
            <input required min={1} type="text" value={age} onChange={e => updateFields({age: Number(e.target.value) })} />
        </FormWrapper>
    )
}