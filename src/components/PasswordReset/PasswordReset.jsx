import { NoEncryption } from "@mui/icons-material";
import { Alert } from "antd";
import React from "react";
import { useState } from "react";
import fire from "../../fire";
import "./PasswordReset.css"

const PasswordReset = () => {
  const [value, setValue] = useState("");
  const [alertEmail, setAlertEmail] = useState(false);
  const [fillEmail, setFillEmail] = useState(false);
  let auth = fire.auth();
  var actionCodeSettings = {
    url: "http://localhost:3000/auth",
    handleCodeInApp: true,
  };
  const forgotPassword = (email) => {
    return auth.sendPasswordResetEmail(email, actionCodeSettings);
  };
  const forgotPasswordHandler = () => {
    const email = value;
    console.log(email);
    if (email)
      forgotPassword(email).then(function () {
        setValue("");
        setAlertEmail((prev) => !prev);
      });
  };
  function resetPassword() {
    forgotPasswordHandler();
    if (value === "") {
      setFillEmail((prev) => !prev);
    }
  }
  return (
    <div className="container">
      {alertEmail ? (
        <Alert
          message=""
          description="Email has been sent"
          type="success"
          showIcon
        />
      ) : null}
      {fillEmail ? (
        <Alert
          message="Warning"
          description="Please input your email!"
          type="warning"
          showIcon
          closable
        />
      ) : null}
      <div className="main-reset">
        <div className="left">
          <img
            src="https://2rdnmg1qbg403gumla1v9i2h-wpengine.netdna-ssl.com/wp-content/uploads/sites/3/2019/06/handWristPain-939030682-770x553-650x428.jpg"
            alt="SpaceX"
            width="100%"
          />
        </div>

        <div className="right">
                  <p className="reset-text">
            Пожалуйста, введите свой адрес электронной почты ниже, и мы вышлем вам информацию
            для восстановления пароля!
          </p>
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="input-reset"
            type="email"
            placeholder="✉️ Email Address"
          />
          <br />
          <button
            onClick={resetPassword}
            className="button-reset"
          >
            Reset Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default PasswordReset;
