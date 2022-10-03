import axios from "axios";
import React, { ChangeEvent, useState } from "react";
import { IContacts } from "./models/models";

const contactData: IContacts = {
  name: "",
  secondName: "",
};

interface ContactsProps {
  contact: IContacts;
  onEdit: (contact: IContacts) => void;
}

function EditContact({ contact, onEdit }: ContactsProps) {
  const [name, setName] = useState(contact.name);
  const [secondName, setSecondName] = useState(contact.secondName);
  const [error, setError] = useState("");

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    if (name.trim().length === 0) {
      setError("Введите имя");
      return;
    }

    if (secondName.trim().length === 0) {
      setError("Введите фамилию");
      return;
    }

    contactData.name = name;
    contactData.secondName = secondName;

    const contactId = contact.id;
    const response = await axios.put<IContacts>(
      `http://localhost:3000/contacts/${contactId}`,
      contactData
    );
    onEdit(response.data);
  };

  const changeName = (event: ChangeEvent<HTMLInputElement>) => {
    const value = (event.target as HTMLInputElement).value;
    setName(value);
  };
  const changeSecondName = (event: ChangeEvent<HTMLInputElement>) => {
    const value = (event.target as HTMLInputElement).value;
    setSecondName(value);
  };

  return (
    <form onSubmit={submitHandler} className="">
      <input type="text" className="input" value={name} onChange={changeName} />
      <input
        type="text"
        className="input"
        value={secondName}
        onChange={changeSecondName}
      />
      {error && <p>{error}</p>}
      <button type="submit" className="btn">
        Сохранить
      </button>
    </form>
  );
}

export default EditContact;
