/** @format */

export type PostProps = {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
};

export type PostsProps = PostProps[];

async function fetchComments(postId: PostProps) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
  );
  return response.json();
}

async function deletePost(postId: PostProps) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/postId/${postId}`,
    { method: 'DELETE' }
  );
  return response.json();
}

async function updatePost(postId: PostProps) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/postId/${postId}`,
    { method: 'PATCH', data: { title: 'REACT QUERY FOREVER!!!!' } }
  );
  return response.json();
}

export function PostDetail(props: PostProps) {
  // replace with useQuery
  const data: PostsProps = [];

  return (
    <>
      <h3 style={{ color: 'blue' }}>{props.body}</h3>
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
