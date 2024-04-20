import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'

import {preview} from '../assets'
import {getRandomPrompt} from '../utils'
import { FormField, Loader } from '../components'

const CreatePost = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({name:'',prompt:'',photo:''});
  const [generatingImg, setgeneratingImg] = useState(false);
  const [loading, setloading]= useState(false);

  const generateImg = async() => {
    if(form.prompt){
      try {
        setgeneratingImg(true);
        const response = await fetch('http://localhost:8080/api/v1/chitra', {
          method: 'POST',
          headers: {'Content-Type':'application/json',},
          body: JSON.stringify({ prompt: form.prompt,})
        })

        const data = await response.json();
        setForm({...form,photo:`data:image/jpeg;base64,${data.photo}`})
      } catch (error) {
        alert(error);
      }finally{setgeneratingImg(false);}
    }else{
      alert('Please enter a prompt');
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault();

    if(form.prompt && form.photo){
      setloading(true);
      try {
        const response = await fetch('http://localhost:8080/api/v1/post', {
          method: 'POST',
          headers: {'Content-Type':'application/json',},
          body: JSON.stringify({...form})
        })

        await response.json();
        navigate('/');
      } catch (error) {
        alert(error)
      }finally{
        setloading(false);
      }
    }else{
      alert('Please enter a prompt and generate an image.')
    }
  }
  const handleChange = (e) => {
    setForm({ ...form,[e.target.name]:e.target.value})
  }
  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form,prompt: randomPrompt})
  }

  return (
    <section className='max-w-7xl mx-auto'>
      <div>
        <h1 className='font-extrabold text-white text-[32px]'>Create</h1>
        <p className='mt-2 text-[#CBD5FF] text-[16px] max-w-[700px]'>Create imaginative images using Chitra AI and add them to the Community Mosaic.</p>
      </div>

      <form className='mt-16 max-w-3xl' onSubmit={handleSubmit}>
        <div className='flex flex-col gap-5'>
          <FormField LabelName="Your Name" type="text" name="name" placeholder="Manasvi" value={form.name} handleChange={handleChange}/>
          <FormField 
          LabelName="Prompt" 
          type="text" 
          name="prompt" 
          placeholder="A synthwave style sunset above the reflecting water of the sea, digital art" 
          value={form.prompt} handleChange={handleChange}
          isSurpriseMe
          handleSurpriseMe={handleSurpriseMe}
          />

        <div className='relative bg-gray-300 bg-opacity-30 border border-[#cbd5ff] text-gray-300 text-sm rounded-lg focus:ring-[#38BDF8] focus:border-[#38BDF8] w-74 p-3 h-74 flex justify-center items-center'>
        {form.photo ? (
            <img
            src={form.photo}
            alt={form.prompt}
            className='w-full h-full object-contain'
            />
          ):(<img src={preview} alt='Preview' className='w-9/12 h-9/12 object-contain opacity-40'/>)}

          {generatingImg && (
            <div className='absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg'><Loader/></div>
          )}
        </div>
        </div>

        <div className='mt-5 flex gap-5'>
          <button type='button' onClick={generateImg} className='px-5 py-2.5 border border-white text-center text-white font-lg rounded-md bg-gradient-to-b from-purple-700 to-black text-sm w-full sm:w-auto'>{generatingImg ? 'Generating...':'Generate'}</button>
        </div>

        <div className='mt-10'>
          <p className='mt-2 text-[#CBD5FF] text-[14px]'>Once you've created your image, you can share it with others in the community</p>
          <button type='submit' className='mt-3 text-white bg-sky-500 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center'>{loading ? 'Sharing...':'Share with the community'}</button>
        </div>
      </form>
    </section>
  )
}

export default CreatePost