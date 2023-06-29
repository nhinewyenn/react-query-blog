/** @format */

export type Post = {
  postId: number;
  id: number;
  name: string;
  email?: string;
  body: string;
};

export type PostsProps = Post[];

async function fetchComments(post: Post) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/comments?postId=${post.body}`
  );
  return response.json();
}

async function deletePost(post: Post) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/postId/${post.id}`,
    { method: 'DELETE' }
  );
  return response.json();
}

async function updatePost(post: Post) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${post.id}`,
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
  // replace with useQuery
  const data: PostsProps = [];

  return (
    <>
      <h3 style={{ color: 'wheat' }}>{props.body}</h3>
      <button>Delete</button> <button>Update title</button>
      <p>{props.name}</p>
      <h4>Comments</h4>
      {data.map((comment) => (
        <li key={comment.id}>
          {comment.email}: {comment.body}
        </li>
      ))}
    </>
  );
}
