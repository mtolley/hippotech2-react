
import axios from 'axios';
import { logError } from './utils';

export default class AppServer {
  constructor() {
    this.authToken = null;
    this.username = null;
  }

  isLoggedIn() { return !!this.authToken; }

  async loginAsync(username, password) {  
    const result = await axios.post('/api/authenticate', { username, password});
    console.log(result.data);

    if (result.status === 200) {
      this.authToken = result.data.token;
      this.username = username;
      return true;
    }
    return false;
  }

  async logoutAsync() {
    console.log('logoutAsync');
    this.authToken = null;
    this.username = null;
    return Promise.resolve();
  }

  async getMyMortgagesAsync() {
    if (!this.username) {
      logError('Calling getMyMortgagesAsync while not logged in.');
      return Promise.resolve([]);
    }

    const url = '/api/approval';
    const options = {
      headers: {
        Authorization: this.authToken,
      }
    }
    const result = await axios.get(url, options);
    return Promise.resolve(result.data);
  }

  async requestApproval(propertyDetails, cardDetails) {
    console.log(propertyDetails);
    const url = '/api/approval';
    const options = {
      headers: {
        Authorization: this.authToken,
      }
    }
    await axios.post(url, propertyDetails, options);
  }

  async submitCommentAsync(postId, text) {
    const url = '/api/blog/' + postId + '/comments';
    const options = {
      headers: {
        Authorization: this.authToken,
        'Content-Type': 'text/plain'
      }
    }
    await axios.post(url, text, options);
  }

  async subscribeToBlog(email, partnersIncluded) {
    const url = '/api/blog/subscribe';
    const data = {
      email,
      partnersIncluded
    };
    try {
      await axios.post(url, data);   
    } catch (e) {
      logError('suscribeToBlog() POST failed');
      logError(e);
    }
    
  }

  async getBlogPostsAsync() {
    let blogs = await axios.get('/api/blog');
    return Promise.resolve(Array.from(blogs.data));
  }

  async getBlogPostAsync(id) {
    let blogs = await axios.get('/api/blog');
    let extractedBlog = null;
    blogs.data.forEach(blog => {
      if (blog.id == id) {
        extractedBlog = blog;
      }
    });
    return extractedBlog;
  }
}