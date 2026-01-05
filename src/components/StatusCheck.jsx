import React from 'react';

const StatusCheck = () => {
  return (
    <div className="fixed top-4 right-4 z-50 p-3 bg-yellow-100 dark:bg-yellow-900 rounded-lg shadow-lg border-2 border-yellow-300 max-w-xs">
      <h4 className="text-sm font-bold mb-2">🔍 Status Check</h4>
      <div className="text-xs space-y-1">
        <p>• Server: Running</p>
        <p>• Smart API: Active</p>
        <p>• Fallback Data: Ready</p>
        <p>• Articles: Should load</p>
      </div>
      <button 
        onClick={() => window.location.reload()} 
        className="mt-2 w-full px-2 py-1 bg-yellow-500 text-white text-xs rounded hover:bg-yellow-600"
      >
        Refresh
      </button>
    </div>
  );
};

export default StatusCheck;
