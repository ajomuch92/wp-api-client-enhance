import * as fs from 'fs';

import WPApi from './index';

/**
 * Complete example demonstrating all features of wp-api-client-enhance
 */
async function main() {
  // Initialize the API client
  const wpApi = new WPApi('https://your-wordpress-site.com', '/wp-json/wp/v2');

  console.log('=== WP API Client Enhanced - Examples ===\n');

  try {
    // ============================================
    // 1. READING DATA
    // ============================================
    console.log('--- 1. Reading Data ---');
    
    // Fetch all posts with pagination
    const posts = await wpApi.posts
      .fetch()
      .setPerPage(5)
      .setPage(1)
      .request();
    console.log(`Fetched ${Array.isArray(posts) ? posts.length : 1} posts`);

    // Fetch posts with filters
    const filteredPosts = await wpApi.posts
      .fetch()
      .setPerPage(10)
      .setOrderby('date')
      .setOrder('desc')
      .setStatus('publish')
      .setCategories([1, 2])
      .request();
    console.log(`Fetched ${Array.isArray(filteredPosts) ? filteredPosts.length : 1} filtered posts`);

    // Fetch posts with embedded data (author, featured media, etc.)
    const postsWithEmbeds = await wpApi.posts
      .fetch()
      .setEmbed(true)
      .setPerPage(3)
      .request();
    console.log(`Fetched ${Array.isArray(postsWithEmbeds) ? postsWithEmbeds.length : 1} posts with embedded data`);

    // Find a specific post
    const singlePost = await wpApi.posts.find(1).request();
    if (singlePost) {
      console.log(`Found post: ${singlePost.id}`);
    }

    // Fetch pages
    const pages = await wpApi.pages.fetch().setPerPage(5).request();
    console.log(`Fetched ${Array.isArray(pages) ? pages.length : 1} pages`);

    // Fetch categories
    const categories = await wpApi.categories.fetch().request();
    console.log(`Fetched ${Array.isArray(categories) ? categories.length : 1} categories`);

    // Fetch tags
    const tags = await wpApi.tags.fetch().request();
    console.log(`Fetched ${Array.isArray(tags) ? tags.length : 1} tags`);

    // Fetch users
    const users = await wpApi.users.fetch().request();
    console.log(`Fetched ${Array.isArray(users) ? users.length : 1} users`);

    // Fetch media
    const media = await wpApi.media.fetch().setPerPage(10).request();
    console.log(`Fetched ${Array.isArray(media) ? media.length : 1} media items`);

    // ============================================
    // 2. CREATING DATA
    // ============================================
    console.log('\n--- 2. Creating Data ---');

    // Create a new post
    const newPost = await wpApi.posts.create({
      title: 'My New Post via API',
      content: 'This is the content of my new post created via the API.',
      status: 'draft',
      categories: ['1', '2'],
      tags: ['1', '2']
    }).request();
    console.log(`Created new post with ID: ${newPost.id}`);

    // Create a new page
    const newPage = await wpApi.pages.create({
      title: 'About Us',
      content: 'Welcome to our company website.',
      status: 'publish',
      parent: 0
    }).request();
    console.log(`Created new page with ID: ${newPage.id}`);

    // Create a new category
    const newCategory = await wpApi.categories.create({
      name: 'Technology',
      description: 'Posts about technology and innovation',
      slug: 'technology'
    }).request();
    console.log(`Created new category with ID: ${newCategory.id}`);

    // Create a new tag
    const newTag = await wpApi.tags.create({
      name: 'JavaScript',
      description: 'JavaScript tutorials and tips',
      slug: 'javascript'
    }).request();
    console.log(`Created new tag with ID: ${newTag.id}`);

    // Create a new comment
    const newComment = await wpApi.comments.create({
      post: newPost.id,
      content: 'Great post! Thanks for sharing.',
      author_name: 'John Doe',
      author_email: 'john@example.com'
    }).request();
    console.log(`Created new comment with ID: ${newComment.id}`);

    // ============================================
    // 3. UPDATING DATA
    // ============================================
    console.log('\n--- 3. Updating Data ---');

    // Update a post
    const updatedPost = await wpApi.posts.find(newPost.id!).update({
      title: 'Updated Post Title',
      status: 'publish'
    }).request();
    if (updatedPost) {
      console.log(`Updated post ${updatedPost.id} - new title: ${updatedPost.title}`);
    }

    // Update a page
    const updatedPage = await wpApi.pages.find(newPage.id!).update({
      content: 'This is the updated content for our About Us page.'
    }).request();
    if (updatedPage) {
      console.log(`Updated page ${updatedPage.id}`);
    }

    // Update site settings
    const updatedSettings = await wpApi.settings.update({
      title: 'My Awesome WordPress Site',
      description: 'Just another amazing WordPress site'
    }).request();
    console.log(`Updated site settings - Title: ${updatedSettings.title}`);

    // ============================================
    // 4. FILE UPLOAD
    // ============================================
    console.log('\n--- 4. File Upload ---');

    // Example 1: Upload from buffer (if file exists)
    try {
      const imageBuffer = fs.readFileSync('./test-image.jpg');
      const uploadedMedia1 = await wpApi.media
        .upload(imageBuffer, 'test-image.jpg', 'image/jpeg')
        .setTitle('Test Image')
        .setAltText('A test image uploaded via API')
        .setCaption('This is a caption')
        .setDescription('Detailed description of the image')
        .request();
      console.log(`Uploaded media from buffer with ID: ${uploadedMedia1.id}`);
    } catch (e) {
      console.log('Skipping buffer upload - test-image.jpg not found');
    }

    // Example 2: Upload from file path (if file exists)
    try {
      const uploadedMedia2 = await wpApi.media
        .upload('./another-image.jpg', 'another-image.jpg')
        .setTitle('Another Image')
        .setPost(newPost.id!)
        .request();
      console.log(`Uploaded media from file path with ID: ${uploadedMedia2.id}`);
    } catch (e) {
      console.log('Skipping file upload - another-image.jpg not found');
    }

    // Example 3: Upload from URL
    try {
      const uploadedMedia3 = await wpApi.media
        .upload('https://via.placeholder.com/150', 'remote-image.jpg')
        .setTitle('Remote Image')
        .setAltText('Downloaded from remote URL')
        .request();
      console.log(`Uploaded media from URL with ID: ${uploadedMedia3.id}`);
    } catch (e) {
      console.log('Skipping URL upload - network error or authentication required');
    }

    // ============================================
    // 5. AUTHENTICATION
    // ============================================
    console.log('\n--- 5. Authentication ---');

    try {
      // Login with JWT (requires JWT plugin)
      const loggedUser = await wpApi.users.login(
        { 
          username: 'admin', 
          password: 'password' 
        },
        'jwt-auth/v1/token'
      );
      console.log(`Logged in as: ${loggedUser.user_email}`);

      // Use the token for authenticated requests
      const authenticatedPost = await wpApi.posts
        .fetch()
        .addHeader('Authorization', `Bearer ${loggedUser.token}`)
        .setPerPage(5)
        .request();
      console.log(`Fetched ${Array.isArray(authenticatedPost) ? authenticatedPost.length : 1} posts with authentication`);
    } catch (e) {
      console.log('Skipping authentication - JWT plugin not configured or invalid credentials');
    }

    // ============================================
    // 6. ADVANCED QUERIES
    // ============================================
    console.log('\n--- 6. Advanced Queries ---');

    // Complex post query
    const complexQuery = await wpApi.posts
      .fetch()
      .setPerPage(20)
      .setPage(1)
      .setCategories([1, 2])
      .setTags([3, 4])
      .setStatus('publish')
      .setOrderby('date')
      .setOrder('desc')
      .setSearch('wordpress')
      .setAuthor(1)
      .setEmbed(true)
      .request();
    console.log(`Complex query returned ${Array.isArray(complexQuery) ? complexQuery.length : 1} posts`);

    // Search across all content types
    const searchResults = await wpApi.search
      .fetch()
      .setSearch('wordpress')
      .setPerPage(10)
      .request();
    console.log(`Search found ${Array.isArray(searchResults) ? searchResults.length : 1} results`);

    // ============================================
    // 7. SPECIAL COLLECTIONS
    // ============================================
    console.log('\n--- 7. Special Collections ---');

    // Get post types
    const postTypes = await wpApi.postTypes.fetch().request();
    const postTypesCount = Array.isArray(postTypes) ? postTypes.length : Object.keys(postTypes).length;
    console.log(`Found ${postTypesCount} post types`);

    // Get a specific post type
    const postType = await wpApi.postTypes.find('post').request();
    if (postType) {
      console.log(`Post type: ${postType.name}`);
    }

    // Get taxonomies
    const taxonomies = await wpApi.taxonomies.fetch().request();
    const taxonomiesCount = Array.isArray(taxonomies) ? taxonomies.length : Object.keys(taxonomies).length;
    console.log(`Found ${taxonomiesCount} taxonomies`);

    // Get a specific taxonomy
    const taxonomy = await wpApi.taxonomies.find('category').request();
    if (taxonomy) {
      console.log(`Taxonomy: ${taxonomy.name}`);
    }

    // Get site settings
    const settings = await wpApi.settings.fetch().request();
    if (!Array.isArray(settings)) {
      console.log(`Site title: ${settings.title}`);
    }

    // ============================================
    // 8. DELETING DATA (Commented out for safety)
    // ============================================
    console.log('\n--- 8. Deleting Data ---');

    // UNCOMMENT THESE TO ACTUALLY DELETE
    // Delete a post
    // await wpApi.posts.find(newPost.id!).delete().request();
    // console.log(`Deleted post with ID: ${newPost.id}`);

    // Delete a page
    // await wpApi.pages.find(newPage.id!).delete().request();
    // console.log(`Deleted page with ID: ${newPage.id}`);

    // Delete a comment
    // await wpApi.comments.find(newComment.id!).delete().request();
    // console.log(`Deleted comment with ID: ${newComment.id}`);

    console.log('\n=== All examples completed successfully! ===');

  } catch (error) {
    console.error('Error:', error);
    if (error instanceof Error) {
      console.error('Message:', error.message);
    }
  }
}

// Run the examples
main();