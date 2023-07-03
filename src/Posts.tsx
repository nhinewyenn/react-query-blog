/** @format */

import { useState } from 'react';
import { PostDetail } from './PostDetails';
import { useQuery } from '@tanstack/react-query';
import '../src/App.css';
const maxPostPage = 10;

export type PostProps = {
  userID: number;
  id: number;
  title: string;
  body: string;
};

export type PostsProps = PostProps[];

async function fetchPosts(): Promise<PostsProps> {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=10&_page=0`
  );
  return response.json();
}

export function Posts() {
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedPost, setSelectedPost] = useState<PostProps>();

  const { data, isError, isLoading, error } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
    staleTime: 2000,
  });

  if (isLoading) return <h3>Loading data...</h3>;
  if (isError && error) {
    return (
      <>
        <h3>Oops, something went wrong</h3>
        <p>{error.toString()}</p>
      </>
    );
  }
  if (!data) {
    throw new Error('No data returned');
  }

  return (
    <>
      <ul>
        {data.map((post) => (
          <li
            key={post.id}
            className='post-title'
            onClick={() => setSelectedPost(post)}
          >
            {post.title}
          </li>
        ))}
      </ul>
      <div className='pages'>
        <button
          disabled
          onClick={() => {
            console.log('Previous page');
          }}
        >
          Previous page
        </button>
        <span>Page {currentPage + 1}</span>
        <button
          disabled
          onClick={() => {
            console.log('Next page');
          }}
        >
          Next page
        </button>
      </div>
      <hr />
      {selectedPost && (
        <PostDetail
          postId={selectedPost.id}
          id={selectedPost.userID}
          body={`${selectedPost.body}`}
          name={`${selectedPost.title}`}
        />
      )}
    </>
  );
}
