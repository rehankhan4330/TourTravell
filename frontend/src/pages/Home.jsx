import usePageTitle from "../hooks/usePageTitle";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function Home() {
    usePageTitle("Home");
    
    const [packages, setPackages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFeatured = async () => {
            try {
                const response = await api.get("/package");
                const allPackages = response.data.data;
                const featured = allPackages.filter((pkg) => pkg.featured);
                setPackages(featured.length > 0 ? featured : allPackages.slice(0, 3));
            } catch (err) {
                console.error("Failed to load featured packages", err);
            } finally {
                setLoading(false);
            }
        };

        fetchFeatured();
    }, []);

    return (
        <div className="animate-[fadeIn_0.6s_ease-out]">
            {/* HERO */}
            <div
                className="relative text-white overflow-hidden bg-cover bg-center min-h-[400px] flex items-center"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1519612313525-e50f8ea78218?q=80&w=1920&auto=format&fit=crop')" }}
            >
                <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/90 via-emerald-950/80 to-emerald-950/95" />
                <div className="relative max-w-6xl mx-auto px-6 py-16 md:py-28 text-center">                    <p className="text-amber-500 font-semibold tracking-[0.2em] text-sm mb-4 uppercase">
                    Trusted Since Day One
                </p>
                    <h1 className="font-[Playfair_Display] text-4xl md:text-6xl font-bold mb-6 leading-tight">
                        Your Sacred Journey<br />Starts Here
                    </h1>
                    <p className="text-emerald-200 max-w-xl mx-auto mb-10 text-lg">
                        Guided ziyarat, hotels near Haram, and complete visa support — crafted with care for every pilgrim.
                    </p>
                    <div className="flex gap-4 justify-center flex-wrap">
                        <Link
                            to="/packages"
                            className="bg-amber-600 text-white font-semibold px-8 py-3.5 rounded-full hover:bg-amber-500 transition shadow-lg shadow-amber-600/20"
                        >
                            View Packages
                        </Link>
                        <Link
                            to="/contact"
                            className="bg-white/10 backdrop-blur border border-white/20 text-white font-semibold px-8 py-3.5 rounded-full hover:bg-white/20 transition"
                        >
                            Talk to Us
                        </Link>
                    </div>
                </div>
            </div>

            {/* TRUST BAR */}
            <div className="bg-white border-b border-gray-100">
                <div className="max-w-6xl mx-auto px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                    <div>
                        <p className="font-[Playfair_Display] text-3xl font-bold text-emerald-900">5★</p>
                        <p className="text-gray-500 text-xs mt-1 uppercase tracking-wide">Hotel Options</p>
                    </div>
                    <div>
                        <p className="font-[Playfair_Display] text-3xl font-bold text-emerald-900">100%</p>
                        <p className="text-gray-500 text-xs mt-1 uppercase tracking-wide">Visa Support</p>
                    </div>
                    <div>
                        <p className="font-[Playfair_Display] text-3xl font-bold text-emerald-900">24/7</p>
                        <p className="text-gray-500 text-xs mt-1 uppercase tracking-wide">Ground Staff</p>
                    </div>
                    <div>
                        <p className="font-[Playfair_Display] text-3xl font-bold text-emerald-900">100+</p>
                        <p className="text-gray-500 text-xs mt-1 uppercase tracking-wide">Happy Pilgrims</p>
                    </div>
                </div>
            </div>

            {/* FEATURED PACKAGES */}
            <div className="max-w-6xl mx-auto px-6 py-20">
                <div className="text-center mb-12">
                    <p className="text-amber-600 font-semibold tracking-[0.2em] text-xs uppercase mb-2">Handpicked For You</p>
                    <h2 className="font-[Playfair_Display] text-3xl md:text-4xl font-bold text-gray-800">Featured Packages</h2>
                </div>

                {loading ? (
                    <p className="text-center text-gray-500">Loading...</p>
                ) : packages.length === 0 ? (
                    <p className="text-center text-gray-500">No packages available right now.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {packages.map((pkg) => (
                            <Link
                                key={pkg._id}
                                to={`/packages/${pkg._id}`}
                                className="group bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                            >
                                {pkg.images && pkg.images.length > 0 ? (
                                    <div className="h-48 overflow-hidden">
                                        <img
                                            src={pkg.images[0].url}
                                            alt={pkg.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                                        />
                                    </div>
                                ) : (
                                    <div className="h-48 bg-gradient-to-br from-emerald-50 to-amber-50 flex items-center justify-center text-emerald-300 text-sm">
                                        Al Safar Travels
                                    </div>
                                )}
                                <div className="p-6">
                                    <span className="inline-block bg-amber-50 text-amber-700 text-xs font-bold px-3 py-1 rounded-full mb-3 uppercase tracking-wide">
                                        {pkg.type}
                                    </span>
                                    <h3 className="font-[Playfair_Display] text-xl font-bold text-gray-800 mb-2">{pkg.title}</h3>
                                    <p className="text-gray-500 text-sm mb-4">{pkg.duration} days journey</p>
                                    <div className="flex items-center justify-between">
                                        <p className="text-emerald-800 font-bold text-xl">₹{pkg.price.toLocaleString()}</p>
                                        <span className="text-emerald-700 text-sm font-semibold group-hover:translate-x-1 transition inline-block">
                                            View →
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>

            {/* WHY CHOOSE US */}
            <div className="bg-gradient-to-b from-gray-50 to-white py-20 px-6">
                <div className="text-center mb-12">
                    <p className="text-amber-600 font-semibold tracking-[0.2em] text-xs uppercase mb-2">Our Promise</p>
                    <h2 className="font-[Playfair_Display] text-3xl md:text-4xl font-bold text-gray-800">Why Pilgrims Choose Us</h2>
                </div>
                <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center hover:shadow-lg transition">
                        <div className="w-14 h-14 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-6 h-6 text-emerald-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 21c-4.5-3-7.5-6.5-7.5-11A7.5 7.5 0 0112 2.5 7.5 7.5 0 0119.5 10c0 4.5-3 8-7.5 11z" />
                                <circle cx="12" cy="10" r="2.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <h4 className="font-[Playfair_Display] font-bold text-lg text-gray-800 mb-2">Guided Ziyarat</h4>
                        <p className="text-gray-500 text-sm">Experienced guides for all religious sites, every step of the way.</p>
                    </div>
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center hover:shadow-lg transition">
                        <div className="w-14 h-14 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-6 h-6 text-emerald-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 21V10.5L12 4l9 6.5V21M3 21h18M3 21v-6a1 1 0 011-1h4a1 1 0 011 1v6m6-7h2m-2 4h2" />
                            </svg>
                        </div>
                        <h4 className="font-[Playfair_Display] font-bold text-lg text-gray-800 mb-2">Hotels Near Haram</h4>
                        <p className="text-gray-500 text-sm">Comfortable stays within walking distance of the holy sites.</p>
                    </div>
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center hover:shadow-lg transition">
                        <div className="w-14 h-14 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-6 h-6 text-emerald-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h6.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </div>
                        <h4 className="font-[Playfair_Display] font-bold text-lg text-gray-800 mb-2">Complete Visa Support</h4>
                        <p className="text-gray-500 text-sm">End-to-end visa processing, so you can focus on your journey.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;