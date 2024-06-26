import React, { useState, useEffect } from 'react'
import { Loader, Card, FormField } from '../components'
const RenderCards = ({ data, title }) => {
  if (data?.length > 0) {
    return data.map((post) => <Card key={post._id} {...post} />);
  }
  return (
    <h2 className='mt-5 font-bold text-[#38BDF8] text-xl uppercase'>{title}</h2>
  );
};

const Home = () => {
  const [loading, setloading]= useState(false)
  const [allPosts, setallPosts]= useState(null)
  const [searchText, setsearchText] = useState('')
  const [searchedResults, setsearchedResults] = useState(null)
  const [searchTimeout, setsearchTimeout] = useState(null)

  const fetchPosts = async () => {
    setloading(true);

    try {
      const response = await fetch('http://localhost:8080/api/v1/post', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const result = await response.json();
        setallPosts(result.data.reverse());
      }
    } catch (error) {
      alert(error);
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleSearchChange=(e)=>{
    clearTimeout(searchTimeout);
    setsearchText(e.target.value);

    setsearchTimeout(
      setTimeout(()=>{
      const searchResults = allPosts.filter((item)=>item.name.toLowerCase().includes(searchText.toLowerCase())|| item.prompt.toLowerCase().includes(searchText.toLowerCase()));
      setsearchedResults(searchResults);
      },500)
    );
  }

  return (
    <section className='max-w-7xl mx-auto'>
      <div>
        <h1 className='font-extrabold text-white text-[32px]'>Our Creative Mosaic</h1>
        <p className='mt-2 text-[#CBD5FF] text-[16px] max-w-[500px]'>See what users have made using Chitra AI</p>
      </div>
      
      <div className='mt-16'>
        <FormField LabelName='Search Posts' type='text' name='text' placeholder='Search Posts' value={searchText} handleChange={handleSearchChange}></FormField>
      </div>

      <div className='mt-10'>
        {loading ? (
          <div className='flex justify-center items-center'>
            <Loader></Loader>
          </div>
        ) : (
          <>
          {searchText && (
            <h2 className='font-medium text-[#CBD5FF] text-xl mb-3'>
              Showing results for <span className='text-[#38BDF8]'>{searchText}</span>
            </h2>
          )}

          <div className='grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3'>
            {searchText ? (<RenderCards 
            data={searchedResults} 
            title='No Search Results'/>
            ):(
            <RenderCards 
            data={allPosts} 
            title='No posts found'/>)}
          </div>
          </>
        )}
      </div>
    </section>
  )
}

export default Home