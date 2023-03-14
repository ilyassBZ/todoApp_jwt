import React from 'react'



const FormRow = ({type,labelText,name,lastText,value,handleChange,errors,register,isMember,required}) => {

	return(
	<div className='form-group form-row'>
			
			<label htmlFor={name} className="form-label">
				{labelText || name} 
				</label> 
				<input type={type}  {...register(name) } value={value} name={name} onChange={handleChange} />
				{errors[name] ? <span className='error'>{errors[name].message}</span> : <></>}
		</div>
	)


	
	
}

export default FormRow