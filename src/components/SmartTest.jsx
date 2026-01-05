import React, { useEffect, useState } from 'react';
import { smartApi } from '../api/smartApi';

const SmartTest = () => {
  const [message, setMessage] = useState('Loading...');
  const [details, setDetails] = useState('');
  const [env, setEnv] = useState({});

  useEffect(() => {
    // Test smart API
    console.log('🧠 Starting Smart API Test...');
    
    // Get environment info
    const environment = smartApi.getEnvironment();
    setEnv(environment);
    console.log('🌍 Environment:', environment);
    
    // Test API
    smartApi.getArticles(1, 6)
      .then(data => {
        console.log('📊 Smart API Response:', data);
        console.log('Data length:', data.data?.length);
        console.log('First article:', data.data?.[0]);
        
        if (data.data && data.data.length > 0) {
          setMessage(`✅ Smart API Success! Found ${data.data.length} articles`);
          setDetails(`Environment: ${environment.isDevelopment ? 'Development' : 'Production'} | First: ${data.data[0].title}`);
        } else {
          setMessage('❌ No articles found via Smart API');
          setDetails('Smart API returned empty data');
        }
      })
      .catch(error => {
        console.error('❌ Smart API Error:', error);
        setMessage(`❌ Smart API Error: ${error.message}`);
        setDetails('Check console for details');
      });
  }, []);

  return (
    <div className="p-8 bg-gradient-to-r from-green-100 to-blue-100 dark:from-green-900 dark:to-blue-900 rounded-lg shadow-lg m-8 border-2 border-green-300">
      <h2 className="text-2xl font-bold mb-4">🧠 Smart API Test</h2>
      
      <div className="mb-4 p-4 bg-white dark:bg-gray-800 rounded">
        <p className="text-sm font-mono">
          Environment: {env.isDevelopment ? '🔧 Development' : '🚀 Production'}
        </p>
        <p className="text-sm font-mono">
          Hostname: {env.hostname}
        </p>
        <p className="text-sm font-mono">
          Using Proxy: {env.config?.useProxy ? '✅ Yes' : '❌ No'}
        </p>
      </div>
      
      <p className="text-lg font-semibold mb-2">{message}</p>
      {details && <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{details}</p>}
      
      <div className="mt-4 p-4 bg-white dark:bg-gray-800 rounded">
        <p className="text-sm font-mono">
          API: {env.config?.useProxy ? '/api/articles (Proxy)' : 'Direct API + Fallback'}
        </p>
        <p className="text-xs text-gray-500 mt-2">
          Open console (F12) for detailed logs
        </p>
      </div>
      
      <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900 rounded border-2 border-yellow-200">
        <p className="text-sm font-semibold text-yellow-800 dark:text-yellow-200">
          🧠 Smart API automatically detects environment and uses best method!
        </p>
      </div>
    </div>
  );
};

export default SmartTest;
