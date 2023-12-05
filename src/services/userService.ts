import { PrismaClient, User as UserType, Address as AddressType, Company as CompanyType } from '@prisma/client';
import { UserInput } from '../models/UserInput';
import formatUser from '../utils/formatUser';

const prisma = new PrismaClient();

async function checkUserExistence(email: string, username: string): Promise<boolean> {
  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [
        { email },
        { username },
      ],
    },
  });

  // Returns true if the user exists, false otherwise
  return !!existingUser;
}

async function createUser(data: UserInput): Promise<UserType> {
  // Check if the email or username already exists
  const userExists = await checkUserExistence(data.email, data.username);

  if (userExists) {
    throw new Error('Email or username already exists');
  }

  const user = await prisma.user.create({
    data: {
      name: data.name,
      username: data.username,
      email: data.email,
      phone: data.phone,
      website: data.website,
      password: data.password ?? "",
      // Add the entire address data if available
      address: data.address
        ? {
          create: {
            street: data.address.street,
            suite: data.address.suite,
            city: data.address.city,
            zipcode: data.address.zipcode,
            lat: data.address.geo.lat,
            lng: data.address.geo.lng
          },
        }
        : undefined,
      // Add the entire company data if available
      company: data.company
        ? {
          create: {
            name: data.company.name,
            catchPhrase: data.company.catchPhrase,
            bs: data.company.bs,
          },
        }
        : undefined,
    },
    include: {
      address: true,
      company: true,
    },
  });

  return formatUser(user as UserType & { address: AddressType | null; company: CompanyType | null });
}

// Get a user by ID
async function getUserById(id: number): Promise<UserType | null> {
  const user = await prisma.user.findUnique({ where: { id }, include: { address: true, company: true } });

  // If user is found, format and return it; otherwise, return null
  return user ? formatUser(user as UserType & { address: AddressType | null; company: CompanyType | null }) : null;
}


// Update user, address, and company by ID
async function updateUser(
  id: number,
  updatedUserFields: Partial<UserType>,
  updatedAddressFields?: Partial<AddressType>,
  updatedCompanyFields?: Partial<CompanyType>
): Promise<UserType | null> {
  try {
    const user = await prisma.user.update({
      where: { id },
      data: {
        ...updatedUserFields,
        // Use update for existing address or null to remove it
        address: {
          update: updatedAddressFields,
        },
        // Use update for existing company or null to remove it
        company: {
          update: updatedCompanyFields,
        },
      },
    });

    return user;
  } catch (error) {
    console.error(error);
    // Handle errors
    throw new Error('Failed to update user');
  }
}

// Patch a user by ID
async function patchUser(id: number, data: Partial<UserType>): Promise<UserType> {
  try {
    const updatedUser = await prisma.user.update({
      where: { id },
      data,
    });

    return updatedUser;
  } catch (error) {
    console.error(error);
    // Handle errors
    throw new Error('Failed to patch user');
  }
}

// Delete a user by ID
async function deleteUser(id: number): Promise<UserType | null> {
  return prisma.user.update({
    where: { id },
    data: {
      deleted: true,
      updatedAt: new Date(),
    },
  });
}

// Get all users
async function getAllUsers(): Promise<UserType[]> {
  const users = await prisma.user.findMany({
    where: { deleted: false },
    include: { address: true, company: true }
  });

  // Format each user and return the array
  return users.map(user => formatUser(user as UserType & { address: AddressType | null; company: CompanyType | null }));
}


// Filter users by email or name or username
async function getUsersByKeyword(keyword: string): Promise<any[]> {
  const users = await prisma.user.findMany({
    where: {
      OR: [
        { email: { contains: keyword } },
        { name: { contains: keyword } },
        { username: { contains: keyword } },
      ],
    },
    include: {
      address: true,
      company: true,
    },
  });

  // Format each user and return the array
  return users.map(user => formatUser(user as UserType & { address: AddressType | null; company: CompanyType | null }));
}


export {
  createUser,
  getUserById,
  updateUser,
  patchUser,
  deleteUser,
  getAllUsers,
  getUsersByKeyword,
};
