// Test script to verify form2chat API functionality
const fetch = require('node-fetch');

async function testForm2Chat() {
  const API_URL = 'https://form2chat.onrender.com/api/contact-form';
  const API_KEY = process.env.FORM2CHAT_API_KEY || 'your_api_key_here';
  
  const testData = {
    name: 'Test User',
    email: 'test@example.com',
    phone: '+911234567890',
    message: 'This is a test message from the test script',
  };

  console.log('Sending test request to form2chat API...');
  console.log('URL:', API_URL);
  console.log('Payload:', JSON.stringify(testData, null, 2));

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY,
        'Accept': 'application/json'
      },
      body: JSON.stringify(testData)
    });

    console.log('Response Status:', response.status);
    console.log('Response Headers:', JSON.stringify(Object.fromEntries(response.headers.entries()), null, 2));
    
    try {
      const data = await response.json();
      console.log('Response Body:', JSON.stringify(data, null, 2));
    } catch (e) {
      console.error('Failed to parse JSON response:', e);
      const text = await response.text();
      console.log('Raw Response:', text);
    }

    if (!response.ok) {
      console.error('API request failed with status:', response.status);
    } else {
      console.log('API request successful!');
    }
  } catch (error) {
    console.error('Error making API request:', error);
  }
}

testForm2Chat();
