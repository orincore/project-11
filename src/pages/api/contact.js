export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { name, email, phone, message, subject } = req.body;
    
    // Combine subject and message if subject exists
    const combinedMessage = subject ? `Subject: ${subject}\n\n${message}` : message;

    // Forward the request to the external API
    const response = await fetch('https://form2chat.onrender.com/api/contact-form', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.FORM2CHAT_API_KEY || 'your_api_key_here'
      },
      body: JSON.stringify({
        name,
        email,
        phone: phone || '',
        message: combinedMessage
      })
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ 
        success: false, 
        message: data.message || 'Failed to send message',
        details: data
      });
    }

    return res.status(200).json({ 
      success: true, 
      message: 'Message sent successfully',
      data
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
