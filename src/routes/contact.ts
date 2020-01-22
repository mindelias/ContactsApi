import { Router } from "express";
import {
  // getContacts,
  getContactByID,
  createContact,
  updateContact
} from "../controllers/contact";
import contacts from '../model/contact';
import Joi = require("@hapi/joi");
import User from '../UserModel/model'

const router = Router();

router.get("/contacts", (_req, res) => {
  // const data = getContacts();
  User.find().then(result => res.status(200).json(result)).catch(err => console.log(err))
  // console.log(data)
});

router.get("/contact/:contactID", (req, res) => {
  const { error, value: contactID } = Joi.string()
    .uuid({ version: "uuidv4" })
    .validate(req.params.contactID, { presence: "required" });

  if (error) {
    res.status(400).json({ error });

    return;
  }

  const data = getContactByID(contactID);

  if (!data) {
    res.status(404).json({ error: "Contact not found" });

    return;
  }

  res.status(200).json({ data });
});
// post request route 
router.post("/contacts", (req, res) => {
  const contact = req.body;
  const newContact = new User(contact)
  newContact.save().then(() => console.log('saved data')).catch(err => console.log(err))
  

  try {
    const data = createContact(contact);
    // User.create(() => )

    res.status(201).json({ data });

    return;
  } catch (err) {
    res.status(400).json({ error: err });
  }
});
// put/ patch request route created
router.patch("/contact/:contactID", (req, res) => {
  // checking if the id passed in  is a valid id or a uuid type
  const { error, value: contactID } = Joi.string()
    .uuid({ version: "uuidv4" })
    .validate(req.params.contactID, { presence: "required" });

  if (error) {
    res.status(400).json({ error });

    return;
  }
  // getting each contact object
  const data = getContactByID(contactID);
  if (!data) {
    res.status(404).json({ error: "Contact not found" });

    return;
  }
  // replace already saved data with the validated edited data
  try {
    const validateContact = updateContact(req.body);
    data.firstName = validateContact.firstName;
    data.lastName = validateContact.lastName;
    data.company = validateContact.company;
    data.email = validateContact.email;
    data.phone = validateContact.phone;
    data.updatedAt = new Date().toISOString();
    res.status(200).json({ data });
  } catch (err) {
    res.status(400).json({ error: err });
  }
});

router.delete("/contact/:contactID", (req, res) => {
  const { error, value: contactID } = Joi.string()
    .uuid({ version: "uuidv4" })
    .validate(req.params.contactID, { presence: "required" });

  if (error) {
    res.status(400).json({ error });

    return;
  }

  // getting each contact object
  const data = getContactByID(contactID);
  if (!data) {
    res.status(404).json({ error: "Contact not found" });

    return;
  }
  const index = contacts.indexOf(data)
  contacts.splice(index, 1)

  res.status(200).json({message: 'deleted succefully'});
});

export default router;
