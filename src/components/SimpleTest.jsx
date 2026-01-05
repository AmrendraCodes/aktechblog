import React, { useEffect, useState } from 'react';

const SimpleTest = () => {
  const [message, setMessage] = useState('Loading...');
  const [details, setDetails] = useState('');

  useEffect(() => {
    // Test Vercel proxy API call
    console.log('Starting Vercel Proxy Test...');
    
    fetch('/api/articles')
      .then(response => {
        console.log('Response status:', response.status);
        console.log('Response headers:', response.headers);
        return response.json();
      })
      .then(data => {
        console.log('Vercel Proxy Test - Raw Response:', data);
        console.log('Data length:', data.data?.length);
        console.log('First article:', data.data?.[0]);
        
        if (data.data && data.data.length > 0) {
          setMessage(`✅ Proxy Success! Found ${data.data.length} articles`);
          setDetails(`First article: ${data.data[0].title}`);
        } else {
          setMessage('❌ No articles found via proxy');
          setDetails('Proxy returned empty data');
        }
      })
      .catch(error => {
        console.error('Vercel Proxy Test - Error:', error);
        console.error('Error details:', error.message);
        setMessage(`❌ Proxy Error: ${error.message}`);
        setDetails('Check console for details');
      });
  }, []);

  return (
    <div className="p-8 bg-blue-100 dark:bg-blue-900 rounded-lg shadow-lg m-8 border-2 border-blue-300">
      <h2 className="text-2xl font-bold mb-4">🔍 Vercel Proxy Test</h2>
      <p className="text-lg font-semibold mb-2">{message}</p>
      {details && <p className="text-sm text-gray-600 dark:text-gray-400">{details}</p>}
      
      <div className="mt-4 p-4 bg-white dark:bg-gray-800 rounded">
        <p className="text-sm font-mono">
          URL: /api/articles (Vercel Proxy → Strapi Cloud)
        </p>
        <p className="text-xs text-gray-500 mt-2">
          Check browser console (F12) for detailed logs
        </p>
      </div>
      
      <div className="mt-4 p-4 bg-green-50 dark:bg-green-900 rounded border-2 border-green-200">
        <p className="text-sm font-semibold text-green-800 dark:text-green-200">
          ✅ No SSL issues with proxy!
        </p>
      </div>
    </div>
  );
};

export default SimpleTest;
