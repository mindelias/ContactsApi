"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const contact_1 = require("../controllers/contact");
const contact_2 = __importDefault(require("../model/contact"));
const Joi = require("@hapi/joi");
const model_1 = __importDefault(require("../UserModel/model"));
const router = express_1.Router();
router.get("/contacts", (_req, res) => {
    // const data = getContacts();
    model_1.default.find().then(result => res.status(200).json(result)).catch(err => console.log(err));
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
    const data = contact_1.getContactByID(contactID);
    if (!data) {
        res.status(404).json({ error: "Contact not found" });
        return;
    }
    res.status(200).json({ data });
});
// post request route 
router.post("/contacts", (req, res) => {
    const contact = req.body;
    const newContact = new model_1.default(contact);
    newContact.save().then(() => console.log('saved data')).catch(err => console.log(err));
    try {
        const data = contact_1.createContact(contact);
        // User.create(() => )
        res.status(201).json({ data });
        return;
    }
    catch (err) {
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
    const data = contact_1.getContactByID(contactID);
    if (!data) {
        res.status(404).json({ error: "Contact not found" });
        return;
    }
    // replace already saved data with the validated edited data
    try {
        const validateContact = contact_1.updateContact(req.body);
        data.firstName = validateContact.firstName;
        data.lastName = validateContact.lastName;
        data.company = validateContact.company;
        data.email = validateContact.email;
        data.phone = validateContact.phone;
        data.updatedAt = new Date().toISOString();
        res.status(200).json({ data });
    }
    catch (err) {
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
    const data = contact_1.getContactByID(contactID);
    if (!data) {
        res.status(404).json({ error: "Contact not found" });
        return;
    }
    const index = contact_2.default.indexOf(data);
    contact_2.default.splice(index, 1);
    res.status(200).json({ message: 'deleted succefully' });
});
exports.default = router;
//# sourceMappingURL=contact.js.map