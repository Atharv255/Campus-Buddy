import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ChatState } from "../context/ChatProvider";
import {
  Avatar,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Input,
  Spinner,
  Stack,
  Text,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import ProfileModal from "./ProfileModel";
import UserListItem from "../userAvatar/UserListItem";
import ChatLoading from "../ChatLoading";
import NotificationBadge from "react-notification-badge";
import { Effect } from "react-notification-badge";

const SideDrawer = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false); // New state for profile menu visibility
  const navigate = useNavigate();
  const {
    setSelectedChat,
    user,
    notification,
    chats,
    setChats,
  } = ChatState();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    navigate("/");
  };

  const handleSearch = async () => {
    if (!search) {
      alert("Please enter something in search");
      return;
    }

    try {
      setLoading(true);
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      const { data } = await axios.get(`/api/user?search=${search}`, config);
      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      alert("Error occurred while fetching search results");
      setLoading(false);
    }
  };

  const accessChat = async (userId) => {
    try {
      setLoadingChat(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(`/api/chat`, { userId }, config);
      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
      setSelectedChat(data);
      setLoadingChat(false);
      onClose();
    } catch (error) {
      alert("Error fetching the chat");
      setLoadingChat(false);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between bg-white w-full p-3 border-b border-gray-200">
        <Tooltip label="Search User to chat" hasArrow placement="bottom-end">
          <Button
            variant="ghost"
            onClick={onOpen}
            className="flex items-center space-x-2"
          >
            <i className="fas fa-search"></i>
            <Text className="hidden md:inline px-2">Search User</Text>
          </Button>
        </Tooltip>
        <Text className="text-xl font-sans">Campus Buddy</Text>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" className="relative">
            <NotificationBadge
              count={notification.length}
              effect={Effect.SCALE}
            />
            <BellIcon fontSize="lg" />
          </Button>
          <div className="relative">
            <Button
              bg="white"
              rightIcon={<ChevronDownIcon />}
              onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)} // Toggle visibility
              className="flex items-center space-x-2"
            >
              {user && (
                <Avatar
                  size="sm"
                  cursor="pointer"
                  name={user.name}
                  src={user.pic}
                />
              )}
            </Button>
            {isProfileMenuOpen && ( // Show only when profile is clicked
              <div className="absolute top-full right-0 mt-2 bg-white border border-gray-300 shadow-lg rounded-lg">
                <div className="p-2">
                  <ProfileModal user={user}>
                    <div className="p-2 cursor-pointer hover:bg-gray-100">
                      My Profile
                    </div>
                  </ProfileModal>
                  <div className="border-t border-gray-300 my-2"></div>
                  <div
                    onClick={logoutHandler}
                    className="p-2 cursor-pointer hover:bg-gray-100"
                  >
                    Log Out
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Search Users</DrawerHeader>
          <DrawerBody>
            <div className="flex pb-2">
              <Input
                placeholder="Search by name or email"
                mr={2}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1"
              />
              <Button onClick={handleSearch} className="ml-2">
                GO
              </Button>
            </div>
            {loading ? (
              <ChatLoading />
            ) : (
              <Stack spacing={3}>
                {searchResult?.map((user) => (
                  <UserListItem
                    key={user._id}
                    user={user}
                    handleFunction={() => accessChat(user._id)}
                  />
                ))}
              </Stack>
            )}
            {loadingChat && <Spinner ml="auto" d="flex" />}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SideDrawer;
