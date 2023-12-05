import { PrismaClient, Post as PostType } from '@prisma/client';
import { PostInput } from '../models/PostInput';
import formatPost from '../utils/formatPost';

const prisma = new PrismaClient();

async function checkPostExistence(title: string): Promise<boolean> {
  const existingPost = await prisma.post.findFirst({
    where: {
      OR: [
        { title },
      ],
    },
  });

  // Returns true if the post exists, false otherwise
  return !!existingPost;
}

// Create a new post
async function createPost(data: PostInput): Promise<PostType> {
  const postExists = await checkPostExistence(data.title);

  if (postExists) {
    throw new Error('Title already exists');
  }

  const post = await prisma.post.create({
    data: {
      title: data.title,
      body: data.body,
      userId: data.userId
    }
  });
  return formatPost(post as PostType);
}

// Get a post by ID
async function getPostById(id: number): Promise<PostType | null> {
  const post = await prisma.post.findUnique({ where: { id } });
  return post ? formatPost(post as PostType) : null;
}

// Update a post by ID
async function updatePost(id: number, data: Partial<PostType>): Promise<PostType | null> {
  return prisma.post.update({ where: { id }, data });
}

// Patch a post by ID
async function patchPost(id: number, data: Partial<PostType>): Promise<PostType | null> {
  return prisma.post.update({ where: { id }, data });
}

// Delete a post by ID
async function deletePost(id: number): Promise<PostType | null> {
  return prisma.post.delete({ where: { id } });
}

// Get all posts
async function getAllPosts(): Promise<PostType[]> {
  const posts = await prisma.post.findMany();
  return posts.map(p => formatPost(p as PostType));
}

// Filter
async function getPostsByKeyword(keyword: string): Promise<any[]> {
  const posts = await prisma.post.findMany({
    where: {
      OR: [
        { title: { contains: keyword } },
      ],
    },
  });

  // Format each user and return the array
  return posts.map(p => formatPost(p as PostType));
}

export {
  createPost,
  getPostById,
  updatePost,
  patchPost,
  deletePost,
  getAllPosts,
  getPostsByKeyword,
};
