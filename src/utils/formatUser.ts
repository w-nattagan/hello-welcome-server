import { User as UserType, Address as AddressType, Company as CompanyType } from '@prisma/client';

function formatUser(user: UserType & { address: AddressType | null; company: CompanyType | null }): any {
  return {
    id: user.id,
    name: user.name,
    username: user.username,
    email: user.email,
    address: user.address
      ? {
        street: user.address.street,
        suite: user.address.suite,
        city: user.address.city,
        zipcode: user.address.zipcode,
        geo: {
          lat: user.address.lat,
          lng: user.address.lng,
        },
      }
      : null,
    phone: user.phone,
    website: user.website,
    company: user.company
      ? {
        name: user.company.name,
        catchPhrase: user.company.catchPhrase,
        bs: user.company.bs,
      }
      : null,
  };
}

export default formatUser;
