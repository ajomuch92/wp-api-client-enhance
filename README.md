# wp-api-client-enhance

An alternative for wp-api made with TypeScript. This is not a fork from [WP api](https://github.com/wp-api/node-wpapi) for Node. This is a new implementation using TypeScript, but inspired by it.

[![npm version](https://img.shields.io/npm/v/wp-api-client-enhance.svg)](https://www.npmjs.com/package/wp-api-client-enhance)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## ✨ Features

* 🎯 **Full TypeScript support** - Complete type definitions for all endpoints
* 🔐 **Authentication** - Methods for login and custom headers
* ⛓️ **Fluent API** - Chainable methods for clean, readable code
* 📦 **Complete CRUD** - Create, Read, Update, and Delete operations
* 📤 **File Upload** - Upload media files with metadata support
* 🎨 **Clean API** - Intuitive and consistent interface
* 🔍 **Full WordPress REST API coverage** - Access to all major endpoints

## 📦 Installation

```bash
npm install wp-api-client-enhance
```

## 🚀 Quick Start

```typescript
import WPApi from 'wp-api-client-enhance';

// Initialize the client
const wpApi = new WPApi('https://your-wordpress-site.com', '/wp-json/wp/v2');
```

## 📖 Usage Examples

### Reading Data

#### Fetch all posts
```typescript
const posts = await wpApi.posts.fetch().request();
```

#### Fetch with filters
```typescript
const posts = await wpApi.posts
  .fetch()
  .setPerPage(10)
  .setPage(1)
  .setOrderby('date')
  .setOrder('desc')
  .setSearch('wordpress')
  .request();
```

#### Find a specific record
```typescript
const post = await wpApi.posts.find(1).request();
const page = await wpApi.pages.find(42).request();
const user = await wpApi.users.find(5).request();
```

#### Fetch with embedded data
```typescript
// Include embedded resources (author, featured media, etc.)
const posts = await wpApi.posts
  .fetch()
  .setEmbed(true)
  .request();
```

### Creating Data

#### Create a new post
```typescript
const newPost = await wpApi.posts.create({
  title: 'My New Post',
  content: 'This is the content of my post',
  status: 'publish'
}).request();
```

#### Create a new page
```typescript
const newPage = await wpApi.pages.create({
  title: 'About Us',
  content: 'Welcome to our company',
  status: 'publish',
  parent: 0
}).request();
```

#### Create a category
```typescript
const category = await wpApi.categories.create({
  name: 'Technology',
  description: 'Tech-related posts'
}).request();
```

#### Create a tag
```typescript
const tag = await wpApi.tags.create({
  name: 'JavaScript',
  description: 'JavaScript tutorials and tips'
}).request();
```

#### Create a comment
```typescript
const comment = await wpApi.comments.create({
  post: 1,
  content: 'Great post!',
  author_name: 'John Doe',
  author_email: 'john@example.com'
}).request();
```

### Updating Data

```typescript
// Update a post
await wpApi.posts.find(1).update({
  title: 'Updated Title',
  content: 'Updated content'
}).request();

// Update a page
await wpApi.pages.find(42).update({
  status: 'draft'
}).request();

// Update site settings
await wpApi.settings.update({
  title: 'My Awesome Site',
  description: 'Just another WordPress site'
}).request();
```

### Deleting Data

```typescript
await wpApi.posts.find(1).delete().request();
await wpApi.pages.find(42).delete().request();
await wpApi.comments.find(10).delete().request();
```

### 📤 File Upload

The package now supports uploading files to WordPress Media Library!

#### Upload from Buffer
```typescript
import * as fs from 'fs';

const fileBuffer = fs.readFileSync('./image.jpg');
const media = await wpApi.media
  .upload(fileBuffer, 'image.jpg', 'image/jpeg')
  .setTitle('My Image')
  .setAltText('Description of my image')
  .setCaption('Image caption')
  .setDescription('Detailed description')
  .request();
```

#### Upload from File Path
```typescript
const media = await wpApi.media
  .upload('./path/to/image.jpg', 'image.jpg')
  .setTitle('My Image')
  .setPost(123) // Associate with a post
  .request();
```

#### Upload from URL
```typescript
const media = await wpApi.media
  .upload('https://example.com/image.jpg', 'image.jpg')
  .setTitle('Remote Image')
  .setAltText('Downloaded from remote URL')
  .request();
```

#### Upload with Authentication
```typescript
const media = await wpApi.media
  .upload(fileBuffer, 'secure-image.jpg')
  .addHeader('Authorization', 'Bearer YOUR_JWT_TOKEN')
  .setTitle('Secure Upload')
  .request();
```

### 🔐 Authentication

#### Login (JWT)
```typescript
const loggedUser = await wpApi.users.login(
  { username: 'admin', password: 'password' },
  'jwt-auth/v1/token'
);

// Use the token for authenticated requests
const post = await wpApi.posts
  .find(1)
  .setHeaders({
    'Authorization': `Bearer ${loggedUser.token}`
  })
  .request();
```

#### Custom Headers
```typescript
// Set multiple headers
const posts = await wpApi.posts
  .fetch()
  .setHeaders({
    'Authorization': 'Bearer YOUR_TOKEN',
    'X-Custom-Header': 'value'
  })
  .request();

// Add a single header
const posts = await wpApi.posts
  .fetch()
  .addHeader('Authorization', 'Bearer YOUR_TOKEN')
  .request();
```

## 📚 Available Collections

### Full CRUD Support (Create, Read, Update, Delete)
* ✅ **posts** - WordPress posts
* ✅ **pages** - WordPress pages
* ✅ **categories** - Post categories
* ✅ **tags** - Post tags
* ✅ **comments** - Comments
* ✅ **media** - Media files (with upload support)
* ✅ **users** - Users

### Read-Only or Limited Operations
* 🔍 **postTypes** - Post types (fetch, find)
* 🔍 **taxonomies** - Taxonomies (fetch, find)
* 🔍 **search** - Search across content (fetch only)
* ⚙️ **settings** - Site settings (fetch, update)

## 🎯 Advanced Usage

### Filtering Posts by Category
```typescript
const posts = await wpApi.posts
  .fetch()
  .setCategories([1, 2, 3])
  .request();
```

### Filtering Posts by Author
```typescript
const posts = await wpApi.posts
  .fetch()
  .setAuthor(5)
  .request();
```

### Date Range Filtering
```typescript
const posts = await wpApi.posts
  .fetch()
  .setAfter('2024-01-01')
  .setBefore('2024-12-31')
  .request();
```

### Complex Queries
```typescript
const posts = await wpApi.posts
  .fetch()
  .setPerPage(20)
  .setPage(1)
  .setCategories([1, 2])
  .setTags([5, 6])
  .setStatus('publish')
  .setOrderby('date')
  .setOrder('desc')
  .setSearch('tutorial')
  .setEmbed(true)
  .request();
```

## 🔧 API Reference

### Query Methods

All collections that support `fetch()` have access to these methods:

| Method | Description | Example |
|--------|-------------|---------|
| `setPage(page)` | Set page number | `.setPage(2)` |
| `setPerPage(perPage)` | Items per page | `.setPerPage(20)` |
| `setSearch(search)` | Search query | `.setSearch('wordpress')` |
| `setAfter(date)` | Posts after date | `.setAfter('2024-01-01')` |
| `setBefore(date)` | Posts before date | `.setBefore('2024-12-31')` |
| `setAuthor(id)` | Filter by author | `.setAuthor(1)` |
| `setAuthorExclude(ids)` | Exclude authors | `.setAuthorExclude([2, 3])` |
| `setCategories(ids)` | Filter by categories | `.setCategories([1, 2])` |
| `setCategoriesExclude(ids)` | Exclude categories | `.setCategoriesExclude([3])` |
| `setTags(ids)` | Filter by tags | `.setTags([4, 5])` |
| `setTagsExclude(ids)` | Exclude tags | `.setTagsExclude([6])` |
| `setExclude(ids)` | Exclude items | `.setExclude([10, 20])` |
| `setInclude(ids)` | Include specific items | `.setInclude([1, 2, 3])` |
| `setOffset(offset)` | Offset results | `.setOffset(10)` |
| `setOrder(order)` | Sort order | `.setOrder('asc')` |
| `setOrderby(field)` | Sort by field | `.setOrderby('title')` |
| `setStatus(status)` | Post status | `.setStatus('publish')` |
| `setSticky(value)` | Sticky posts only | `.setSticky(true)` |
| `setEmbed(value)` | Include embedded data | `.setEmbed(true)` |
| `setHeaders(headers)` | Set custom headers | `.setHeaders({...})` |
| `addHeader(key, value)` | Add single header | `.addHeader('Auth', 'token')` |

### Upload Methods

When using `wpApi.media.upload()`:

| Method | Description | Example |
|--------|-------------|---------|
| `setTitle(title)` | Set media title | `.setTitle('My Image')` |
| `setAltText(alt)` | Set alt text | `.setAltText('Description')` |
| `setCaption(caption)` | Set caption | `.setCaption('Photo caption')` |
| `setDescription(desc)` | Set description | `.setDescription('Detailed info')` |
| `setPost(postId)` | Associate with post | `.setPost(123)` |
| `setAuthor(authorId)` | Set author | `.setAuthor(1)` |
| `setHeaders(headers)` | Custom headers | `.setHeaders({...})` |
| `addHeader(key, value)` | Add single header | `.addHeader('Auth', 'token')` |

## 🤝 Contributing

Want to contribute? Great! 
Create an issue or submit a pull request with your improvements

### Development Setup

```bash
# Clone the repository
git clone https://github.com/ajomuch92/wp-api-client-enhance.git
cd wp-api-client-enhance

# Install dependencies
npm install

# Build the project
npm run build

# Run tests
npm test
```

## 📝 To Do

- [ ] Add comprehensive test suite
- [ ] Improve documentation with more examples
- [ ] Add support for custom post types
- [ ] Implement caching mechanism
- [ ] Add retry logic for failed requests
- [ ] Support for batch operations

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**ajomuch92**

* GitHub: [@ajomuch92](https://github.com/ajomuch92)

## 🙏 Acknowledgments

* Inspired by [WP-API/node-wpapi](https://github.com/WP-API/node-wpapi)
* Built with TypeScript
* Powered by the WordPress REST API

## 📞 Support

If you have any questions or run into issues, please [open an issue](https://github.com/ajomuch92/wp-api-client-enhance/issues) on GitHub.

---

**Note:** Always remember to call the `.request()` method at the end of your chain to execute the API call!