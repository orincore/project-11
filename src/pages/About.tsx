import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Award, Users, Target, Zap, Calendar, MapPin, Mail, Phone } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import adarshImg from '../assets/images/adarsh.jpg';
import { Helmet } from 'react-helmet-async';

const About: React.FC = () => {
  const { isDarkMode } = useTheme();

  const values = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Innovation",
      description: "We stay ahead of the curve with cutting-edge technologies and creative solutions"
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Quality",
      description: "Every project undergoes rigorous testing and quality assurance processes"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Customer Satisfaction",
      description: "Client success is our priority, and we work closely with you every step of the way"
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Results-Driven",
      description: "We focus on delivering measurable outcomes that drive business growth"
    }
  ];

  const timeline = [
    {
      date: 'January 2024',
      title: 'Launch of Orincore as a Tech Venture',
      description: 'Adarsh Suradkar founded Orincore Technologies with the vision to build intelligent digital solutions across web, mobile, and AI. The goal was to unify creative development, practical problem-solving, and technical innovation under a personal tech brand.'
    },
    {
      date: 'February – March 2024',
      title: 'Creation of Orincore Web Identity',
      description: 'Developed and deployed the foundational Orincore websites: orincore.com – Company portfolio and brand site; admin.orincore.com – Admin dashboard for internal tools. Used Vite + ReactJS, TailwindCSS, and Render.com for lightning-fast UI with responsive layouts.'
    },
    {
      date: 'April 2024',
      title: 'Planning the Circle App Ecosystem',
      description: 'Designed the architecture for Circle, a cross-platform social platform enabling matchmaking, media sharing, and real-time chat. Defined frontend/backend architecture using React, Flutter, Supabase, Node.js, and Socket.IO.'
    },
    {
      date: 'May 2024',
      title: 'Building the Circle Web & Admin Interfaces',
      description: 'Developed circle.orincore.com and admin.orincore.com, integrating matchmaking, chat, and moderation tools. Utilized AWS S3 for media storage, Supabase for database/auth, and Node.js for matchmaking and chat logic.'
    },
    {
      date: 'June 2024',
      title: 'ESP32 Smart Switch with Google Home Integration',
      description: 'Created a 4-relay ESP32 smart switch system with GPIO-based physical buttons. Integrated the system with Sinric Pro and Google Home, enabling real-time sync between cloud and local state.'
    },
    {
      date: 'July – August 2024',
      title: 'AI Image Generation with Studio',
      description: 'Built studio.orincore.com, an AI-based image generation platform allowing users to create visuals using generative models. Focused on a clean UI, category-based generation, and real-time image rendering.'
    },
    {
      date: 'September – October 2024',
      title: 'Circle App Full Stack Enhancements',
      description: 'Added advanced features like analytics dashboard, user reporting system, gender filters, global media sharing, and Flutter support for mobile. Backend optimized for Socket.IO scalability and Supabase analytics tracking.'
    },
    {
      date: 'November – December 2024',
      title: 'Started AI/ML Career Transition',
      description: 'Enrolled in a detailed AI/ML Udemy course (89 hrs), covering Python, EDA, statistics, model building, and later advanced topics like transformers, RAG, and deep learning. Completed a Loan Approval ML model as the first live ML project.'
    },
    {
      date: 'January – May 2025',
      title: 'AI + Cloud + IoT Skill Integration',
      description: 'Worked on integrating Flutter, AI, ML, and IoT projects into a unified Orincore skill set. Continued development of personal projects and knowledge in hosting, optimization, SEO, and progressive web apps.'
    },
    {
      date: 'June 2025',
      title: 'Manish Photography Website Launch',
      description: 'Designed and deployed a wedding-themed photography platform: Features: Image upload & preview, name tagging, admin panel, Cloudinary storage, and Supabase database. Client Access: Custom login/signup system to submit feedback and ratings. Tech Stack: ReactJS, Node.js, Supabase, Cloudinary, TailwindCSS, Framer Motion. Deployment: Render.com + Custom Domain (via BigRock). Delivered a modern, SEO-ready, client-managed image-sharing system.'
    },
    {
      date: 'July 2025',
      title: 'AI Video Prompting & Process Automation',
      description: 'Experimented with video generation prompts for platforms like Sora. Improved ESP32 state handling, researched natural UI/UX systems, and began integrating AI into UI flows. Laid the groundwork for upcoming generative video and automation tools.'
    },
  ];

  const [hasMounted, setHasMounted] = useState(false);
  const device = useDeviceType();

  useEffect(() => {
    setHasMounted(true);
  }, []);

  return (
    <>
      <Helmet>
        <title>About Orincore | Adarsh Suradkar, CEO & Tech Visionary</title>
        <meta name="description" content="Learn about Orincore Technologies, founded by Adarsh Suradkar. Discover our journey, values, and expertise in web, AI, IoT, and mobile development." />
        <meta name="keywords" content="Orincore, About, Adarsh Suradkar, CEO, web development, AI, IoT, mobile apps, company values, tech journey" />
        <meta property="og:title" content="About Orincore | Adarsh Suradkar, CEO & Tech Visionary" />
        <meta property="og:description" content="Learn about Orincore Technologies, our founder Adarsh Suradkar, and our journey in web, AI, and IoT innovation." />
        <meta property="og:type" content="profile" />
        <meta property="og:url" content="https://orincore.com/about" />
        <meta property="og:image" content="https://orincore.com/assets/images/adarsh.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About Orincore | Adarsh Suradkar, CEO & Tech Visionary" />
        <meta name="twitter:description" content="Learn about Orincore Technologies, our founder Adarsh Suradkar, and our journey in web, AI, and IoT innovation." />
        <meta name="twitter:image" content="https://orincore.com/assets/images/adarsh.jpg" />
        <link rel="canonical" href="https://orincore.com/about" />
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Adarsh Suradkar",
            "url": "https://orincore.com/about",
            "image": "https://orincore.com/assets/images/adarsh.jpg",
            "jobTitle": "Founder & CEO",
            "worksFor": {
              "@type": "Organization",
              "name": "Orincore Technologies",
              "url": "https://orincore.com/"
            },
            "sameAs": [
              "https://www.linkedin.com/in/adarshsuradkar",
              "https://twitter.com/orincore"
            ]
          }
        `}</script>
      </Helmet>
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className={`text-5xl sm:text-6xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              About <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-600 bg-clip-text text-transparent animate-gradient-x">Orincore</span>
            </h1>
            <div className="relative max-w-3xl mx-auto mt-8 mb-12">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-2 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 opacity-80" />
              {/* Mobile/Desktop version (device detection) */}
              {hasMounted && device === 'mobile' && <WhoWeAreMobile isDarkMode={isDarkMode} />}
              {hasMounted && device === 'desktop' && <WhoWeAreDesktop isDarkMode={isDarkMode} />}
            </div>
          </motion.div>
          {/* CTA Section */}
          <div className="mt-8 flex flex-col items-center sm:flex-row justify-center gap-4">
            <a href="/portfolio">
              <button className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-purple-500/25 transition-all duration-300 flex items-center space-x-2">
                See Our Portfolio
              </button>
            </a>
            <a href="/contact">
              <button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-indigo-500/25 transition-all duration-300 flex items-center space-x-2">
                Contact the Founder
              </button>
            </a>
          </div>
          <div className="mt-6 text-center text-lg font-semibold bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-600 bg-clip-text text-transparent animate-gradient-x">
            Learn about Orincore Technologies, an innovative IT company in Mumbai led by Adarsh Suradkar, specializing in web, mobile, and AI solutions.
          </div>
        </div>
      </section>

      {/* CEO Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-6 order-2 w-full lg:order-1"
            >
              <div className="space-y-2">
                <h2 className={`text-4xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Meet Our CEO
                </h2>
                <h3 className="text-2xl font-semibold bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-600 bg-clip-text text-transparent animate-gradient-x">
                  Adarsh Suradkar
                </h3>
              </div>
              
              <div className="space-y-4">
                <p className={`text-lg leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                  I’m Adarsh Suradkar, the Founder and CEO of Orincore Technologies, where I lead the vision, development, and innovation behind our digital solutions. As a hands-on developer and IT engineer, I specialize in building full-stack applications, scalable cloud systems, and AI-powered platforms that address real-world needs. My expertise spans frontend technologies like ReactJS (Vite), TailwindCSS, and Framer Motion, as well as backend development using Node.js, Express, and Python. I also develop cross-platform mobile apps using Flutter, manage cloud infrastructure with AWS and Render.com, and implement storage and media handling through services like Supabase and Cloudinary. Beyond traditional software development, I have experience in smart home automation using ESP32 and Sinric Pro, integrating with platforms like Google Home and Alexa. I’m actively advancing my skills in machine learning and generative AI, focusing on data-driven products and intelligent systems. At Orincore, I combine creativity with technical precision to deliver high-quality solutions—from social platforms and photography websites to real-time chat systems and admin panels. My goal is to push boundaries through technology and create meaningful, efficient digital experiences for users and businesses alike.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-purple-600" />
                  <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    contact@orincore.com
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-purple-600" />
                  <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    +91 8830948511
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-purple-600" />
                  <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Mumbai, Maharashtra, India
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-purple-600" />
                  <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Founded 2024
                  </span>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex justify-center order-1 w-full mb-8 lg:mb-0 lg:order-2"
            >
              <div className="relative">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="w-80 h-80 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-2xl p-6 transform rotate-3"
                >
                  <div className={`w-full h-full rounded-xl ${isDarkMode ? 'bg-gray-800' : 'bg-white'} flex items-center justify-center transform -rotate-3`}>
                    <div className="text-center">
                      <div className="w-32 h-32 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                        <img
                          src={adarshImg}
                          alt="Adarsh Suradkar"
                          className="w-full h-full object-cover rounded-full"
                        />
                      </div>
                      <h4 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        Adarsh Suradkar
                      </h4>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        CEO & Lead Developer
                      </p>
                    </div>
                  </div>
                </motion.div>
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-400 rounded-full animate-pulse" />
                <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-green-400 rounded-full animate-bounce" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Company Values */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className={`text-4xl sm:text-5xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Our Core Values
            </h2>
            <p className={`text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              The principles that guide everything we do
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
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
                  {value.icon}
                </div>
                <h3 className={`text-xl font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {value.title}
                </h3>
                <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className={`text-4xl sm:text-5xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Our Journey
            </h2>
            <p className={`text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Milestones that shaped our growth and success
            </p>
          </motion.div>

          <div className="relative">
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-purple-600 to-indigo-600 h-full rounded-full" />
            
            <div className="space-y-12">
              {timeline.map((item, index) => (
                <motion.div
                  key={item.date}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  className={`flex flex-col md:flex-row items-center ${index % 2 === 0 ? 'md:justify-start' : 'md:justify-end'}`}
                >
                  <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:text-right md:pr-8' : 'md:text-left md:pl-8'}`}> 
                      <div className={`p-6 rounded-xl ${
                        isDarkMode 
                          ? 'bg-gray-800 hover:bg-gray-700' 
                          : 'bg-white hover:bg-gray-50'
                      } shadow-lg hover:shadow-xl transition-all duration-300`}>
                        <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-600 bg-clip-text text-transparent animate-gradient-x mb-2">
                          {item.date}
                        </div>
                        <h3 className={`text-xl font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          {item.title}
                        </h3>
                        <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          {item.description}
                        </p>
                      </div>
                    </div>
                  {/* Timeline dot for desktop only */}
                  <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full border-4 border-white" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className={`p-12 rounded-2xl text-center ${
              isDarkMode 
                ? 'bg-gradient-to-r from-purple-900 to-indigo-900' 
                : 'bg-gradient-to-r from-purple-600 to-indigo-600'
            } text-white`}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Our Mission
            </h2>
            <p className="text-lg leading-relaxed mb-8">
              To empower businesses with innovative digital solutions that drive growth, 
              enhance user experiences, and create lasting value in an ever-evolving digital landscape.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-purple-200 mb-2">45+</div>
                <div className="text-sm">Projects Created</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-200 mb-2">5+</div>
                <div className="text-sm">Happy Clients</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-200 mb-2">2+</div>
                <div className="text-sm">Years Experience</div>
              </div>
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
    </>
  );
};

// WhoWeAreMobile component
const WhoWeAreMobile: React.FC<{ isDarkMode: boolean }> = ({ isDarkMode }) => (
  <div className={`rounded-2xl shadow-xl border ${isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-purple-200'} px-4 py-8 text-gray-600 dark:text-gray-300 flex flex-col items-center overflow-x-auto snap-x`} style={{ maxHeight: '70vh', overflowY: 'auto' }}>
    <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-600 bg-clip-text text-transparent animate-gradient-x text-center">Who We Are</h2>
    <div className="space-y-6 text-base leading-relaxed text-center">
      <p>
        Orincore Technologies is an emerging IT and AI-focused venture founded by Adarsh Suradkar, an ambitious engineer and tech enthusiast with a vision to build intelligent, user-centric digital products.
      </p>
      <p>
        Rooted in innovation and driven by practical applications, the company offers a diverse range of services including web development, mobile app creation, AI/ML solutions, and IoT automation. The company has developed and deployed several full-stack projects using modern technologies like Vite, ReactJS, Tailwind CSS, Node.js, and MongoDB, combined with backend platforms such as Supabase and Cloudinary.
      </p>
      <p>
        Orincore’s expertise extends to cross-platform mobile apps built with Flutter and React Native, which are integrated with features like Google AdMob, real-time notifications, and advanced state management.
      </p>
      <p>
        <b>Circle</b> is a multi-platform social matchmaking app designed for web, mobile, macOS, and Windows that includes real-time chat, intelligent matchmaking, profile discovery, and moderation tools.
      </p>
      <p>
        <b>Manish Photography</b> is a client-centric platform for uploading, sharing, and managing wedding and event photographs, equipped with secure login systems, image optimization, and PWA support.
      </p>
      <p>
        Orincore has also engineered IoT-based smart switch systems using ESP32, Sinric Pro, and Google Home, enabling both cloud and physical control of home appliances with synchronized state updates.
      </p>
      <p>
        The founder, Adarsh Suradkar, is currently pursuing his Bachelor of Computer Applications (BCA) and has already completed projects in machine learning, cloud computing, and generative AI. His strong command of technologies like Python, Scikit-learn, EDA tools, and AWS allows him to build data-driven models such as a loan approval classifier while also preparing for advanced GenAI applications.
      </p>
      <p>
        With a solid foundation in both development and AI, Orincore Technologies aims to become a brand known for delivering smart, scalable, and visually polished solutions. The company continues to expand its portfolio with purpose-driven products, merging creativity with engineering to solve real-world problems across domains.
      </p>
    </div>
  </div>
);

// WhoWeAreDesktop component
const WhoWeAreDesktop: React.FC<{ isDarkMode: boolean }> = ({ isDarkMode }) => (
  <div className={`max-w-3xl mx-auto mt-12 mb-12 rounded-2xl shadow-xl border ${isDarkMode ? 'bg-white/5 border-purple-200/20' : 'bg-white border-purple-200'} px-10 py-12 text-gray-700 dark:text-gray-300 flex flex-col items-center`}>
    <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-600 bg-clip-text text-transparent animate-gradient-x text-center">Who We Are</h2>
    <div className="w-24 h-1 rounded-full mx-auto mb-8 bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-600 opacity-80" />
    <div className="space-y-6 text-base leading-relaxed text-center">
      <p>
        Orincore Technologies is an emerging IT and AI-focused venture founded by Adarsh Suradkar, an ambitious engineer and tech enthusiast with a vision to build intelligent, user-centric digital products.
      </p>
      <p>
        Rooted in innovation and driven by practical applications, the company offers a diverse range of services including web development, mobile app creation, AI/ML solutions, and IoT automation. The company has developed and deployed several full-stack projects using modern technologies like Vite, ReactJS, Tailwind CSS, Node.js, and MongoDB, combined with backend platforms such as Supabase and Cloudinary.
      </p>
      <p>
        Orincore’s expertise extends to cross-platform mobile apps built with Flutter and React Native, which are integrated with features like Google AdMob, real-time notifications, and advanced state management.
      </p>
      <p>
        <b>Circle</b> is a multi-platform social matchmaking app designed for web, mobile, macOS, and Windows that includes real-time chat, intelligent matchmaking, profile discovery, and moderation tools.
      </p>
      <p>
        <b>Manish Photography</b> is a client-centric platform for uploading, sharing, and managing wedding and event photographs, equipped with secure login systems, image optimization, and PWA support.
      </p>
      <p>
        Orincore has also engineered IoT-based smart switch systems using ESP32, Sinric Pro, and Google Home, enabling both cloud and physical control of home appliances with synchronized state updates.
      </p>
      <p>
        The founder, Adarsh Suradkar, is currently pursuing his Bachelor of Computer Applications (BCA) and has already completed projects in machine learning, cloud computing, and generative AI. His strong command of technologies like Python, Scikit-learn, EDA tools, and AWS allows him to build data-driven models such as a loan approval classifier while also preparing for advanced GenAI applications.
      </p>
      <p>
        With a solid foundation in both development and AI, Orincore Technologies aims to become a brand known for delivering smart, scalable, and visually polished solutions. The company continues to expand its portfolio with purpose-driven products, merging creativity with engineering to solve real-world problems across domains.
      </p>
    </div>
  </div>
);

// Device type detection hook
function useDeviceType() {
  const [device, setDevice] = React.useState<string | null>(null);
  React.useEffect(() => {
    function detect() {
      if (typeof window === 'undefined') return;
      const ua = navigator.userAgent;
      if (/Mobi|Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(ua)) {
        setDevice('mobile');
      } else if (window.innerWidth < 640) {
        setDevice('mobile');
      } else {
        setDevice('desktop');
      }
    }
    detect();
    window.addEventListener('resize', detect);
    return () => window.removeEventListener('resize', detect);
  }, []);
  return device;
}

export default About;