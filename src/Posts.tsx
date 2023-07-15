/** @format */

import { useEffect, useState } from 'react';
import { PostDetail } from './PostDetails';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import '../src/App.css';
const maxPostPage = 10;

export type PostProps = {
  userID: number;
  id: number;
  title: string;
  body: string;
};

export type PostsProps = PostProps[];

async function fetchPosts(pageNumber: number): Promise<PostsProps> {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${pageNumber}`
  );
  return response.json();
}

export function Posts() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPost, setSelectedPost] = useState<PostProps>();

  const qc = useQueryClient();

  useEffect(() => {
    if (currentPage < maxPostPage) {
      const nextPage = currentPage + 1;
      qc.prefetchQuery({
        queryKey: ['posts', nextPage],
        queryFn: () => fetchPosts(nextPage),
      });
    }
  }, [currentPage, qc]);

  const { data, isError, error, isFetching } = useQuery({
    queryKey: ['posts', currentPage],
    queryFn: () => fetchPosts(currentPage),
    staleTime: 2000,
    keepPreviousData: true,
  });

  if (isFetching) return <h3>Fetching data in progress...</h3>;
  if (isError && error) {
    return (
      <>
        <h3>Oops, something went wrong</h3>
        <p>{error.toString()}</p>
      </>
    );
  }

  console.log(data);
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
          disabled={currentPage <= 1}
          onClick={() => setCurrentPage((oldData) => oldData - 1)}
        >
          Previous page
        </button>
        <span>Page {currentPage}</span>
        <button
          disabled={currentPage >= maxPostPage}
          onClick={() => {
            setCurrentPage((oldData) => oldData + 1);
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
