import { useState } from "react";

function ImageCarousel({ images, title }) {
    const [current, setCurrent] = useState(0);

    if (!images || images.length === 0) return null;

    const next = () => setCurrent((prev) => (prev + 1) % images.length);
    const prev = () => setCurrent((p) => (p - 1 + images.length) % images.length);

    return (
        <div>
            <div className="relative rounded-xl overflow-hidden h-80 bg-gray-100">
                <img src={images[current].url} alt={title} className="w-full h-full object-cover" />

                {images.length > 1 && (
                    <>
                        <button
                            onClick={prev}
                            className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white w-9 h-9 rounded-full flex items-center justify-center shadow"
                        >
                            ‹
                        </button>
                        <button
                            onClick={next}
                            className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white w-9 h-9 rounded-full flex items-center justify-center shadow"
                        >
                            ›
                        </button>
                        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                            {images.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setCurrent(i)}
                                    className={`w-2 h-2 rounded-full ${i === current ? "bg-white" : "bg-white/50"}`}
                                />
                            ))}
                        </div>
                    </>
                )}
            </div>

            {images.length > 1 && (
                <div className="flex gap-2 mt-3 flex-wrap">
                    {images.map((img, i) => (
                        <img
                            key={i}
                            src={img.url}
                            alt=""
                            onClick={() => setCurrent(i)}
                            className={`w-16 h-16 object-cover rounded-lg cursor-pointer border-2 ${
                                i === current ? "border-emerald-700" : "border-transparent"
                            }`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default ImageCarousel;