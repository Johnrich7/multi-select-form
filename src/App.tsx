// import { useState } from 'react'

import { useMultiSelectForm } from "./useMultiSelectForm"
import { UseForm } from "./UseForm"
import { AddressForm } from "./AddressForm"
import { Account } from "./Account"
import { FormEvent, useState } from "react"

type FormData = {
  firstname: string
  lastname: string
  age: number
  street: string
  city: string
  state: string
  zip: number
  email: string
  password: string | number
}

// type AccountData = {
//   email: string;
//   password: string | number;
// };

const INITIAL_DATA : FormData = {
  firstname: "",
  lastname: "",
  age: 0 ,
  street: "",
  city:"",
  state:"",
  zip: 0,
  email:"",
  password:"",
}


function App() {
  const [data, setData] = useState(INITIAL_DATA)

  function updateFields(fields: Partial<FormData>) {
    setData(prev => {
      return {...prev, ...fields}
    })
  }

  const { steps, currentStepIndex, isFirstStep, isLastStep, next, back, step } = useMultiSelectForm([<UseForm {...data} updateFields={updateFields} />, <AddressForm {...data} updateFields={updateFields} />, <Account {...data} updateFields={updateFields} />])
    

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    if (!isLastStep) return next()
      // saveAccountData(); // Call the save function here
    alert("Succesful Account Creation")
  }

  return (
    <div style={{
      position: "relative",
      background: "white",
      border: "1px solid black",
      padding: "2rem",
      margin: "1rem",
      borderRadius: ".5rem",
      fontFamily: "Arial",
      maxWidth: "max-content"
    }}>
      <form onSubmit={onSubmit}>
        <div style={{ position: "absolute", top: ".5rem", right: ".5rem" }}>{currentStepIndex + 1} / {steps.length} </div>
        {step}
        <div style={{ marginTop: "1rem", display: "flex", gap: ".5rem", justifyContent: "flex-end" }}>
          {!isFirstStep && (
            <button type="button" onClick={back}>Back</button>)}
          <button type="submit">{isLastStep ? "Finish" : "Next"}</button>
        </div>
        
      </form>
    </div>
  )
}

export default App
