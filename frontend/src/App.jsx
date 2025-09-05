import { useState, useEffect, useRef } from 'react';

function App() {
  const [message, setMessage] = useState('Connecting to backend...');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Effect to fetch data from the backend
  useEffect(() => {
    // Fetch data from the backend API
    fetch('http://localhost:8000/')
      .then(response => response.json())
      .then(data => setMessage(data.message))
      .catch(error => {
        console.error('Error fetching data:', error);
        setMessage('Could not connect to backend.'); // Show an error message
      });
  }, []);

  // Effect to handle clicks outside of the dropdown menu
  useEffect(() => {
    // Function to check if a click is outside the referenced component
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    // Add event listener when the dropdown is open
    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    // Cleanup the event listener
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);


  return (
    // The main container needs to be relative for the absolute positioning of the dropdown
    <div className="relative min-h-screen bg-gradient-to-br from-slate-900 to-blue-900 text-white font-sans">
      
      {/* Header component */}
      <nav className="bg-white/5 backdrop-blur-md shadow-lg fixed top-0 left-0 right-0 z-10">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <a href="/" className="text-lg font-semibold text-white">MyApp</a>
            </div>

            <div className="flex-grow"></div>

            <div className="flex items-center">
              {/* --- React Dropdown Logic --- */}
              <div className="relative" ref={dropdownRef}>
                {/* Button to toggle the dropdown */}
                <button 
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)} 
                  className="flex text-sm border-2 border-transparent rounded-full focus:outline-none focus:border-cyan-400 transition"
                >
                  <img className="h-8 w-8 rounded-full object-cover" src="https://placehold.co/150x150/0f172a/7dd3fc?text=U" alt="Your avatar" />
                </button>

                {/* The Dropdown Menu itself */}
                {isDropdownOpen && (
                  <div 
                    className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-slate-700 ring-1 ring-black ring-opacity-5"
                  >
                    <a href="#" className="block px-4 py-2 text-sm text-gray-200 hover:bg-slate-600">Your Profile</a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-200 hover:bg-slate-600">Settings</a>
                    <div className="border-t border-slate-600 my-1"></div>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-200 hover:bg-slate-600">Sign out</a>
                  </div>
                )}
              </div>
              {/* --- End React Dropdown Logic --- */}
            </div>
          </div>
        </div>
      </nav>

      {/* Main content area */}
      <div className="flex items-center justify-center min-h-screen">
          <div className="p-10 bg-slate-800/50 backdrop-blur-sm rounded-xl shadow-2xl text-center border-2 border-cyan-400/50">
            
            <h1 className="text-5xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-200">
              React & Tailwind
            </h1>

            <p className="text-xl text-amber-300 animate-pulse">
              {message}
            </p>

            <button className="mt-8 px-6 py-3 bg-cyan-500 text-white font-semibold rounded-lg shadow-lg hover:bg-cyan-600 hover:scale-105 transform transition-transform duration-300 ease-in-out">
              Test Button
            </button>

          </div>
      </div>
    </div>
  );
}

export default App;
