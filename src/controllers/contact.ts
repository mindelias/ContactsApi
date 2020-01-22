import joi from '@hapi/joi';
import uuid from 'uuid';

import Contacts, { Contact } from '../model/contact';

export function getContacts() {
  return Contacts;
}

export function getContactByID(contactID: string) {
  return Contacts.find(contact => contact.id === contactID);
}

type CreateContact = Omit<Contact, 'id' | 'createdAt' | 'updatedAt'>;

export const createContactSchema = joi.object<CreateContact>({
  firstName: joi
    .string()
    .trim()
    .required(),

  lastName: joi.string().trim(),

  phone: joi
    .string()
    .trim()
    .required(),

  email: joi
    .string()
    .trim()
    .email(),

  company: joi.string().trim()
});

export function createContact(contact: CreateContact) {
  const { error, value } = createContactSchema.validate(contact, {
    abortEarly: false,
    stripUnknown: true
  });

  if (error) {
    throw error;
  }

  const id = uuid.v4();
  const date = new Date().toISOString();
  
  const newContact: Contact = {
    ...value,
    id,
    createdAt: date,
    updatedAt: date
  };

  Contacts.push(newContact);

  return newContact;
}

export function updateContact(contact: CreateContact) {
  const { error, value } = createContactSchema.validate(contact, {
    abortEarly: false,
    stripUnknown: true
  });

  if (error) {
    throw error;
  }
  // const date = new Date().toISOString();
  // const updatedContact:Contact = {
  //   ...value,
  
  // }


  return value
}
 
