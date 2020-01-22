"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("@hapi/joi"));
const uuid_1 = __importDefault(require("uuid"));
const contact_1 = __importDefault(require("../model/contact"));
function getContacts() {
    return contact_1.default;
}
exports.getContacts = getContacts;
function getContactByID(contactID) {
    return contact_1.default.find(contact => contact.id === contactID);
}
exports.getContactByID = getContactByID;
exports.createContactSchema = joi_1.default.object({
    firstName: joi_1.default
        .string()
        .trim()
        .required(),
    lastName: joi_1.default.string().trim(),
    phone: joi_1.default
        .string()
        .trim()
        .required(),
    email: joi_1.default
        .string()
        .trim()
        .email(),
    company: joi_1.default.string().trim()
});
function createContact(contact) {
    const { error, value } = exports.createContactSchema.validate(contact, {
        abortEarly: false,
        stripUnknown: true
    });
    if (error) {
        throw error;
    }
    const id = uuid_1.default.v4();
    const date = new Date().toISOString();
    const newContact = {
        ...value,
        id,
        createdAt: date,
        updatedAt: date
    };
    contact_1.default.push(newContact);
    return newContact;
}
exports.createContact = createContact;
function updateContact(contact) {
    const { error, value } = exports.createContactSchema.validate(contact, {
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
    return value;
}
exports.updateContact = updateContact;
//# sourceMappingURL=contact.js.map