import React, { useState } from "react"
import { FormInput } from "../InputForm/FormInput"

export const Register = () => {

  const [username, setUsername] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirmPassword] = useState("");

  return (
    <div className="register">
      <form>
        <FormInput placeholder="Username" setUsername={setUsername}/>
        <FormInput placeholder="First Name" setFirstname={setFirstname}/>
        <FormInput placeholder="Last Name" setLastname={setLastname}/>
        <FormInput placeholder="Email" setEmail={setEmail}/>
        <FormInput placeholder="Phone Number" setPhone={setPhone}/>
        <FormInput placeholder="Password" setPassword={setPassword}/>
        <FormInput placeholder="Confirm Password" setConfirmPassword={setConfirmPassword}/>
      </form>
    </div>
  )
}