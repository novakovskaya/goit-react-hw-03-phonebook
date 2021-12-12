import { Component } from "react";
import { nanoid } from "nanoid";
import styles from "./App.module.scss";

import Container from "./components/Container";
import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactList";
import contacts from "./contacts.json";
import Filter from "./components/Filter";

class App extends Component {
  state = {
    contacts,
    filter: "",
  };

  componentDidMount() {
    const contacts = localStorage.getItem("contacts");
    const parcedContacts = JSON.parse(contacts);

    if (parcedContacts) {
      this.setState({ contacts: parcedContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const nextContacts = this.state.contacts;
    const prevContacts = prevState.contacts;

    if (nextContacts !== prevContacts) {
      localStorage.setItem("contacts", JSON.stringify(nextContacts));
    }
  }

  addContact = ({ name, number }) => {
    const contact = {
      id: nanoid(),
      name,
      number,
    };

    const alreadyFind = this.state.contacts.find(
      (contact) => contact.name === name
    );

    alreadyFind
      ? alert(`${name} is already in contacts.`)
      : this.setState(({ contacts }) => ({ contacts: [contact, ...contacts] }));
  };

  findContact = (event) => {
    this.setState({ filter: event.target.value });
  };

  getFilterContacts = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  deleteContact = (contactId) => {
    this.setState((prevState) => ({
      contacts: prevState.contacts.filter(
        (contact) => contact.id !== contactId
      ),
    }));
  };

  render() {
    const { filter } = this.state;
    const FilterContacts = this.getFilterContacts();

    return (
      <Container>
        <h1 className={styles.Title}>Phonebook</h1>
        <ContactForm onSubmit={this.addContact} />

        <h2 className={styles.Title}>Contacts</h2>
        <Filter value={filter} onFindContact={this.findContact} />
        <ContactList
          onFilteredContacts={FilterContacts}
          onDeleteContact={this.deleteContact}
        />
      </Container>
    );
  }
}

export default App;
