import express from 'express';
import * as userController from '../controllers/userController';
import { validateUser } from '../middlewares/validationMiddleware';

const router = express.Router();
/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User operations
 */

/**
 * @swagger
 * /api/users/search:
 *   get:
 *     summary: Search users by keyword
 *     tags: [Users]
 *     parameters:
 *       - in: query
 *         name: keyword
 *         description: The keyword to search for in user's name, email, or username
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Users found successfully
 *         content:
 *           application/json:
 *             example:
 *               - id: 1
 *                 name: John Doe
 *                 email: john@example.com
 *       400:
 *         description: Bad request. Keyword is required.
 *       500:
 *         description: Internal Server Error
 */
router.get('/users/search', userController.getUsersByKeyword);

// Create a new user
/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               address:
 *                 type: object
 *                 properties:
 *                   street:
 *                     type: string
 *                   suite:
 *                     type: string
 *                   city:
 *                     type: string
 *                   zipcode:
 *                     type: string
 *                   geo:
 *                     type: object
 *                     properties:
 *                       lat:
 *                         type: string
 *                       lng:
 *                         type: string
 *               phone:
 *                 type: string
 *               website:
 *                 type: string
 *               company:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                   catchPhrase:
 *                     type: string
 *                   bs:
 *                     type: string
 *             required:
 *               - name
 *               - username
 *               - email
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             example:
 *               id: 1
 *               name: John Doe
 *               username: John
 *               email: john@mail.com
 *               address:
 *                 street: nowhere
 *                 suite: nowhere 555
 *                 city: nowhere
 *                 zipcode: 12312
 *                 geo:
 *                   lat: "-37.3159"
 *                   lng: "81.1496"
 *               phone: 1220-2345
 *               website: john.org
 *               company:
 *                 name: Nowhere Cop
 *                 catchPhrase: Multi-layered client-server neural-net
 *                 bs: harness real-time e-markets
 */
router.post('/users', validateUser, userController.createUser);

// Get a user by ID
/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Get a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: User ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               id: 1
 *               name: John Doe
 *               email: john@example.com
 */
router.get('/users/:id', userController.getUserById);

// Update a user by ID
/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Update a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: User ID
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             name: Updated John Doe
 *             email: updatedjohn@example.com
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             example:
 *               id: 1
 *               name: Updated John Doe
 *               email: updatedjohn@example.com
 */
router.put('/users/:id', userController.updateUser);

// Patch a user by ID
/**
 * @swagger
 * /api/users/{id}:
 *   patch:
 *     summary: Patch a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: User ID
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             name: Patched John Doe
 *     responses:
 *       200:
 *         description: User patched successfully
 *         content:
 *           application/json:
 *             example:
 *               id: 1
 *               name: Patched John Doe
 *               email: updatedjohn@example.com
 */
router.patch('/users/:id', userController.patchUser);

// Delete a user by ID
/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: User ID
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: User deleted successfully
 */
router.delete('/users/:id', userController.deleteUser);

// Get all users
/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               - id: 1
 *                 name: John Doe
 *                 email: john@example.com
 */
router.get('/users', userController.getAllUsers);

export default router;