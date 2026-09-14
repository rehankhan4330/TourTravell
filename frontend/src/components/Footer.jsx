import { Link } from "react-router-dom";

function Footer() {
    return (
        <footer className="bg-emerald-950 text-emerald-100">
            <div className="max-w-6xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">
                <div>
                    <h3 className="font-[Playfair_Display] text-2xl font-bold text-white mb-3">
                        Al Safar <span className="text-amber-500">Travels</span>
                    </h3>
                    <p className="text-emerald-300 text-sm leading-relaxed">
                        Trusted Hajj & Umrah packages with guided ziyarat, comfortable hotels near Haram, and complete visa support.
                    </p>
                </div>

                <div>
                    <h4 className="text-white font-semibold mb-4 text-sm tracking-wide uppercase">Quick Links</h4>
                    <div className="flex flex-col gap-2 text-sm">
                        <Link to="/packages" className="text-emerald-300 hover:text-white transition">Our Packages</Link>
                        <Link to="/gallery" className="text-emerald-300 hover:text-white transition">Gallery</Link>
                        <Link to="/contact" className="text-emerald-300 hover:text-white transition">Contact Us</Link>
                        <Link to="/admin/login" className="text-emerald-300 hover:text-white transition">Admin Login</Link>
                    </div>
                </div>

                <div>
                    <h4 className="text-white font-semibold mb-4 text-sm tracking-wide uppercase">Contact</h4>
                    <div className="flex flex-col gap-2 text-sm text-emerald-300">
                        <p>+91 98765 43210</p>
                        <p>info@alsafartravels.com</p>
                        <p>Bhiwandi, Maharashtra, India</p>
                    </div>
                </div>

                <div>
                    <h4 className="text-white font-semibold mb-4 text-sm tracking-wide uppercase">Trust & Safety</h4>
                    <div className="flex flex-col gap-2 text-sm text-emerald-300">
                        <p>✓ Verified Travel Agency</p>
                        <p>✓ Secure Booking Process</p>
                        <p>✓ Dedicated Ground Support</p>
                    </div>
                </div>
            </div>

            <div className="border-t border-emerald-900 py-5 text-center text-emerald-400 text-xs">
                © 2026 Al Safar Travels. All rights reserved.
            </div>
        </footer>
    );
}

export default Footer;