import { Link } from "react-router-dom";
import { blogPosts } from "../data/blogPosts";

function Blog() {
    return (
        <div>
            <div className="bg-emerald-950 text-white py-16 px-6 text-center">
                <p className="text-amber-500 font-semibold tracking-[0.2em] text-xs uppercase mb-3">Learn</p>
                <h1 className="font-[Playfair_Display] text-4xl font-bold">Hajj & Umrah Guides</h1>
            </div>

            <div className="max-w-4xl mx-auto px-6 py-16 flex flex-col gap-6">
                {blogPosts.map((post) => (
                    <Link
                        key={post.slug}
                        to={`/blog/${post.slug}`}
                        className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-lg transition"
                    >
                        <p className="text-gray-400 text-xs mb-2">{new Date(post.date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</p>
                        <h3 className="font-[Playfair_Display] text-xl font-bold text-gray-800 mb-2">{post.title}</h3>
                        <p className="text-gray-500 text-sm">{post.excerpt}</p>
                        <span className="text-emerald-700 text-sm font-semibold mt-3 inline-block">Read More →</span>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default Blog;