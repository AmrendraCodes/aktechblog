import React from 'react';

const DirectTest = () => {
  const handleClick = () => {
    console.log('🔥 Testing Vercel proxy...');
    
    // Test the Vercel proxy instead of direct Strapi
    const url = '/api/articles';
    console.log('📍 URL:', url);
    
    fetch(url)
      .then(response => {
        console.log('✅ Response status:', response.status);
        console.log('✅ Response ok:', response.ok);
        return response.json();
      })
      .then(data => {
        console.log('📊 Full data:', data);
        console.log('📊 Data type:', typeof data);
        console.log('📊 Has data property:', 'data' in data);
        console.log('📊 Data.data:', data.data);
        console.log('📊 Data.data length:', data.data?.length);
        
        if (data && data.data && Array.isArray(data.data)) {
          alert(`✅ PROXY SUCCESS! Found ${data.data.length} articles`);
          console.log('🎉 First article:', data.data[0]);
        } else {
          alert('❌ ERROR: Invalid data format from proxy');
          console.error('❌ Invalid data format:', data);
        }
      })
      .catch(error => {
        console.error('❌ Proxy fetch error:', error);
        console.error('❌ Error message:', error.message);
        console.error('❌ Error stack:', error.stack);
        alert(`❌ PROXY ERROR: ${error.message}`);
      });
  };

  return (
    <div className="p-8 bg-purple-100 dark:bg-purple-900 rounded-lg shadow-lg m-8 border-4 border-purple-300">
      <h2 className="text-3xl font-bold mb-4 text-purple-800 dark:text-purple-200">
        🟣 VERCEL PROXY TEST
      </h2>
      
      <p className="text-lg mb-6 text-purple-700 dark:text-purple-300">
        Click button to test Vercel proxy (no SSL issues!)
      </p>
      
      <button 
        onClick={handleClick}
        className="px-8 py-4 bg-purple-600 text-white text-xl rounded-lg hover:bg-purple-700 transition-all transform hover:scale-105 shadow-xl"
      >
        🚀 TEST PROXY NOW
      </button>
      
      <div className="mt-6 p-4 bg-white dark:bg-gray-800 rounded border-2 border-purple-200">
        <p className="font-mono text-sm">URL: /api/articles (Vercel Proxy)</p>
        <p className="text-xs text-gray-500 mt-2">Open console (F12) for detailed logs</p>
      </div>
      
      <div className="mt-4 p-4 bg-green-50 dark:bg-green-900 rounded border-2 border-green-200">
        <p className="text-sm font-semibold text-green-800 dark:text-green-200">
          ✅ This should work without SSL errors!
        </p>
      </div>
    </div>
  );
};

export default DirectTest;
