import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../services/api";
import usePageTitle from "../hooks/usePageTitle";
import ImageCarousel from "../components/ImageCarousel";

function PackageDetail() {
    const { id } = useParams();
    const [pkg, setPkg] = useState(null);
    const [related, setRelated] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    usePageTitle(pkg?.title || "Package Details");

    useEffect(() => {
        const fetchPackage = async () => {
            try {
                const response = await api.get(`/package/${id}`);
                setPkg(response.data.data);

                const allRes = await api.get("/package");
                const relatedPkgs = allRes.data.data
                    .filter((p) => p._id !== id && p.type === response.data.data.type)
                    .slice(0, 3);
                setRelated(relatedPkgs);

            } catch (err) {
                setError("Failed to load package details");
            } finally {
                setLoading(false);
            }
        };

        fetchPackage();
    }, [id]);

    if (loading) return <p className="text-center py-24 text-gray-500">Loading...</p>;
    if (error) return <p className="text-center py-24 text-red-500">{error}</p>;
    if (!pkg) return <p className="text-center py-24 text-gray-500">Package not found</p>;

    return (
        <div>
            <div className="bg-emerald-950 text-white py-14 px-6">
                <div className="max-w-4xl mx-auto">
                    <Link to="/packages" className="text-emerald-300 hover:text-white transition text-sm">← Back to Packages</Link>
                    <div className="mt-4 mb-3 flex gap-2 flex-wrap">
                        <span className="inline-block bg-amber-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                            {pkg.type}
                        </span>
                        {pkg.availability && pkg.availability !== "Available" && (
                            <span className={`inline-block text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide ${
                                pkg.availability === "Sold Out" ? "bg-red-600 text-white" : "bg-orange-500 text-white"
                            }`}>
                                {pkg.availability}
                            </span>
                        )}
                    </div>
                    <h1 className="font-[Playfair_Display] text-3xl md:text-4xl font-bold">{pkg.title}</h1>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-6 py-12">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 -mt-20 relative z-10">
                    <div className="bg-white rounded-2xl p-5 text-center shadow-md border border-gray-100">
                        <p className="text-gray-400 text-xs uppercase tracking-wide mb-1">Duration</p>
                        <p className="font-[Playfair_Display] font-bold text-lg text-gray-800">{pkg.duration} days</p>
                    </div>
                    <div className="bg-white rounded-2xl p-5 text-center shadow-md border border-gray-100">
                        <p className="text-gray-400 text-xs uppercase tracking-wide mb-1">Price</p>
                        <p className="font-[Playfair_Display] font-bold text-lg text-emerald-700">₹{pkg.price.toLocaleString()}</p>
                    </div>
                    <div className="bg-white rounded-2xl p-5 text-center shadow-md border border-gray-100">
                        <p className="text-gray-400 text-xs uppercase tracking-wide mb-1">Transport</p>
                        <p className="font-[Playfair_Display] font-bold text-lg text-gray-800">{pkg.transport || "N/A"}</p>
                    </div>
                    <div className="bg-white rounded-2xl p-5 text-center shadow-md border border-gray-100">
                        <p className="text-gray-400 text-xs uppercase tracking-wide mb-1">Visa</p>
                        <p className="font-[Playfair_Display] font-bold text-lg text-gray-800">{pkg.visaIncluded ? "Included" : "Extra"}</p>
                    </div>
                </div>

                {pkg.hotel && (
                    <div className="mb-10">
                        <h3 className="font-[Playfair_Display] text-2xl font-bold text-gray-800 mb-4">Hotel Details</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {pkg.hotel.makkah && (
                                <div className="border border-gray-100 bg-gray-50 rounded-xl p-5">
                                    <p className="font-semibold text-emerald-800 mb-1">📍 Makkah</p>
                                    <p className="text-gray-700 text-sm">{pkg.hotel.makkah.name} ({pkg.hotel.makkah.category})</p>
                                    <p className="text-gray-500 text-sm">{pkg.hotel.makkah.distanceFromHaram} from Haram</p>
                                </div>
                            )}
                            {pkg.hotel.madinah && (
                                <div className="border border-gray-100 bg-gray-50 rounded-xl p-5">
                                    <p className="font-semibold text-emerald-800 mb-1">📍 Madinah</p>
                                    <p className="text-gray-700 text-sm">{pkg.hotel.madinah.name} ({pkg.hotel.madinah.category})</p>
                                    <p className="text-gray-500 text-sm">{pkg.hotel.madinah.distanceFromHaram} from Haram</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {pkg.inclusions && pkg.inclusions.length > 0 && (
                    <div className="mb-10">
                        <h3 className="font-[Playfair_Display] text-2xl font-bold text-gray-800 mb-4">Inclusions</h3>
                        <div className="flex flex-wrap gap-2">
                            {pkg.inclusions.map((item, index) => (
                                <span key={index} className="bg-emerald-50 text-emerald-800 text-sm font-medium px-4 py-2 rounded-full">
                                    ✓ {item}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {pkg.itinerary && pkg.itinerary.length > 0 && (
                    <div className="mb-10">
                        <h3 className="font-[Playfair_Display] text-2xl font-bold text-gray-800 mb-4">Itinerary</h3>
                        {pkg.itinerary.map((day, index) => (
                            <div key={index} className="border-l-2 border-amber-500 pl-5 pb-5 relative">
                                <div className="absolute w-3 h-3 bg-amber-500 rounded-full -left-[7px] top-1" />
                                <p className="font-semibold text-gray-800">Day {day.day}: {day.title}</p>
                                <p className="text-gray-500 text-sm">{day.description}</p>
                            </div>
                        ))}
                    </div>
                )}

                {pkg.images && pkg.images.length > 0 && (
                    <div className="mb-10">
                        <h3 className="font-[Playfair_Display] text-2xl font-bold text-gray-800 mb-4">Photos</h3>
                        <ImageCarousel images={pkg.images} title={pkg.title} />
                    </div>
                )}

                <Link to={`/contact?package=${pkg._id}`}>
                    <button className="bg-amber-600 text-white font-semibold px-10 py-4 rounded-full hover:bg-amber-500 transition shadow-lg shadow-amber-600/20">
                        Inquire About This Package
                    </button>
                </Link>

                {related.length > 0 && (
                    <div className="mt-16 pt-10 border-t border-gray-100">
                        <h3 className="font-[Playfair_Display] text-2xl font-bold text-gray-800 mb-6">You Might Also Like</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {related.map((r) => (
                                <Link
                                    key={r._id}
                                    to={`/packages/${r._id}`}
                                    className="group bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition"
                                >
                                    {r.images && r.images.length > 0 ? (
                                        <div className="h-36 overflow-hidden">
                                            <img src={r.images[0].url} alt={r.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                                        </div>
                                    ) : (
                                        <div className="h-36 bg-gradient-to-br from-emerald-50 to-amber-50" />
                                    )}
                                    <div className="p-4">
                                        <p className="font-[Playfair_Display] font-bold text-gray-800 text-sm mb-1">{r.title}</p>
                                        <p className="text-emerald-700 font-bold text-sm">₹{r.price.toLocaleString()}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default PackageDetail;