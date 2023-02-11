import React from "react";


function FormFieldInput({type, name, placeholder, value, handleChange}) {
    if (name === 'negativePrompt') {
        return (
            <input type={type}
                   id={name}
                   name={name}
                   placeholder={placeholder}
                   value={value}
                   onChange={handleChange}
                   className={'bg-gray-50 border border-gray-300 text-gray-900 text-sm' +
                   ' rounded-lg focus:ring-[#4649ff] focus:border-[#4649ff] outline-none block w-full p-3'}
            />
        )
    }
    return (
        <input type={type}
               id={name}
               name={name}
               placeholder={placeholder}
               value={value}
               onChange={handleChange}
               className={'bg-gray-50 border border-gray-300 text-gray-900 text-sm' +
               ' rounded-lg focus:ring-[#4649ff] focus:border-[#4649ff] outline-none block w-full p-3'}
               required
        />
    )

}

export default FormFieldInput