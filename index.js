const chalk = require("chalk");
const { Command } = require("commander");
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
} = require("./contacts");

const program = new Command();
program
  .requiredOption("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const contacts = await listContacts();
      console.table(contacts);
      break;

    case "get":
      const contactById = await getContactById(id);
      if (contactById) {
        console.log(chalk.green("Contact found"));
        console.log(contactById);
      } else {
        console.log(chalk.red("Contact not found"));
      }
      break;

    case "add":
      const contact = await addContact(name, email, phone);
      if (contact.name && contact.email && contact.phone) {
        console.log(chalk.green("Add new contact"));
        console.log(contact);
        return;
      }
      console.log(chalk.red("Error"));
      console.log(contact);

      break;

    case "remove":
      const newContacts = await removeContact(id);
      console.table(newContacts);

      break;

    default:
      console.warn(chalk.red("Unknown action type!"));
  }
};

invokeAction(argv).then(() => console.log("operation success"));
