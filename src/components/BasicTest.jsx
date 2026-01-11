const testApi = () => {
  console.log('🔥 Testing LOCAL Strapi...');
  
  // ✅ Local Strapi URL
  fetch('http://localhost:1337/api/articles')
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