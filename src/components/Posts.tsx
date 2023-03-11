import { useQuery } from 'react-query';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';

import { getPosts } from '../lib/posts';

const Posts = () => {
  const { data, error, isLoading } = useQuery(['posts'], { queryFn: getPosts });

  if (isLoading) {
    return toast.loading('Loading.....');
  }

  if (error) {
    return toast.error('Cannot fetch post');
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
              <Link to={`/posts/${post.id}`} className='btn btn-success mt-3'>
                View Post
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Posts;
