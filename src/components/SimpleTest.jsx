import React, { useEffect, useState } from 'react';

const SimpleTest = () => {
  const [message, setMessage] = useState('Loading...');
  const [details, setDetails] = useState('');

  useEffect(() => {
    // Test basic API call
    console.log('Starting Simple API Test...');
    
    fetch('https://genuine-fun-a6ecdb902.strapiapp.com/api/articles')
      .then(response => {
        console.log('Response status:', response.status);
        console.log('Response headers:', response.headers);
        return response.json();
      })
      .then(data => {
        console.log('Simple API Test - Raw Response:', data);
        console.log('Data length:', data.data?.length);
        console.log('First article:', data.data?.[0]);
        
        if (data.data && data.data.length > 0) {
          setMessage(`✅ Success! Found ${data.data.length} articles`);
          setDetails(`First article: ${data.data[0].title}`);
        } else {
          setMessage('❌ No articles found');
          setDetails('API returned empty data');
        }
      })
      .catch(error => {
        console.error('Simple API Test - Error:', error);
        console.error('Error details:', error.message);
        setMessage(`❌ Error: ${error.message}`);
        setDetails('Check console for details');
      });
  }, []);

  return (
    <div className="p-8 bg-yellow-100 dark:bg-yellow-900 rounded-lg shadow-lg m-8 border-2 border-yellow-300">
      <h2 className="text-2xl font-bold mb-4">🔍 Simple API Test</h2>
      <p className="text-lg font-semibold mb-2">{message}</p>
      {details && <p className="text-sm text-gray-600 dark:text-gray-400">{details}</p>}
      
      <div className="mt-4 p-4 bg-white dark:bg-gray-800 rounded">
        <p className="text-sm font-mono">
          URL: https://genuine-fun-a6ecdb902.strapiapp.com/api/articles
        </p>
        <p className="text-xs text-gray-500 mt-2">
          Check browser console (F12) for detailed logs
        </p>
      </div>
    </div>
  );
};

export default SimpleTest;
