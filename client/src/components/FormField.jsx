import React from 'react';

const FormField = ({ LabelName, type, name, placeholder, value, handleChange, isSurpriseMe, handleSurpriseMe }) => {
  return (
    <div>
      <div className='flex items-center gap-2 mb-2'>
        <label htmlFor={name} className='block text-sm font-medium text-sky-300'>
          {LabelName}
        </label>

        {isSurpriseMe && (
          <button type='button' onClick={handleSurpriseMe} className='font-medium text-xs py-1 px-2 rounded-[5px] text-white bg-gradient-to-r from-purple-700 to-sky-300'>
            Surprise Me
          </button>
        )}
      </div>

      <input
        type={type}
        id = {name}
        name = {name}
        placeholder={placeholder}
        value = {value}
        onChange={handleChange}
        required
        className='bg-black border border-[#cbd5ff] text-gray-300 text-sm rounded-lg focus:ring-[#38BDF8] focus:border-[#38BDF8] outline-none block w-full p-3'    
        />
    </div>
  );
};

export default FormField;
