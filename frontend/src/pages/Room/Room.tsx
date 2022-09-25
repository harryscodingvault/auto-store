import React, { useEffect, useState } from "react";
import { Wrapper } from "./Room.style";
import { io } from "socket.io-client";
import FormInput from "../../components/FormComponents/FormInput/FormInput";
import moment from "moment";

const initialValuesState = {
  new_message: "",
};

const initialErrorState = {
  new_messageM: "",
};

const Room = ({ socket }: { socket: any }) => {
  const [values, setValues] = useState(initialValuesState);
  const [errorMessages, setErrorMessages] = useState(initialErrorState);
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    socket?.on("message", (item: { text: string; createdAt: number }) => {
      console.log(item);
      setMessages([
        ...messages,
        {
          message: item.text,
          createdAt: moment(item.createdAt).format("h:mm a"),
        },
      ]);
    });
  }, [socket]);

  const handleChange = (e: React.FormEvent) => {
    const name = (e.target as HTMLInputElement).name;
    const value = (e.target as HTMLInputElement).value;
    setValues({ ...values, [name]: value });
  };

  const checkValues = () => {
    const { new_message } = values;
    let newMessage = new_message.trim();

    let verifiedData = true;
    let new_messageM = "";

    if (!newMessage.length) {
      verifiedData = false;
      new_messageM = "Message too short!";
    }

    setErrorMessages({
      ...errorMessages,
      new_messageM,
    });
    return verifiedData;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (checkValues()) {
      setValues(initialValuesState);
      socket.emit("sendMessage", values.new_message, (error: string) => {
        if (error) {
          return console.log(error);
        }
        console.log("message delivered!");
      });
    }
  };

  return (
    <Wrapper>
      <form onSubmit={handleSubmit} className="form">
        <FormInput
          name="new_message"
          type="text"
          label="New message"
          required={true}
          errorMessage={errorMessages.new_messageM}
          value={values.new_message}
          handleChange={handleChange}
        />

        <button type="submit" className="btn">
          <h5>Submit</h5>
        </button>
      </form>
      {messages.map(
        (
          { message, createdAt }: { message: string; createdAt: number },
          index: number
        ) => {
          return (
            <p key={index}>
              {message}----{createdAt}
            </p>
          );
        }
      )}
    </Wrapper>
  );
};

export default Room;
