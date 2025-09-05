import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DashboardPage = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/login');
                return;
            }

            try {
                const response = await fetch('http://localhost:8000/profile', {
                    headers: { 'Authorization': `Bearer ${token}` },
                });

                if (response.status === 401) {
                    localStorage.removeItem('token');
                    navigate('/login');
                    return;
                }

                if (!response.ok) {
                    throw new Error('Failed to fetch profile.');
                }

                const data = await response.json();
                setUser(data);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchProfile();
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    if (error) return <div className="text-red-500 text-center mt-10">{error}</div>
    if (!user) return <div className="text-white text-center mt-10">Loading...</div>

    return (
        <div className="min-h-screen bg-gray-900 text-white p-8">
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-4xl font-bold">Dashboard</h1>
                    <button onClick={handleLogout} className="py-2 px-4 bg-red-600 hover:bg-red-700 rounded">
                        Logout
                    </button>
                </div>
                <div className="bg-gray-800 p-6 rounded-lg">
                    <h2 className="text-2xl mb-4">Welcome, {user.email}</h2>
                    <p>Your user ID is: {user.id}</p>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
