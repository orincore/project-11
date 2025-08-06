import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Github, Linkedin, Twitter, Send, Clock, CheckCircle, ChevronDown } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { Helmet } from 'react-helmet-async';

const Contact: React.FC = () => {
  const { isDarkMode } = useTheme();
  // Country code data
  const countryCodes = [
    { code: '+1', name: 'US (+1)' },
    { code: '+91', name: 'IN (+91)' },
    { code: '+44', name: 'UK (+44)' },
    { code: '+61', name: 'AU (+61)' },
    { code: '+65', name: 'SG (+65)' },
    { code: '+971', name: 'AE (+971)' },
    { code: '+86', name: 'CN (+86)' },
    { code: '+81', name: 'JP (+81)' },
    { code: '+82', name: 'KR (+82)' },
    { code: '+60', name: 'MY (+60)' },
  ];

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    countryCode: '+91', // Default to India
    subject: '',
    message: ''
  });
  
  const [isCountryCodeOpen, setIsCountryCodeOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<any>({});

  const validateForm = () => {
    const newErrors: any = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (formData.phone && !/^[\+\d\s\-\(\)]{10,}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    try {
      // Combine country code and phone number
      const payload = {
        ...formData,
        phone: formData.phone ? `${formData.countryCode}${formData.phone.replace(/^\+?\d+/, '')}` : ''
      };

      const res = await fetch(`${API_BASE_URL}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        setIsSubmitted(true);
        setFormData({ 
          name: '', 
          email: '', 
          phone: '', 
          countryCode: '+91', // Reset to default
          subject: '', 
          message: '' 
        });
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      // Optionally, set an error message in the UI
    } finally {
      setIsSubmitting(false);
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev: any) => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email",
      info: "contact@orincore.com",
      link: "mailto:contact@orincore.com"
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Phone",
      info: "+91 8830948511",
      link: "tel:+918830948511"
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Location",
      info: "Mumbai, Maharashtra, India",
      link: "https://maps.google.com/?q=Mumbai,+Maharashtra,+India"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Business Hours",
      info: "Mon - Fri: 9AM - 6PM IST",
      link: null
    }
  ];

  const socialLinks = [
    {
      icon: <Github className="w-6 h-6" />, 
      name: "GitHub", 
      url: "https://github.com/orincore", 
      color: "hover:text-gray-700"
    },
    {
      icon: <Linkedin className="w-6 h-6" />, 
      name: "LinkedIn", 
      url: "https://www.linkedin.com/company/orincore-technologies", 
      color: "hover:text-blue-600"
    },
    {
      icon: <Twitter className="w-6 h-6" />,
      name: "Twitter",
      url: "https://twitter.com/orincore",
      color: "hover:text-blue-400"
     },
     {
       icon: (
         <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
           <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
         </svg>
       ),
       name: "Instagram (Personal)",
       url: "https://instagram.com/ig_orincore",
       color: "hover:text-pink-600"
     },
     {
       icon: (
         <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
           <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
         </svg>
       ),
       name: "Instagram (Official)",
       url: "https://instagram.com/orincore.official",
       color: "hover:text-pink-600"
    }
  ];

  return (
    <>
      <Helmet>
        <title>Contact Orincore | Start Your Project or Get a Free Consultation</title>
        <meta name="description" content="Contact Orincore Technologies for web, mobile, AI, or IoT projects. Get a free consultation and discover how we can help your business grow!" />
        <meta name="keywords" content="Orincore, contact, web development, free consultation, hire developer, business growth, project inquiry" />
        <meta property="og:title" content="Contact Orincore | Start Your Project or Get a Free Consultation" />
        <meta property="og:description" content="Contact Orincore Technologies for web, mobile, AI, or IoT projects. Get a free consultation and discover how we can help your business grow!" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://orincore.com/contact" />
        <meta property="og:image" content="https://orincore.com/assets/logo/OClogo.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Contact Orincore | Start Your Project or Get a Free Consultation" />
        <meta name="twitter:description" content="Contact Orincore Technologies for web, mobile, AI, or IoT projects. Get a free consultation and discover how we can help your business grow!" />
        <meta name="twitter:image" content="https://orincore.com/assets/logo/OClogo.png" />
        <link rel="canonical" href="https://orincore.com/contact" />
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "ContactPage",
            "name": "Contact Orincore",
            "url": "https://orincore.com/contact",
            "description": "Contact Orincore Technologies for web, mobile, AI, or IoT projects. Get a free consultation and discover how we can help your business grow!",
            "publisher": {
              "@type": "Organization",
              "name": "Orincore Technologies",
              "url": "https://orincore.com/"
            },
            "contactPoint": {
              "@type": "ContactPoint",
              "email": "contact@orincore.com",
              "telephone": "+91 8830948511",
              "contactType": "customer support"
            }
          }
        `}</script>
      </Helmet>
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className={`text-5xl sm:text-6xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Get In <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-600 bg-clip-text text-transparent animate-gradient-x">Touch</span>
            </h1>
            <p className={`text-xl mb-8 max-w-3xl mx-auto ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Contact Orincore, your trusted web development and AI partner in Mumbai, for a free consultation or project proposal. Ready to start your next project? Let's discuss how we can help bring your ideas to life with innovative web solutions.
            </p>
            <div className="flex flex-col items-center sm:flex-row justify-center gap-4 mb-8">
              <a href="#contact-form">
                <button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-indigo-500/25 transition-all duration-300 flex items-center space-x-2">
                  Send Your Project Inquiry
                </button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Gradient animation keyframes (add to global styles if not present) */}
      <style>
        {`
          @keyframes gradient-x {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
          }
          .animate-gradient-x {
            background-size: 200% 200%;
            animation: gradient-x 4s ease-in-out infinite;
          }
        `}
      </style>

      {/* Contact Form and Info */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className={`p-8 rounded-2xl shadow-lg ${
                isDarkMode ? 'bg-gray-800' : 'bg-white'
              }`}
            >
              <h2 className={`text-3xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Send us a message
              </h2>
              
              {isSubmitted && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-green-100 border border-green-300 rounded-lg flex items-center space-x-2"
                >
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-green-700">Message sent successfully! We'll get back to you soon.</span>
                </motion.div>
              )}
              
              <form id="contact-form" onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label 
                      htmlFor="name"
                      className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
                    >
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-lg border ${
                        errors.name 
                          ? 'border-red-500 focus:ring-red-500' 
                          : 'border-gray-300 focus:ring-purple-500'
                      } ${
                        isDarkMode 
                          ? 'bg-gray-700 text-white placeholder-gray-400' 
                          : 'bg-white text-gray-900 placeholder-gray-500'
                      } focus:outline-none focus:ring-2 focus:border-transparent transition-colors`}
                      placeholder="Your full name"
                    />
                    {errors.name && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-1 text-sm text-red-500"
                      >
                        {errors.name}
                      </motion.p>
                    )}
                  </div>
                  
                  <div>
                    <label 
                      htmlFor="email"
                      className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
                    >
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-lg border ${
                        errors.email 
                          ? 'border-red-500 focus:ring-red-500' 
                          : 'border-gray-300 focus:ring-purple-500'
                      } ${
                        isDarkMode 
                          ? 'bg-gray-700 text-white placeholder-gray-400' 
                          : 'bg-white text-gray-900 placeholder-gray-500'
                      } focus:outline-none focus:ring-2 focus:border-transparent transition-colors`}
                      placeholder="your@email.com"
                    />
                    {errors.email && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-1 text-sm text-red-500"
                      >
                        {errors.email}
                      </motion.p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label 
                      className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
                    >
                      Phone Number *
                    </label>
                    <div className="relative flex">
                      <div className="relative">
                        <button
                          type="button"
                          onClick={() => setIsCountryCodeOpen(!isCountryCodeOpen)}
                          className={`flex items-center h-full px-3 rounded-l-lg border-r-0 border ${
                            isCountryCodeOpen ? 'ring-2 ring-purple-500 border-purple-500' : 'border-gray-300'
                          } ${
                            isDarkMode 
                              ? 'bg-gray-700 text-white' 
                              : 'bg-gray-50 text-gray-900'
                          } focus:outline-none`}
                        >
                          <span className="mr-1">{formData.countryCode}</span>
                          <ChevronDown className={`w-4 h-4 transition-transform ${isCountryCodeOpen ? 'transform rotate-180' : ''}`} />
                        </button>
                        
                        {isCountryCodeOpen && (
                          <div className="absolute z-10 w-48 mt-1 bg-white rounded-md shadow-lg">
                            <div className="py-1 max-h-60 overflow-auto">
                              {countryCodes.map((country) => (
                                <button
                                  key={country.code}
                                  type="button"
                                  className={`block w-full text-left px-4 py-2 text-sm ${
                                    formData.countryCode === country.code
                                      ? 'bg-purple-100 text-purple-900'
                                      : 'text-gray-700 hover:bg-gray-100'
                                  }`}
                                  onClick={() => {
                                    setFormData(prev => ({
                                      ...prev,
                                      countryCode: country.code
                                    }));
                                    setIsCountryCodeOpen(false);
                                  }}
                                >
                                  {country.name}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className={`flex-1 min-w-0 px-4 py-3 rounded-r-lg border-l-0 ${
                          errors.phone 
                            ? 'border-red-500 focus:ring-red-500' 
                            : 'border-gray-300 focus:ring-purple-500 focus:border-purple-500'
                        } ${
                          isDarkMode 
                            ? 'bg-gray-700 text-white placeholder-gray-400' 
                            : 'bg-white text-gray-900 placeholder-gray-500'
                        } focus:outline-none focus:ring-2 focus:border-transparent transition-colors`}
                        placeholder="123 456 7890"
                      />
                    </div>
                    {errors.phone && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-1 text-sm text-red-500"
                      >
                        {errors.phone}
                      </motion.p>
                    )}
                  </div>
                </div>
                
                <div>
                  <label 
                    htmlFor="subject"
                    className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
                  >
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.subject 
                        ? 'border-red-500 focus:ring-red-500' 
                        : 'border-gray-300 focus:ring-purple-500'
                    } ${
                      isDarkMode 
                        ? 'bg-gray-700 text-white placeholder-gray-400' 
                        : 'bg-white text-gray-900 placeholder-gray-500'
                    } focus:outline-none focus:ring-2 focus:border-transparent transition-colors`}
                    placeholder="What's this about?"
                  />
                  {errors.subject && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-1 text-sm text-red-500"
                    >
                      {errors.subject}
                    </motion.p>
                  )}
                </div>
                
                <div>
                  <label 
                    htmlFor="message"
                    className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
                  >
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.message 
                        ? 'border-red-500 focus:ring-red-500' 
                        : 'border-gray-300 focus:ring-purple-500'
                    } ${
                      isDarkMode 
                        ? 'bg-gray-700 text-white placeholder-gray-400' 
                        : 'bg-white text-gray-900 placeholder-gray-500'
                    } focus:outline-none focus:ring-2 focus:border-transparent transition-colors resize-none`}
                    placeholder="Tell us about your project..."
                  />
                  {errors.message && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-1 text-sm text-red-500"
                    >
                      {errors.message}
                    </motion.p>
                  )}
                </div>
                
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-4 px-6 rounded-lg font-semibold text-white transition-all duration-300 flex items-center justify-center space-x-2 ${
                    isSubmitting 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:shadow-lg'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Send Message</span>
                    </>
                  )}
                </motion.button>
              </form>
            </motion.div>
            
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div>
                <h2 className={`text-3xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Contact Information
                </h2>
                <p className={`text-lg mb-8 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                </p>
              </div>
              
              <div className="space-y-6">
                {contactInfo.map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className={`p-6 rounded-xl ${
                      isDarkMode ? 'bg-gray-800' : 'bg-white'
                    } shadow-lg hover:shadow-xl transition-shadow duration-300`}
                  >
                    <div className="flex items-start space-x-4">
                      <div className="text-purple-600 mt-1">
                        {item.icon}
                      </div>
                      <div>
                        <h3 className={`text-lg font-semibold mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          {item.title}
                        </h3>
                        {item.link ? (
                          <a
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`text-gray-600 hover:text-purple-600 transition-colors ${
                              isDarkMode ? 'text-gray-400' : 'text-gray-600'
                            }`}
                          >
                            {item.info}
                          </a>
                        ) : (
                          <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            {item.info}
                          </p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <div className={`p-6 rounded-xl ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
                <h3 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Follow Us
                </h3>
                <div className="flex space-x-4">
                  {socialLinks.map((social) => (
                    <motion.a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className={`p-3 rounded-lg ${
                        isDarkMode 
                          ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      } transition-all duration-300 ${social.color}`}
                    >
                      {social.icon}
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="rounded-2xl overflow-hidden shadow-lg"
          >
            <iframe
              title="Orincore Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241317.1160998137!2d72.74109995!3d19.0821978!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b63b5b5b5b5b%3A0x5b5b5b5b5b5b5b5b!2sMumbai%2C+Maharashtra%2C+India!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin"
              width="100%"
              height="400"
              frameBorder="0"
              style={{ border: 0 }}
              allowFullScreen={false}
              aria-hidden="false"
              tabIndex={0}
            />
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Contact;