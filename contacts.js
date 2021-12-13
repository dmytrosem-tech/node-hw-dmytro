const fs = require("fs/promises");
const path = require("path");
const crypto = require("crypto");
const { v4: uuidv4 } = require("uuid");

const contactsPath = async () => {
  const content = await fs.readFile(
    path.join(__dirname, "db", "contacts.json"),
    "utf8"
  );
  const result = JSON.parse(content);
  return result;
};

const listContacts = async () => {
  return await contactsPath();
};

const getContactById = async (contactId) => {
  const contacts = await contactsPath();
  const [contact] = contacts.filter((contact) => contact.id === contactId);
  return contact;
};

const removeContact = async (contactId) => {
  const contacts = await contactsPath();
  const newContacts = contacts.filter((contact) => contact.id !== contactId);
  await fs.writeFile(
    path.join(__dirname, "db", "contacts.json"),
    JSON.stringify(newContacts, null, 2)
  );
  return newContacts;
};

const addContact = async (name, email, phone) => {
  const contacts = await contactsPath();
  const newContact = { name, email, phone, id: uuidv4() };
  contacts.push(newContact);
  await fs.writeFile(
    path.join(__dirname, "db", "contacts.json"),
    JSON.stringify(contacts, null, 2)
  );
  return newContact;
};

module.exports = { addContact, removeContact, getContactById, listContacts };
