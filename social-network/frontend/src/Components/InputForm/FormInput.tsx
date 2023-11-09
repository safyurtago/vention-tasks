import React, { useState } from 'react'
import './FormInput.css'

export const FormInput = (props) => {
  return (
    <div className='formInput'>
      <label></label>
      <input placeholder={props.placeholder} onChange={e => props.setUsername(e.target.value)}/>
    </div>
  )
}
