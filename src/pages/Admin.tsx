import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Eye, ArrowLeft, Github, Globe, User, Lock, LogOut, Sun, Moon, Plus, Folder, Film, MessageCircle, Star, Calendar, Edit, Trash2, Check, X, Mail } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';

const TABS = [
  { name: 'Dashboard', icon: <Folder className="w-4 h-4 mr-2" /> },
  { name: 'Projects', icon: <Folder className="w-4 h-4 mr-2" /> },
  { name: 'Animation Guide', icon: <Film className="w-4 h-4 mr-2" /> },
  { name: 'Reviews', icon: <MessageCircle className="w-4 h-4 mr-2" /> },
  { name: 'Contact Submissions', icon: <Mail className="w-4 h-4 mr-2" /> },
];

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const TECH_STACK_OPTIONS: string[] = [
  'Web Development',
  'Mobile Apps',
  'E-commerce',
  'Dashboard',
  'API Development',
];

const AdminPanel: React.FC = () => {
  // All hooks at the top, before any logic or returns
  const { isDarkMode, toggleTheme } = useTheme();
  const [tab, setTab] = useState('Dashboard');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [projects, setProjects] = useState<any[]>([]);
  const [animations, setAnimations] = useState<any[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);
  const avgRating = reviews.length > 0 ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length) : 0;
  const [reviewMsg, setReviewMsg] = useState('');
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [showAnimationModal, setShowAnimationModal] = useState(false);
  const [newProject, setNewProject] = useState({ title: '', description: '', tech: '', date: '' });
  const [newAnimation, setNewAnimation] = useState({ title: '', code: '' });
  const [token, setToken] = useState<string | null>(null);
  const [projectMsg, setProjectMsg] = useState('');
  const [projectImageIndexes, setProjectImageIndexes] = useState<{ [id: string]: number }>({});
  const [contactSubmissions, setContactSubmissions] = useState<any[]>([]);
  const [deletingContactId, setDeletingContactId] = useState<string | null>(null);
  const [contactMsg, setContactMsg] = useState('');
  const showTechDropdownRef = useRef<HTMLDivElement | null>(null);
  const [showTechDropdown, setShowTechDropdown] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');

  // --- Admin Projects State ---
  const [editingProject, setEditingProject] = useState<any | null>(null);
  // Update editProjectForm state to allow (string | File)[] for image_urls
  const [editProjectForm, setEditProjectForm] = useState({ title: '', description: '', tech: '', tech_stack: [] as string[], date: '', category: '', repo_url: '', live_url: '', image_url: '', image_urls: [] as (string | File)[] });
  const [editProjectLoading, setEditProjectLoading] = useState(false);
  const [deleteProjectLoading, setDeleteProjectLoading] = useState(false);
  const [deleteProjectId, setDeleteProjectId] = useState<string | null>(null);
  // Add review editing state
  const [editingReview, setEditingReview] = useState<any | null>(null);
  const [editForm, setEditForm] = useState({ name: '', email: '', rating: 5, feedback: '', project: '' });
  const [editLoading, setEditLoading] = useState(false);
  // Add review delete state
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // --- Star rendering helper ---
  const renderStars = (rating: number, size: string = 'w-5 h-5') =>
    Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`${size} ${i < rating ? 'text-yellow-400' : 'text-gray-300'} fill-current`} />
    ));

  // --- Project stats ---
  const projectCount = projects.length;

  // --- Edit logic ---
  const openEdit = (r: any) => {
    setEditingReview(r);
    setEditForm({
      name: r.name,
      email: r.email,
      rating: r.rating,
      feedback: r.feedback || r.message,
      project: r.project || '',
    });
  };
  const closeEdit = () => {
    setEditingReview(null);
    setEditForm({ name: '', email: '', rating: 5, feedback: '', project: '' });
  };
  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };
  const handleEditRating = (r: number) => setEditForm(f => ({ ...f, rating: r }));
  const submitEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingReview) return;
    setEditLoading(true);
    setReviewMsg('');
    try {
      const res = await fetch(`${API_BASE_URL}/reviews/${editingReview.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editForm),
      });
      if (res.ok) {
        const updated = await res.json();
        setReviews(reviews.map(r => r.id === updated.id ? { ...r, ...updated } : r));
        setReviewMsg('Review updated!');
        setTimeout(() => setReviewMsg(''), 2000);
        closeEdit();
    } else {
        setReviewMsg('Failed to update review.');
      }
    } finally {
      setEditLoading(false);
    }
  };

  // --- Delete logic ---
  const confirmDelete = (id: string) => setDeleteId(id);
  const cancelDelete = () => setDeleteId(null);
  const doDelete = async () => {
    if (!deleteId) return;
    setDeleteLoading(true);
    setReviewMsg('');
    try {
      const res = await fetch(`${API_BASE_URL}/reviews/${deleteId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setReviews(reviews.filter(r => r.id !== deleteId));
        setReviewMsg('Review deleted.');
        setTimeout(() => setReviewMsg(''), 2000);
        setDeleteId(null);
      } else {
        setReviewMsg('Failed to delete review.');
      }
    } finally {
      setDeleteLoading(false);
    }
  };

  // --- Edit logic ---
  const openProjectEdit = (p: any) => {
    setEditingProject(p);
    setEditProjectForm({
      title: p.title,
      description: p.description,
      tech: p.tech,
      tech_stack: Array.isArray(p.tech_stack) ? p.tech_stack : (p.tech_stack ? p.tech_stack.split(',').map((s: string) => s.trim()).filter(Boolean) : []),
      date: p.date || '',
      category: p.category || '',
      repo_url: p.repo_url || '',
      live_url: p.live_url || '',
      image_url: p.image_url || '',
      image_urls: Array.isArray(p.image_urls) ? p.image_urls : (p.image_urls ? p.image_urls.split(',').map((s: string) => s.trim()).filter(Boolean) : []),
    });
  };
  const closeProjectEdit = () => {
      setEditingProject(null);
    setEditProjectForm({ title: '', description: '', tech: '', tech_stack: [], date: '', category: '', repo_url: '', live_url: '', image_url: '', image_urls: [] });
  };
  const handleProjectEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEditProjectForm({ ...editProjectForm, [e.target.name]: e.target.value });
  };
  // Update submitProjectEdit to use multipart/form-data and /api/portfolio/:id
  const submitProjectEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject) return;
    setEditProjectLoading(true);
    setProjectMsg('');
    try {
      const formData = new FormData();
      formData.append('title', editProjectForm.title);
      formData.append('description', editProjectForm.description);
      formData.append('repo_url', editProjectForm.repo_url || '');
      formData.append('live_url', editProjectForm.live_url || '');
      formData.append('tech_stack', Array.isArray(editProjectForm.tech_stack) ? editProjectForm.tech_stack.join(',') : (editProjectForm.tech_stack || ''));
      // Append images as URLs or File objects
      if (Array.isArray(editProjectForm.image_urls)) {
        editProjectForm.image_urls.forEach((img, idx) => {
          if (typeof img === 'string') {
            formData.append('image_urls', img);
          } else if (img instanceof File) {
            formData.append('images', img); // backend expects 'images'
          }
        });
      }
      const res = await fetch(`${API_BASE_URL}/portfolio/${editingProject.id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData,
      });
      if (res.ok) {
        const updated = await res.json();
        setProjects(projects.map(p => p.id === updated.id ? { ...p, ...updated } : p));
        setProjectMsg('Project updated!');
        setTimeout(() => setProjectMsg(''), 2000);
        closeProjectEdit();
    } else {
        setProjectMsg('Failed to update project.');
      }
    } finally {
      setEditProjectLoading(false);
    }
  };

  // --- Delete logic ---
  const confirmProjectDelete = (id: string) => setDeleteProjectId(id);
  const cancelProjectDelete = () => setDeleteProjectId(null);
  // Update doProjectDelete to use /api/portfolio/:id
  const doProjectDelete = async () => {
    if (!deleteProjectId) return;
    setDeleteProjectLoading(true);
    setProjectMsg('');
    try {
      const res = await fetch(`${API_BASE_URL}/portfolio/${deleteProjectId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setProjects(projects.filter(p => p.id !== deleteProjectId));
        setProjectMsg('Project deleted.');
        setTimeout(() => setProjectMsg(''), 2000);
        setDeleteProjectId(null);
      } else {
        setProjectMsg('Failed to delete project.');
      }
    } finally {
      setDeleteProjectLoading(false);
    }
  };

  // Add state for upload progress and error
  // const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Update handleImageUpload to only update image_urls in editProjectForm (no upload)
  const handleImageUpload = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const newFiles = Array.from(files);
    setEditProjectForm(f => ({
      ...f,
      image_urls: [...(Array.isArray(f.image_urls) ? f.image_urls : []), ...newFiles],
      image_url: f.image_url || (newFiles.length > 0 ? '' : f.image_url),
    }));
  };

  // Add state for image slider index per project
  // const [projectImageIndexes, setProjectImageIndexes] = useState<{ [id: string]: number }>({});

  // Add state for contact submissions
  // const [contactSubmissions, setContactSubmissions] = useState<any[]>([]);

  // Add state for contact deletion
  // const [deletingContactId, setDeletingContactId] = useState<string | null>(null);
  // const [contactMsg, setContactMsg] = useState('');

  // Add state for create project modal
  const [showCreateProjectModal, setShowCreateProjectModal] = useState(false);
  const [createProjectForm, setCreateProjectForm] = useState({ title: '', description: '', tech_stack: [] as string[], repo_url: '', live_url: '', image_urls: [] as (string | File)[] });
  const [createProjectLoading, setCreateProjectLoading] = useState(false);
  const [createProjectMsg, setCreateProjectMsg] = useState('');

  // Handle image upload for create modal
  const handleCreateImageUpload = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const newFiles = Array.from(files);
    setCreateProjectForm(f => ({
      ...f,
      image_urls: [...(Array.isArray(f.image_urls) ? f.image_urls : []), ...newFiles],
    }));
  };

  // Handle create project submit
  const submitCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreateProjectLoading(true);
    setCreateProjectMsg('');
    try {
      const formData = new FormData();
      formData.append('title', createProjectForm.title);
      formData.append('description', createProjectForm.description);
      formData.append('repo_url', createProjectForm.repo_url || '');
      formData.append('live_url', createProjectForm.live_url || '');
      formData.append('tech_stack', Array.isArray(createProjectForm.tech_stack) ? createProjectForm.tech_stack.join(',') : (createProjectForm.tech_stack || ''));
      if (Array.isArray(createProjectForm.image_urls)) {
        createProjectForm.image_urls.forEach((img) => {
          if (typeof img === 'string') {
            formData.append('image_urls', img);
          } else if (img instanceof File) {
            formData.append('images', img);
          }
        });
      }
      const res = await fetch(`${API_BASE_URL}/portfolio`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      if (res.ok) {
        const created = await res.json();
        setProjects([created, ...projects]);
        setCreateProjectMsg('Project created!');
        setTimeout(() => setCreateProjectMsg(''), 2000);
        setShowCreateProjectModal(false);
        setCreateProjectForm({ title: '', description: '', tech_stack: [], repo_url: '', live_url: '', image_urls: [] });
      } else {
        setCreateProjectMsg('Failed to create project.');
      }
    } finally {
      setCreateProjectLoading(false);
    }
  };

  // Check for token on mount
  useEffect(() => {
    const storedToken = localStorage.getItem('admin_token');
    if (storedToken) {
      setToken(storedToken);
      setIsLoggedIn(true);
    }
  }, []);

  // Fetch data when logged in
  useEffect(() => {
    if (!token) return;
    fetch(`${API_BASE_URL}/portfolio`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => setProjects(data));
    fetch(`${API_BASE_URL}/reviews`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => setReviews(data));
    // Add animation fetch if endpoint exists
  }, [token]);

  // Fetch contact submissions when logged in and tab is selected
  useEffect(() => {
    if (!token || tab !== 'Contact Submissions') return;
    setContactSubmissions([]); // always start as array
    fetch(`${API_BASE_URL}/contact`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(async res => {
        if (res.status === 401) {
          setContactMsg('Unauthorized. Please log in as admin.');
          setContactSubmissions([]);
          return [];
        }
        const data = await res.json();
        if (Array.isArray(data)) {
          setContactSubmissions(data);
        } else {
          setContactSubmissions([]);
          setContactMsg('Failed to load submissions.');
        }
      })
      .catch(() => {
        setContactSubmissions([]);
        setContactMsg('Failed to load submissions.');
      });
  }, [token, tab]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok && data.session && data.session.access_token) {
        setToken(data.session.access_token);
        localStorage.setItem('admin_token', data.session.access_token);
        setIsLoggedIn(true);
      } else {
        setError(data.error?.message || 'Invalid credentials');
      }
    } catch (err) {
      setError('Network error');
    }
    setLoading(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setEmail('');
    setPassword('');
    setTab('Dashboard');
    setToken(null);
    localStorage.removeItem('admin_token');
  };

  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProject.title || !newProject.description) return;
    try {
      const res = await fetch(`${API_BASE_URL}/portfolio`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newProject),
      });
      if (res.ok) {
        const created = await res.json();
        setProjects([created, ...projects]);
        setShowProjectModal(false);
        setNewProject({ title: '', description: '', tech: '', date: '' });
      } else {
        setError('Failed to add project');
      }
    } catch {
      setError('Network error');
    }
  };

  const handleAddAnimation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAnimation.title || !newAnimation.code) return;
    // Update with real endpoint if available
    setAnimations([
      { ...newAnimation, id: Date.now() },
      ...animations,
    ]);
    setNewAnimation({ title: '', code: '' });
    setShowAnimationModal(false);
  };

  // Add delete handler for contact submissions
  const handleDeleteContact = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this contact submission?')) return;
    setDeletingContactId(id);
    setContactMsg('');
    try {
      const res = await fetch(`${API_BASE_URL}/contact/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status === 204) {
        setContactSubmissions(subs => subs.filter(s => s.id !== id));
        setContactMsg('Submission deleted.');
        setTimeout(() => setContactMsg(''), 2000);
      } else {
        setContactMsg('Failed to delete submission.');
      }
    } finally {
      setDeletingContactId(null);
    }
  };

  // Login Page
  if (!isLoggedIn) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isDarkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-purple-100 via-indigo-100 to-white'} px-4`}>
        <div className={`w-full max-w-md ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white'} rounded-2xl shadow-2xl p-8 flex flex-col items-center`}>
          <div className="mb-6 flex flex-col items-center">
            <div className="w-14 h-14 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center mb-2">
              <User className="w-8 h-8 text-white" />
          </div>
            <h2 className="text-2xl font-bold">Admin Login</h2>
            <p className="text-sm text-gray-400 mt-1">Orincore Technologies</p>
          </div>
          <form onSubmit={handleLogin} className="w-full space-y-5">
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <div className="relative">
                <input
                  type="email"
                  placeholder="admin@example.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className={`w-full pl-10 pr-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500 ${isDarkMode ? 'bg-gray-900 text-white border-gray-700 placeholder-gray-400' : ''}`}
                  required
                />
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className={`w-full pl-10 pr-10 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500 ${isDarkMode ? 'bg-gray-900 text-white border-gray-700 placeholder-gray-400' : ''}`}
                  required
                />
                <button
                  type="button"
                  tabIndex={-1}
                  onClick={() => setShowPassword(v => !v)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-purple-600"
                >
                  {showPassword ? <Eye className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              </div>
            </div>
            {error && <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-2 rounded text-sm">{error}</div>}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-2 rounded font-semibold hover:shadow-lg transition flex items-center justify-center"
              disabled={loading}
            >
              {loading ? (
                <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path></svg>
              ) : null}
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
          <button
            onClick={toggleTheme}
            className="mt-6 flex items-center justify-center px-3 py-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-purple-100 dark:hover:bg-purple-800 transition"
          >
            {isDarkMode ? <Sun className="w-4 h-4 mr-1" /> : <Moon className="w-4 h-4 mr-1" />}
            {isDarkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>
      </div>
    );
  }

  // Admin Panel
  return (
    <div className={`min-h-screen flex pt-16 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      {/* Sidebar */}
      <aside className={`w-64 ${isDarkMode ? 'bg-gray-950 text-white' : 'bg-gradient-to-b from-purple-900 via-purple-800 to-indigo-900 text-white'} flex flex-col py-8 px-4 min-h-screen shadow-xl`}>
        <div className="flex flex-col items-center mb-10">
          <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center mb-2">
            <User className="w-8 h-8 text-purple-700" />
            </div>
          <span className="font-bold text-lg">Orincore Admin</span>
          <span className="text-xs text-purple-200 mt-1">admin@example.com</span>
        </div>
        <nav className="flex-1 flex flex-col space-y-2">
          {TABS.map(t => (
            <button
              key={t.name}
              onClick={() => setTab(t.name)}
              className={`w-full flex items-center text-left px-4 py-2 rounded font-semibold transition ${tab === t.name ? (isDarkMode ? 'bg-white text-purple-800 shadow' : 'bg-white text-purple-800 shadow') : 'hover:bg-purple-700/40'}`}
            >
              {t.icon}{t.name}
            </button>
          ))}
        </nav>
        <div className="flex flex-col gap-2 mt-8">
          <button
            onClick={toggleTheme}
            className="flex items-center justify-center px-3 py-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-purple-100 dark:hover:bg-purple-800 transition"
          >
            {isDarkMode ? <Sun className="w-4 h-4 mr-1" /> : <Moon className="w-4 h-4 mr-1" />}
            {isDarkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center justify-center bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded font-semibold transition"
          >
            <LogOut className="w-4 h-4 mr-2" /> Logout
          </button>
            </div>
      </aside>
      {/* Main Content */}
      <main className="flex-1 p-8">
        {tab === 'Dashboard' && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-2">Welcome, Admin!</h2>
            <p className="text-gray-400">Manage your portfolio, animation guide, and reviews from this panel.</p>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className={`rounded-xl shadow p-6 flex flex-col items-center ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <Folder className="w-8 h-8 text-purple-600 mb-2" />
                <span className="text-3xl font-bold text-purple-700 mb-2">{projects.length}</span>
                <span className="text-gray-400">Projects</span>
          </div>
              <div className={`rounded-xl shadow p-6 flex flex-col items-center ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <Film className="w-8 h-8 text-purple-600 mb-2" />
                <span className="text-3xl font-bold text-purple-700 mb-2">{animations.length}</span>
                <span className="text-gray-400">Animations</span>
        </div>
              <div className={`rounded-xl shadow p-6 flex flex-col items-center ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <MessageCircle className="w-8 h-8 text-purple-600 mb-2" />
                <span className="text-3xl font-bold text-purple-700 mb-2">{reviews.length}</span>
                <span className="text-gray-400">Reviews</span>
            </div>
            </div>
            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className={`rounded-xl shadow p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-lg">Recent Projects</span>
                  <button onClick={() => setShowProjectModal(true)} className="flex items-center bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-3 py-1 rounded hover:shadow transition text-sm font-semibold"><Plus className="w-4 h-4 mr-1" />Add Project</button>
                </div>
                <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                  {projects.slice(0, 3).map(p => (
                    <li key={p.id} className="py-2 flex flex-col">
                      <span className="font-semibold">{p.title}</span>
                      <span className="text-xs text-gray-400">{p.date}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className={`rounded-xl shadow p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-lg">Recent Animations</span>
                  <button onClick={() => setShowAnimationModal(true)} className="flex items-center bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-3 py-1 rounded hover:shadow transition text-sm font-semibold"><Plus className="w-4 h-4 mr-1" />Add Animation</button>
                </div>
                <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                  {animations.slice(0, 3).map(a => (
                    <li key={a.id} className="py-2 flex flex-col">
                      <span className="font-semibold">{a.title}</span>
                      <span className="text-xs text-gray-400 truncate">{a.code}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
        {tab === 'Projects' && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">Manage Projects</h2>
              <button
                onClick={() => setShowCreateProjectModal(true)}
                className="flex items-center bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-2 rounded hover:shadow transition text-sm font-semibold gap-2"
              >
                <Plus className="w-4 h-4" /> Create New Project
              </button>
          </div>
            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className={`mb-8 p-6 rounded-2xl ${isDarkMode ? 'bg-gradient-to-r from-purple-900 to-indigo-900 text-white' : 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white'} text-center`}
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <div className="text-4xl font-bold mb-2">{projectCount}</div>
                  <div className="text-purple-200">Total Projects</div>
        </div>
                <div>
                  <div className="text-4xl font-bold mb-2">—</div>
                  <div className="text-purple-200">—</div>
        </div>
                <div>
                  <div className="text-4xl font-bold mb-2">—</div>
                  <div className="text-purple-200">—</div>
                </div>
              </div>
            </motion.div>
            {projectMsg && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-4 p-3 bg-green-100 border border-green-300 rounded-lg text-green-700 text-center">
                {projectMsg}
              </motion.div>
            )}
            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence>
                {projects.map((project, idx) => {
                  // Image slider logic
                  let images: string[] = [];
                  if (Array.isArray(project.image_urls) && project.image_urls.length > 0) {
                    images = project.image_urls;
                  } else if (Array.isArray(project.screenshots) && project.screenshots.length > 0) {
                    images = project.screenshots;
                  } else if (project.image_url) {
                    images = [project.image_url];
                  }
                  const currentImage = projectImageIndexes[project.id] || 0;
                  const showPrev = () => setProjectImageIndexes(idx => ({
                    ...idx,
                    [project.id]: (currentImage === 0 ? images.length - 1 : currentImage - 1)
                  }));
                  const showNext = () => setProjectImageIndexes(idx => ({
                    ...idx,
                    [project.id]: (currentImage === images.length - 1 ? 0 : currentImage + 1)
                  }));
                  return (
              <motion.div
                key={project.id}
                      initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -30 }}
                      transition={{ duration: 0.5, delay: idx * 0.1 }}
                      whileHover={{ y: -5 }}
                      className={`p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 relative ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}
                    >
                      {/* Image Slider */}
                      {images.length > 0 && (
                        <div className="relative w-full mb-4 h-48 rounded-2xl overflow-hidden">
                          <img src={images[currentImage]} alt={project.title} className="w-full h-full object-cover rounded-2xl" />
                          {images.length > 1 && (
                            <>
                              <button onClick={showPrev} className="absolute top-1/2 left-2 -translate-y-1/2 bg-white/80 hover:bg-white text-purple-700 rounded-full p-1 shadow transition"><ArrowLeft className="w-5 h-5" /></button>
                              <button onClick={showNext} className="absolute top-1/2 right-2 -translate-y-1/2 bg-white/80 hover:bg-white text-purple-700 rounded-full p-1 shadow transition"><ArrowLeft className="w-5 h-5 rotate-180" /></button>
                            </>
                          )}
                          {images.length > 1 && (
                            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                              {images.map((_, idx2) => (
                                <span key={idx2} className={`w-2 h-2 rounded-full ${currentImage === idx2 ? 'bg-purple-600' : 'bg-gray-300'} border-2 border-white`} />
                        ))}
                      </div>
                          )}
                      </div>
                      )}
                      <div className="flex items-center mb-2">
                        <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full flex items-center justify-center text-white font-semibold mr-3">
                          {project.title ? project.title.split(' ').map((n: string) => n[0]).join('') : ''}
                    </div>
                        <div>
                          <h3 className={`font-semibold text-lg ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{project.title}</h3>
                          <div className="text-xs text-gray-400 mt-1">{project.date || (project.created_at ? new Date(project.created_at).toLocaleDateString() : '')}</div>
                  </div>
                  </div>
                      <div className="mb-2 flex flex-wrap gap-2">
                        {project.category && (
                          <span className="text-xs bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-2 py-1 rounded-full">{project.category}</span>
                        )}
                        {project.tech_stack && (Array.isArray(project.tech_stack) ? project.tech_stack : String(project.tech_stack).split(',')).map((tech: string) => (
                          <span key={tech} className={`text-xs px-2 py-1 rounded-full ${isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'}`}>{tech}</span>
                        ))}
                        {project.tech && !project.tech_stack && (
                          <span className={`text-xs px-2 py-1 rounded-full ${isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'}`}>{project.tech}</span>
                        )}
          </div>
                      <div className="relative mb-4">
                        <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{project.description}</p>
        </div>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {project.repo_url && (
                          <a href={project.repo_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 px-3 py-2 rounded-full bg-gray-900 text-white hover:bg-gray-700 transition text-xs font-semibold shadow" title="View Repo"><Github className="w-4 h-4 mr-1" /> Repo</a>
                        )}
                        {project.live_url && (
                          <a href={project.live_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 px-3 py-2 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700 transition text-xs font-semibold shadow" title="View Live"><Globe className="w-4 h-4 mr-1" /> Live</a>
                        )}
                      </div>
                      <div className="flex gap-2 absolute top-4 right-4">
                        <button onClick={() => openProjectEdit(project)} className="p-2 rounded hover:bg-purple-100 dark:hover:bg-purple-900 transition" title="Edit"><Edit className="w-5 h-5 text-purple-600" /></button>
                        <button onClick={() => confirmProjectDelete(project.id)} className="p-2 rounded hover:bg-red-100 dark:hover:bg-red-900 transition" title="Delete"><Trash2 className="w-5 h-5 text-red-500" /></button>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
            {/* Edit Modal */}
            {editingProject && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                <div className={`w-full max-w-lg rounded-xl shadow-2xl p-8 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white'} max-h-[90vh] overflow-y-auto`}>
                  <h3 className="text-2xl font-bold mb-6 text-center">Edit Project</h3>
                  <form onSubmit={submitProjectEdit} className="space-y-6">
                    {/* Images Upload & Preview */}
                    <div>
                      <label className="block text-sm font-semibold mb-2">Project Images</label>
                      <div
                        className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer ${isDarkMode ? 'border-gray-600 bg-gray-800' : 'border-gray-300 bg-gray-100'} hover:border-purple-500`}
                        onClick={() => fileInputRef.current?.click()}
                        onDragOver={e => { e.preventDefault(); e.stopPropagation(); }}
                        onDrop={e => {
                          e.preventDefault();
                          handleImageUpload(e.dataTransfer.files);
                        }}
                      >
                        <input
                          type="file"
                          accept="image/*"
                          multiple
                          ref={fileInputRef}
                          style={{ display: 'none' }}
                          onChange={e => handleImageUpload(e.target.files)}
                        />
                        <span className="text-sm text-gray-500">Drag & drop or click to upload images</span>
                        {uploading && <div className="mt-2 text-purple-600 animate-pulse">Uploading...</div>}
                        {uploadError && <div className="mt-2 text-red-500">{uploadError}</div>}
                      </div>
                      {/* Preview uploaded images */}
                      <div className="flex flex-wrap gap-2 mt-3">
                        {Array.isArray(editProjectForm.image_urls) && editProjectForm.image_urls.map((img, idx) => (
                          <div key={idx} className="relative group">
                            {typeof img === 'string' ? (
                              <img src={img} alt="Project" className="w-20 h-20 object-cover rounded-lg border" />
                            ) : (
                              <img src={URL.createObjectURL(img)} alt="Project" className="w-20 h-20 object-cover rounded-lg border" />
                            )}
                <button
                              type="button"
                              onClick={() => setEditProjectForm(f => ({ ...f, image_urls: f.image_urls.filter((_: any, i: number) => i !== idx) }))}
                              className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 text-xs opacity-80 group-hover:opacity-100"
                              title="Remove image"
                            >
                              ×
                </button>
              </div>
                        ))}
                      </div>
                    </div>
                    {/* Title */}
                  <div>
                      <label className="block text-sm font-semibold mb-2">Title</label>
                      <input type="text" name="title" value={editProjectForm.title} onChange={handleProjectEditChange} className={`w-full px-4 py-2 border rounded ${isDarkMode ? 'bg-gray-800 text-white border-gray-700 placeholder-gray-400' : ''}`} placeholder="Title" required />
                  </div>
                    {/* Description */}
                  <div>
                      <label className="block text-sm font-semibold mb-2">Description</label>
                      <textarea name="description" value={editProjectForm.description} onChange={handleProjectEditChange} className={`w-full px-4 py-2 border rounded ${isDarkMode ? 'bg-gray-800 text-white border-gray-700 placeholder-gray-400' : ''}`} placeholder="Description" required rows={3} />
                  </div>
                    {/* Tech Stack */}
                    <div>
                      <label className="block text-sm font-semibold mb-2">Tech Stack</label>
                      <input type="text" name="tech_stack" value={Array.isArray(editProjectForm.tech_stack) ? editProjectForm.tech_stack.join(', ') : (editProjectForm.tech_stack || '')} onChange={e => setEditProjectForm(f => ({ ...f, tech_stack: e.target.value.split(',').map(s => s.trim()).filter(Boolean) }))} className={`w-full px-4 py-2 border rounded ${isDarkMode ? 'bg-gray-800 text-white border-gray-700 placeholder-gray-400' : ''}`} placeholder="e.g. React, Node.js, MongoDB" />
                </div>
                    {/* Repo URL */}
                <div>
                      <label className="block text-sm font-semibold mb-2">Repo URL</label>
                      <input type="text" name="repo_url" value={editProjectForm.repo_url || ''} onChange={handleProjectEditChange} className={`w-full px-4 py-2 border rounded ${isDarkMode ? 'bg-gray-800 text-white border-gray-700 placeholder-gray-400' : ''}`} placeholder="Repo URL" />
                </div>
                    {/* Live URL */}
                <div>
                      <label className="block text-sm font-semibold mb-2">Live URL</label>
                      <input type="text" name="live_url" value={editProjectForm.live_url || ''} onChange={handleProjectEditChange} className={`w-full px-4 py-2 border rounded ${isDarkMode ? 'bg-gray-800 text-white border-gray-700 placeholder-gray-400' : ''}`} placeholder="Live URL" />
                </div>
                    <div className="flex justify-end gap-2 mt-4">
                      <button type="button" onClick={closeProjectEdit} className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-800 transition flex items-center"><X className="w-4 h-4 mr-1" />Cancel</button>
                      <button type="submit" className="px-4 py-2 rounded bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold hover:shadow flex items-center" disabled={editProjectLoading}>{editProjectLoading ? <span className="animate-spin h-4 w-4 mr-2 border-b-2 border-white rounded-full"></span> : <Check className="w-4 h-4 mr-1" />}Save</button>
                    </div>
                  </form>
                </div>
              </div>
            )}
            {/* Delete Modal */}
            {deleteProjectId && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                <div className={`w-full max-w-sm rounded-xl shadow-2xl p-8 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white'}`}>
                  <h3 className="text-lg font-bold mb-4">Delete Project?</h3>
                  <p className="mb-6">Are you sure you want to delete this project? This action cannot be undone.</p>
                  <div className="flex justify-end gap-2">
                    <button onClick={cancelProjectDelete} className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-800 transition flex items-center"><X className="w-4 h-4 mr-1" />Cancel</button>
                    <button onClick={doProjectDelete} className="px-4 py-2 rounded bg-red-500 text-white font-semibold hover:bg-red-600 flex items-center" disabled={deleteProjectLoading}>{deleteProjectLoading ? <span className="animate-spin h-4 w-4 mr-2 border-b-2 border-white rounded-full"></span> : <Trash2 className="w-4 h-4 mr-1" />}Delete</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
        {tab === 'Animation Guide' && (
                  <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Manage Animation Guide</h2>
              <button onClick={() => setShowAnimationModal(true)} className="flex items-center bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-2 rounded hover:shadow transition text-sm font-semibold"><Plus className="w-4 h-4 mr-1" />Add Animation</button>
                  </div>
            <ul className="space-y-2">
              {animations.map(a => (
                <li key={a.id} className={`p-4 rounded shadow ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>                  <div className="font-semibold">{a.title}</div>
                  <pre className="text-xs bg-gray-100 dark:bg-gray-900 rounded p-2 mt-1 overflow-x-auto"><code>{a.code}</code></pre>
                </li>
              ))}
            </ul>
          </div>
        )}
        {tab === 'Reviews' && (
                  <div>
            <h2 className="text-2xl font-bold mb-4">Manage Reviews</h2>
            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className={`mb-8 p-6 rounded-2xl ${isDarkMode ? 'bg-gradient-to-r from-purple-900 to-indigo-900 text-white' : 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white'} text-center`}
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <div className="text-4xl font-bold mb-2">{reviews.length}</div>
                  <div className="text-purple-200">Total Reviews</div>
                  </div>
                <div>
                  <div className="flex items-center justify-center space-x-1 mb-2">
                    <span className="text-4xl font-bold">{avgRating.toFixed(1)}</span>
                    <Star className="w-8 h-8 text-yellow-400 fill-current" />
                </div>
                  <div className="text-purple-200">Average Rating</div>
                </div>
                <div>
                  <div className="text-4xl font-bold mb-2">100%</div>
                  <div className="text-purple-200">Client Satisfaction</div>
                </div>
                </div>
            </motion.div>
            {reviewMsg && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-4 p-3 bg-green-100 border border-green-300 rounded-lg text-green-700 text-center">
                {reviewMsg}
          </motion.div>
        )}
            {/* Reviews Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <AnimatePresence>
                {reviews.map((review, idx) => (
          <motion.div
                    key={review.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -30 }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    whileHover={{ y: -5 }}
                    className={`p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 relative ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}
                  >
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full flex items-center justify-center text-white font-semibold mr-4">
                        {review.name ? review.name.split(' ').map((n: string) => n[0]).join('') : ''}
              </div>
                  <div>
                        <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{review.name}</h3>
                        <div className="flex items-center space-x-1 mt-1">
                          {renderStars(review.rating)}
                  </div>
                        <div className="text-xs text-gray-400 mt-1">{review.email}</div>
                  </div>
                </div>
                    <div className="mb-2">
                      <span className="text-xs px-2 py-1 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 mr-2">{review.project || 'N/A'}</span>
                      <span className="text-xs text-gray-400"><Calendar className="w-4 h-4 inline-block mr-1" />{review.created_at ? new Date(review.created_at).toLocaleDateString() : ''}</span>
                </div>
                    <div className="relative mb-4">
                      <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{review.feedback || review.message}</p>
                    </div>
                    <div className="flex gap-2 absolute top-4 right-4">
                      <button onClick={() => openEdit(review)} className="p-2 rounded hover:bg-purple-100 dark:hover:bg-purple-900 transition" title="Edit"><Edit className="w-5 h-5 text-purple-600" /></button>
                      <button onClick={() => confirmDelete(review.id)} className="p-2 rounded hover:bg-red-100 dark:hover:bg-red-900 transition" title="Delete"><Trash2 className="w-5 h-5 text-red-500" /></button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            {/* Edit Modal */}
            {editingReview && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                <div className={`w-full max-w-md rounded-xl shadow-2xl p-8 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white'}`}>
                  <h3 className="text-lg font-bold mb-4">Edit Review</h3>
                  <form onSubmit={submitEdit} className="space-y-4">
                    <input type="text" name="name" value={editForm.name} onChange={handleEditChange} className="w-full px-4 py-2 border rounded" placeholder="Name" required />
                    <input type="email" name="email" value={editForm.email} onChange={handleEditChange} className="w-full px-4 py-2 border rounded" placeholder="Email" required />
                    <input type="text" name="project" value={editForm.project} onChange={handleEditChange} className="w-full px-4 py-2 border rounded" placeholder="Project" />
                    <textarea name="feedback" value={editForm.feedback} onChange={handleEditChange} className="w-full px-4 py-2 border rounded" placeholder="Feedback" required />
                    <div className="flex items-center gap-2">
                      <span>Rating:</span>
                      {renderStars(editForm.rating, 'w-6 h-6').map((star, i) => (
                        <span key={i} onClick={() => handleEditRating(i + 1)} className="cursor-pointer">{star}</span>
                      ))}
                    </div>
                    <div className="flex justify-end gap-2 mt-4">
                      <button type="button" onClick={closeEdit} className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-800 transition flex items-center"><X className="w-4 h-4 mr-1" />Cancel</button>
                      <button type="submit" className="px-4 py-2 rounded bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold hover:shadow flex items-center" disabled={editLoading}>{editLoading ? <span className="animate-spin h-4 w-4 mr-2 border-b-2 border-white rounded-full"></span> : <Check className="w-4 h-4 mr-1" />}Save</button>
                    </div>
                  </form>
                </div>
              </div>
            )}
            {/* Delete Modal */}
            {deleteId && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                <div className={`w-full max-w-sm rounded-xl shadow-2xl p-8 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white'}`}>
                  <h3 className="text-lg font-bold mb-4">Delete Review?</h3>
                  <p className="mb-6">Are you sure you want to delete this review? This action cannot be undone.</p>
                  <div className="flex justify-end gap-2">
                    <button onClick={cancelDelete} className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-800 transition flex items-center"><X className="w-4 h-4 mr-1" />Cancel</button>
                    <button onClick={doDelete} className="px-4 py-2 rounded bg-red-500 text-white font-semibold hover:bg-red-600 flex items-center" disabled={deleteLoading}>{deleteLoading ? <span className="animate-spin h-4 w-4 mr-2 border-b-2 border-white rounded-full"></span> : <Trash2 className="w-4 h-4 mr-1" />}Delete</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
        {tab === 'Contact Submissions' && (
  <div>
    <h2 className="text-2xl font-bold mb-6">Contact Form Submissions</h2>
    {contactMsg && (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-4 p-3 bg-green-100 border border-green-300 rounded-lg text-green-700 text-center">
        {contactMsg}
      </motion.div>
    )}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {contactSubmissions.length === 0 && (
        <div className="col-span-full text-center py-6 text-gray-400 bg-white dark:bg-gray-800 rounded-xl shadow">No submissions found.</div>
      )}
      {contactSubmissions.map((s, idx) => (
            <motion.div
          key={s.id || idx}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: idx * 0.05 }}
          className={`p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 relative ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}
        >
          <div className="flex items-center mb-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full flex items-center justify-center text-white font-semibold mr-3">
              {s.name ? s.name.split(' ').map((n: string) => n[0]).join('') : ''}
            </div>
            <div>
              <div className="font-semibold text-lg">{s.name}</div>
              <div className="text-xs text-gray-400">{s.email}</div>
            </div>
          </div>
          <div className="mb-2 flex items-center gap-2">
            <span className="text-xs bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-2 py-1 rounded-full">{s.subject || 'No Subject'}</span>
            <span className="text-xs text-gray-400 ml-auto">{s.created_at ? new Date(s.created_at).toLocaleString() : ''}</span>
          </div>
          <div className="mb-4">
            <div className="text-xs text-gray-500 mb-1 font-semibold">Message:</div>
            <div className="whitespace-pre-line break-words text-sm text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-900 rounded p-3">
              {s.message}
            </div>
          </div>
                <button
            onClick={() => handleDeleteContact(s.id)}
            className="absolute top-4 right-4 px-3 py-1 rounded bg-red-500 text-white font-semibold hover:bg-red-600 transition flex items-center gap-1"
            disabled={deletingContactId === s.id}
            title="Delete Submission"
          >
            <Trash2 className="w-4 h-4" />
            {deletingContactId === s.id ? 'Deleting...' : 'Delete'}
                </button>
        </motion.div>
      ))}
              </div>
  </div>
)}

        {/* Add Project Modal */}
        {showProjectModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className={`w-full max-w-md rounded-xl shadow-2xl p-8 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white'}`}>              <h3 className="text-lg font-bold mb-4">Add Project</h3>
              <form onSubmit={handleAddProject} className="space-y-4">
                    <input
                      type="text"
                  placeholder="Title"
                  value={newProject.title}
                  onChange={e => setNewProject({ ...newProject, title: e.target.value })}
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
                  <textarea
                  placeholder="Description"
                  value={newProject.description}
                  onChange={e => setNewProject({ ...newProject, description: e.target.value })}
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
                  <input
                    type="text"
                  placeholder="Technologies (comma separated)"
                  value={newProject.tech}
                  onChange={e => setNewProject({ ...newProject, tech: e.target.value })}
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <div className="flex justify-end gap-2">
                  <button type="button" onClick={() => setShowProjectModal(false)} className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-800 transition">Cancel</button>
                  <button type="submit" className="px-4 py-2 rounded bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold hover:shadow">Add</button>
                </div>
              </form>
                  </div>
          </div>
        )}
        {/* Add Animation Modal */}
        {showAnimationModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className={`w-full max-w-md rounded-xl shadow-2xl p-8 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white'}`}>              <h3 className="text-lg font-bold mb-4">Add Animation</h3>
              <form onSubmit={handleAddAnimation} className="space-y-4">
                    <input
                  type="text"
                  placeholder="Title"
                  value={newAnimation.title}
                  onChange={e => setNewAnimation({ ...newAnimation, title: e.target.value })}
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
                <textarea
                  placeholder="Animation Code"
                  value={newAnimation.code}
                  onChange={e => setNewAnimation({ ...newAnimation, code: e.target.value })}
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500 font-mono"
                  required
                />
                <div className="flex justify-end gap-2">
                  <button type="button" onClick={() => setShowAnimationModal(false)} className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-800 transition">Cancel</button>
                  <button type="submit" className="px-4 py-2 rounded bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold hover:shadow">Add</button>
                  </div>
              </form>
                </div>
          </div>
        )}
        {showCreateProjectModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className={`w-full max-w-lg rounded-xl shadow-2xl p-8 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white'} max-h-[90vh] overflow-y-auto`}>
              <h3 className="text-2xl font-bold mb-6 text-center">Create New Project</h3>
              <form onSubmit={submitCreateProject} className="space-y-6">
                {/* Images Upload & Preview */}
                <div>
                  <label className="block text-sm font-semibold mb-2">Project Images</label>
                  <div
                    className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer ${isDarkMode ? 'border-gray-600 bg-gray-800' : 'border-gray-300 bg-gray-100'} hover:border-purple-500`}
                    onClick={() => fileInputRef.current?.click()}
                    onDragOver={e => { e.preventDefault(); e.stopPropagation(); }}
                    onDrop={e => {
                      e.preventDefault();
                      handleCreateImageUpload(e.dataTransfer.files);
                    }}
                  >
                  <input
                      type="file"
                      accept="image/*"
                      multiple
                      ref={fileInputRef}
                      style={{ display: 'none' }}
                      onChange={e => handleCreateImageUpload(e.target.files)}
                    />
                    <span className="text-sm text-gray-500">Drag & drop or click to upload images</span>
                </div>
                  {/* Preview uploaded images */}
                  <div className="flex flex-wrap gap-2 mt-3">
                    {Array.isArray(createProjectForm.image_urls) && createProjectForm.image_urls.map((img, idx) => (
                      <div key={idx} className="relative group">
                        {typeof img === 'string' ? (
                          <img src={img} alt="Project" className="w-20 h-20 object-cover rounded-lg border" />
                        ) : (
                          <img src={URL.createObjectURL(img)} alt="Project" className="w-20 h-20 object-cover rounded-lg border" />
                        )}
                        <button
                    type="button"
                          onClick={() => setCreateProjectForm(f => ({ ...f, image_urls: f.image_urls.filter((_: any, i: number) => i !== idx) }))}
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 text-xs opacity-80 group-hover:opacity-100"
                          title="Remove image"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Title */}
                <div>
                  <label className="block text-sm font-semibold mb-2">Title</label>
                  <input type="text" name="title" value={createProjectForm.title} onChange={e => setCreateProjectForm(f => ({ ...f, title: e.target.value }))} className={`w-full px-4 py-2 border rounded ${isDarkMode ? 'bg-gray-800 text-white border-gray-700 placeholder-gray-400' : ''}`} placeholder="Title" required />
                </div>
                {/* Description */}
                <div>
                  <label className="block text-sm font-semibold mb-2">Description</label>
                  <textarea name="description" value={createProjectForm.description} onChange={e => setCreateProjectForm(f => ({ ...f, description: e.target.value }))} className={`w-full px-4 py-2 border rounded ${isDarkMode ? 'bg-gray-800 text-white border-gray-700 placeholder-gray-400' : ''}`} placeholder="Description" required rows={3} />
                </div>
                {/* Tech Stack */}
                <div className="relative">
                  <label className="block text-sm font-semibold mb-2">Tech Stack</label>
                  <div
                    className={`w-full min-h-[2.5rem] px-4 py-2 border rounded flex flex-wrap items-center gap-2 cursor-pointer ${isDarkMode ? 'bg-gray-800 text-white border-gray-700' : ''} ${showTechDropdown ? 'ring-2 ring-purple-500' : ''}`}
                    onClick={() => setShowTechDropdown(v => !v)}
                    tabIndex={0}
                    onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') setShowTechDropdown(v => !v); }}
                  >
                    {createProjectForm.tech_stack.length === 0 && (
                      <span className="text-gray-400">Select tech stack...</span>
                    )}
                    {Array.isArray(createProjectForm.tech_stack) && createProjectForm.tech_stack.map((tech, idx) => (
                      <span key={idx} className="inline-flex items-center bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-3 py-1 rounded-full text-xs font-semibold mr-1">
                        {tech}
                        <button
                          type="button"
                          className="ml-2 text-white hover:text-red-200 focus:outline-none"
                          onClick={e => {
                            e.stopPropagation();
                            setCreateProjectForm(f => ({ ...f, tech_stack: f.tech_stack.filter((t: string) => t !== tech) }));
                          }}
                          tabIndex={-1}
                        >
                          ×
                        </button>
                      </span>
                    ))}
                    <svg className={`w-4 h-4 ml-auto transition-transform ${showTechDropdown ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7" /></svg>
                  </div>
                  {showTechDropdown && (
                    <div className={`absolute z-50 mt-2 w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg max-h-60 overflow-y-auto animate-fade-in`} ref={showTechDropdownRef}>
                      {TECH_STACK_OPTIONS.map((opt: string) => (
                        <label key={opt} className="flex items-center px-4 py-2 cursor-pointer hover:bg-purple-50 dark:hover:bg-gray-800 transition">
                          <input
                            type="checkbox"
                            checked={createProjectForm.tech_stack.includes(opt)}
                            onChange={e => {
                              setCreateProjectForm(f => ({
                                ...f,
                                tech_stack: e.target.checked
                                  ? [...f.tech_stack, opt]
                                  : f.tech_stack.filter((t: string) => t !== opt),
                              }));
                            }}
                            className="form-checkbox text-purple-600 rounded mr-3"
                            onClick={e => e.stopPropagation()}
                          />
                          <span className="text-sm font-medium">{opt}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
                {/* Repo URL */}
                <div>
                  <label className="block text-sm font-semibold mb-2">Repo URL</label>
                  <input type="text" name="repo_url" value={createProjectForm.repo_url || ''} onChange={e => setCreateProjectForm(f => ({ ...f, repo_url: e.target.value }))} className={`w-full px-4 py-2 border rounded ${isDarkMode ? 'bg-gray-800 text-white border-gray-700 placeholder-gray-400' : ''}`} placeholder="Repo URL" />
                </div>
                {/* Live URL */}
                <div>
                  <label className="block text-sm font-semibold mb-2">Live URL</label>
                  <input type="text" name="live_url" value={createProjectForm.live_url || ''} onChange={e => setCreateProjectForm(f => ({ ...f, live_url: e.target.value }))} className={`w-full px-4 py-2 border rounded ${isDarkMode ? 'bg-gray-800 text-white border-gray-700 placeholder-gray-400' : ''}`} placeholder="Live URL" />
                </div>
                <div className="flex justify-end gap-2 mt-4">
                  <button type="button" onClick={() => setShowCreateProjectModal(false)} className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-800 transition">Cancel</button>
                  <button type="submit" className="px-4 py-2 rounded bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold hover:shadow">Add</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminPanel;