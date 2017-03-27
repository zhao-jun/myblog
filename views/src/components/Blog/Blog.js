import React from  'react';
import Banner from './../Banner/Banner';
import './Blog.scss';

import BlogItem from './../BlogItem/BlogItem';
import Tags from './../Tags/Tags';

const Blog = () => (
    <div>
        <Banner />
        <div className="blogWrap">
            <ul className="blog">
                <BlogItem />
            </ul>
            <Tags className="tags" />
        </div>
    </div>
);

export default Blog;