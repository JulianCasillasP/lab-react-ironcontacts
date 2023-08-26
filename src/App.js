import React from 'react';
import './App.css';
import contacts from './contacts.json'; 


function App() {
  const [contactList, setContactList] = React.useState(contacts.slice(0, 5));
  const [remainingContacts, setRemainingContacts] = React.useState(contacts.slice(5));

  const addRandomContacts = () => {
    if (remainingContacts.length < 5) {
      alert("Not enough remaining contacts.");
      return;
    }

    const randomIndices = [];
    while (randomIndices.length < 5) {
      const randomIndex = Math.floor(Math.random() * remainingContacts.length);
      if (!randomIndices.includes(randomIndex)) {
        randomIndices.push(randomIndex);
      }
    }

    const newContacts = randomIndices.map(index => remainingContacts[index]);
    setContactList(newContacts);
    setRemainingContacts(prevRemaining => prevRemaining.filter((_, index) => !randomIndices.includes(index)));
  };

  const sortByName = () => {
    const sortedByName = [...contactList].sort((a, b) => a.name.localeCompare(b.name));
    setContactList(sortedByName);
  };

  const sortByPopularity = () => {
    const sortedByPopularity = [...contactList].sort((a, b) => b.popularity - a.popularity);
    setContactList(sortedByPopularity);
  };

  const removeContact = (id) => {
    const updatedContactList = contactList.filter(contact => contact.id !== id);
    setContactList(updatedContactList);
  };

  
  return (
    <div className="App">
      <h1>Iron Contacts</h1>
      <button onClick={addRandomContacts}>Add Random Contacts</button>
      <button onClick={sortByName}>Sort by Name</button>
      <button onClick={sortByPopularity}>Sort by Popularity</button>
      <table>
        <thead>
          <tr>
            <th>Picture</th>
            <th>Name</th>
            <th>Popularity</th>
            <th>Won a Oscar</th>
            <th>Won a Emmy</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {contactList.map((contact) => (
            <tr key={contact.id}>
              <td>
                <img src={contact.pictureUrl} alt={contact.name} style={{ width: '50px' }} />
              </td>
              <td>{contact.name}</td>
              <td>{contact.popularity.toFixed(2)}</td>
              <td>{contact.wonOscar ? '🏆' : null}</td>
              <td>{contact.wonEmmy ? '⭐️' : null}</td>
              <td> <button onClick={() => removeContact(contact.id)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
