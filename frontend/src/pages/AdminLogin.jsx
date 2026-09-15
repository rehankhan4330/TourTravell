import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { saveToken } from "../services/auth";
import usePageTitle from "../hooks/usePageTitle";

function AdminLogin() {
    usePageTitle("Admin Login");
    
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const response = await api.post("/auth/login", { username, password });
            saveToken(response.data.token);
            navigate("/admin/dashboard");

        } catch (err) {
            setError("Invalid username or password");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-emerald-950 to-emerald-800 px-6">
            <div className="bg-white rounded-2xl shadow-2xl p-10 w-full max-w-sm">
                <div className="text-center mb-8">
                    <h2 className="font-[Playfair_Display] text-2xl font-bold text-emerald-900">Al Safar Travels</h2>
                    <p className="text-gray-400 text-sm mt-1">Admin Portal</p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent transition"
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent transition"
                    />

                    {error && <p className="text-red-500 text-sm text-center">{error}</p>}

                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-emerald-900 text-white font-semibold py-3 rounded-xl hover:bg-emerald-800 transition disabled:opacity-60 mt-2"
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AdminLogin;