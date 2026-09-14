import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../services/api";
import { removeToken, isLoggedIn } from "../services/auth";

const emptyForm = {
    title: "",
    type: "Umrah",
    duration: "",
    price: "",
    makkahHotel: "",
    makkahCategory: "",
    makkahDistance: "",
    madinahHotel: "",
    madinahCategory: "",
    madinahDistance: "",
    inclusions: "",
    transport: "",
    visaIncluded: false
};

function AdminDashboard() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("packages");
    const [packages, setPackages] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    const [showAddForm, setShowAddForm] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [existingImages, setExistingImages] = useState([]);
    const [imagesToRemove, setImagesToRemove] = useState([]);
    const [formData, setFormData] = useState(emptyForm);
    const [formError, setFormError] = useState(null);
    const [formSubmitting, setFormSubmitting] = useState(false);

    const [uploadingId, setUploadingId] = useState(null);
    const [confirmDeactivateId, setConfirmDeactivateId] = useState(null);

    useEffect(() => {
        if (!isLoggedIn()) {
            navigate("/admin/login");
            return;
        }
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [pkgRes, bookingRes] = await Promise.all([
                api.get("/package"),
                api.get("/booking")
            ]);
            setPackages(pkgRes.data.data);
            setBookings(bookingRes.data.data);
        } catch (err) {
            console.error("Failed to load dashboard data", err);
            toast.error("Failed to load dashboard data");
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        removeToken();
        navigate("/admin/login");
    };

    const handleDeactivate = async (id) => {
        try {
            await api.delete(`/package/${id}`);
            toast.success("Package deactivated");
            setConfirmDeactivateId(null);
            fetchData();
        } catch (err) {
            toast.error("Failed to deactivate package");
        }
    };

    const handleFormChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
    };

    const openAddForm = () => {
        setEditingId(null);
        setFormData(emptyForm);
        setExistingImages([]);
        setImagesToRemove([]);
        setFormError(null);
        setShowAddForm(true);
    };

    const openEditForm = (pkg) => {
        setShowAddForm(false);
        setEditingId(pkg._id);
        setFormData({
            title: pkg.title || "",
            type: pkg.type || "Umrah",
            duration: pkg.duration || "",
            price: pkg.price || "",
            makkahHotel: pkg.hotel?.makkah?.name || "",
            makkahCategory: pkg.hotel?.makkah?.category || "",
            makkahDistance: pkg.hotel?.makkah?.distanceFromHaram || "",
            madinahHotel: pkg.hotel?.madinah?.name || "",
            madinahCategory: pkg.hotel?.madinah?.category || "",
            madinahDistance: pkg.hotel?.madinah?.distanceFromHaram || "",
            inclusions: (pkg.inclusions || []).join(", "),
            transport: pkg.transport || "",
            visaIncluded: pkg.visaIncluded || false
        });
        setExistingImages(pkg.images || []);
        setImagesToRemove([]);
        setFormError(null);
    };

    const closeForm = () => {
        setShowAddForm(false);
        setEditingId(null);
        setExistingImages([]);
        setImagesToRemove([]);
    };

    const toggleRemoveImage = (imageId) => {
        setImagesToRemove((prev) =>
            prev.includes(imageId)
                ? prev.filter((id) => id !== imageId)
                : [...prev, imageId]
        );
    };

    const handleSubmitForm = async (e) => {
        e.preventDefault();
        setFormError(null);
        setFormSubmitting(true);

        const payload = {
            title: formData.title,
            type: formData.type,
            duration: Number(formData.duration),
            price: Number(formData.price),
            hotel: {
                makkah: {
                    name: formData.makkahHotel,
                    category: formData.makkahCategory,
                    distanceFromHaram: formData.makkahDistance
                },
                madinah: {
                    name: formData.madinahHotel,
                    category: formData.madinahCategory,
                    distanceFromHaram: formData.madinahDistance
                }
            },
            inclusions: formData.inclusions
                ? formData.inclusions.split(",").map((item) => item.trim())
                : [],
            transport: formData.transport,
            visaIncluded: formData.visaIncluded
        };

        try {
            if (editingId) {
                await api.put(`/package/${editingId}`, payload);

                for (const imageId of imagesToRemove) {
                    await api.delete(`/package/${editingId}/image/${imageId}`);
                }
                toast.success("Package updated");
            } else {
                await api.post("/package", payload);
                toast.success("Package added");
            }

            closeForm();
            fetchData();

        } catch (err) {
            setFormError("Failed to save package. Check the fields and try again.");
            toast.error("Failed to save package");
        } finally {
            setFormSubmitting(false);
        }
    };

    const handleImageUpload = async (packageId, file) => {
        if (!file) return;

        setUploadingId(packageId);

        const imageFormData = new FormData();
        imageFormData.append("image", file);

        try {
            await api.post(`/package/${packageId}/upload`, imageFormData, {
                headers: { "Content-Type": "multipart/form-data" }
            });
            toast.success("Image uploaded");
            fetchData();
        } catch (err) {
            toast.error("Failed to upload image");
        } finally {
            setUploadingId(null);
        }
    };

    const inputClass = "w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent transition";

    const renderPackageForm = () => (
        <form
            onSubmit={handleSubmitForm}
            className="bg-gray-50 rounded-xl p-5 flex flex-col gap-3 border border-gray-200"
        >
            <p className="font-semibold text-gray-800 mb-1">{editingId ? "Edit Package" : "New Package"}</p>

            <input className={inputClass} name="title" placeholder="Package Title" value={formData.title} onChange={handleFormChange} required />

            <select className={inputClass} name="type" value={formData.type} onChange={handleFormChange}>
                <option value="Umrah">Umrah</option>
                <option value="Hajj">Hajj</option>
            </select>

            <div className="grid grid-cols-2 gap-3">
                <input className={inputClass} name="duration" type="number" placeholder="Duration (days)" value={formData.duration} onChange={handleFormChange} required />
                <input className={inputClass} name="price" type="number" placeholder="Price (₹)" value={formData.price} onChange={handleFormChange} required />
            </div>

            <div className="bg-white rounded-lg p-3 border border-gray-100 flex flex-col gap-2">
                <p className="text-xs font-semibold text-emerald-700 uppercase tracking-wide">Makkah Hotel</p>
                <input className={inputClass} name="makkahHotel" placeholder="Hotel Name" value={formData.makkahHotel} onChange={handleFormChange} />
                <div className="grid grid-cols-2 gap-3">
                    <input className={inputClass} name="makkahCategory" placeholder="Category" value={formData.makkahCategory} onChange={handleFormChange} />
                    <input className={inputClass} name="makkahDistance" placeholder="Distance from Haram" value={formData.makkahDistance} onChange={handleFormChange} />
                </div>
            </div>

            <div className="bg-white rounded-lg p-3 border border-gray-100 flex flex-col gap-2">
                <p className="text-xs font-semibold text-emerald-700 uppercase tracking-wide">Madinah Hotel</p>
                <input className={inputClass} name="madinahHotel" placeholder="Hotel Name" value={formData.madinahHotel} onChange={handleFormChange} />
                <div className="grid grid-cols-2 gap-3">
                    <input className={inputClass} name="madinahCategory" placeholder="Category" value={formData.madinahCategory} onChange={handleFormChange} />
                    <input className={inputClass} name="madinahDistance" placeholder="Distance from Haram" value={formData.madinahDistance} onChange={handleFormChange} />
                </div>
            </div>

            <input className={inputClass} name="inclusions" placeholder="Inclusions (comma separated)" value={formData.inclusions} onChange={handleFormChange} />
            <input className={inputClass} name="transport" placeholder="Transport (e.g. AC Bus)" value={formData.transport} onChange={handleFormChange} />

            <label className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                <input type="checkbox" name="visaIncluded" checked={formData.visaIncluded} onChange={handleFormChange} className="w-4 h-4 accent-emerald-700" />
                Visa Included
            </label>

            {editingId && existingImages.length > 0 && (
                <div className="mt-2">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Current Images</p>
                    <p className="text-xs text-gray-400 mb-2">Tick an image to remove it when you update.</p>
                    <div className="flex gap-3 flex-wrap">
                        {existingImages.map((img) => {
                            const marked = imagesToRemove.includes(img._id);
                            return (
                                <label key={img._id} className="relative cursor-pointer">
                                    <img
                                        src={img.url}
                                        alt="package"
                                        className={`w-16 h-16 object-cover rounded-lg border-2 transition ${
                                            marked ? "border-red-500 opacity-50" : "border-transparent"
                                        }`}
                                    />
                                    <input
                                        type="checkbox"
                                        checked={marked}
                                        onChange={() => toggleRemoveImage(img._id)}
                                        className="absolute top-1 right-1 w-4 h-4 accent-red-600"
                                    />
                                </label>
                            );
                        })}
                    </div>
                    {imagesToRemove.length > 0 && (
                        <p className="text-red-500 text-xs mt-2">
                            {imagesToRemove.length} image(s) will be removed when you update.
                        </p>
                    )}
                </div>
            )}

            {formError && <p className="text-red-500 text-sm">{formError}</p>}

            <div className="flex gap-2 mt-2">
                <button
                    type="submit"
                    disabled={formSubmitting}
                    className="flex-1 bg-emerald-900 hover:bg-emerald-800 text-white font-semibold py-3 rounded-xl transition disabled:opacity-60"
                >
                    {formSubmitting ? "Saving..." : editingId ? "Update Package" : "Add Package"}
                </button>
                <button
                    type="button"
                    onClick={closeForm}
                    className="px-5 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-xl transition"
                >
                    Cancel
                </button>
            </div>
        </form>
    );

    if (loading) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <div className="flex flex-col items-center gap-3">
                    <div className="w-8 h-8 border-3 border-emerald-200 border-t-emerald-800 rounded-full animate-spin" />
                    <p className="text-gray-400 text-sm">Loading dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="bg-emerald-950 text-white">
                <div className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
                    <div>
                        <p className="text-amber-500 text-xs font-semibold tracking-[0.2em] uppercase">Admin Portal</p>
                        <h1 className="font-[Playfair_Display] text-2xl font-bold">Dashboard</h1>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="bg-white/10 hover:bg-white/20 border border-white/20 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition"
                    >
                        Logout
                    </button>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-6 py-8">
                <div className="flex gap-3 mb-8">
                    <button
                        onClick={() => setActiveTab("packages")}
                        className={`px-6 py-2.5 rounded-full text-sm font-semibold transition ${
                            activeTab === "packages" ? "bg-emerald-900 text-white" : "bg-white text-gray-600 border border-gray-200"
                        }`}
                    >
                        Packages ({packages.length})
                    </button>
                    <button
                        onClick={() => setActiveTab("bookings")}
                        className={`px-6 py-2.5 rounded-full text-sm font-semibold transition ${
                            activeTab === "bookings" ? "bg-emerald-900 text-white" : "bg-white text-gray-600 border border-gray-200"
                        }`}
                    >
                        Inquiries ({bookings.length})
                    </button>
                </div>

                {activeTab === "packages" && (
                    <div>
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="font-[Playfair_Display] text-xl font-bold text-gray-800">Manage Packages</h3>
                            <button
                                onClick={showAddForm ? closeForm : openAddForm}
                                className="bg-amber-600 hover:bg-amber-500 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition"
                            >
                                {showAddForm ? "Cancel" : "+ Add Package"}
                            </button>
                        </div>

                        {showAddForm && (
                            <div className="mb-6 max-w-lg">
                                {renderPackageForm()}
                            </div>
                        )}

                        {packages.length === 0 ? (
                            <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-gray-200">
                                <p className="text-gray-400 mb-3">No packages yet</p>
                                <button
                                    onClick={openAddForm}
                                    className="text-emerald-700 font-semibold text-sm hover:underline"
                                >
                                    + Add your first package
                                </button>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-4">
                                {packages.map((pkg) => (
                                    <div key={pkg._id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex flex-col gap-4 hover:shadow-md transition-shadow">
                                        {editingId === pkg._id ? (
                                            renderPackageForm()
                                        ) : (
                                            <>
                                                <div className="flex flex-col md:flex-row justify-between md:items-start gap-3">
                                                    <div className="flex-1 min-w-0">
                                                        <span className="inline-block bg-amber-50 text-amber-700 text-xs font-bold px-2.5 py-0.5 rounded-full mb-1 uppercase">
                                                            {pkg.type}
                                                        </span>
                                                        <p className="font-[Playfair_Display] font-bold text-gray-800 truncate">{pkg.title}</p>
                                                        <p className="text-gray-500 text-sm">₹{pkg.price.toLocaleString()} · {pkg.duration} days</p>
                                                    </div>
                                                    <div className="flex gap-2 shrink-0">
                                                        <button
                                                            onClick={() => openEditForm(pkg)}
                                                            className="bg-blue-50 text-blue-700 text-sm font-semibold px-4 py-2 rounded-full hover:bg-blue-100 transition whitespace-nowrap"
                                                        >
                                                            Edit
                                                        </button>
                                                        {confirmDeactivateId === pkg._id ? (
                                                            <div className="flex gap-1">
                                                                <button
                                                                    onClick={() => handleDeactivate(pkg._id)}
                                                                    className="bg-red-600 text-white text-sm font-semibold px-3 py-2 rounded-full hover:bg-red-700 transition whitespace-nowrap"
                                                                >
                                                                    Confirm?
                                                                </button>
                                                                <button
                                                                    onClick={() => setConfirmDeactivateId(null)}
                                                                    className="bg-gray-100 text-gray-600 text-sm font-semibold px-3 py-2 rounded-full hover:bg-gray-200 transition"
                                                                >
                                                                    ✕
                                                                </button>
                                                            </div>
                                                        ) : (
                                                            <button
                                                                onClick={() => setConfirmDeactivateId(pkg._id)}
                                                                className="bg-red-50 text-red-700 text-sm font-semibold px-4 py-2 rounded-full hover:bg-red-100 transition whitespace-nowrap"
                                                            >
                                                                Deactivate
                                                            </button>
                                                        )}
                                                    </div>
                                                </div>

                                                <div className="pt-4 border-t border-gray-100 flex flex-col gap-3">
                                                    <label className="text-xs text-gray-500 font-medium cursor-pointer inline-block w-fit">
                                                        {uploadingId === pkg._id ? "Uploading..." : "📷 Upload Image"}
                                                        <input
                                                            type="file"
                                                            accept="image/*"
                                                            disabled={uploadingId === pkg._id}
                                                            onChange={(e) => handleImageUpload(pkg._id, e.target.files[0])}
                                                            className="hidden"
                                                        />
                                                    </label>

                                                    {pkg.images && pkg.images.length > 0 && (
                                                        <div className="flex gap-2 flex-wrap">
                                                            {pkg.images.map((img) => (
                                                                <img
                                                                    key={img._id}
                                                                    src={img.url}
                                                                    alt={pkg.title}
                                                                    className="w-16 h-16 object-cover rounded-lg shrink-0"
                                                                />
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            </>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {activeTab === "bookings" && (
                    <div>
                        <h3 className="font-[Playfair_Display] text-xl font-bold text-gray-800 mb-6">Customer Inquiries</h3>
                        {bookings.length === 0 ? (
                            <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-gray-200">
                                <p className="text-gray-400">No inquiries yet</p>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-4">
                                {bookings.map((booking) => (
                                    <div key={booking._id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <p className="font-semibold text-gray-800">{booking.customerName}</p>
                                                <p className="text-gray-500 text-sm">{booking.phone}</p>
                                            </div>
                                            <span className="bg-amber-50 text-amber-700 text-xs font-bold px-3 py-1 rounded-full uppercase">
                                                {booking.status}
                                            </span>
                                        </div>
                                        <p className="text-gray-600 text-sm mt-3">
                                            Package: <span className="font-medium">{booking.package ? booking.package.title : "N/A"}</span>
                                        </p>
                                        <p className="text-gray-500 text-sm">
                                            Group Size: {booking.groupSize} · Budget: ₹{booking.budget ? booking.budget.toLocaleString() : "N/A"}
                                        </p>
                                        {booking.message && (
                                            <p className="text-gray-500 text-sm italic mt-2 border-t border-gray-100 pt-2">"{booking.message}"</p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default AdminDashboard;