import { Form, Input, Button, Row, Col, Alert } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authContext } from "../../context/authContext";
import "./Auth.css"

const Auth = () => {
  const { handleSignUp, handleLogin, error, addUser} = useContext(authContext);
  const [isLoginForm, setIsLoginForm] = useState(false);
  const navigate = useNavigate();
  function validatePassword(rule, value, callback) {
    let regex = new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/);
    if (regex.test(value)) {
      callback();
    } else {
      callback(
        "Password should contain at least one digit,one lower case,one upper case, 8 from the mentioned characters"
      );
    }
  }
  const onFinish = (values) => {
    const { email, password } = values;
    if (isLoginForm) {
      handleLogin(email, password, navigate);
    } else {
      handleSignUp(email, password, navigate);
      addUser({'user': email, "id" : email, carts: [], orders: []})
    }
  };
  return (
    <div
      className="container main-form"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "50px",
      }}
    >
      <div className="form">
        {error ? <Alert description={error} type="error" /> : null}
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your Username!",
              },
              {
                type: "email",
                message: "Is not valid email!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
              {
                validator: validatePassword,
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              {isLoginForm ? "Log in" : "Sign up"}
            </Button>
            <br />
            {isLoginForm ? (
              <>
                <p className="auth-text">Or</p>
                <span className="auth-span" onClick={() => setIsLoginForm(false)}>register now!</span>
              </>
            ) : (
              <>
                <p className="auth-text">Have an account ?</p>
                <span className="auth-span" onClick={() => setIsLoginForm(true)}>Log in</span>
              </>
            )}
          </Form.Item>
        </Form>
        </div>
    </div>
  );
};

export default Auth;