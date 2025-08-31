import { Link } from 'react-router';

const Unauthorized = () => {
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 text-center">
                <div className="text-6xl mb-4">🚫</div>
                <h1 className="text-2xl font-bold text-gray-800 mb-4">Access Denied</h1>
                <p className="text-gray-600 mb-6">
                    You don't have permission to access this page. This area is restricted to administrators only.
                </p>
                <div className="space-y-3">
                    <Link
                        to="/"
                        className="block w-full bg-sky-600 text-white py-2 px-4 rounded-lg hover:bg-sky-700 transition-colors"
                    >
                        Go to Home
                    </Link>
                    <Link
                        to="/login"
                        className="block w-full bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
                    >
                        Login as Admin
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Unauthorized;
