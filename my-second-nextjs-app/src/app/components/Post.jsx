import React from 'react';

const Post = ({post}) => {
    return (
        <div>
            <h3>{post.title} </h3>
            <h3>{post.body} </h3>
        </div>
    );
};

export default Post;