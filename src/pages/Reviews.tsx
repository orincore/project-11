import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, MessageCircle, Send, User, Calendar, Quote } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { Helmet } from 'react-helmet-async';
import Loader from '../components/Loader';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Reviews: React.FC = () => {
  const { isDarkMode } = useTheme();
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewForm, setReviewForm] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [formError, setFormError] = useState('');

  useEffect(() => {
    setLoading(true);
    fetch(`${API_BASE_URL}/reviews`)
      .then(res => res.json())
      .then(data => {
        // Map backend data to UI fields
        setReviews(data.map((r: any) => ({
          id: r.id,
          name: r.name,
          rating: r.rating,
          message: r.feedback || r.message,
          date: r.created_at ? r.created_at.split('T')[0] : new Date().toISOString().split('T')[0],
          avatar: r.name ? r.name.split(' ').map((n: string) => n[0]).join('') : '',
          project: r.project || 'Recent Project',
        })));
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load reviews.');
        setLoading(false);
      });
  }, []);

  const handleStarClick = (starIndex: number) => {
    setRating(starIndex);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewForm.name || !reviewForm.message || rating === 0) return;
    setIsSubmitting(true);
    setFormError('');
    try {
      const res = await fetch(`${API_BASE_URL}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: reviewForm.name,
          email: reviewForm.email,
          rating,
          feedback: reviewForm.message,
        })
      });
      if (res.ok) {
        const newReview = await res.json();
        setReviews([
          {
            id: newReview.id,
            name: newReview.name,
            rating: newReview.rating,
            message: newReview.feedback || newReview.message,
            date: newReview.created_at ? newReview.created_at.split('T')[0] : new Date().toISOString().split('T')[0],
            avatar: newReview.name ? newReview.name.split(' ').map((n: string) => n[0]).join('') : '',
            project: newReview.project || 'Recent Project',
          },
          ...reviews
        ]);
        setReviewForm({ name: '', email: '', message: '' });
        setRating(0);
        setShowSuccessMessage(true);
        setTimeout(() => setShowSuccessMessage(false), 3000);
      } else if (res.status === 500) {
        setFormError('Your feedback was already submitted.');
        setTimeout(() => setFormError(''), 4000);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStars = (rating: number, interactive: boolean = false, size: string = 'w-5 h-5') => {
    return Array.from({ length: 5 }, (_, index) => {
      const starIndex = index + 1;
      const isActive = starIndex <= (interactive ? (hoverRating || rating) : rating);
      return (
        <motion.button
          key={index}
          type="button"
          disabled={!interactive}
          whileHover={interactive ? { scale: 1.1 } : {}}
          whileTap={interactive ? { scale: 0.9 } : {}}
          onClick={() => interactive && handleStarClick(starIndex)}
          onMouseEnter={() => interactive && setHoverRating(starIndex)}
          onMouseLeave={() => interactive && setHoverRating(0)}
          className={`${size} ${
            isActive ? 'text-yellow-400' : 'text-gray-300'
          } ${interactive ? 'hover:text-yellow-400 cursor-pointer' : 'cursor-default'} transition-colors`}
        >
          <Star className="w-full h-full fill-current" />
        </motion.button>
      );
    });
  };

  // Add cartoon face/expression logic
  const getFace = (rating: number) => {
    switch (rating) {
      case 1:
        return {
          emoji: '😢',
          label: 'Very Sad',
          color: 'text-red-400',
          desc: 'Oh no! We are sorry your experience was not great.'
        };
      case 2:
        return {
          emoji: '😞',
          label: 'Sad',
          color: 'text-orange-400',
          desc: 'We wish we could have done better.'
        };
      case 3:
        return {
          emoji: '😐',
          label: 'Neutral',
          color: 'text-yellow-400',
          desc: 'Thanks! We appreciate your honest feedback.'
        };
      case 4:
        return {
          emoji: '😊',
          label: 'Happy',
          color: 'text-green-400',
          desc: 'Glad you had a good experience!'
        };
      case 5:
        return {
          emoji: '🤩',
          label: 'Amazing',
          color: 'text-purple-500',
          desc: 'Awesome! We are thrilled you loved it!'
        };
      default:
        return null;
    }
  };

  const averageRating = reviews.length > 0 ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length) : 0;

  if (loading) return <div className="pt-16 flex justify-center"><Loader size={56} /></div>;
  if (error) return <div className="pt-16 text-center text-red-500">{error}</div>;

  return (
    <>
      <Helmet>
        <title>Client Reviews | Orincore Testimonials & Feedback</title>
        <meta name="description" content="Read real client reviews and testimonials for Orincore Technologies. See why businesses trust us for web, mobile, and AI solutions." />
        <meta name="keywords" content="Orincore, reviews, testimonials, client feedback, web development, mobile apps, AI, trusted developer" />
        <meta property="og:title" content="Client Reviews | Orincore Testimonials & Feedback" />
        <meta property="og:description" content="Read real client reviews and testimonials for Orincore Technologies. See why businesses trust us for web, mobile, and AI solutions." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://orincore.com/reviews" />
        <meta property="og:image" content="https://orincore.com/assets/logo/OClogo.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Client Reviews | Orincore Testimonials & Feedback" />
        <meta name="twitter:description" content="Read real client reviews and testimonials for Orincore Technologies. See why businesses trust us for web, mobile, and AI solutions." />
        <meta name="twitter:image" content="https://orincore.com/assets/logo/OClogo.png" />
        <link rel="canonical" href="https://orincore.com/reviews" />
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "Review",
            "itemReviewed": {
              "@type": "Organization",
              "name": "Orincore Technologies",
              "url": "https://orincore.com/"
            },
            "reviewBody": "Read real client reviews and testimonials for Orincore Technologies. See why businesses trust us for web, mobile, and AI solutions.",
            "publisher": {
              "@type": "Organization",
              "name": "Orincore Technologies",
              "url": "https://orincore.com/"
            }
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
                Client <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  Reviews
                </span>
              </h1>
              <p className={`text-xl mb-8 max-w-3xl mx-auto ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                See why clients rate Orincore as the best web development company in Mumbai. Read real client reviews and testimonials for Orincore Technologies.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
                <a href="/contact">
                  <button className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-purple-500/25 transition-all duration-300 flex items-center space-x-2">
                    Start Your Project with Us
                  </button>
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
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
              } text-white text-center`}
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <div className="text-4xl font-bold mb-2">{reviews.length}</div>
                  <div className="text-purple-200">Total Reviews</div>
                </div>
                <div>
                  <div className="flex items-center justify-center space-x-1 mb-2">
                    <span className="text-4xl font-bold">{averageRating.toFixed(1)}</span>
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
          </div>
        </section>

        {/* Review Form */}
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
                Share Your Experience
              </h2>
              <p className={`text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                We'd love to hear about your experience working with us
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className={`p-8 rounded-2xl shadow-lg ${
                isDarkMode ? 'bg-gray-800' : 'bg-white'
              }`}
            >
              {showSuccessMessage && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-green-100 border border-green-300 rounded-lg text-green-700 text-center"
                >
                  Thank you for your review! It has been submitted successfully.
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Error message for duplicate feedback */}
                {formError && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-4 p-3 bg-red-100 border border-red-300 rounded-lg text-red-700 text-center"
                  >
                    {formError}
                  </motion.div>
                )}

                <div className="text-center">
                  <label className={`block text-sm font-medium mb-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Rate Your Experience
                  </label>
                  <div className="flex items-center justify-center space-x-1">
                    {renderStars(rating, true, 'w-8 h-8')}
                  </div>
                  {/* Animated face and message */}
                  <motion.div
                    key={rating}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mt-4 flex flex-col items-center min-h-[60px]"
                  >
                    {rating > 0 && (
                      <>
                        <span className={`text-4xl mb-1 ${getFace(rating)?.color || ''}`}>{getFace(rating)?.emoji}</span>
                        <span className={`font-semibold text-base ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>You selected {rating} star{rating > 1 ? 's' : ''} - {getFace(rating)?.label}</span>
                        <span className={`text-xs mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{getFace(rating)?.desc}</span>
                      </>
                    )}
                  </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={reviewForm.name}
                      onChange={(e) => setReviewForm({ ...reviewForm, name: e.target.value })}
                      className={`w-full px-4 py-3 rounded-lg border ${
                        isDarkMode 
                          ? 'bg-gray-700 border-gray-600 text-white' 
                          : 'bg-white border-gray-300 text-gray-900'
                      } focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                      placeholder="Your full name"
                    />
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Email
                    </label>
                    <input
                      type="email"
                      value={reviewForm.email}
                      onChange={(e) => setReviewForm({ ...reviewForm, email: e.target.value })}
                      className={`w-full px-4 py-3 rounded-lg border ${
                        isDarkMode 
                          ? 'bg-gray-700 border-gray-600 text-white' 
                          : 'bg-white border-gray-300 text-gray-900'
                      } focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Your Review *
                  </label>
                  <textarea
                    required
                    value={reviewForm.message}
                    onChange={(e) => setReviewForm({ ...reviewForm, message: e.target.value })}
                    rows={4}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                    } focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none`}
                    placeholder="Tell us about your experience..."
                  />
                </div>

                <div className="text-center">
                  <motion.button
                    type="submit"
                    disabled={isSubmitting || rating === 0}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-8 py-3 rounded-lg font-semibold text-white transition-all duration-300 flex items-center space-x-2 mx-auto ${
                      isSubmitting || rating === 0
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:shadow-lg'
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>Submit Review</span>
                      </>
                    )}
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </div>
        </section>

        {/* Reviews Grid */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className={`text-3xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                What Our Clients Say
              </h2>
              <p className={`text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Read real client reviews and testimonials for Orincore Technologies. See why businesses trust us for web, mobile, and AI solutions.
              </p>
            </motion.div>

            <AnimatePresence mode="wait">
              {reviews.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-center text-lg text-gray-500"
                >
                  No reviews yet. Be the first to leave one!
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="grid gap-12"
                >
                  {reviews.map((review) => (
                    <motion.div
                      key={review.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg"
                    >
                      <div className="flex items-center mb-4">
                        <div className="w-10 h-10 rounded-full bg-purple-500 text-white flex items-center justify-center font-bold text-lg mr-3">
                          {review.avatar}
                        </div>
                        <div>
                          <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{review.name}</h3>
                          <p className={`text-sm text-gray-500 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            {review.date}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center mb-4 text-yellow-400 text-lg">
                        {renderStars(review.rating)}
                      </div>
                      <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        {review.message}
                      </p>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>
      </div>
    </>
  );
};

export default Reviews;