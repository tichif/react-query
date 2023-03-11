import { FormEvent, useState } from 'react';

const Form = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  function submitHandler(e: FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    console.log(body);
    console.log(title);
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
