import { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);

    const links = [
        { to: "/", label: "Home" },
        { to: "/packages", label: "Packages" },
        { to: "/gallery", label: "Gallery" },
        { to: "/blog", label: "Guides" },
        { to: "/contact", label: "Contact" }
    ];

    return (
        <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
            <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
                <Link to="/" className="font-[Playfair_Display] text-2xl font-bold text-emerald-900" onClick={() => setMenuOpen(false)}>
                    Al Safar <span className="text-amber-600">Travels</span>
                </Link>

                <div className="hidden md:flex gap-8 items-center">
                    {links.map((link) => (
                        <Link key={link.to} to={link.to} className="text-gray-600 hover:text-emerald-800 transition font-medium text-sm">
                            {link.label}
                        </Link>
                    ))}
                    <Link
                        to="/contact"
                        className="bg-emerald-900 text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-emerald-800 transition"
                    >
                        Get a Quote
                    </Link>
                </div>

                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="md:hidden w-9 h-9 flex flex-col justify-center items-center gap-1.5"
                    aria-label="Toggle menu"
                >
                    <span className={`block w-6 h-0.5 bg-emerald-900 transition ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
                    <span className={`block w-6 h-0.5 bg-emerald-900 transition ${menuOpen ? "opacity-0" : ""}`} />
                    <span className={`block w-6 h-0.5 bg-emerald-900 transition ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
                </button>
            </div>

            {menuOpen && (
                <div className="md:hidden bg-white border-t border-gray-100 px-6 py-4 flex flex-col gap-4">
                    {links.map((link) => (
                        <Link
                            key={link.to}
                            to={link.to}
                            onClick={() => setMenuOpen(false)}
                            className="text-gray-600 hover:text-emerald-800 transition font-medium text-sm"
                        >
                            {link.label}
                        </Link>
                    ))}
                    <Link
                        to="/contact"
                        onClick={() => setMenuOpen(false)}
                        className="bg-emerald-900 text-white text-sm font-semibold px-5 py-2.5 rounded-full text-center"
                    >
                        Get a Quote
                    </Link>
                </div>
            )}
        </nav>
    );
}

export default Navbar;