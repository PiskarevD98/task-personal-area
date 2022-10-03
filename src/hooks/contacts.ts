import axios from "axios";
import {useState } from "react";
import { IContacts} from "../components/models/models";

export function useContacts() {
  const [contacts, setContacts] = useState<IContacts[]>([])


  function addContact(contact: IContacts) {
    setContacts(prev => [...prev, contact])
  
  }

    async function fetchContacts() {
      const response =  await axios.get<IContacts[]>('http://localhost:3000/contacts')
      setContacts(response.data)
    }

    


return {contacts, addContact, fetchContacts}
}