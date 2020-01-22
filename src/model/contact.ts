export type Contact = {
  id: string;
  firstName: string;
  lastName?: string;
  phone: string;
  email?: string;
  company?: string;
  createdAt: Date | string;
  updatedAt: Date | string;
};

const contacts: Contact[] = [
  {
    id: '301354c4-a6c6-440b-ab88-c4071a9f53f4',
    firstName: 'John',
    lastName: 'Doe',
    phone: '+2348060133058',
    createdAt: '2020-01-20T14:31:23.000Z',
    updatedAt: '2020-01-20T14:31:23.000Z'
  }
];

export default contacts;
