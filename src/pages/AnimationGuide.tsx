import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check, Play, Code, Zap, Sparkles, ArrowRight } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Helmet } from 'react-helmet-async';

const AnimationGuide: React.FC = () => {
  const { isDarkMode } = useTheme();
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [playingDemo, setPlayingDemo] = useState<string | null>(null);

  const animations = [
    {
      id: 'fade-in',
      title: 'Fade In',
      description: 'Smooth fade-in animation for elements appearing on screen',
      code: `<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.8 }}
>
  Your content here
</motion.div>`,
      demo: 'fade-in'
    },
    {
      id: 'slide-in-left',
      title: 'Slide In Left',
      description: 'Element slides in from the left side of the screen',
      code: `<motion.div
  initial={{ opacity: 0, x: -50 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.6 }}
>
  Your content here
</motion.div>`,
      demo: 'slide-in-left'
    },
    {
      id: 'slide-in-right',
      title: 'Slide In Right',
      description: 'Element slides in from the right side of the screen',
      code: `<motion.div
  initial={{ opacity: 0, x: 50 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.6 }}
>
  Your content here
</motion.div>`,
      demo: 'slide-in-right'
    },
    {
      id: 'slide-up',
      title: 'Slide Up',
      description: 'Element slides up from the bottom',
      code: `<motion.div
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
>
  Your content here
</motion.div>`,
      demo: 'slide-up'
    },
    {
      id: 'scale-in',
      title: 'Scale In',
      description: 'Element scales up from small to normal size',
      code: `<motion.div
  initial={{ opacity: 0, scale: 0.8 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.6 }}
>
  Your content here
</motion.div>`,
      demo: 'scale-in'
    },
    {
      id: 'bounce',
      title: 'Bounce',
      description: 'Bouncing animation effect',
      code: `<motion.div
  animate={{ y: [0, -10, 0] }}
  transition={{ 
    duration: 0.6,
    repeat: Infinity,
    repeatType: "reverse"
  }}
>
  Your content here
</motion.div>`,
      demo: 'bounce'
    },
    {
      id: 'rotate',
      title: 'Rotate',
      description: 'Continuous rotation animation',
      code: `<motion.div
  animate={{ rotate: 360 }}
  transition={{ 
    duration: 2,
    repeat: Infinity,
    ease: "linear"
  }}
>
  Your content here
</motion.div>`,
      demo: 'rotate'
    },
    {
      id: 'pulse',
      title: 'Pulse',
      description: 'Pulsing scale animation',
      code: `<motion.div
  animate={{ scale: [1, 1.05, 1] }}
  transition={{ 
    duration: 2,
    repeat: Infinity
  }}
>
  Your content here
</motion.div>`,
      demo: 'pulse'
    },
    {
      id: 'hover-scale',
      title: 'Hover Scale',
      description: 'Scale up on hover interaction',
      code: `<motion.div
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  transition={{ type: "spring", stiffness: 300 }}
>
  Your content here
</motion.div>`,
      demo: 'hover-scale'
    },
    {
      id: 'stagger',
      title: 'Stagger Animation',
      description: 'Staggered animation for multiple elements',
      code: `<motion.div
  initial="hidden"
  animate="visible"
  variants={{
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }}
>
  {items.map((item, index) => (
    <motion.div
      key={index}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
      }}
    >
      {item}
    </motion.div>
  ))}
</motion.div>`,
      demo: 'stagger'
    },
    {
      id: 'page-transition',
      title: 'Page Transition',
      description: 'Smooth page transitions with AnimatePresence',
      code: `<AnimatePresence mode="wait">
  <motion.div
    key={location.pathname}
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -20 }}
    transition={{ duration: 0.3 }}
  >
    Your page content
  </motion.div>
</AnimatePresence>`,
      demo: 'page-transition'
    },
    {
      id: 'layout-animation',
      title: 'Layout Animation',
      description: 'Smooth layout transitions with layoutId',
      code: `<motion.div
  layoutId="unique-id"
  className="card"
  onClick={() => setExpanded(!expanded)}
>
  <motion.h2 layout>Title</motion.h2>
  <AnimatePresence>
    {expanded && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        Expanded content
      </motion.div>
    )}
  </AnimatePresence>
</motion.div>`,
      demo: 'layout-animation'
    }
  ];

  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const playDemo = (id: string) => {
    setPlayingDemo(id);
    setTimeout(() => setPlayingDemo(null), 2000);
  };

  const renderDemo = (demo: string) => {
    const isPlaying = playingDemo === demo;
    const baseClasses = "w-20 h-20 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold";

    switch (demo) {
      case 'fade-in':
        return (
          <motion.div
            key={isPlaying ? 'playing' : 'idle'}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className={baseClasses}
          >
            A
          </motion.div>
        );
      case 'slide-in-left':
        return (
          <motion.div
            key={isPlaying ? 'playing' : 'idle'}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className={baseClasses}
          >
            B
          </motion.div>
        );
      case 'slide-in-right':
        return (
          <motion.div
            key={isPlaying ? 'playing' : 'idle'}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className={baseClasses}
          >
            C
          </motion.div>
        );
      case 'slide-up':
        return (
          <motion.div
            key={isPlaying ? 'playing' : 'idle'}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className={baseClasses}
          >
            D
          </motion.div>
        );
      case 'scale-in':
        return (
          <motion.div
            key={isPlaying ? 'playing' : 'idle'}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className={baseClasses}
          >
            E
          </motion.div>
        );
      case 'bounce':
        return (
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ 
              duration: 0.6,
              repeat: isPlaying ? 3 : 0,
              repeatType: "reverse"
            }}
            className={baseClasses}
          >
            F
          </motion.div>
        );
      case 'rotate':
        return (
          <motion.div
            animate={{ rotate: isPlaying ? 360 : 0 }}
            transition={{ 
              duration: 2,
              ease: "linear"
            }}
            className={baseClasses}
          >
            G
          </motion.div>
        );
      case 'pulse':
        return (
          <motion.div
            animate={{ scale: isPlaying ? [1, 1.05, 1] : 1 }}
            transition={{ 
              duration: 2,
              repeat: isPlaying ? 1 : 0
            }}
            className={baseClasses}
          >
            H
          </motion.div>
        );
      case 'hover-scale':
        return (
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
            className={`${baseClasses} cursor-pointer`}
          >
            I
          </motion.div>
        );
      case 'stagger':
        return (
          <motion.div
            key={isPlaying ? 'playing' : 'idle'}
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
            className="flex space-x-2"
          >
            {[1, 2, 3].map((item) => (
              <motion.div
                key={item}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                className="w-6 h-6 bg-gradient-to-r from-purple-600 to-indigo-600 rounded text-white text-xs flex items-center justify-center"
              >
                {item}
              </motion.div>
            ))}
          </motion.div>
        );
      case 'page-transition':
        return (
          <AnimatePresence mode="wait">
            <motion.div
              key={isPlaying ? 'page2' : 'page1'}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className={`${baseClasses} text-xs`}
            >
              {isPlaying ? 'Page 2' : 'Page 1'}
            </motion.div>
          </AnimatePresence>
        );
      case 'layout-animation':
        return (
          <motion.div
            layout
            className={`${baseClasses} ${isPlaying ? 'w-32' : 'w-20'} cursor-pointer`}
            onClick={() => playDemo(demo)}
          >
            <motion.span layout>
              {isPlaying ? 'Expanded' : 'Click'}
            </motion.span>
          </motion.div>
        );
      default:
        return (
          <div className={baseClasses}>
            ?
          </div>
        );
    }
  };

  return (
    <>
      <Helmet>
        <title>Animation Guide | Orincore UI/UX Motion Examples</title>
        <meta name="description" content="Explore Orincore's animation guide for React and Framer Motion. Learn how to create stunning UI/UX effects for your web projects." />
        <meta name="keywords" content="Orincore, animation guide, UI/UX, framer motion, react, web design, motion examples" />
        <meta property="og:title" content="Animation Guide | Orincore UI/UX Motion Examples" />
        <meta property="og:description" content="Explore Orincore's animation guide for React and Framer Motion. Learn how to create stunning UI/UX effects for your web projects." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://orincore.com/animation-guide" />
        <meta property="og:image" content="https://orincore.com/assets/logo/OClogo.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Animation Guide | Orincore UI/UX Motion Examples" />
        <meta name="twitter:description" content="Explore Orincore's animation guide for React and Framer Motion. Learn how to create stunning UI/UX effects for your web projects." />
        <meta name="twitter:image" content="https://orincore.com/assets/logo/OClogo.png" />
        <link rel="canonical" href="https://orincore.com/animation-guide" />
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "TechArticle",
            "headline": "Animation Guide | Orincore UI/UX Motion Examples",
            "description": "Explore Orincore's animation guide for React and Framer Motion. Learn how to create stunning UI/UX effects for your web projects.",
            "author": {
              "@type": "Organization",
              "name": "Orincore Technologies",
              "url": "https://orincore.com/"
            },
            "publisher": {
              "@type": "Organization",
              "name": "Orincore Technologies",
              "url": "https://orincore.com/"
            },
            "mainEntityOfPage": "https://orincore.com/animation-guide"
          }
        `}</script>
      </Helmet>
      <div className="w-full min-h-screen pt-16 bg-white dark:bg-gray-950">
        {/* Hero Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className={`text-5xl sm:text-6xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Animation <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-600 bg-clip-text text-transparent animate-gradient-x">Guide</span>
              </h1>
              <p className={`text-xl mb-8 max-w-3xl mx-auto ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Want stunning UI/UX animations for your website? Orincore is your framer motion expert in India. Explore our animation guide for React and Framer Motion.
              </p>
              {/* Removed 'Hire Us for UI/UX Animation' and 'See Our UI/UX Work' buttons as requested */}
            </motion.div>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className={`p-8 rounded-2xl ${
                isDarkMode 
                  ? 'bg-gradient-to-r from-purple-900 to-indigo-900' 
                  : 'bg-gradient-to-r from-purple-600 to-indigo-600'
              } text-white`}
            >
              <div className="flex items-center mb-6">
                <Sparkles className="w-8 h-8 mr-4" />
                <h2 className="text-3xl font-bold">Getting Started</h2>
              </div>
              <p className="text-lg mb-6 text-purple-100">
                To use these animations in your React project, first install Framer Motion:
              </p>
              <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'} font-mono text-sm`}>
                <div className="flex items-center mb-2">
                  <span className="w-3 h-3 bg-red-500 rounded-full mr-1"></span>
                  <span className="w-3 h-3 bg-yellow-400 rounded-full mr-1"></span>
                  <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                </div>
                <div className="flex items-center justify-between">
                  <span className={`font-mono ${isDarkMode ? 'text-white' : 'text-black'}`}>npm install framer-motion</span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    onClick={() => copyToClipboard('npm install framer-motion', 'install')}
                    className={`ml-4 p-2 rounded transition-colors ${isDarkMode ? 'bg-white/20 hover:bg-white/30 text-white' : 'bg-black/10 hover:bg-black/20 text-black'}`}
                  >
                    {copiedCode === 'install' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </motion.button>
                </div>
              </div>
              <p className="text-purple-100 mt-4">
                Then import the components you need:
              </p>
              <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'} font-mono text-sm mt-2`}>
                <div className="flex items-center mb-2">
                  <span className="w-3 h-3 bg-red-500 rounded-full mr-1"></span>
                  <span className="w-3 h-3 bg-yellow-400 rounded-full mr-1"></span>
                  <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                </div>
                <div className="flex items-center justify-between">
                  <span className={`font-mono ${isDarkMode ? 'text-white' : 'text-black'}`}>import &#123; motion, AnimatePresence &#125; from 'framer-motion';</span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    onClick={() => copyToClipboard("import { motion, AnimatePresence } from 'framer-motion';", 'import')}
                    className={`ml-4 p-2 rounded transition-colors ${isDarkMode ? 'bg-white/20 hover:bg-white/30 text-white' : 'bg-black/10 hover:bg-black/20 text-black'}`}
                  >
                    {copiedCode === 'import' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Animation Examples */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className={`text-4xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Animation Examples
              </h2>
              <p className={`text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Click the play button to see each animation in action
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {animations.map((animation, index) => (
                <motion.div
                  key={animation.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`rounded-2xl shadow-lg overflow-hidden ${
                    isDarkMode ? 'bg-gray-800' : 'bg-white'
                  }`}
                  onMouseEnter={() => playDemo(animation.id)}
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className={`text-xl font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          {animation.title}
                        </h3>
                        <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          {animation.description}
                        </p>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => playDemo(animation.id)}
                        className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        <Play className="w-5 h-5" />
                      </motion.button>
                    </div>

                    {/* Demo Area */}
                    <div className={`p-8 rounded-lg mb-6 ${
                      isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
                    } flex items-center justify-center min-h-[120px]`}>
                      {renderDemo(animation.demo)}
                    </div>

                    {/* Code Block */}
                    <div className="relative">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          <Code className="w-4 h-4 text-purple-600" />
                          <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            Code
                          </span>
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => copyToClipboard(animation.code, animation.id)}
                          className={`flex items-center space-x-2 px-3 py-1 rounded-lg text-sm font-medium transition-all duration-200 ${
                            copiedCode === animation.id
                              ? 'bg-green-100 text-green-700'
                              : isDarkMode
                              ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                              : 'bg-black/10 text-black hover:bg-black/20'
                          }`}
                        >
                          {copiedCode === animation.id ? (
                            <>
                              <Check className="w-4 h-4" />
                              <span>Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-4 h-4" />
                              <span>Copy</span>
                            </>
                          )}
                        </motion.button>
                      </div>
                      <div className={`p-4 rounded-lg ${
                        isDarkMode ? 'bg-gray-900' : 'bg-gray-800'
                      } overflow-x-auto`}>
                        <div className="flex items-center mb-2">
                          <span className="w-3 h-3 bg-red-500 rounded-full mr-1"></span>
                          <span className="w-3 h-3 bg-yellow-400 rounded-full mr-1"></span>
                          <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                        </div>
                        <div style={{
                          borderRadius: '0.5rem',
                          background: isDarkMode ? '#1e1e1e' : '#23272e',
                          border: isDarkMode ? '1px solid #222' : '1px solid #ddd',
                          boxShadow: '0 4px 24px 0 rgba(0,0,0,0.15)',
                          padding: '1.25rem',
                          margin: 0,
                        }}>
                          <SyntaxHighlighter
                            language="javascript"
                            style={vscDarkPlus}
                            customStyle={{
                              borderRadius: '0.5rem',
                              fontSize: '1rem',
                              margin: 0,
                              background: 'transparent',
                              fontFamily: 'Fira Mono, Menlo, Consolas, monospace',
                              padding: 0,
                            }}
                            className="code-block"
                            showLineNumbers={false}
                          >
                            {animation.code}
                          </SyntaxHighlighter>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Tips Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className={`text-3xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Animation Tips
              </h2>
              <p className={`text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Best practices for smooth and performant animations
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  icon: <Zap className="w-8 h-8 text-purple-600" />,
                  title: "Performance First",
                  description: "Use transform and opacity properties for smooth 60fps animations. Avoid animating layout properties like width, height, or position."
                },
                {
                  icon: <ArrowRight className="w-8 h-8 text-purple-600" />,
                  title: "Easing Functions",
                  description: "Use appropriate easing functions. 'ease-out' for entrances, 'ease-in' for exits, and 'ease-in-out' for state changes."
                },
                {
                  icon: <Sparkles className="w-8 h-8 text-purple-600" />,
                  title: "Reduced Motion",
                  description: "Respect user preferences by using 'prefers-reduced-motion' media query for accessibility."
                },
                {
                  icon: <Code className="w-8 h-8 text-purple-600" />,
                  title: "Layout Animations",
                  description: "Use the 'layout' prop for automatic layout animations when elements change position or size."
                }
              ].map((tip, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`p-6 rounded-xl ${
                    isDarkMode ? 'bg-gray-800' : 'bg-white'
                  } shadow-lg hover:shadow-xl transition-shadow duration-300`}
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      {tip.icon}
                    </div>
                    <div>
                      <h3 className={`text-xl font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        {tip.title}
                      </h3>
                      <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {tip.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
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

export default AnimationGuide;