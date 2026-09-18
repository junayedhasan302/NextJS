import React from 'react';

const Post = ({ post }) => {
    return (
        <div className="border border-gray-300 rounded-xl p-5 bg-white shadow-sm hover:shadow-lg hover:border-blue-500 hover:bg-blue-50 transition duration-300">
            <h3 className="text-lg font-bold text-gray-800 hover:text-blue-600 transition">
                {post.title}
            </h3>

            <p className="mt-3 text-sm text-gray-600 leading-6">
                {post.body}
            </p>
        </div>
    );
};

const PostPage = async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts');
    const posts = await res.json();

    return (
        <div>
            <h2 className="text-2xl font-bold text-center my-6">
                Post Page: {posts.length}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 p-5">
                {posts.map(post => (
                    <Post key={post.id} post={post} />
                ))}
            </div>
        </div>
    );
};

export default PostPage;