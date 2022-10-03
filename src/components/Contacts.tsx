import { Button, Modal } from "antd";
import axios from "axios";
import { useState } from "react";
import EditContact from "./EditContact";
import ModalWindow from "./ModalWindow";
import { IContacts } from "./models/models";

interface ContactsProps {
  contact: IContacts;
  onDelete: (contact: IContacts) => void;
  onEdit: (contact: IContacts) => void;
}

function Contacts({ contact, onDelete, onEdit }: ContactsProps) {
  const [modal, setModal] = useState(false);

  const showModal = () => {
    setModal(true);
  };

  const handleOk = () => {
    setModal(false);
  };

  const handleCancel = () => {
    setModal(false);
  };

  async function deleteContact() {
    const contactId = contact.id;
    const response = await axios.delete<IContacts>(
      `http://localhost:3000/contacts/${contactId}`
    );
    onDelete(response.data);
  }

  const editContact = () => {
    setModal(false);
    onEdit(contact);
  };

  return (
    <div>
      <div className="cart">
        <p className="block">
          {contact.name} {contact.secondName}
        </p>
        <Button type="primary" onClick={showModal} className="btn-edit">
          Изменить
        </Button>
        <Button
          type="primary"
          danger
          onClick={deleteContact}
          className="btn-delete"
        >
          Удалить
        </Button>
        <Modal open={modal} onOk={handleOk} onCancel={handleCancel}>
          <ModalWindow title="Изменить контакт">
            <EditContact onEdit={editContact} contact={contact} />
          </ModalWindow>
        </Modal>
      </div>
    </div>
  );
}

export default Contacts;
