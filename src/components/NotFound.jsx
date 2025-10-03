import React from 'react'

const NotFound = () => {
  const goHome = () => {
    window.location.href = '/'
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-green-900 px-4">
      <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-8 max-w-md w-full text-center border border-white/20">
        <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-white mb-4">পৃষ্ঠা পাওয়া যায়নি</h1>
        <p className="text-gray-300 mb-8">আপনি ভুল ঠিকানা লিখেছেন বা এই পৃষ্ঠাটি নেই।</p>
        <button
          onClick={goHome}
          className="inline-block bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
        >
          হোম পেজে ফিরে যান
        </button>
      </div>
    </div>
  )
}

export default NotFound


