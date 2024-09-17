import SideDrawer from "../components/miscellaneous/SideDrawer";
import MyChats from "../components/miscellaneous/MyChats";
import ChatBox from "../components/miscellaneous/ChatBox";
import { useState } from "react";
import { ChatState } from "../components/context/ChatProvider";
import LinkSlider from "./LinkSlider";

const Chatpage = () => {
  const [fetchAgain, setFetchAgain] = useState(false);
  const { user } = ChatState();
  const links = [
    "https://github.com/Atharv255/College-Buddy",
    "https://www.rgpvnotes.in/btech/grading-system-old/notes/",
    "https://socket.io/docs/v4/",
    "https://chat.openai.com/",
    "https://www.mongodb.com/",
    "https://expressjs.com/",
    "https://react.dev/",
    "https://www.youtube.com/playlist?list=PLwGdqUZWnOp2Z3eFOgtOGvOWIk4e8Bsr_",
    "https://www.geeksforgeeks.org/learn-data-structures-and-algorithms-dsa-tutorial/",
    "https://www.geeksforgeeks.org/blockchain/",
    "https://www.javatpoint.com/blockchain-tutorial",
    "https://www.javatpoint.com/dbms-tutorial",
    "https://www.javatpoint.com/sql-tutorial",
    "https://www.javatpoint.com/mongodb-tutorial",
    "https://www.javatpoint.com/sql-server-tutorial",
    "https://www.javatpoint.com/c-sharp-tutorial",
    "https://www.javatpoint.com/angularjs-tutorial",
    "https://www.javatpoint.com/jquery-tutorial",
    "https://www.w3schools.com/sql/",
    "https://prepinsta.com/tcs-nqt/placement-papers/coding-questions/",
    "https://www.indiabix.com/aptitude/questions-and-answers/",
  ];

  return (
    <div className="ChatPage">
      {user && <SideDrawer />}
      <div className="flex flex-col md:flex-row justify-between p-1 w-full h-[91.5vh]">
        {user && <MyChats fetchAgain={fetchAgain} />}
        {user && (
          <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
        {/* Hide LinkSlider on mobile screens */}
        <div className="hidden md:block">
          <LinkSlider links={links} speed={1000} />
        </div>
      </div>
    </div>
  );
};

export default Chatpage;
