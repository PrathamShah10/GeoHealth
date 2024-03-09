import React, { useState } from 'react';

const PostDisease = () => {
  const [Disease, setDisease] = useState('');

  // const handleChange = (event : any) => {
  //   setInputValue(event.target.value);
  // };

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:5000/data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: Disease }),
      });

      if (!response.ok) {
        throw new Error('Failed to post data');
      }

      console.log('Data posted successfully');
      
    } catch (err) {
      if (err instanceof Error) {
        console.error('Error posting data:', err.message);
      }
    }
  };

  return (
    <div className='h-screen flex items-center justify-center'>
      <input
        type="text"
        placeholder="Choose your Disease"
        
        
        value={Disease}
        onChange={(e) => setDisease(e.target.value)}
      />

      
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default PostDisease;
