import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import usePageTitle from "../hooks/usePageTitle";

function Packages() {
    usePageTitle("Packages");

    const [packages, setPackages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState("All");
    const [priceRange, setPriceRange] = useState("All");

    useEffect(() => {
        const fetchPackages = async () => {
            try {
                const response = await api.get("/package");
                setPackages(response.data.data);
            } catch (err) {
                setError("Failed to load packages");
            } finally {
                setLoading(false);
            }
        };

        fetchPackages();
    }, []);

    const filteredPackages = packages
        .filter((pkg) => filter === "All" || pkg.type === filter)
        .filter((pkg) => {
            if (priceRange === "All") return true;
            if (priceRange === "Under 50k") return pkg.price < 50000;
            if (priceRange === "50k-1L") return pkg.price >= 50000 && pkg.price <= 100000;
            if (priceRange === "Above 1L") return pkg.price > 100000;
            return true;
        });

    if (error) return <p className="text-center py-24 text-red-500">{error}</p>;

    return (
        <div>
            <div className="bg-emerald-950 text-white py-16 px-6 text-center">
                <p className="text-amber-500 font-semibold tracking-[0.2em] text-xs uppercase mb-3">Explore</p>
                <h1 className="font-[Playfair_Display] text-4xl font-bold">Our Packages</h1>
            </div>

            <div className="max-w-6xl mx-auto px-6 py-12">
                <div className="flex flex-col items-center gap-4 mb-10">
                    <div className="flex gap-3 flex-wrap justify-center">
                        {["All", "Umrah", "Hajj"].map((type) => (
                            <button
                                key={type}
                                onClick={() => setFilter(type)}
                                className={`px-6 py-2 rounded-full text-sm font-semibold transition ${
                                    filter === type
                                        ? "bg-emerald-900 text-white"
                                        : "bg-white text-gray-600 border border-gray-200 hover:border-emerald-300"
                                }`}
                            >
                                {type}
                            </button>
                        ))}
                    </div>
                    <div className="flex gap-3 flex-wrap justify-center">
                        {["All", "Under 50k", "50k-1L", "Above 1L"].map((range) => (
                            <button
                                key={range}
                                onClick={() => setPriceRange(range)}
                                className={`px-5 py-1.5 rounded-full text-xs font-semibold transition ${
                                    priceRange === range
                                        ? "bg-amber-600 text-white"
                                        : "bg-white text-gray-500 border border-gray-200 hover:border-amber-300"
                                }`}
                            >
                                {range}
                            </button>
                        ))}
                    </div>
                </div>

                {loading ? (
                    <p className="text-center text-gray-500 py-16">Loading packages...</p>
                ) : filteredPackages.length === 0 ? (
                    <p className="text-center text-gray-500 py-16">No packages available in this category.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {filteredPackages.map((pkg) => (
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
                                    {pkg.availability && pkg.availability !== "Available" && (
                                        <span className={`inline-block text-xs font-bold px-3 py-1 rounded-full mb-3 ml-2 uppercase tracking-wide ${
                                            pkg.availability === "Sold Out" ? "bg-red-100 text-red-700" : "bg-orange-100 text-orange-700"
                                        }`}>
                                            {pkg.availability}
                                        </span>
                                    )}
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
        </div>
    );
}

export default Packages;