import "./App.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import data from "./data";
import List from "./components/List";


function App() {
  const [people, setPeople] = useState(data);
  const [contacts, setContacts] = useState([]);
  const loadContacts = async () => {
    try {
      const results =await axios.get("/api/v1/contacts/");
      console.log("here is the response: ");
      console.log(contacts);
      setContacts(results.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadContacts()
  }, []);

  return (
    <main>
      <section className="container">
        <div>
        <h3>You have {contacts.length} contacts</h3>
        </div>
        <List contacts={contacts} />
        <button onClick={() => setContacts([])}>view all contacts</button>
      </section>
    </main>
  );
}

export default App;
