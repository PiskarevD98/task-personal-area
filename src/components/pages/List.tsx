import { FC, useEffect, useState } from "react";
import { useContacts } from "../../hooks/contacts";
import Contacts from "../Contacts";
import CreateContacts from "../CreateContacts";
import { IContacts } from "../models/models";
import Modal from "../ModalWindow";
import { Button, Card, Space, Input } from "antd";
import { UserOutlined } from "@ant-design/icons";

const List: FC = () => {
  const { contacts, fetchContacts } = useContacts();
  const [modal, setModal] = useState(false);
  const [searchList, setSearchList] = useState("");

  const fetchAfterContacts = (contact: IContacts) => {
    setModal(false);
    fetchContacts();
  };

  const deleteContact = () => {
    fetchContacts();
  };

  const editContact = () => {
    fetchContacts();
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  function search(contacts: IContacts[]) {
    return contacts.filter(
      (contact: IContacts) =>
        contact.name.toLowerCase().includes(searchList.toLowerCase()) ||
        contact.secondName.toLowerCase().includes(searchList.toLowerCase())
    );
  }

  return (
    <div className="container">
      <h1>Контакты</h1>
      <Input
        size="large"
        prefix={<UserOutlined />}
        type="search"
        placeholder="Поиск..."
        name="search-form"
        value={searchList}
        onChange={(e) => setSearchList(e.target.value)}
      />
      <br />
      <br />
      <Button type="primary" onClick={() => setModal((prev) => !prev)}>
        {modal ? "Не добавлять контакт" : "Добавить контакт"}
      </Button>
      <br />
      <div>
        {modal && (
          <Modal title="Добавить контакт">
            <CreateContacts onCreate={fetchAfterContacts} />
          </Modal>
        )}
        <br />
        <Space direction="vertical" size="middle" style={{ display: "flex" }}>
          {search(contacts).map((contact: IContacts) => (
            <Card size="small" key={contact.id}>
              <Contacts
                contact={contact}
                key={contact.id}
                onDelete={deleteContact}
                onEdit={editContact}
              />
            </Card>
          ))}
        </Space>
      </div>
    </div>
  );
};

export default List;
