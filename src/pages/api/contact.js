// Helper function to submit to the external form2chat API
async function submitToForm2Chat({ name, email, phone, message, subject }) {
  const combinedMessage = subject ? `Subject: ${subject}\n\n${message}` : message;
  
  console.log('Sending request to form2chat API with data:', {
    name,
    email,
    phone: phone || '',
    message: combinedMessage
  });

  const response = await fetch('https://form2chat.onrender.com/api/contact-form', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.FORM2CHAT_API_KEY || 'your_api_key_here',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      name,
      email,
      phone: phone || '',
      message: combinedMessage
    })
  });

  let data;
  try {
    data = await response.json();
  } catch (e) {
    console.error('Failed to parse form2chat JSON response:', e);
    console.error('Response text:', await response.text());
    throw new Error('Invalid JSON response from form2chat API');
  }

  console.log('form2chat API Response:', {
    status: response.status,
    statusText: response.statusText,
    data
  });

  if (!response.ok) {
    const error = new Error(data.message || 'Failed to send message to form2chat');
    error.response = response;
    error.body = data;
    throw error;
  }

  return { success: true, data };
}

// Helper function to submit to the existing API
async function submitToExistingApi({ name, email, phone, message, subject }) {
  // Replace this URL with your existing API endpoint
  const EXISTING_API_URL = process.env.EXISTING_API_URL || 'https://your-existing-api.com/contact';
  
  console.log('Sending request to existing API with data:', {
    name,
    email,
    phone: phone || '',
    message,
    subject
  });

  const response = await fetch(EXISTING_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      name,
      email,
      phone: phone || '',
      message,
      subject
    })
  });

  let data;
  try {
    data = await response.json();
  } catch (e) {
    console.error('Failed to parse existing API JSON response:', e);
    console.error('Response text:', await response.text());
    throw new Error('Invalid JSON response from existing API');
  }

  console.log('Existing API Response:', {
    status: response.status,
    statusText: response.statusText,
    data
  });

  if (!response.ok) {
    const error = new Error(data.message || 'Failed to send message to existing API');
    error.response = response;
    error.body = data;
    throw error;
  }

  return { success: true, data };
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { name, email, phone, message, subject } = req.body;
    
    // Submit to both APIs in parallel
    const [form2chatResult, existingApiResult] = await Promise.allSettled([
      submitToForm2Chat({ name, email, phone, message, subject }),
      submitToExistingApi({ name, email, phone, message, subject })
    ]);

    // Check results
    const form2chatSuccess = form2chatResult.status === 'fulfilled';
    const existingApiSuccess = existingApiResult.status === 'fulfilled';
    
    // Log any errors
    if (!form2chatSuccess) {
      console.error('form2chat API error:', form2chatResult.reason);
    }
    if (!existingApiSuccess) {
      console.error('Existing API error:', existingApiResult.reason);
    }

    // If both failed, return an error
    if (!form2chatSuccess && !existingApiSuccess) {
      return res.status(500).json({
        success: false,
        message: 'Failed to submit to both APIs',
        errors: {
          form2chat: form2chatResult.reason?.message || 'Unknown error',
          existingApi: existingApiResult.reason?.message || 'Unknown error'
        }
      });
    }

    // If at least one succeeded, return success
    return res.status(200).json({
      success: true,
      message: 'Message submitted successfully',
      results: {
        form2chat: form2chatSuccess ? 'Success' : form2chatResult.reason?.message,
        existingApi: existingApiSuccess ? 'Success' : existingApiResult.reason?.message
      }
    });

  } catch (error) {
    console.error('Contact form error:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Internal server error',
      error: error.message 
    });
  }
}
