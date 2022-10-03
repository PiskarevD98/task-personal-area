import axios from "axios";
import React, { ChangeEvent, useState } from "react";
import { IContacts } from "./models/models";

const contactData: IContacts = {
  name: "",
  secondName: "",
  id: "",
};

interface CreateContactsProps {
  onCreate: (contact: IContacts) => void;
}

function CreateContacts({ onCreate }: CreateContactsProps) {
  const [name, setName] = useState("");
  const [secondName, setSecondName] = useState("");
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

    const response = await axios.post<IContacts>(
      "http://localhost:3000/contacts",
      contactData
    );

    onCreate(response.data);
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
    <form onSubmit={submitHandler} className="window">
      <input
        type="text"
        placeholder="Введите имя"
        value={name}
        onChange={changeName}
        className="input"
      />
      <input
        type="text"
        placeholder="Введите фамилию"
        value={secondName}
        onChange={changeSecondName}
        className="input"
      />
      {error && <p>{error}</p>}
      <button type="submit" className="btn">
        Добавить
      </button>
    </form>
  );
}

export default CreateContacts;
