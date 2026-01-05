import React, { useEffect, useState } from 'react';

const SimpleTest = () => {
  const [message, setMessage] = useState('Loading...');

  useEffect(() => {
    // Test basic API call
    fetch('https://genuine-fun-a6ecdb902.strapiapp.com/api/articles')
      .then(response => response.json())
      .then(data => {
        console.log('Simple API Test - Raw Response:', data);
        setMessage(`Success! Found ${data.data?.length || 0} articles`);
      })
      .catch(error => {
        console.error('Simple API Test - Error:', error);
        setMessage(`Error: ${error.message}`);
      });
  }, []);

  return (
    <div className="p-8 bg-yellow-100 dark:bg-yellow-900 rounded-lg shadow-lg m-8">
      <h2 className="text-2xl font-bold mb-4">Simple API Test</h2>
      <p className="text-lg">{message}</p>
      <div className="mt-4">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Check browser console for detailed logs
        </p>
      </div>
    </div>
  );
};

export default SimpleTest;
