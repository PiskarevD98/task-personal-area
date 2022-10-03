import { FC, useState } from "react";
import { Form, Input, Button, Layout, Row } from "antd";
import { useActions } from "../../hooks/useActions";

const Auth: FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { enter } = useActions();
  const submit = () => {
    enter(username, password);
  };
  return (
    <Layout>
      <Row justify="center" align="middle" className="h100">
        <Form onFinish={submit}>
          <Form.Item
            label="Имя"
            name="username"
            rules={[{ required: true, message: "Пожалуйста введите имя!" }]}
          >
            <Input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            label="Пароль"
            name="password"
            rules={[{ required: true, message: "Пожалуйста введите пароль!" }]}
          >
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type={"password"}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Войти
            </Button>
          </Form.Item>
        </Form>
      </Row>
    </Layout>
  );
};

export default Auth;
