import React from "react";
import { Select } from "antd";
import 'antd/dist/reset.css';
import { Input, DatePicker } from "antd";
import { message, notification } from 'antd';
import { Modal, Button } from "antd";
import { Spin } from 'antd';
import { Table } from "antd";
// Import your theme hook - adjust the path as needed
import { useTheme } from '../context/createContext';

const { TextArea } = Input;

const { Option } = Select;

export const TextField = ({
  label,
  type = "text", // "text", "password", "textarea", "date"
  value,
  onChange,
  placeholder = "",
  error,
  className = "",
  ...rest
}) => {
  const renderInput = () => {
    switch (type) {
      case "password":
        return <Input.Password value={value} onChange={onChange} placeholder={placeholder} {...rest} />;
      case "textarea":
        return <TextArea value={value} onChange={onChange} placeholder={placeholder} {...rest} />;
      case "date":
        return <DatePicker value={value} onChange={onChange} placeholder={placeholder} {...rest} style={{ width: "100%" }} />;
      default:
        return <Input value={value} onChange={onChange} placeholder={placeholder} {...rest} />;
    }
  };

  return (
    <div className={`flex flex-col mb-4 ${className}`}>
      {label && <label className="mb-1 font-medium text-gray-700">{label}</label>}
      {renderInput()}
      {error && <span className="text-sm text-red-500 mt-1">{error}</span>}
    </div>
  );
};




export const SelectDropdown = ({
  label,
  name,
  value,
  onChange,
  options = [],
  placeholder = "Select...",
  error,
  className = "",
}) => {
  return (
    <div className="flex flex-col mb-4">
      {label && (
        <label htmlFor={name} className="mb-1 font-medium text-gray-700">
          {label}
        </label>
      )}

      <Select
        id={name}
        name={name}
        options={options}
        value={options.find((opt) => opt.value === value)}
        onChange={(selected) => onChange(selected)}
        placeholder={placeholder}
        style={{
          maxHeight: "36px",
          minWidth: "200px",
          lineHeight: "1.5",
        }}
        className={`border rounded-md px-2 py-1 outline-none ${error ? "border-red-500" : "border-gray-300"} ${className}`}
      />

      {error && <span className="text-sm text-red-500 mt-1">{error}</span>}
    </div>
  );
};


export const MultiSelectDropdown = ({
  label,
  name,
  value = [],
  onChange,
  options = [],
  placeholder = "Select...",
  error,
  className = "",
  ...rest
}) => {
  return (
    <div className="flex flex-col mb-4">
      {label && (
        <label htmlFor={name} className="mb-1 font-medium text-gray-700">
          {label}
        </label>
      )}

      <Select
        mode="multiple"
        value={value}
        onChange={onChange}
        options={options}
        placeholder={placeholder}
        style={{
          minWidth: "200px",
          lineHeight: "1.5",
        }}
        popupStyle={{ maxHeight: 200 }}
        className={`custom-multiselect border rounded-md px-2 py-1 outline-none ${error ? "border-red-500" : "border-gray-300"} ${className}`}
        {...rest}
      />

      {error && <span className="text-sm text-red-500 mt-1">{error}</span>}
    </div>
  );
};

export const Loader = ({ message = "" }) => {
  return (
    <div
      className="fixed inset-0 flex flex-col items-center justify-center bg-white z-50"
      style={{ backgroundColor: "rgba(255,255,255,0.8)" }}
    >
      <Spin size="large" />
      {message && <p className="mt-4 text-gray-700 font-medium">{message}</p>}
    </div>
  );
};

export const showToast = (type, text, duration = 3) => {
  switch (type) {
    case 'success':
      message.success(text, duration);
      break;
    case 'error':
      message.error(text, duration);
      break;
    case 'info':
      message.info(text, duration);
      break;
    case 'warning':
      message.warning(text, duration);
      break;
    default:
      message.info(text, duration);
  }
};

export const showNotification = ({ type = 'info', title, description, duration = 4 }) => {
  notification[type]({
    message: title,
    description: description,
    duration: duration,
  });
};

export const MyModal = ({
  visible,
  onClose,
  onOk,
  title = "Modal Title",
  children,
  okText = "OK",
  cancelText = "Cancel",
  okButtonProps = {},
  cancelButtonProps = {},
}) => {
  return (
    <Modal
      title={title}
      visible={visible}
      onCancel={onClose}
      onOk={onOk}
      okText={okText}
      cancelText={cancelText}
      okButtonProps={okButtonProps}
      cancelButtonProps={cancelButtonProps}
    >
      {children}
    </Modal>
  );
};

export const DataTable = ({
  columns = [],
  data = [],
  loading = false,
  rowKey = "id",
  pagination = { pageSize: 10 },
  ...rest
}) => {
  return (
    <Table
      columns={columns}
      dataSource={data}
      loading={loading}
      rowKey={rowKey}
      pagination={pagination}
      {...rest}
    />
  );
};

export const MyDiv = ({
  children,
  className = "",
  variant = "default", // "default", "card", "section", "container", "transparent"
  padding = true,
  ...rest
}) => {
  // Directly use the theme hook
  const { darkMode, fontSize } = useTheme();

  // Font size mappings
  const fontSizeClasses = {
    small: "text-sm",
    medium: "text-base",
    large: "text-lg"
  };

  // Variant-based styling
  const variantClasses = {
    default: "",
    card: "rounded-lg shadow-md",
    section: "rounded-md border",
    container: "max-w-7xl mx-auto",
    transparent: "" // No background styling
  };

  // Dark mode classes - skip background for transparent variant
  const darkModeClasses = variant === "transparent"
    ? ""
    : darkMode
      ? "bg-gray-800 text-white border-gray-700"
      : "bg-white text-gray-900 border-gray-200";

  // Padding classes
  const paddingClass = padding ? "p-4" : "";

  // Combine all classes
  const combinedClasses = `
    ${variantClasses[variant]}
    ${darkModeClasses}
    ${fontSizeClasses[fontSize]}
    ${paddingClass}
    ${className}
  `.trim().replace(/\s+/g, ' ');

  return (
    <div className={combinedClasses} {...rest}>
      {children}
    </div>
  );
};