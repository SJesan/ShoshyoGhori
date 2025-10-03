import React from 'react'

const Nav = () => {
  const handleLogout = () => {
    localStorage.removeItem('user')
    window.location.href = '/'
  }

  return (
    <nav className="w-full bg-gradient-to-r from-gray-900 to-gray-800 text-white border-b border-gray-700 shadow-lg">
      <div className="max-w-screen-xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3 cursor-pointer group" onClick={() => (window.location.href = '/') }>
          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center group-hover:bg-green-400 transition-colors">
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <span className="font-bold text-green-400 text-xl group-hover:text-green-300 transition-colors">শস্যঘড়ি</span>
        </div>
        <div className="flex items-center space-x-6">
          <button className="text-sm hover:text-green-300 transition-colors px-3 py-2 rounded-lg hover:bg-gray-700" onClick={() => (window.location.href = '/mainpage') }>মূলপাতা</button>
          <button className="text-sm hover:text-green-300 transition-colors px-3 py-2 rounded-lg hover:bg-gray-700" onClick={() => (window.location.href = '/dashboard') }>ড্যাশবোর্ড</button>
          <button className="text-sm bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg" onClick={handleLogout}>লগআউট</button>
        </div>
      </div>
    </nav>
  )
}

export default Nav


