import React from 'react'
import './forminput.scss'

const FormInput = ({ label, ...otherProps }) => {
  return (
    <div className='group'>
    <input className='form-input' {...otherProps}/>
        {label &&(
                <label className={`${otherProps.value.length ? 'shrinks' : ''}form-input-label`}>{label}</label>  
            )
        } 
    </div>
  )
}

export default FormInput