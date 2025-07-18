import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { ArrowLeft, Github, Globe, ChevronLeft, ChevronRight } from 'lucide-react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const ProjectDetails: React.FC = () => {
  const { isDarkMode } = useTheme();
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    setLoading(true);
    fetch(`${API_BASE_URL}/portfolio/${id}`)
      .then(res => res.json())
      .then(data => {
        setProject(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load project details.');
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="pt-16 text-center text-lg">Loading project...</div>;
  if (error || !project) return <div className="pt-16 text-center text-red-500">{error || 'Project not found.'}</div>;

  // Prepare images for slider
  let images: string[] = [];
  if (Array.isArray(project.image_urls) && project.image_urls.length > 0) {
    images = project.image_urls;
  } else if (Array.isArray(project.screenshots) && project.screenshots.length > 0) {
    images = project.screenshots;
  } else if (project.image_url) {
    images = [project.image_url];
  }

  const showPrev = () => setCurrentImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  const showNext = () => setCurrentImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));

  const ActionButtons = () => (
    <div className="flex flex-wrap gap-4 my-4">
      {project.repo_url && (
        <a href={project.repo_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 px-6 py-3 rounded-full bg-gray-900 text-white hover:bg-gray-700 transition text-base font-semibold shadow" title="View Repo">
          <Github className="w-5 h-5 mr-1" /> Repo
        </a>
      )}
      {project.live_url && project.live_url.trim() && (
        <a href={project.live_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700 transition text-base font-semibold shadow" title="View Live">
          <Globe className="w-5 h-5 mr-1" /> Live
        </a>
      )}
    </div>
  );

  return (
    <div className={`min-h-screen pt-16 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="w-full max-w-[1200px] mx-auto py-20 px-2 sm:px-4 lg:px-8">
        <button onClick={() => navigate(-1)} className={`flex items-center mb-8 px-4 py-2 rounded-lg ${isDarkMode ? 'bg-gray-800 text-white hover:bg-gray-700' : 'bg-white text-gray-900 hover:bg-gray-100'} shadow transition`}>
          <ArrowLeft className="w-5 h-5 mr-2" /> Back to Portfolio
        </button>
        {/* Image Slider */}
        {images.length > 0 && (
          <div className="relative w-full flex justify-center items-center mb-8" style={{ background: isDarkMode ? '#222' : '#f3f3f3', minHeight: '300px' }}>
            <img
              src={images[currentImage]}
              alt={project.title}
              className="max-w-full max-h-[70vh] object-contain rounded-3xl shadow-xl"
              style={{ display: 'block', margin: '0 auto' }}
            />
            {images.length > 1 && (
              <>
                <button onClick={showPrev} className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/80 hover:bg-white text-purple-700 rounded-full p-2 shadow transition">
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button onClick={showNext} className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/80 hover:bg-white text-purple-700 rounded-full p-2 shadow transition">
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
            {images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {images.map((_, idx) => (
                  <span key={idx} className={`w-3 h-3 rounded-full ${currentImage === idx ? 'bg-purple-600' : 'bg-gray-300'} border-2 border-white`} />
                ))}
              </div>
            )}
          </div>
        )}
        {/* Buttons below images */}
        <ActionButtons />
        {/* Info Section */}
        <div className="mb-6 flex flex-wrap gap-2 items-center">
          {project.created_at && (
            <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded-full mr-2">Created: {new Date(project.created_at).toLocaleDateString()}</span>
          )}
          {project.tech_stack && (Array.isArray(project.tech_stack) ? project.tech_stack : String(project.tech_stack).split(',')).map((tech: string) => (
            <span
              key={tech}
              className={`text-xs px-2 py-1 rounded-full ${isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'}`}
            >
              {tech}
            </span>
          ))}
        </div>
        <h1 className={`text-4xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{project.title}</h1>
        <p className={`text-lg mb-10 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{project.description}</p>
        {/* Bottom Buttons */}
        <ActionButtons />
      </div>
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mt-12">
          <div className={`p-8 rounded-2xl shadow-lg ${isDarkMode ? 'bg-gradient-to-r from-purple-900 to-indigo-900 text-white' : 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white'}`}>
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">Want to create a similar project with us?</h2>
            <p className="text-lg mb-8">Connect with Orincore Technologies and let's build something amazing together!</p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="mailto:contact@orincore.com" className="flex items-center gap-2 px-6 py-3 rounded-lg bg-white text-purple-700 font-semibold shadow hover:bg-purple-50 transition" title="Email">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 4h16v16H4z" stroke="none"/><path d="M22 6l-10 7L2 6" /></svg>
                Email
              </a>
              <a href="https://wa.me/918830948511" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-3 rounded-lg bg-green-500 text-white font-semibold shadow hover:bg-green-600 transition" title="WhatsApp">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.52 3.48A12.07 12.07 0 0 0 12 0C5.37 0 0 5.37 0 12c0 2.11.55 4.16 1.6 5.97L0 24l6.18-1.62A12.07 12.07 0 0 0 12 24c6.63 0 12-5.37 12-12 0-3.21-1.25-6.23-3.48-8.52zM12 22c-1.85 0-3.68-.5-5.25-1.44l-.37-.22-3.67.97.98-3.58-.24-.37A9.94 9.94 0 0 1 2 12c0-5.52 4.48-10 10-10s10 4.48 10 10-4.48 10-10 10zm5.2-7.8c-.28-.14-1.65-.81-1.9-.9-.25-.09-.43-.14-.61.14-.18.28-.7.9-.86 1.08-.16.18-.32.2-.6.07-.28-.14-1.18-.44-2.25-1.4-.83-.74-1.39-1.65-1.55-1.93-.16-.28-.02-.43.12-.57.12-.12.28-.32.42-.48.14-.16.18-.28.28-.46.09-.18.05-.34-.02-.48-.07-.14-.61-1.47-.84-2.01-.22-.53-.45-.46-.61-.47-.16-.01-.34-.01-.52-.01-.18 0-.48.07-.73.34-.25.27-.97.95-.97 2.3 0 1.35.99 2.65 1.13 2.83.14.18 1.95 2.98 4.74 4.06.66.28 1.18.45 1.58.58.66.21 1.26.18 1.73.11.53-.08 1.65-.67 1.88-1.32.23-.65.23-1.2.16-1.32-.07-.12-.25-.18-.53-.32z"/></svg>
                WhatsApp
              </a>
              <a href="https://www.linkedin.com/company/orincore-technologies" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-3 rounded-lg bg-blue-700 text-white font-semibold shadow hover:bg-blue-800 transition" title="LinkedIn">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.28c-.966 0-1.75-.79-1.75-1.75s.784-1.75 1.75-1.75 1.75.79 1.75 1.75-.784 1.75-1.75 1.75zm13.5 10.28h-3v-4.5c0-1.08-.02-2.47-1.5-2.47-1.5 0-1.73 1.17-1.73 2.39v4.58h-3v-9h2.89v1.23h.04c.4-.75 1.38-1.54 2.84-1.54 3.04 0 3.6 2 3.6 4.59v4.72z"/></svg>
                LinkedIn
              </a>
              <a href="/contact" className="flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold shadow hover:from-purple-700 hover:to-indigo-700 transition" title="Contact Form">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 10.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h7.5" /><path d="M17 21l4-4-4-4" /></svg>
                Contact Form
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProjectDetails; 