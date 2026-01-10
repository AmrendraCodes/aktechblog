import ArticlesList from '../components/ArticlesList'
import { Link } from 'react-router-dom';

const Blog = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex flex-col">

      {/* Beautiful Hero Section */}
      <div className="relative bg-gradient-to-br from-purple-600 via-pink-500 to-orange-500 text-white overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute top-0 left-0 w-72 h-72 bg-yellow-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-75"></div>
        <div className="absolute bottom-0 left-1/2 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-150"></div>
        
        {/* Decorative shapes */}
        <div className="absolute top-10 left-10 w-20 h-20 border-4 border-white/20 rounded-lg rotate-12 animate-bounce"></div>
        <div className="absolute bottom-20 right-20 w-16 h-16 border-4 border-yellow-300/30 rounded-full animate-spin" style={{animationDuration: '3s'}}></div>
        <div className="absolute top-1/3 right-10 w-12 h-12 bg-white/10 rounded-lg rotate-45"></div>
        
        <div className="relative w-full px-3 sm:px-4 md:px-6 lg:px-8 py-12 sm:py-14 md:py-18 lg:py-22 xl:py-28">
          <div className="text-center max-w-full sm:max-w-2xl md:max-w-3xl lg:max-w-4xl mx-auto">

            {/* Breadcrumb with colorful background */}
            <div className="inline-flex justify-center items-center gap-2 text-xs sm:text-sm bg-white/20 backdrop-blur-md rounded-full px-4 py-2 mb-4 sm:mb-6 border border-white/30">
              <Link to="/" className="hover:text-yellow-300 transition duration-200 font-medium">
                🏠 Home
              </Link>
              <span className="text-yellow-300">→</span>
              <span className="text-yellow-200 font-bold">✨ Blog</span>
            </div>

            {/* Main heading with gradient text */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black mb-4 sm:mb-5 md:mb-7 tracking-tight leading-tight px-2">
              <span className="bg-gradient-to-r from-yellow-200 via-pink-200 to-purple-200 bg-clip-text text-transparent drop-shadow-2xl">
                Our Amazing Blog
              </span>
            </h1>

            {/* Decorative line */}
            <div className="flex justify-center items-center gap-2 mb-4 sm:mb-6">
              <div className="w-12 h-1 bg-gradient-to-r from-transparent via-yellow-300 to-transparent rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-300 rounded-full animate-ping"></div>
              <div className="w-12 h-1 bg-gradient-to-r from-transparent via-yellow-300 to-transparent rounded-full"></div>
            </div>

            {/* Subtitle with glass effect */}
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white font-medium max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl mx-auto leading-relaxed px-4 bg-white/10 backdrop-blur-sm py-3 sm:py-4 rounded-2xl border border-white/20 shadow-2xl">
              ✨ Insights, tutorials, and stories from our team 🚀
            </p>

            {/* Colorful badges */}
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mt-6 sm:mt-8">
              <span className="px-4 py-2 bg-gradient-to-r from-green-400 to-blue-500 rounded-full text-xs sm:text-sm font-bold shadow-lg transform hover:scale-105 transition">
                📚 Knowledge
              </span>
              <span className="px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full text-xs sm:text-sm font-bold shadow-lg transform hover:scale-105 transition">
                💡 Innovation
              </span>
              <span className="px-4 py-2 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full text-xs sm:text-sm font-bold shadow-lg transform hover:scale-105 transition">
                🎨 Creativity
              </span>
            </div>

          </div>
        </div>
      </div>

      {/* Use ArticlesList Component */}
      <div className="flex-grow">
        <ArticlesList />
      </div>

      {/* Footer Section */}
      <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white mt-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            
            {/* About Section */}
            <div>
              <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Our Blog
              </h3>
              <p className="text-slate-300 leading-relaxed">
                Discover insightful articles, tutorials, and stories that inspire and educate. Join our community of readers.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-blue-300">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/" className="text-slate-300 hover:text-blue-400 transition flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 transition"></span>
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/blog" className="text-slate-300 hover:text-blue-400 transition flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 transition"></span>
                    Blog
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="text-slate-300 hover:text-blue-400 transition flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 transition"></span>
                    About
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-slate-300 hover:text-blue-400 transition flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 transition"></span>
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Newsletter Section */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-blue-300">Stay Updated</h4>
              <p className="text-slate-300 text-sm mb-4">
                Subscribe to our newsletter for the latest updates and articles.
              </p>
              <div className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="flex-1 px-4 py-2 rounded-lg bg-slate-700 border border-slate-600 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition shadow-lg hover:shadow-xl">
                  Join
                </button>
              </div>
            </div>

          </div>

          {/* Bottom Bar */}
          <div className="border-t border-slate-700 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-slate-400 text-sm">
              © 2026 Our Blog. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-slate-400 hover:text-blue-400 transition">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
              </a>
              <a href="#" className="text-slate-400 hover:text-blue-400 transition">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              </a>
              <a href="#" className="text-slate-400 hover:text-blue-400 transition">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  )
}

export default Blog