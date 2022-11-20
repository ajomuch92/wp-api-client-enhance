import WPApi from "./Models/WPApi";

const wpApi: WPApi = new WPApi('http://localhost/wordpress-blog', '/wp-json/wp/v2');

(async () => {
  const loggedUser = await wpApi.users.login({
    username: 'ajomuch92',
    password: 'AlfaJulietMike92'
  }, 'wp-json/jwt-auth/v1/token');
  const token = loggedUser.token;
  console.log(token);
  const result = await wpApi.posts.fetch().setHeaders({'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json'}).request();
  console.log(result);
})()