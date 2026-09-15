import { useParams, Link } from "react-router-dom";
import { blogPosts } from "../data/blogPosts";
import usePageTitle from "../hooks/usePageTitle";

function BlogDetail() {
    const { slug } = useParams();
    const post = blogPosts.find((p) => p.slug === slug);

    usePageTitle(post?.title || "Guide");

    if (!post) {
        return (
            <div className="max-w-2xl mx-auto px-6 py-24 text-center">
                <p className="text-gray-500">Article not found.</p>
                <Link to="/blog" className="text-emerald-700 hover:underline text-sm">← Back to Guides</Link>
            </div>
        );
    }

    return (
        <div>
            <div className="bg-emerald-950 text-white py-16 px-6">
                <div className="max-w-2xl mx-auto">
                    <Link to="/blog" className="text-emerald-300 hover:text-white transition text-sm">← Back to Guides</Link>
                    <p className="text-amber-500 text-xs uppercase tracking-wide mt-4 mb-2">
                        {new Date(post.date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
                    </p>
                    <h1 className="font-[Playfair_Display] text-3xl md:text-4xl font-bold">{post.title}</h1>
                </div>
            </div>

            <div className="max-w-2xl mx-auto px-6 py-12">
                {post.content.split("\n\n").map((para, index) => (
                    <p key={index} className="text-gray-700 leading-relaxed mb-5">{para}</p>
                ))}
            </div>
        </div>
    );
}

export default BlogDetail;