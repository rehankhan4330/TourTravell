import { Link } from "react-router-dom";

function NotFound() {
    return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6">
            <p className="font-[Playfair_Display] text-7xl font-bold text-emerald-900 mb-4">404</p>
            <h2 className="text-2xl font-bold text-gray-800 mb-3">Page Not Found</h2>
            <p className="text-gray-500 mb-8">The page you're looking for doesn't exist or has moved.</p>
            <Link to="/" className="bg-emerald-900 text-white font-semibold px-8 py-3 rounded-full hover:bg-emerald-800 transition">
                Back to Home
            </Link>
        </div>
    );
}

export default NotFound;