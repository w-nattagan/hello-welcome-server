import { Request, Response } from 'express';
import * as postService from '../services/postService';
import errorHandler from '../middlewares/errorHandlerMiddleware';

// Create a new post
export async function createPost(req: Request, res: Response) {
  try {
    const newPost = await postService.createPost(req.body);
    return res.json(newPost);
  } catch (error) {
    console.error(error);
    return errorHandler(error, req, res, () => { });
  }
}

// Get a post by ID
export async function getPostById(req: Request, res: Response) {
  const postId = parseInt(req.params.id, 10);
  try {
    const post = await postService.getPostById(postId);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    return res.json(post);
  } catch (error) {
    console.error(error);
    return errorHandler(error, req, res, () => { });
  }
}

// Update a post by ID
export async function updatePost(req: Request, res: Response) {
  const postId = parseInt(req.params.id, 10);
  const updatedPostFields = req.body;

  try {
    const updatedPost = await postService.updatePost(postId, updatedPostFields);
    if (!updatedPost) {
      return res.status(404).json({ error: 'Post not found' });
    }
    return res.json(updatedPost);
  } catch (error) {
    console.error(error);
    return errorHandler(error, req, res, () => { });
  }
}

// Patch a post by ID
export async function patchPost(req: Request, res: Response) {
  const postId = parseInt(req.params.id, 10);
  const patchData = req.body;

  try {
    const patchedPost = await postService.patchPost(postId, patchData);
    if (!patchedPost) {
      return res.status(404).json({ error: 'Post not found' });
    }
    return res.json(patchedPost);
  } catch (error) {
    console.error(error);
    return errorHandler(error, req, res, () => { });
  }
}

// Delete a post by ID
export async function deletePost(req: Request, res: Response) {
  const postId = parseInt(req.params.id, 10);
  try {
    const deletedPost = await postService.deletePost(postId);
    if (!deletedPost) {
      return res.status(404).json({ error: 'Post not found' });
    }
    return res.json(deletedPost);
  } catch (error) {
    console.error(error);
    return errorHandler(error, req, res, () => { });
  }
}

// Get all posts
export async function getAllPosts(req: Request, res: Response) {
  try {
    const posts = await postService.getAllPosts();
    return res.json(posts);
  } catch (error) {
    console.error(error);
    return errorHandler(error, req, res, () => { });
  }
}

// Get posts by contains title
export async function getPostsByKeyword(req: Request, res: Response) {
  try {
    const keyword = req.query.keyword as string;

    if (!keyword) {
      return res.status(400).json({ error: 'Keyword is required' });
    }

    const posts = await postService.getPostsByKeyword(keyword);
    return res.json(posts);
  } catch (error) {
    console.error(error);
    return errorHandler(error, req, res, () => { });
  }
}
