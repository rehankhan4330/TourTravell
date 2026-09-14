function WhatsAppButton() {
    var phoneNumber = "919876543210";
    var message = "Hi, I'm interested in your Hajj/Umrah packages.";
    var whatsappUrl = "https://wa.me/" + phoneNumber + "?text=" + encodeURIComponent(message);

    return (
        <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 z-50 group"
        >
            <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-40" />
            <span className="relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] shadow-lg shadow-emerald-900/30 hover:scale-110 transition-transform duration-200">
                <svg
                    viewBox="0 0 32 32"
                    className="w-7 h-7 fill-white"
                >
                    <path d="M16.001 3.2c-7.07 0-12.8 5.73-12.8 12.8 0 2.26.6 4.38 1.64 6.22L3.2 28.8l6.77-1.6a12.72 12.72 0 006.03 1.53h.005c7.07 0 12.8-5.73 12.8-12.8s-5.73-12.73-12.805-12.73zm0 23.36a10.5 10.5 0 01-5.36-1.47l-.385-.23-3.99.945.95-3.89-.25-.4a10.56 10.56 0 01-1.62-5.62c0-5.86 4.77-10.62 10.65-10.62 5.87 0 10.64 4.76 10.64 10.62 0 5.87-4.77 10.66-10.635 10.66zm5.83-7.97c-.32-.16-1.9-.94-2.2-1.045-.295-.11-.51-.16-.725.16-.215.32-.83 1.045-1.02 1.26-.19.215-.375.24-.695.08-.32-.16-1.35-.5-2.57-1.59-.95-.85-1.59-1.9-1.78-2.22-.19-.32-.02-.49.14-.65.145-.145.32-.375.48-.56.16-.19.215-.32.32-.535.105-.215.05-.4-.025-.56-.08-.16-.725-1.75-.995-2.4-.26-.63-.53-.545-.725-.555-.185-.01-.4-.01-.615-.01a1.18 1.18 0 00-.855.4c-.295.32-1.12 1.095-1.12 2.67s1.145 3.09 1.305 3.305c.16.215 2.255 3.44 5.465 4.825.765.33 1.36.53 1.825.675.765.245 1.465.21 2.015.13.615-.09 1.9-.775 2.165-1.525.265-.75.265-1.395.185-1.53-.08-.135-.295-.215-.615-.375z"/>
                </svg>
            </span>
        </a>
    );
}

export default WhatsAppButton;