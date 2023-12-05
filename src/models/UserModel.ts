import { Address } from "./AddressModel";
import { Company } from "./CompanyModel";
import { Post } from "./PostModel";

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  deleted: boolean; // Added flag for soft delete
  address?: Address;
  company?: Company;
  posts?: Post[];
}
