import React, { useState } from "react";
import useHomePageController from '../../controller/home/homecontroller';
import { MultiSelectDropdown, SelectDropdown, showNotification, showToast, TextField, MyModal, DataTable } from '../../components/input_output_utils';
import 'antd/dist/reset.css';
import { Button } from "antd";


const HomePage = () => {
  // const {fetchUserData} = useHomePageController();
  const [country, setCountry] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [about, setAbout] = useState("");
  const [birthday, setBirthday] = useState("");

  const countries = [
    { label: "India", value: "IN" },
    { label: "United States", value: "US" },
    { label: "Germany", value: "DE" },
  ];
  const options = [
    { label: "Apple", value: "apple" },
    { label: "Banana", value: "banana" },
    { label: "Orange", value: "orange" },
  ];
  const [fruit, setFruit] = useState("");

  const [skills, setSkills] = useState([]);
  const [selected, setSelected] = React.useState([]);65

  const skillOptions = [
    { label: "JavaScript", value: "js" },
    { label: "React", value: "react" },
    { label: "Flutter", value: "flutter" },
    { label: "Node.js", value: "node" },
  ];
  const [isModalVisible, setIsModalVisible] = useState(false);

  const openModal = () => setIsModalVisible(true);
  const closeModal = () => setIsModalVisible(false);
  const handleOk = () => {
    console.log("Clicked OK");
    setIsModalVisible(false);
  };

  const [loading, setLoading] = useState(false);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
      sorter: (a, b) => a.age - b.age,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
  ];

  const data = [
    { id: 1, name: "John Doe", age: 28, email: "john@example.com" },
    { id: 2, name: "Jane Smith", age: 34, email: "jane@example.com" },
    { id: 3, name: "Bob Johnson", age: 45, email: "bob@example.com" },
  ];

  return (
    <div className='w-100vw'>
      <TextField
        label="Birthday"
        type="date"
        value={birthday}
        onChange={(date, dateString) => setBirthday(date)}
        placeholder="Select your birthday"
        // error={birthdayError}
      />
      <TextField
        label="Username"
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter your username"
        // error={usernameError}
      />

      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter your password"
        // error={passwordError}
      />

      <TextField
        label="About You"
        type="textarea"
        value={about}
        onChange={(e) => setAbout(e.target.value)}
        placeholder="Tell us about yourself"
        // error={aboutError}
      />

      <MultiSelectDropdown
        value={skills} // array of selected values
        onChange={setSkills} // receives array directly
        options={skillOptions}
        placeholder="Select skills"
        label="Select skills"
      />
      <SelectDropdown
        label="Choose a fruit"
        name="fruit"
        value={fruit}
        onChange={setFruit} // value passed automatically
        options={options}
        placeholder="Select a fruit"
      />
      <div className="p-5 flex flex-col gap-4">
        <button onClick={() => showToast('success', 'This is a success toast')}>
          Show Toast
        </button>

        <button
          onClick={() =>
            showNotification({
              type: 'success',
              title: 'Success!',
              description: 'This is a notification from Ant Design',
            })
          }
        >
          Show Notification
        </button>
      </div>
      <Button type="primary" onClick={openModal}>
        Open Modal
      </Button>

      <MyModal
        visible={isModalVisible}
        onClose={closeModal}
        onOk={handleOk}
        title="Hello Modal"
      >
        <p>This is a reusable modal using Ant Design!</p>
      </MyModal>
      <DataTable
        columns={columns}
        data={data}
        loading={loading}
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
};

export default HomePage;
