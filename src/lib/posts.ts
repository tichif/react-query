import axios from 'axios';

import { Post } from '../types/Post';

const SERVER_URL = 'http://localhost:5000';

export async function getPosts(): Promise<Post[]> {
  const { data } = await axios.get(`${SERVER_URL}/posts`);
  return data;
}

export async function createPost(data: { title: string; body: string }) {
  return await axios.post(SERVER_URL, data);
}
