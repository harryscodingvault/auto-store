import React, { useEffect, useState } from "react";
import { Wrapper } from "./Home.style";
import { io } from "socket.io-client";
import FormInput from "../../components/FormComponents/FormInput/FormInput";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const initialValuesState = {
  room: "",
  username: "",
};

const initialErrorState = {
  roomM: "",
  usernameM: "",
};

const Home = ({ socket }: { socket: any }) => {
  const [values, setValues] = useState(initialValuesState);
  const [errorMessages, setErrorMessages] = useState(initialErrorState);

  const navigate = useNavigate();

  const handleChange = (e: React.FormEvent) => {
    const name = (e.target as HTMLInputElement).name;
    const value = (e.target as HTMLInputElement).value;
    setValues({ ...values, [name]: value });
  };

  const checkValues = () => {
    const { room, username } = values;
    let newRoom = room.trim();
    let newUsername = room.trim();

    let verifiedData = true;
    let usernameM = "",
      roomM = "";

    if (!newRoom.length) {
      verifiedData = false;
      roomM = "Room required!";
    }
    if (!newUsername.length) {
      verifiedData = false;
      usernameM = "Username required!";
    }

    setErrorMessages({
      ...errorMessages,
      usernameM,
      roomM,
    });
    return verifiedData;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (checkValues()) {
      setValues(initialValuesState);
      socket.emit("join", values, (error: string) => {
        if (error) {
          alert(error);
        } else {
          navigate(`room/${values.room}`);
        }
      });
    }
  };

  const Login = () => {
    fetch("/auth/google");
  };

  return (
    <Wrapper>
      <div className="btn" onClick={Login}>
        Login
      </div>
      <form onSubmit={handleSubmit} className="form">
        <FormInput
          name="username"
          type="text"
          label="Username"
          required={true}
          errorMessage={errorMessages.usernameM}
          value={values.username}
          handleChange={handleChange}
        />
        <FormInput
          name="room"
          type="text"
          label="Get room"
          required={true}
          errorMessage={errorMessages.roomM}
          value={values.room}
          handleChange={handleChange}
        />

        <button type="submit" className="btn">
          <h5>Submit</h5>
        </button>
      </form>
    </Wrapper>
  );
};

export default Home;
