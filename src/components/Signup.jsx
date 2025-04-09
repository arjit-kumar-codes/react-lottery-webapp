import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signUpWithEmail } from '../services/auth';
import { showToast } from '../services/toast';
const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleEmailSignup = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            showToast('Passwords do not match', 'error');
            return;
        }

        try {
            setLoading(true);
            const user = await signUpWithEmail(email, password);
            if (user) {
                localStorage.setItem('userId', user.uid);
                navigate('/dashboard');
            }
        } catch (error) {
            showToast(error.message, 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignup = async () => {
        try {
            setLoading(true);
            const user = await signInWithGoogle();
            if (user) {
                localStorage.setItem('userId', user.uid);
                navigate('/dashboard');
            }
        } catch (error) {
            showToast(error.message, 'error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div className="text-center">
                    <h2 className="text-3xl font-extrabold text-purple-600">Create Account</h2>
                    <p className="mt-2 text-sm text-gray-600">Join our lottery community</p>
                </div>

                <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
                    <form className="space-y-6" onSubmit={handleEmailSignup}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email address
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                            />
                        </div>

                        <button
                            type="submit"
                            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 ${loading ? 'opacity-75 cursor-not-allowed' : ''}`}
                            disabled={loading}
                        >
                            {loading ? 'Creating Account...' : 'Sign up'}
                        </button>

                        <div className="flex items-center justify-center space-x-2 text-sm">
                            <span className="text-gray-600">Already have an account?</span>
                            <a onClick={() => navigate('/login')}> Sign in</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Signup;