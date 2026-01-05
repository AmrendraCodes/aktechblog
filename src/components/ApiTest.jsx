import React, { useEffect, useState } from 'react';
import { strapiService } from '../api/strapi';

const ApiTest = () => {
  const [testData, setTestData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const testApi = async () => {
      setLoading(true);
      setError(null);
      
      try {
        console.log('Testing API...');
        const response = await strapiService.fetchArticles(1, 3);
        console.log('API Test Response:', response);
        setTestData(response);
      } catch (err) {
        console.error('API Test Error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    testApi();
  }, []);

  return (
    <div className="p-8 bg-white dark:bg-gray-900 rounded-lg shadow-lg m-8">
      <h2 className="text-2xl font-bold mb-4">API Test Component</h2>
      
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}
      
      {testData && (
        <div>
          <h3 className="text-lg font-semibold mb-2">API Response:</h3>
          <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded overflow-auto text-sm">
            {JSON.stringify(testData, null, 2)}
          </pre>
          
          <h3 className="text-lg font-semibold mb-2 mt-4">Articles Count:</h3>
          <p>{testData.data?.length || 0} articles found</p>
          
          {testData.data?.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-2 mt-4">First Article:</h3>
              <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded overflow-auto text-sm">
                {JSON.stringify(testData.data[0], null, 2)}
              </pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ApiTest;
