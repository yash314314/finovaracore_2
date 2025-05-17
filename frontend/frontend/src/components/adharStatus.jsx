import React, { useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

export default function AadhaarStatusChecker() {
  const [aadhaar, setAadhaar] = useState('');
  const [dob, setDob] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setResult(null);
    setIsLoading(true);

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:5000/api/auth/aadhaar-status', {
        aadhaar,
        dob
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setResult(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  // Animation variants
  const formVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const resultVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        staggerChildren: 0.1,
        when: "beforeChildren"
      }
    },
    exit: { opacity: 0, y: -20 }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-10 bg-gradient-to-br from-indigo-100 to-white">
      <motion.form 
        onSubmit={handleSubmit} 
        className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md space-y-4 border border-gray-200"
        variants={formVariants}
        initial="hidden"
        animate="visible"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800">🔍 Aadhaar Status Checker</h2>

        <motion.div variants={itemVariants}>
          <input
            type="text"
            placeholder="Enter Aadhaar Number"
            value={aadhaar}
            onChange={(e) => setAadhaar(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            maxLength={12}
            required
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <input
            type="date"
            placeholder="Enter DOB"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <button 
            type="submit" 
            className="w-full bg-blue-600 text-white text-lg py-2 hover:bg-blue-700 rounded-xl transition duration-200 flex items-center justify-center"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </>
            ) : (
              '🚀 Check Status'
            )}
          </button>
        </motion.div>

        {error && (
          <motion.p 
            className="text-red-500 text-sm text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {error}
          </motion.p>
        )}
      </motion.form>

      <AnimatePresence>
        {result && (
          <motion.div
            variants={resultVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="mt-6 bg-white p-6 rounded-2xl shadow-lg w-full max-w-md border border-blue-200"
          >
            <motion.h3 
              className="text-2xl font-semibold text-blue-700 mb-3"
              variants={itemVariants}
            >
              ✅ Aadhaar Status
            </motion.h3>
            
            <motion.div className="space-y-2" variants={resultVariants}>
              <motion.p variants={itemVariants}>
                <strong>Status:</strong> <span className={result.status === 'Active' ? 'text-green-600' : 'text-red-600'}>{result.status}</span>
              </motion.p>
              <motion.p variants={itemVariants}>
                <strong>Aadhaar:</strong> {result.aadhaar_number}
              </motion.p>
              <motion.p variants={itemVariants}>
                <strong>DOB:</strong> {result.dob}
              </motion.p>
              <motion.p variants={itemVariants}>
                <strong>Last Updated:</strong> {result.last_updated}
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}