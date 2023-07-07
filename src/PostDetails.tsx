/** @format */

import { useQuery } from '@tanstack/react-query';

export type Post = {
  postId: number;
  id: number;
  name: string;
  email?: string;
  body: string;
};

export type PostsProps = Post[];

async function fetchComments(post: number) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/comments?postId=${post}`
  );
  return response.json();
}

async function deletePost(post: number) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/postId/${post}`,
    { method: 'DELETE' }
  );
  return response.json();
}

async function updatePost(post: number) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${post}`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title: 'REACT QUERY FOREVER!!!!' }),
    }
  );
  return response.json();
}

export function PostDetail({ ...props }: Post) {
  const { data, isError, isLoading, error } = useQuery({
    queryKey: ['comments', props.postId],
    queryFn: () => fetchComments(props.postId),
  });

  if (isLoading) { 
    throw new Error('No data available')
    } else if (isError && error) {
    return (
      <>
        <h3>Oops, something went wrong</h3>
        <p>{error.toString()}</p>
      </>
    );
  } else return null

  function handleSubmit(e: Post) {
  throw new Error("Not implemented")
  }

  return (
    <>
      <h3 style={{ color: 'red' }}>{props.body}</h3>
      <button onClick={() => alert('Delete title')>Delete</button> <button onClick={() => alert('Title updated')}>Update title</button>
      <p>{props.name}</p>
      <h4>Comments</h4>
      {data.map((comment: any) => {
        if (!comment) {
          throw new Error('No data returned');
        }

        return (
          <li key={comment.id}>
            {comment.email}: {comment.body}
          </li>
        );
      })}
    </>
  );
}
