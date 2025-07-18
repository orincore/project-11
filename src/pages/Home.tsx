import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { ArrowRight, Code, Zap, Users, Award, ChevronDown, Star, ArrowLeft, ArrowRight as ArrowRightIcon, MessageCircle } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { Link } from 'react-router-dom';
import adarshImg from '../assets/images/adarsh.jpg';
import iciciLogo from '../assets/images/icici.png';

const Home: React.FC = () => {
  const { isDarkMode } = useTheme();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const mainControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
    }
  }, [isInView, mainControls]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const techStack = [
    'React', 'Node.js', 'TypeScript', 'Python', 'MongoDB', 'PostgreSQL',
    'AWS', 'Docker', 'GraphQL', 'Next.js', 'Express.js', 'Tailwind CSS'
  ];

  const features = [
    {
      icon: <Code className="w-8 h-8" />,
      title: "Full-Stack Development",
      description: "End-to-end web applications with modern technologies"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Performance Optimization",
      description: "Lightning-fast applications with optimized code"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Client-Focused Solutions",
      description: "Custom solutions tailored to your business needs"
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Quality Assurance",
      description: "Rigorous testing and quality control processes"
    }
  ];

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 opacity-90" />
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse" />
          <div className="absolute top-40 right-20 w-72 h-72 bg-indigo-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-2000" />
          <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-4000" />
        </div>
        
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <motion.h1 
              className="text-6xl sm:text-7xl lg:text-8xl font-bold text-white mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              Orincore
            </motion.h1>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-4"
            >
              <p className="text-xl sm:text-2xl text-purple-200 max-w-3xl mx-auto">
                Building the future of web development
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-lg text-purple-300">
                {['Innovative Solutions', 'Quality Development', 'Client Success'].map((phrase, index) => (
                  <motion.span
                    key={phrase}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 + index * 0.2 }}
                    className="bg-purple-800/30 px-4 py-2 rounded-full backdrop-blur-sm"
                  >
                    {phrase}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="pt-8 flex justify-center"
            >
              <Link to="/portfolio">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(139, 92, 246, 0.3)" }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-purple-500/25 transition-all duration-300 flex items-center space-x-2"
                >
                  <span>Explore My Work</span>
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
          onClick={() => scrollToSection('introduction')}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-white"
          >
            <ChevronDown className="w-8 h-8" />
          </motion.div>
        </motion.div>
      </section>

      {/* Recognition Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="rounded-2xl shadow-xl bg-gradient-to-r from-orange-100/80 via-white/80 to-purple-100/80 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-10 flex flex-col items-center text-center border border-orange-200 dark:border-gray-700"
          >
            <div className="mb-6 flex justify-center">
              <img
                src={iciciLogo}
                alt="ICICI Lombard Logo"
                className="h-20 w-auto object-contain drop-shadow-lg"
                style={{ maxWidth: '220px' }}
              />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-2 bg-gradient-to-r from-orange-600 to-purple-600 bg-clip-text text-transparent">
              Recognised by ICICI Lombard
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 max-w-xl mx-auto">
              Orincore Technologies is proud to be recognised by ICICI Lombard for our commitment to innovation, reliability, and excellence in digital solutions. This recognition inspires us to deliver even greater value to our clients and partners.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Best Reviews Slider Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="rounded-2xl shadow-xl bg-gradient-to-r from-purple-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 px-8 sm:px-16 py-14 flex flex-col items-center text-center border border-purple-200 dark:border-gray-700 w-full max-w-5xl mx-auto"
          >
            <h2 className="text-2xl sm:text-3xl font-bold mb-8 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              What Our Clients Say
            </h2>
            <BestReviewsSlider />
            <Link to="/reviews" className="mt-8 inline-block">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-3 rounded-full font-semibold text-lg shadow-lg hover:shadow-purple-500/25 transition-all duration-300 flex items-center space-x-2"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                <span>Submit Your Review</span>
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Introduction Section */}
      <section id="introduction" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              ref={ref}
              initial="hidden"
              animate={mainControls}
              variants={{
                hidden: { opacity: 0, x: -50 },
                visible: { opacity: 1, x: 0 }
              }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <h2 className={`text-4xl sm:text-5xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Hi, I'm <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  Adarsh Suradkar
                </span>
              </h2>
              <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                CEO & Lead Developer at Orincore
              </p>
              <p className={`text-lg leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-700'}`}>
              I’m Adarsh Suradkar, the Founder and CEO of Orincore Technologies, where I lead the vision, development, and innovation behind our digital solutions. As a hands-on developer and IT engineer, I specialize in building full-stack applications, scalable cloud systems, and AI-powered platforms that address real-world needs. My expertise spans frontend technologies like ReactJS (Vite), TailwindCSS, and Framer Motion, as well as backend development using Node.js, Express, and Python. I also develop cross-platform mobile apps using Flutter, manage cloud infrastructure with AWS and Render.com, and implement storage and media handling through services like Supabase and Cloudinary. Beyond traditional software development, I have experience in smart home automation using ESP32 and Sinric Pro, integrating with platforms like Google Home and Alexa. I’m actively advancing my skills in machine learning and generative AI, focusing on data-driven products and intelligent systems. At Orincore, I combine creativity with technical precision to deliver high-quality solutions—from social platforms and photography websites to real-time chat systems and admin panels. My goal is to push boundaries through technology and create meaningful, efficient digital experiences for users and businesses alike.

              </p>
              <div className="flex flex-wrap gap-2">
                {['Leadership', 'Innovation', 'Quality', 'Client Focus'].map((trait) => (
                  <span
                    key={trait}
                    className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-2 rounded-full text-sm font-medium"
                  >
                    {trait}
                  </span>
                ))}
              </div>
            </motion.div>
            
            <motion.div
              initial="hidden"
              animate={mainControls}
              variants={{
                hidden: { opacity: 0, x: 50 },
                visible: { opacity: 1, x: 0 }
              }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex justify-center"
            >
              <div className="relative">
                <div className="w-80 h-80 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-full p-4">
                  <div className={`w-full h-full rounded-full ${isDarkMode ? 'bg-gray-800' : 'bg-white'} flex items-center justify-center`}>
                    <img
                      src={adarshImg}
                      alt="Adarsh Suradkar"
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                </div>
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-400 rounded-full animate-pulse" />
                <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-green-400 rounded-full animate-pulse" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className={`text-4xl sm:text-5xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Tech Stack
            </h2>
            <p className={`text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Technologies I work with to build amazing applications
            </p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {techStack.map((tech, index) => (
              <motion.div
                key={tech}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.05 }}
                className={`p-4 rounded-lg text-center ${
                  isDarkMode 
                    ? 'bg-gray-800 hover:bg-gray-700 text-white' 
                    : 'bg-white hover:bg-gray-50 text-gray-900'
                } shadow-lg hover:shadow-xl transition-all duration-300`}
              >
                <div className="text-sm font-medium">{tech}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className={`text-4xl sm:text-5xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Why Choose Orincore?
            </h2>
            <p className={`text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              We deliver exceptional results through our core strengths
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className={`p-6 rounded-xl text-center ${
                  isDarkMode 
                    ? 'bg-gray-800 hover:bg-gray-700' 
                    : 'bg-white hover:bg-gray-50'
                } shadow-lg hover:shadow-xl transition-all duration-300`}
              >
                <div className="text-purple-600 mb-4 flex justify-center">
                  {feature.icon}
                </div>
                <h3 className={`text-xl font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {feature.title}
                </h3>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sub-websites Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className={`text-4xl sm:text-5xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Our Digital Ecosystem
            </h2>
            <p className={`text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Explore our suite of innovative web applications and services
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className={`p-8 rounded-2xl ${
                isDarkMode ? 'bg-gray-800' : 'bg-white'
              } shadow-lg hover:shadow-xl transition-all duration-300`}
            >
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl flex items-center justify-center mr-4">
                  <span className="text-2xl font-bold text-white">S</span>
                </div>
                <div>
                  <h3 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Orincore Studio
                  </h3>
                  <p className="text-purple-600 font-medium">studio.orincore.com</p>
                </div>
              </div>
              <p className={`text-lg mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Professional AI-powered image generation service starting at just ₹10 per image. 
                Create stunning visuals for your projects with cutting-edge technology.
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {['AI Generation', 'Custom Styles', 'High Quality', 'Fast Delivery'].map((feature) => (
                  <span
                    key={feature}
                    className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {feature}
                  </span>
                ))}
              </div>
              <motion.a
                href="https://studio.orincore.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
              >
                <span>Visit Studio</span>
                <ArrowRight className="w-5 h-5" />
              </motion.a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className={`p-8 rounded-2xl ${
                isDarkMode ? 'bg-gray-800' : 'bg-white'
              } shadow-lg hover:shadow-xl transition-all duration-300`}
            >
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mr-4">
                  <span className="text-2xl font-bold text-white">C</span>
                </div>
                <div>
                  <h3 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Orincore Circle
                  </h3>
                  <p className="text-blue-600 font-medium">circle.orincore.com</p>
                </div>
              </div>
              <p className={`text-lg mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Connect with like-minded individuals through our innovative social media platform. 
                Discover people who share your interests and build meaningful connections.
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {['Interest Matching', 'Real Connections', 'Safe Community', 'Interactive Features'].map((feature) => (
                  <span
                    key={feature}
                    className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {feature}
                  </span>
                ))}
              </div>
              <motion.a
                href="https://circle.orincore.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
              >
                <span>Join Circle</span>
                <ArrowRight className="w-5 h-5" />
              </motion.a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className={`p-12 rounded-2xl ${
              isDarkMode 
                ? 'bg-gradient-to-r from-purple-900 to-indigo-900' 
                : 'bg-gradient-to-r from-purple-600 to-indigo-600'
            } text-white`}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Ready to Build Something Amazing?
            </h2>
            <p className="text-lg mb-8 text-purple-200">
              Let's discuss your project and turn your ideas into reality
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-purple-600 px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Get In Touch
                </motion.button>
              </Link>
              <Link to="/portfolio">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-purple-600 transition-all duration-300"
                >
                  View Portfolio
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;

const BestReviewsSlider: React.FC = () => {
  const { isDarkMode } = useTheme();
  const [reviews, setReviews] = useState<any[]>([]);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    fetch(`${import.meta.env.VITE_API_BASE_URL}/reviews`)
      .then(res => res.json())
      .then(data => {
        // Sort by rating desc, then by date desc
        const sorted = data
          .filter((r: any) => r.rating >= 4)
          .sort((a: any, b: any) => b.rating - a.rating || new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        setReviews(sorted.slice(0, 8)); // Show up to 8 best reviews
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load reviews.');
        setLoading(false);
      });
  }, []);

  const next = () => setCurrent((prev) => (prev + 1) % reviews.length);
  const prev = () => setCurrent((prev) => (prev - 1 + reviews.length) % reviews.length);

  if (loading) return <div className="py-8 text-lg text-gray-400">Loading reviews...</div>;
  if (error || reviews.length === 0) return <div className="py-8 text-lg text-gray-400">No reviews yet.</div>;

  const review = reviews[current];
  return (
    <motion.div
      key={review.id}
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.5 }}
      className={`w-full flex flex-col items-center max-w-4xl mx-auto`}
    >
      <div className="flex items-center mb-4">
        <div className="w-14 h-14 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-2xl mr-4">
          {review.name ? review.name.split(' ').map((n: string) => n[0]).join('') : ''}
        </div>
        <div className="text-left">
          <h3 className={`font-semibold text-lg ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{review.name}</h3>
          <div className="flex items-center space-x-1 mt-1">
            {Array.from({ length: 5 }, (_, i) => (
              <Star key={i} className={`w-5 h-5 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'} fill-current`} />
            ))}
          </div>
        </div>
      </div>
      <div className="relative mb-4 w-full">
        <p className={`text-lg leading-relaxed italic mx-auto max-w-xl ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{review.feedback || review.message}</p>
      </div>
      <div className="flex items-center justify-center gap-4 mt-4">
        <button onClick={prev} className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-purple-100 dark:hover:bg-purple-900 transition" title="Previous Review">
          <ArrowLeft className="w-5 h-5 text-purple-600" />
        </button>
        <span className="text-xs text-gray-400">{current + 1} / {reviews.length}</span>
        <button onClick={next} className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-purple-100 dark:hover:bg-purple-900 transition" title="Next Review">
          <ArrowRight className="w-5 h-5 text-purple-600" />
        </button>
      </div>
    </motion.div>
  );
};