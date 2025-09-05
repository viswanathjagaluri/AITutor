import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            // NOTE: Using URLSearchParams for the OAuth2PasswordRequestForm expected by FastAPI
            const formData = new URLSearchParams();
            formData.append('username', email);
            formData.append('password', password);

            const response = await fetch('http://localhost:8000/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: formData.toString(),
            });

            if (!response.ok) {
                const errData = await response.json();
                throw new Error(errData.detail || 'Login failed');
            }

            const data = await response.json();
            localStorage.setItem('token', data.access_token);
            navigate('/dashboard'); // Redirect to dashboard on successful login
        } catch (err) {
            setError('Invalid email or password.');
            console.error('Login error:', err);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-slate-900 text-white">
            <div className="p-8 bg-slate-800 rounded-lg shadow-2xl w-full max-w-md border border-slate-700">
                <h1 className="text-3xl font-bold mb-6 text-center text-cyan-400">Login to Your Account</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block mb-2 text-sm font-medium text-slate-300">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-3 py-2 bg-slate-700 rounded-md border border-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block mb-2 text-sm font-medium text-slate-300">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-3 py-2 bg-slate-700 rounded-md border border-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                            required
                        />
                    </div>
                    {error && <p className="text-red-400 text-center mb-4">{error}</p>}
                    <button type="submit" className="w-full py-2 bg-cyan-600 hover:bg-cyan-700 rounded-md font-semibold transition-colors">
                        Sign In
                    </button>
                </form>
                <p className="text-center text-sm text-slate-400 mt-4">
                    Don't have an account yet?{' '}
                    <Link to="/register" className="text-cyan-400 hover:underline">
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;

