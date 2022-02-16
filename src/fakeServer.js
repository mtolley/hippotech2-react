export default class FakeServer {
  constructor() {
    this.authToken = null;
    this.username = null;

    console.log('FakeServer constructor');
  }

  isLoggedIn() { return !!this.authToken; }

  async loginAsync(username, password) {
    console.log('loginAsync');
    if (username === "mtolley@synopsys.com" && password === "password") {
      this.authToken = "12345";
      this.username = "mtolley@synopsys.com";
      return Promise.resolve(true);
    }
    return Promise.resolve(false);
  }

  async logoutAsync() {
    console.log('logoutAsync');
    this.authToken = null;
    this.username = null;
    return Promise.resolve();
  }
}