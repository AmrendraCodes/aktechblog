import React, { useEffect, useState } from 'react';
import { smartApi } from '../api/smartApi';

const QuickTest = () => {
  const [status, setStatus] = useState('Loading...');
  const [data, setData] = useState(null);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const test = async () => {
      try {
        setStatus('🔄 Testing API...');
        setHasError(false);
        
        const result = await smartApi.getArticles(1, 6);
        
        if (!result) {
          throw new Error('No data received');
        }
        
        if (!result.data || !Array.isArray(result.data)) {
          throw new Error('Invalid data format');
        }
        
        setData(result);
        const articleCount = result.data.length;
        const firstTitle = result.data[0]?.title || 'No title';
        setStatus(`✅ Success! Found ${articleCount} articles`);
        
      } catch (error) {
        console.error('QuickTest error:', error);
        setHasError(true);
        setStatus(`❌ Error: ${error.message || 'API test failed'}`);
      }
    };
    
    test();
  }, []);

  if (hasError) {
    return (
      <div className="p-4 bg-red-100 dark:bg-red-900 rounded-lg shadow-lg m-4">
        <h3 className="text-lg font-bold mb-2">🧪 Quick API Test</h3>
        <p className="text-sm font-semibold text-red-700 dark:text-red-300">{status}</p>
        <div className="mt-2 text-xs text-red-600 dark:text-red-400">
          <p>Please check your API connection</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 bg-green-100 dark:bg-green-900 rounded-lg shadow-lg m-4">
      <h3 className="text-lg font-bold mb-2">🧪 Quick API Test</h3>
      <p className="text-sm font-semibold">{status}</p>
      {data && data.data && data.data.length > 0 && (
        <div className="mt-2 text-xs">
          <p>Articles: {data.data.length}</p>
          <p>First: {data.data[0]?.title || 'No title'}</p>
        </div>
      )}
    </div>
  );
};

export default QuickTest;
