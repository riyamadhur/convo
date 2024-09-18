import React, { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Input = ({
  label = "",
  type = "text",
  id = "",
  name = "",
  value = "",
  onChange = () => {},
  errors = [],
  Varient = "input",
  disabled = false,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [passwordType, setPasswordType] = useState(type);
  const [error, setError] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const togglePassword = () => {
    setPasswordType((prevType) =>
      prevType === "password" ? "text" : "password"
    );
  };

  useEffect(() => {
    if (errors.length > 0 && (errors.includes(name) || value.length === 0)) {
      setError(true);
    } else {
      setError(false);
    }
  }, [errors, error, name, value]);

  return (
    <>
      <div
        className={`input-container ${error ? "error" : ""}`}
        style={disabled ? { cursor: "not-allowed" } : undefined}
      >
        <label className={isFocused || value ? "active" : ""} htmlFor={id}>
          {`Enter your ${label}`}
        </label>
        <Varient
          className={`pl-2 inputbox ${type === "password" ? "password" : ""}`}
          type={type === "password" ? passwordType : type}
          id={id}
          title={`Enter your ${label}`}
          name={name}
          value={value}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={onChange}
          autoComplete="off"
          disabled={disabled}
        />
        {label.includes("password") && (
          <p className="toggle-password" onClick={togglePassword}>
            {passwordType === "password" ? <FaEye /> : <FaEyeSlash />}
          </p>
        )}
      </div>
      {error && <p className="error-message">{`${label} is required`}</p>}
    </>
  );
};

export default Input;
