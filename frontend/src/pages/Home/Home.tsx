import React, { useEffect, useState } from "react";
import { Wrapper } from "./Home.style";
import { io } from "socket.io-client";
import FormInput from "../../components/FormComponents/FormInput/FormInput";
import moment from "moment";

const initialValuesState = {
  new_message: "",
};

const initialErrorState = {
  new_messageM: "",
};

const Home = () => {
  const [values, setValues] = useState(initialValuesState);
  const [errorMessages, setErrorMessages] = useState(initialErrorState);
  const [messages, setMessages] = useState<any[]>([]);

  return <Wrapper></Wrapper>;
};

export default Home;
