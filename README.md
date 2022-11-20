# wp api client enhance
An alternative for wp api made with TS. This is not a fork from [WP api](https://github.com/wp-api/node-wpapi) for Node. This is a new implemetation using Typescript, but inspired on it. Project currently on develop, please don't use in production.

## Features
- All the project is build with Typescript
- Methods to make login and set custom headers
- Inpired in Fluent API chain
- Method to access to most importants endpoints
- You can create a CRUD using this client

## Installation

Install the package

```sh
npm install wp-api-client-enhance
```

Using it creating a new instance for the client

```js
import WPApi from 'wp-api-client-enhance';

const wpApi = new WPApi(baseUrl, suffix);
```

## Examples
*Consume the API*
```js
const pages = await wpApi.pages.fetch().request();
const page = await wpApi.pages.find(1).request(); // to find a record
await wpApi.pages.find(1).update(newDataUpdated).request(); // to update a record
await wpApi.pages.find(1).delete(); // to delete a record
```
Always finish your instruction calling the **request** method.

*Make a login*
```js
const loggedUsers = await wpApi.users.login({ username, password}, urlToMakeAuthRequest);
```


### Available Collections
- posts
- pages
- categories
- comments
- media
- postTypes*
- search*
- settings*
- tags
- taxonomies*
- users

*Note\**: Only fetch method is available for these collections

Find a full example [here](https://github.com/ajomuch92/wp-api-client-enhance/blob/main/src/example.ts)

## To Do
- Upload documents
- Testing

## Development

Want to contribute? Great!. Open a [new PR here](https://github.com/ajomuch92/wp-api-client-enhance/pulls) or a [new issue here](https://github.com/ajomuch92/wp-api-client-enhance/issues)
