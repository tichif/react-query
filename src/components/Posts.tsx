import { useQuery } from 'react-query';
import { getPosts } from '../lib/posts';
import { QueryClient, useMutation } from 'react-query';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const SERVER_URL = 'http://localhost:5000';

const Posts = () => {
  const { data, error, isLoading } = useQuery(['posts'], { queryFn: getPosts });
  let toastId: string;

  const queryClient = new QueryClient();
  const { mutate } = useMutation(
    async (postId: string) => {
      return await axios.delete(`${SERVER_URL}/posts/${postId}`);
    },
    {
      onError: (error: any) => {
        toast.error(error?.response?.data?.message, { id: toastId });
      },
      onSuccess: (data) => {
        queryClient.invalidateQueries(['posts']);
        toast.success('Post deleted successfully', { id: toastId });
        console.log(data);
      },
    }
  );

  function deleteHandler(postId: string) {
    if (window.confirm('Are you sure ?')) {
      toastId = toast.loading('Deleting your post', { id: toastId });
      mutate(postId);
    }
  }

  if (isLoading) {
    return <h2>Loading.....</h2>;
  }

  if (error) {
    return <div className='alert alert-danger'>Cannot fetch posts</div>;
  }

  return (
    <div className='my-3'>
      <h1>Posts</h1>
      <div className='mt-3'>
        {data?.map((post) => (
          <div className='card mt-3' key={post.id}>
            <div className='card-header'>
              <h4 className='card-title'>{post.title}</h4>
            </div>
            <div className='card-body'>
              <div className='card-text'>{post.body}</div>
              <button
                className='btn btn-danger mt-3'
                onClick={() => deleteHandler(post.id.toString())}
              >
                Delete Post
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Posts;
