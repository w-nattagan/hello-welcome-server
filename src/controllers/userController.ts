import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import * as userService from '../services/userService';
import errorHandler from '../middlewares/errorHandlerMiddleware';

// Create a new user
export async function createUser(req: Request, res: Response) {

  // Validate request body using express-validator
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const user = await userService.createUser(req.body);
    return res.json(user);
  } catch (error) {
    console.error(error);
    return errorHandler(error, req, res, () => { });
  }
}

// Get a user by ID
export async function getUserById(req: Request, res: Response) {
  const userId = parseInt(req.params.id, 10);
  try {
    const user = await userService.getUserById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    return res.json(user);
  } catch (error) {
    console.error(error);
    return errorHandler(error, req, res, () => { });
  }
}

// Update a user by ID
export async function updateUser(req: Request, res: Response) {
  const userId = parseInt(req.params.id, 10);
  const { name, username, email, phone, website, address, company } = req.body;

  try {
    const updatedUser = await userService.updateUser(
      userId,
      { name, username, email, phone, website },
      address,
      company
    );

    return res.json(updatedUser);
  } catch (error) {
    console.error(error);
    return errorHandler(error, req, res, () => { });
  }
}

// Patch a user by ID
export async function patchUser(req: Request, res: Response) {
  const userId = parseInt(req.params.id, 10);
  const patchData = req.body;

  try {
    const patchedUser = await userService.patchUser(userId, patchData);
    if (!patchedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    return res.json(patchedUser);
  } catch (error) {
    console.error(error);
    return errorHandler(error, req, res, () => { });
  }
}

// Delete a user by ID
export async function deleteUser(req: Request, res: Response) {
  const userId = parseInt(req.params.id, 10);
  try {
    await userService.deleteUser(userId);
    return res.status(204).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error(error);
    return errorHandler(error, req, res, () => { });
  }
}

// Get all users
export async function getAllUsers(req: Request, res: Response) {
  try {
    const users = await userService.getAllUsers();
    return res.json(users);
  } catch (error) {
    console.error(error);
    return errorHandler(error, req, res, () => { });
  }
}

// Get users by email
export async function getUsersByKeyword(req: Request, res: Response) {
  try {
    const keyword = req.query.keyword as string;

    if (!keyword) {
      return res.status(400).json({ error: 'Keyword is required' });
    }

    const users = await userService.getUsersByKeyword(keyword);
    return res.json(users);
  } catch (error) {
    console.error(error);
    return errorHandler(error, req, res, () => { });
  }
}