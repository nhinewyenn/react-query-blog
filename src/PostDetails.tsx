/** @format */

import { useQuery, useMutation } from '@tanstack/react-query';

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

  const deleteMutation = useMutation((postID: number) => deletePost(postID));
  const updateMutation = useMutation((postID: number) => updatePost(postID));

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
      <h3 style={{ color: 'yellow' }}>{props.body}</h3>
      <button onClick={() => deleteMutation.mutate(props.postId)}>
        Delete
      </button>
      {deleteMutation.isError && (
        <p style={{ color: 'red' }}>Error deleting the post</p>
      )}
      {deleteMutation.isLoading && (
        <p style={{ color: 'purple' }}>Deleting post...</p>
      )}
      {deleteMutation.isSuccess && (
        <p style={{ color: 'green' }}>Post success but not deleted</p>
      )}
      <button onClick={() => updateMutation.mutate(props.postId)}>
        Update title
      </button>
      {updateMutation.isError && (
        <p style={{ color: 'red' }}>Error updating the post</p>
      )}
      {deleteMutation.isLoading && (
        <p style={{ color: 'purple' }}>Updating post...</p>
      )}
      {updateMutation.isSuccess && (
        <p style={{ color: 'green' }}>Update success</p>
      )}
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
