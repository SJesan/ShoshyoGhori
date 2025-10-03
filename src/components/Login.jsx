import  { React,useState } from 'react'
import Nav from './Nav.jsx'
import supabase from './supabaseClient.js'
import { Outlet } from 'react-router'


const Login = () => {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [state, setState] = useState('signup') //login or signup
  const [error, setError] = useState(null)
  const [Lphone, setLphone] = useState('')
  const [Lpassword, setLpassword] = useState('')
  



  console.log(Lphone, Lpassword)





  //signin login 
const handleLogin = async (e) => {
    e.preventDefault()
    if (state === 'login' && (Lphone === '' || Lpassword === '')) {
      setError('দয়া করে সব তথ্য পূরণ করুন')
      return
    }

    try {
      // main login er kahini
      const { data: Luser, error: Lerror } = await supabase
        .from('Users')
        .select('id, Name, Phone')
        .eq('Phone', Lphone)
        .eq('Password', Lpassword)
        .single()

      if (Lerror) {
        setError('ব্যবহারকারী খুজে পাওয়া যায়নি')
        return
      }

      if (Luser) {
        setError(null)
        localStorage.setItem('user', JSON.stringify(Luser))
        alert(' সফলভাবে লগ-ইন হয়েছে')
        window.location.href = '/mainpage'
      } else {
        setError('ভুল তথ্য প্রদান করা হয়েছে')
      }
    } catch (error) {
      setError(error.message || 'অ্যাকাউন্ট খোলার সময় সমস্যা হয়েছে')
    }
  }

//signup logic
const handleSubmit = async (e) => {
    e.preventDefault()
    if (state === 'signup' && (name === '' || phone === '' || password === '' || confirmPassword === '')) {
      setError(' দয়া করে সব তথ্য পূরণ করুন')
      return
    }
    if (password !== confirmPassword) {
      setError('পাসওয়ার্ড মিলছে না ')
      return
    }
    if (password.length < 6) {
      setError('পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে')
      return
    }
    if(phone.length < 11){
      setError('Please enter a valid phone number')
      return
    }

    try {
      // main login er kahini
      const { data, error } = await supabase
        .from('Users')
        .insert([{ Name: name, Phone: phone, Password: password }])
        .single()

      if (error) {
        setError(error.message || 'Could not create user')
      } else {
        setError(null)
      }
    } catch (error) {
      setError(error.message || 'Could not create user')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-green-900">
      <Nav />
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md">
          {state === 'signup' ? (
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/20">
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
                <h1 className="text-3xl font-bold text-white mb-2">নতুন অ্যাকাউন্ট খুলুন</h1>
                <p className="text-gray-300">শস্যঘড়িতে যোগ দিন</p>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-white text-sm font-medium mb-2">আপনার নাম</label>
                  <input 
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" 
                    type="text" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    placeholder="আপনার নাম" 
                    required 
                  />
                </div>
                
                <div>
                  <label className="block text-white text-sm font-medium mb-2">মোবাইল নাম্বার</label>
                  <input 
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" 
                    type="tel" 
                    value={phone} 
                    onChange={(e) => setPhone(e.target.value)} 
                    placeholder="যেমনঃ ০১৮*******" 
                    required 
                  />
                </div>
                
                <div>
                  <label className="block text-white text-sm font-medium mb-2">পাসওয়ার্ড</label>
                  <input 
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" 
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    placeholder="৬ বা তার বেশি অক্ষরের পাসওয়ার্ড" 
                    required 
                  />
                </div>
                
                <div>
                  <label className="block text-white text-sm font-medium mb-2">পুনরায় পাসওয়ার্ড</label>
                  <input 
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" 
                    type="password" 
                    value={confirmPassword} 
                    onChange={(e) => setConfirmPassword(e.target.value)} 
                    placeholder="পুনরায় পাসওয়ার্ড দিন" 
                    required 
                  />
                </div>
                
                <button 
                  className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg" 
                  type="submit"
                >
                  অ্যাকাউন্ট তৈরি করুন
                </button>
                
                {error && (
                  <div className="bg-red-500/20 border border-red-500 rounded-xl p-3">
                    <p className="text-red-300 text-sm text-center">{error}</p>
                  </div>
                )}
                
                <div className="text-center">
                  <p className="text-gray-300 text-sm">
                    আপনার কি আগে থেকে অ্যাকাউন্ট আছে? 
                    <span 
                      onClick={() => setState('login')} 
                      className="text-green-400 hover:text-green-300 cursor-pointer font-semibold ml-1"
                    >
                      লগ-ইন করুন
                    </span>
                  </p>
                </div>
              </form>
            </div>
          ) : (
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/20">
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 3a1 1 0 011 1v1a1 1 0 11-2 0V4a1 1 0 011-1zm7.5 3a2.5 2.5 0 100 5 2.5 2.5 0 000-5zM3.05 13.5a1 1 0 011-1 1 1 0 011 1v3a1 1 0 11-2 0v-3zm-1.05-5.5a1 1 0 011-1 1 1 0 011 1v3a1 1 0 11-2 0V8z" clipRule="evenodd" />
                  </svg>
                </div>
                <h1 className="text-3xl font-bold text-white mb-2">লগ-ইন করুন</h1>
                <p className="text-gray-300">আপনার অ্যাকাউন্টে প্রবেশ করুন</p>
              </div>
              
              <form onSubmit={handleLogin} className="space-y-6">
                <div>
                  <label className="block text-white text-sm font-medium mb-2">মোবাইল নাম্বার</label>
                  <input 
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" 
                    type="tel" 
                    value={Lphone} 
                    onChange={(e) => setLphone(e.target.value)} 
                    placeholder="যেমন: ০১৮*******" 
                    required 
                  />
                </div>
                
                <div>
                  <label className="block text-white text-sm font-medium mb-2">পাসওয়ার্ড</label>
                  <input 
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" 
                    type="password" 
                    value={Lpassword} 
                    onChange={(e) => setLpassword(e.target.value)} 
                    placeholder="পাসওয়ার্ড" 
                    required 
                  />
                </div>
                
                <button 
                  className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg" 
                  type="submit"
                >
                  লগ-ইন করুন
                </button>
                
                {error && (
                  <div className="bg-red-500/20 border border-red-500 rounded-xl p-3">
                    <p className="text-red-300 text-sm text-center">{error}</p>
                  </div>
                )}
                
                <div className="text-center">
                  <p className="text-gray-300 text-sm">
                    আপনার কি অ্যাকাউন্ট নেই? 
                    <span 
                      onClick={() => setState('signup')} 
                      className="text-green-400 hover:text-green-300 cursor-pointer font-semibold ml-1"
                    >
                      নতুন অ্যাকাউন্ট খুলুন
                    </span>
                  </p>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Login

