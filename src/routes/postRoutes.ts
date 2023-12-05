import express from 'express';
import * as postController from '../controllers/postController';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Posts
 *   description: Post operations
 */

/**
 * @swagger
 * /api/posts/search:
 *   get:
 *     summary: Search posts by keyword
 *     tags: [Posts]
 *     parameters:
 *       - in: query
 *         name: keyword
 *         description: The keyword to search for in post's title
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Posts found successfully
 *         content:
 *           application/json:
 *             example:
 *               - id: 1
 *                 title: First Post
 *                 body: This is the content of the first post.
 *                 userId: 123
 *               - id: 2
 *                 title: Second Post
 *                 body: This is the content of the second post.
 *                 userId: 456
 *       400:
 *         description: Bad request. Keyword is required.
 *       500:
 *         description: Internal Server Error
 */
router.get('/posts/search', postController.getPostsByKeyword);

// Create a new post
/**
 * @swagger
 * /api/posts:
 *   post:
 *     summary: Create a new post
 *     tags: [Posts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the post
 *               body:
 *                 type: string
 *                 description: The content of the post
 *               userId:
 *                 type: integer
 *                 description: The ID of the user associated with the post
 *             required:
 *               - title
 *               - body
 *               - userId
 *     responses:
 *       201:
 *         description: Post created successfully
 *         content:
 *           application/json:
 *             example:
 *               id: 1
 *               title: Sample Post
 *               body: This is the content of the post.
 *               userId: 123
 *       400:
 *         description: Bad request. Title, body, and userId are required.
 *       500:
 *         description: Internal Server Error
 */
router.post('/posts', postController.createPost);

// Get a post by ID
/**
 * @swagger
 * /api/posts/{id}:
 *   get:
 *     summary: Get a post by ID
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: The ID of the post
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Post found successfully
 *         content:
 *           application/json:
 *             example:
 *               id: 1
 *               title: Sample Post
 *               body: This is the content of the post.
 *               userId: 123
 *       404:
 *         description: Post not found
 *       500:
 *         description: Internal Server Error
 */
router.get('/posts/:id', postController.getPostById);

// Update a post by ID
/**
 * @swagger
 * /api/posts/{id}:
 *   put:
 *     summary: Update a post by ID
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: The ID of the post
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The updated title of the post
 *               body:
 *                 type: string
 *                 description: The updated content of the post
 *             required:
 *               - title
 *     responses:
 *       200:
 *         description: Post updated successfully
 *         content:
 *           application/json:
 *             example:
 *               id: 1
 *               title: Updated Post
 *               body: This is the updated content of the post.
 *               userId: 456
 *       404:
 *         description: Post not found
 *       500:
 *         description: Internal Server Error
 */
router.put('/posts/:id', postController.updatePost);

// Patch a post by ID
/**
 * @swagger
 * /api/posts/{id}:
 *   patch:
 *     summary: Patch a post by ID
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: The ID of the post
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The updated title of the post
 *             required:
 *               - title
 *     responses:
 *       200:
 *         description: Post patched successfully
 *         content:
 *           application/json:
 *             example:
 *               id: 1
 *               title: Patched Post
 *               body: This is the patched content of the post.
 *               userId: 789
 *       404:
 *         description: Post not found
 *       500:
 *         description: Internal Server Error
 */
router.patch('/posts/:id', postController.patchPost);

// Delete a post by ID
/**
 * @swagger
 * /api/posts/{id}:
 *   delete:
 *     summary: Delete a post by ID
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: The ID of the post to delete
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Post deleted successfully
 *       404:
 *         description: Post not found
 *       500:
 *         description: Internal Server Error
 */
router.delete('/posts/:id', postController.deletePost);

// Get all posts
/**
 * @swagger
 * /api/posts:
 *   get:
 *     summary: Get all posts
 *     tags: [Posts]
 *     responses:
 *       200:
 *         description: Posts retrieved successfully
 *         content:
 *           application/json:
 *             example:
 *               - id: 1
 *                 title: First Post
 *                 body: This is the content of the first post.
 *                 userId: 123
 *               - id: 2
 *                 title: Second Post
 *                 body: This is the content of the second post.
 *                 userId: 456
 *       500:
 *         description: Internal Server Error
 */
router.get('/posts', postController.getAllPosts);

export default router;
