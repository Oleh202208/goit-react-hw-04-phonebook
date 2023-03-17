import ContactList from 'components/ContactList';
import Filter from 'components/Filter';
import { Form } from '../SectionForm/Form';
import { nanoid } from 'nanoid';
import { useState, useEffect } from 'react';
import styles from './app.module.css';

export function App() {
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(window.localStorage.getItem('contacts')) ?? [];
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const submmitAddContact = (data, reset) => {
    const { name, number } = data;
    const newContact = contacts.find(contact => contact.name === name);

    if (newContact) {
      return alert(`${name} is already in contacts`);
    } else {
      const newContact = {
        id: nanoid(),
        name: name,
        number: number,
      };

      setContacts(contacts => [...contacts, newContact]);
      reset();
    }
  };

  const handleChangeFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const onFilteredContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const deleteContacts = contactsId => {
    setContacts(contacts =>
      contacts.filter(contact => contact.id !== contactsId)
    );
  };
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Phonebook</h1>
      <Form onSubmit={submmitAddContact} />
      <h2 className={styles.title}>Contacts</h2>
      <div className={styles.contactListContainer}>
        <Filter InputValue={filter} onChange={handleChangeFilter} />
        <ContactList
          contacts={onFilteredContacts()}
          onDeleteContacts={deleteContacts}
        />
      </div>
    </div>
  );
}

//

// export class App extends Component {
//   state = {
//     contacts: [],
//     filter: '',
//   };

//   componentDidMount() {
//     const savedContacts = localStorage.getItem('contacts');
//     const parsedContacts = JSON.parse(savedContacts);
//     if (parsedContacts) {
//       this.setState({ contacts: parsedContacts });
//     }
//   }

//   componentDidUpdate(prevProps, prevState) {
//     const { contacts } = this.state;
//     if (prevState.contacts !== contacts) {
//       localStorage.setItem('contacts', JSON.stringify(contacts));
//     }
//   }

//   onSubmmitAddContact = ({ name, number }, reset) => {
//     const { contacts } = this.state;
//     const validContacts = contacts.map(({ name }) => name.toLowerCase());
//     const nameToLowerCase = name.toLowerCase();

//     if (validContacts.includes(nameToLowerCase)) {
//       return alert(`${name} is already in contacs.`);
//     } else {
//       const newContact = {
//         name,
//         number,
//         id: nanoid(),
//       };
//       this.setState(prevState => ({
//         contacts: [newContact, ...prevState.contacts],
//       }));
//       reset();
//     }
//   };

//   handleChangeFilter = e => {
//     this.setState({ filter: e.currentTarget.value });
//   };

//   onFilteredContacts = () => {
//     const { filter, contacts } = this.state;
//     return contacts.filter(({ name }) =>
//       name.toLowerCase().includes(filter.toLowerCase())
//     );
//   };

//   deleteContacts = contactsId => {
//     this.setState(prevState => ({
//       contacts: prevState.contacts.filter(contact => contact.id !== contactsId),
//     }));
//   };

//   render() {
//     const { filter } = this.state;
//     const onfilteredContacts = this.onFilteredContacts();
//     return (
//       <div className={styles.container}>
//         <h1 className={styles.title}>Phonebook</h1>
//         <Form onSubmit={this.onSubmmitAddContact} />
//         <h2 className={styles.title}>Contacts</h2>
//         <div className={styles.contactListContainer}>
//           <Filter InputValue={filter} onChange={this.handleChangeFilter} />
//           <ContactList
//             contacts={onfilteredContacts}
//             onDeleteContacts={this.deleteContacts}
//           />
//         </div>
//       </div>
//     );
//   }
// }
// //
