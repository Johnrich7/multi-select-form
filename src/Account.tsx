import { FormWrapper } from "./FormWrapper";
import { useEffect, useRef } from "react";

type Accountdata = {
    email: string
    password: string | number
}

type AccountFormProps = Accountdata & {
    updateFields: (value: Partial<Accountdata>) => void
}

export function Account({ email, password, updateFields }: AccountFormProps) {
    const dataLoaded = useRef(false);
    useEffect(() => {
        if(!dataLoaded.current){
        const savedData = localStorage.getItem("accountFormData")
            if (savedData) {
                try {
                    const parsedData: Accountdata = JSON.parse(savedData)
                    updateFields(parsedData)
                } catch (error) {
                    console.error("Failed  parse AccountData:", error)    
                }
            }
            dataLoaded.current = true
        }
    }, [updateFields])

    useEffect(() => {
        const AccountData: Accountdata = { email, password }
        const jsonstring = JSON.stringify(AccountData)
        localStorage.setItem("accountFormData", jsonstring )
    }, [email, password])
    return (
        <FormWrapper title="Account Details">
            <label>Email</label>
            <input autoFocus required type="text" value={email} onChange={e => updateFields({email: e.target.value})} />
            <label>Password</label>
            <input required type="password" value={password} onChange={e => updateFields({password: e.target.value})} />
        </FormWrapper>
    )
}