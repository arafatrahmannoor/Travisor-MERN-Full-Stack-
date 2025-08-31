// Example usage of the useAdminAccess hook
import { useAdminAccess } from '../hooks/useAdminAccess';
import { Link } from 'react-router';

const ExampleAdminFeatures = () => {
    const { isAdmin, hasAccess } = useAdminAccess();

    return (
        <div>
            {/* Only show admin link if user is admin */}
            {isAdmin && (
                <Link
                    to="/admin"
                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                >
                    Admin Panel
                </Link>
            )}

            {/* Show different content based on access level */}
            {hasAccess('admin') ? (
                <div className="admin-features">
                    <h3>Admin Features</h3>
                    <p>You have admin access!</p>
                </div>
            ) : (
                <div className="user-features">
                    <h3>User Features</h3>
                    <p>Regular user content</p>
                </div>
            )}
        </div>
    );
};

export default ExampleAdminFeatures;
