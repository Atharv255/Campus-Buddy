import React from "react";
import { ChatState } from "../context/ChatProvider";
import SingleChat from "../SingleChat";

const Chatbox = ({ fetchAgain, setFetchAgain }) => {
  const { selectedChat } = ChatState();

  return (
    <div
      className={`${
        selectedChat ? "flex" : "hidden"
      } md:flex flex-col items-center p-3 bg-[#e0ccf0] rounded-lg border border-gray-200 
        absolute inset-0 md:static md:w-2/3 md:ml-3 md:top-auto md:right-auto md:max-w-full 
        w-full h-full md:h-auto`}
    >
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
    </div>
  );
};

export default Chatbox;
