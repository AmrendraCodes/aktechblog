import React from 'react';

const BasicTest = () => {
  // Direct test without any complexity
  const testApi = () => {
    console.log('🔥 Testing API...');
    
    fetch('https://genuine-fun-a6ecdb902.strapiapp.com/api/articles')
      .then(response => {
        console.log('✅ Response received:', response.status);
        return response.json();
      })
      .then(data => {
        console.log('📊 Data received:', data);
        alert(`Success! Found ${data.data?.length || 0} articles`);
      })
      .catch(error => {
        console.error('❌ Error:', error);
        alert(`Error: ${error.message}`);
      });
  };

  return (
    <div className="p-8 bg-green-100 dark:bg-green-900 rounded-lg shadow-lg m-8">
      <h2 className="text-2xl font-bold mb-4">🚀 Basic API Test</h2>
      <p className="mb-4">Click button to test API connection</p>
      
      <button 
        onClick={testApi}
        className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
      >
        Test API Now
      </button>
      
      <div className="mt-4 p-4 bg-white dark:bg-gray-800 rounded">
        <p className="text-sm font-mono">URL: https://genuine-fun-a6ecdb902.strapiapp.com/api/articles</p>
        <p className="text-xs text-gray-500 mt-2">Open console (F12) to see detailed logs</p>
      </div>
    </div>
  );
};

export default BasicTest;
