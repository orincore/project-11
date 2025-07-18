import React, { useEffect, useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, ArrowLeft, Github, Globe } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Loader from '../components/Loader';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const categories = ['All', 'Web Development', 'Mobile Apps', 'E-commerce', 'Dashboard', 'API Development'];

const Portfolio: React.FC = () => {
  const { isDarkMode } = useTheme();
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [showProjectDetail, setShowProjectDetail] = useState(false);
  const navigate = useNavigate();
  // Track current image index for each card
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [cardImageIndexes, setCardImageIndexes] = useState<{ [id: string]: number }>({});
  const [slideTimers, setSlideTimers] = useState<{ [id: string]: any }>({});

  useEffect(() => {
    setLoading(true);
    fetch(`${API_BASE_URL}/portfolio`)
      .then(res => res.json())
      .then(data => {
        setProjects(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load projects.');
        setLoading(false);
      });
    // Cleanup timers on unmount
    return () => {
      Object.values(slideTimers).forEach(clearTimeout);
    };
    // eslint-disable-next-line
  }, []);

  const filteredProjects = projects.filter((project) => {
    const matchesCategory = selectedCategory === 'All' || (project.category && project.category === selectedCategory);
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (project.description && project.description.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  // Helper to get images for a project
  const getProjectImages = (project: any) => {
    if (Array.isArray(project.image_urls) && project.image_urls.length > 0) {
      return project.image_urls;
    } else if (Array.isArray(project.screenshots) && project.screenshots.length > 0) {
      return project.screenshots;
    } else if (project.image_url) {
      return [project.image_url];
    }
    return [];
  };

  // Handle hover to auto-slide images
  const handleCardMouseEnter = (id: string, images: string[]) => {
    setHoveredCard(id);
    if (images.length <= 1) return;
    let idx = 0;
    const slide = () => {
      setCardImageIndexes(prev => ({ ...prev, [id]: idx }));
      idx = (idx + 1) % images.length;
      const timer = setTimeout(slide, 1800); // smoother, slower
      setSlideTimers(prev => ({ ...prev, [id]: timer }));
    };
    slide();
  };
  const handleCardMouseLeave = (id: string) => {
    setHoveredCard(null);
    setCardImageIndexes(prev => ({ ...prev, [id]: 0 }));
    if (slideTimers[id]) {
      clearTimeout(slideTimers[id]);
      setSlideTimers(prev => {
        const newTimers = { ...prev };
        delete newTimers[id];
        return newTimers;
      });
    }
  };

  if (loading) return <div className="pt-16 flex justify-center"><Loader size={56} /></div>;
  if (error) return <div className="pt-16 text-center text-red-500">{error}</div>;

  return (
    <>
      <Helmet>
        <title>Portfolio | Orincore Web, Mobile, and AI Projects</title>
        <meta name="description" content="Explore Orincore's portfolio of web, mobile, AI, and IoT projects. See our work in full-stack development, cloud, and digital innovation." />
        <meta name="keywords" content="Orincore, portfolio, web development, mobile apps, AI, IoT, full-stack, projects, digital solutions" />
        <meta property="og:title" content="Portfolio | Orincore Web, Mobile, and AI Projects" />
        <meta property="og:description" content="Explore Orincore's portfolio of web, mobile, AI, and IoT projects. See our work in full-stack development, cloud, and digital innovation." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://orincore.com/portfolio" />
        <meta property="og:image" content="https://orincore.com/assets/logo/OClogo.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Portfolio | Orincore Web, Mobile, and AI Projects" />
        <meta name="twitter:description" content="Explore Orincore's portfolio of web, mobile, AI, and IoT projects. See our work in full-stack development, cloud, and digital innovation." />
        <meta name="twitter:image" content="https://orincore.com/assets/logo/OClogo.png" />
        <link rel="canonical" href="https://orincore.com/portfolio" />
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "Orincore Portfolio",
            "url": "https://orincore.com/portfolio",
            "description": "Explore Orincore's portfolio of web, mobile, AI, and IoT projects.",
            "publisher": {
              "@type": "Organization",
              "name": "Orincore Technologies",
              "url": "https://orincore.com/"
            }
          }
        `}</script>
      </Helmet>
      <div className="w-full min-h-screen pt-16 bg-white dark:bg-gray-950">
        <div className="w-full max-w-[1800px] mx-auto py-20 px-2 sm:px-4 lg:px-8">
          <h1 className={`text-4xl font-bold mb-8 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Portfolio Projects</h1>
          <div className="mb-6 text-center text-base sm:text-lg font-semibold bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-600 bg-clip-text text-transparent animate-gradient-x">
            Explore our portfolio of web, mobile, and AI projects delivered for clients across India. Custom web app development, AI solutions, and more.
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
          <div className="mb-8 flex flex-col gap-4">
            {/* Search Bar */}
            <div className="relative w-full sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl mx-auto flex justify-center">
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-4 pr-4 py-2 rounded-full border ${
                  isDarkMode
                    ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                } focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
              />
            </div>
            {/* Category Filters */}
            <div className="flex gap-2 justify-start max-w-full overflow-x-auto pb-1 whitespace-nowrap -mx-2 px-2">
              {categories.map((category) => (
                <motion.button
                  key={category}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 py-1.5 text-sm sm:px-4 sm:py-2 sm:text-base rounded-full font-medium transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg'
                      : isDarkMode
                      ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {category}
                </motion.button>
              ))}
            </div>
          </div>
          {/* Projects Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-10">
            <AnimatePresence>
              {filteredProjects.map((project) => {
                const images = getProjectImages(project);
                const currentIdx = cardImageIndexes[project.id] || 0;
                return (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    whileHover={{ y: -10 }}
                    className={`relative group rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-300 ${
                      isDarkMode ? 'bg-gray-800' : 'bg-white'
                    }`}
                    onMouseEnter={() => handleCardMouseEnter(project.id, images)}
                    onMouseLeave={() => handleCardMouseLeave(project.id)}
                  >
                    {/* Project Image with overlay */}
                    <div className="relative w-full aspect-[16/9] overflow-hidden">
                      {images.length > 0 && (
                        <motion.img
                          key={images[currentIdx]}
                          src={images[currentIdx]}
                          alt={project.title}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.4 }}
                          className="w-full h-full object-cover"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
                      <div className="absolute bottom-4 left-4">
                        <h3 className="text-2xl font-bold text-white drop-shadow-lg">{project.title}</h3>
                      </div>
                    </div>
                    {/* Card Content */}
                    <div className="p-6 flex flex-col h-[220px] justify-between">
                      <p className={`text-sm mb-4 line-clamp-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{project.description}</p>
                      {project.tech_stack && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {(Array.isArray(project.tech_stack) ? project.tech_stack : String(project.tech_stack).split(',')).map((tech: string) => (
                            <span
                              key={tech}
                              className={`text-xs px-2 py-1 rounded-full ${
                                isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                              }`}
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                      <div className="flex items-center gap-3 mt-auto">
                        {project.repo_url && (
                          <a
                            href={project.repo_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 px-3 py-2 rounded-full bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-600 bg-clip-text text-transparent animate-gradient-x hover:bg-gray-700 transition text-xs font-semibold shadow"
                            title="View Repo"
                          >
                            <Github className="w-4 h-4 mr-1" /> Repo
                          </a>
                        )}
                        {project.live_url && (
                          <a
                            href={project.live_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 px-3 py-2 rounded-full bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-600 bg-clip-text text-transparent animate-gradient-x hover:from-purple-700 hover:to-indigo-700 transition text-xs font-semibold shadow"
                            title="View Live"
                          >
                            <Globe className="w-4 h-4 mr-1" /> Live
                          </a>
                        )}
                        <button
                          onClick={() => navigate(`/portfolio/${project.id}`)}
                          className="flex items-center gap-1 px-3 py-2 rounded-full bg-white border border-purple-200 hover:bg-purple-50 transition text-xs font-semibold shadow bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-600 bg-clip-text text-transparent animate-gradient-x"
                          title="More Details"
                        >
                          <Eye className="w-4 h-4 mr-1" /> More Details
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
          {/* Project Detail Modal */}
          <AnimatePresence>
            {selectedProject && showProjectDetail && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className={`fixed inset-0 z-50 overflow-y-auto ${isDarkMode ? 'bg-gray-900/95' : 'bg-gray-50/95'}`}
              >
                <div className="min-h-screen pt-4">
                  <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
                    <motion.button
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setShowProjectDetail(false);
                        setSelectedProject(null);
                      }}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
                        isDarkMode ? 'bg-gray-800 text-white hover:bg-gray-700' : 'bg-white text-gray-900 hover:bg-gray-100'
                      } shadow-lg transition-all duration-300`}
                    >
                      <ArrowLeft className="w-5 h-5" />
                      <span>Back to Portfolio</span>
                    </motion.button>
                  </div>
                  <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8 }}
                      className="text-center mb-12"
                    >
                      <h1 className={`text-4xl sm:text-5xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{selectedProject.title}</h1>
                      <p className={`text-xl mb-6 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{selectedProject.description}</p>
                      <div className="flex flex-wrap justify-center gap-4 mb-8">
                        {selectedProject.category && (
                          <span className="text-xs bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-2 py-1 rounded-full">
                            {selectedProject.category}
                          </span>
                        )}
                        {selectedProject.tech_stack && (
                          <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded-full">
                            {Array.isArray(selectedProject.tech_stack) ? selectedProject.tech_stack.join(', ') : selectedProject.tech_stack}
                          </span>
                        )}
                      </div>
                      <div className="flex justify-center space-x-4">
                        {selectedProject.repo_url && (
                          <a
                            href={selectedProject.repo_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-gray-800 text-white px-6 py-3 rounded-lg font-medium flex items-center space-x-2 hover:bg-gray-700 transition-colors"
                          >
                            <Github className="w-5 h-5 mr-1" /> Repo
                          </a>
                        )}
                        {selectedProject.live_url && (
                          <a
                            href={selectedProject.live_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-3 rounded-lg font-medium flex items-center space-x-2 hover:shadow-lg transition-all"
                          >
                            <Globe className="w-5 h-5 mr-1" /> Live Demo
                          </a>
                        )}
                      </div>
                    </motion.div>
                    {selectedProject.image_url && (
                      <div className="relative w-full flex justify-center items-center mb-8" style={{ background: isDarkMode ? '#222' : '#f3f3f3', minHeight: '300px' }}>
                        <img
                          src={selectedProject.image_url}
                          alt={selectedProject.title}
                          className="max-w-full max-h-[70vh] object-contain rounded-3xl shadow-xl"
                        />
                      </div>
                    )}
                    <div className="flex justify-center mt-8">
                      <button
                        onClick={() => navigate(`/portfolio/${selectedProject.id}`)}
                        className="px-6 py-2 rounded bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold hover:shadow"
                      >
                        More Details
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
};

export default Portfolio;