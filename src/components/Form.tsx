import { FormEvent, useState } from 'react';
import { useMutation, QueryClient } from 'react-query';
import { toast } from 'react-hot-toast';
import axios from 'axios';

import { createPost } from '../lib/posts';
const SERVER_URL = 'http://localhost:5000';

const Form = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  let toastPostId: string;
  const queryClient = new QueryClient();

  const { mutate } = useMutation(
    async ({ title, body }: { title: string; body: string }) => {
      return await axios.post(`${SERVER_URL}/posts`, {
        id: new Date().getTime(),
        title,
        body,
      });
    },
    {
      onError: (error: any) => {
        toast.error(error?.response?.data?.message, { id: toastPostId });
        setIsSubmitting(false);
      },
      onSuccess: (data) => {
        toast.success('Post created successfully', { id: toastPostId });
        queryClient.invalidateQueries(['posts']);
        setBody('');
        setTitle('');
        setIsSubmitting(false);
        console.log(data);
      },
    }
  );

  function submitHandler(e: FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    toastPostId = toast.loading('Creating your post', { id: toastPostId });
    mutate({ title, body });
  }

  return (
    <div className='my-3'>
      <h2>Create Post</h2>
      <form onSubmit={submitHandler}>
        <div className='mb-3'>
          <label htmlFor='title' className='form-label'>
            Title
          </label>
          <input
            type='text'
            className='form-control'
            id='title'
            autoComplete='false'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='body' className='form-label'>
            Body
          </label>
          <textarea
            id='body'
            className='form-control'
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
        </div>
        <button
          type='submit'
          className='btn btn-primary'
          disabled={isSubmitting === true || !title || !body}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Form;
