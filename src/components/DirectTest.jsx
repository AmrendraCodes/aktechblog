import React from 'react';

const DirectTest = () => {
  const handleClick = () => {
    console.log('🔥 Direct test started...');
    
    // Most basic test possible
    const url = 'https://genuine-fun-a6ecdb902.strapiapp.com/api/articles';
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
          alert(`✅ SUCCESS! Found ${data.data.length} articles`);
          console.log('🎉 First article:', data.data[0]);
        } else {
          alert('❌ ERROR: Invalid data format');
          console.error('❌ Invalid data format:', data);
        }
      })
      .catch(error => {
        console.error('❌ Fetch error:', error);
        console.error('❌ Error message:', error.message);
        console.error('❌ Error stack:', error.stack);
        alert(`❌ ERROR: ${error.message}`);
      });
  };

  return (
    <div className="p-8 bg-red-100 dark:bg-red-900 rounded-lg shadow-lg m-8 border-4 border-red-300">
      <h2 className="text-3xl font-bold mb-4 text-red-800 dark:text-red-200">
        🔴 DIRECT TEST
      </h2>
      
      <p className="text-lg mb-6 text-red-700 dark:text-red-300">
        Click button to test API directly
      </p>
      
      <button 
        onClick={handleClick}
        className="px-8 py-4 bg-red-600 text-white text-xl rounded-lg hover:bg-red-700 transition-all transform hover:scale-105 shadow-xl"
      >
        🚀 TEST API NOW
      </button>
      
      <div className="mt-6 p-4 bg-white dark:bg-gray-800 rounded border-2 border-red-200">
        <p className="font-mono text-sm">URL: https://genuine-fun-a6ecdb902.strapiapp.com/api/articles</p>
        <p className="text-xs text-gray-500 mt-2">Open console (F12) for detailed logs</p>
      </div>
      
      <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900 rounded border-2 border-yellow-200">
        <p className="text-sm font-semibold text-yellow-800 dark:text-yellow-200">
          ⚠️ If this works, API is fine - issue is in React Query
        </p>
      </div>
    </div>
  );
};

export default DirectTest;
