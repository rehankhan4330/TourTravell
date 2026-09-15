import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../services/api";
import usePageTitle from "../hooks/usePageTitle";

function Contact() {
    usePageTitle("Contact Us");
    
    const [searchParams] = useSearchParams();
    const packageId = searchParams.get("package");

    const [formData, setFormData] = useState({
        customerName: "",
        phone: "",
        email: "",
        groupSize: "",
        preferredDates: "",
        budget: "",
        message: ""
    });

    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError(null);

        try {
            const payload = {
                ...formData,
                groupSize: Number(formData.groupSize),
                budget: formData.budget ? Number(formData.budget) : undefined,
                package: packageId || undefined
            };

            await api.post("/booking", payload);
            setSubmitted(true);

        } catch (err) {
            setError("Failed to submit inquiry. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    const inputClass = "w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent transition";

    if (submitted) {
        return (
            <div className="max-w-lg mx-auto px-6 py-24 text-center">
                <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">✓</div>
                <h2 className="font-[Playfair_Display] text-3xl font-bold text-gray-800 mb-3">Jazakallah Khair!</h2>
                <p className="text-gray-500">Your inquiry has been submitted. Our team will contact you soon.</p>
            </div>
        );
    }

    return (
        <div>
            <div className="bg-emerald-950 text-white py-16 px-6 text-center">
                <p className="text-amber-500 font-semibold tracking-[0.2em] text-xs uppercase mb-3">Get In Touch</p>
                <h1 className="font-[Playfair_Display] text-4xl font-bold">Submit an Inquiry</h1>
            </div>

            <div className="max-w-lg mx-auto px-6 py-16">
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input className={inputClass} type="text" name="customerName" placeholder="Your Name" value={formData.customerName} onChange={handleChange} required />
                    <input className={inputClass} type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} required />
                    <input className={inputClass} type="email" name="email" placeholder="Email (optional)" value={formData.email} onChange={handleChange} />
                    <input className={inputClass} type="number" name="groupSize" placeholder="Group Size" value={formData.groupSize} onChange={handleChange} required />
                    <input className={inputClass} type="text" name="preferredDates" placeholder="Preferred Dates (e.g. March 2027)" value={formData.preferredDates} onChange={handleChange} />
                    <input className={inputClass} type="number" name="budget" placeholder="Budget (optional)" value={formData.budget} onChange={handleChange} />
                    <textarea className={inputClass} name="message" placeholder="Any additional message" value={formData.message} onChange={handleChange} rows={4} />

                    {error && <p className="text-red-500 text-sm">{error}</p>}

                    <button
                        type="submit"
                        disabled={submitting}
                        className="bg-amber-600 text-white font-semibold py-3.5 rounded-full hover:bg-amber-500 transition shadow-lg shadow-amber-600/20 disabled:opacity-60"
                    >
                        {submitting ? "Submitting..." : "Submit Inquiry"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Contact;