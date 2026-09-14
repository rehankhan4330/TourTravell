import { useState, useEffect } from "react";
import api from "../services/api";

const testimonials = [
    {
        name: "Fatima Sheikh",
        text: "Alhamdulillah, our Umrah trip was smooth and well organized. The hotel was very close to Haram and the guide was extremely helpful.",
        location: "Mumbai"
    },
    {
        name: "Yusuf Ahmed",
        text: "Excellent service from start to finish. Visa processing was fast and the group ziyarat was well planned.",
        location: "Pune"
    },
    {
        name: "Zainab Ali",
        text: "This was our second Umrah with this agency. Highly recommend for families, very comfortable arrangements.",
        location: "Thane"
    }
];

function Gallery() {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await api.get("/package");
                const allPackages = response.data.data;
                const allImages = allPackages.flatMap((pkg) =>
                    (pkg.images || []).map((img) => ({ src: img.url, title: pkg.title }))
                );
                setImages(allImages);
            } catch (err) {
                console.error("Failed to load gallery images", err);
            } finally {
                setLoading(false);
            }
        };

        fetchImages();
    }, []);

    return (
        <div>
            <div className="bg-emerald-950 text-white py-16 px-6 text-center">
                <p className="text-amber-500 font-semibold tracking-[0.2em] text-xs uppercase mb-3">Moments</p>
                <h1 className="font-[Playfair_Display] text-4xl font-bold">Gallery</h1>
            </div>

            <div className="max-w-6xl mx-auto px-6 py-16">
                {loading ? (
                    <p className="text-center text-gray-500">Loading...</p>
                ) : images.length === 0 ? (
                    <p className="text-center text-gray-500">No photos available yet.</p>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
                        {images.map((img, index) => (
                            <img
                                key={index}
                                src={img.src}
                                alt={img.title}
                                className="w-full h-44 object-cover rounded-xl hover:scale-[1.03] transition duration-300"
                            />
                        ))}
                    </div>
                )}

                <div className="text-center mb-12">
                    <p className="text-amber-600 font-semibold tracking-[0.2em] text-xs uppercase mb-2">Testimonials</p>
                    <h2 className="font-[Playfair_Display] text-3xl font-bold text-gray-800">What Our Pilgrims Say</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {testimonials.map((t, index) => (
                        <div key={index} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                            <p className="text-amber-500 mb-3">★★★★★</p>
                            <p className="text-gray-600 text-sm italic mb-4">"{t.text}"</p>
                            <p className="font-semibold text-gray-800 text-sm">{t.name}</p>
                            <p className="text-gray-400 text-xs">{t.location}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Gallery;