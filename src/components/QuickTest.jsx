import React, { useEffect, useState } from 'react';
import { smartApi } from '../api/smartApi';

const QuickTest = () => {
  const [status, setStatus] = useState('Loading...');
  const [data, setData] = useState(null);

  useEffect(() => {
    const test = async () => {
      try {
        setStatus('🔄 Testing API...');
        const result = await smartApi.getArticles(1, 6);
        setData(result);
        setStatus(`✅ Success! Found ${result.data?.length || 0} articles`);
      } catch (error) {
        setStatus(`❌ Error: ${error.message}`);
      }
    };
    
    test();
  }, []);

  return (
    <div className="p-4 bg-green-100 dark:bg-green-900 rounded-lg shadow-lg m-4">
      <h3 className="text-lg font-bold mb-2">🧪 Quick API Test</h3>
      <p className="text-sm font-semibold">{status}</p>
      {data && (
        <div className="mt-2 text-xs">
          <p>Articles: {data.data?.length}</p>
          <p>First: {data.data?.[0]?.title}</p>
        </div>
      )}
    </div>
  );
};

export default QuickTest;
