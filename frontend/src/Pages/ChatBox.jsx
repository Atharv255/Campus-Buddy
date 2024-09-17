import React from "react";
import { Box, Flex, Input, Button } from "@chakra-ui/react";

const ChatBox = ({ fetchAgain, setFetchAgain }) => {
  return (
    <Flex
      className="ChatBox"
      direction="column"
      w="full"
      h="full"
      p="2"
      overflow="hidden"
      bg="gray.50"
      // Tailwind responsive padding
      md:p="4"
    >
      {/* Chat messages container */}
      <Box
        className="messagesContainer"
        flex="1"
        overflowY="auto"
        mb="2"
        p="2"
        bg="white"
        border="1px"
        borderColor="gray.200"
        rounded="md"
        // Tailwind responsive height
        h="80"
        md:h="96"
      >
        {/* Messages will go here */}
      </Box>

      {/* Input and Send Button */}
      <Flex className="inputContainer" mt="2" flexWrap="wrap">
        <Input
          className="messageInput"
          placeholder="Type your message..."
          border="1px"
          borderColor="gray.300"
          flex="1"
          rounded="md"
          p="2"
          // Tailwind responsive font size and padding
          text-sm
          md:text-base
        />
        <Button className="sendButton" ml="2" colorScheme="blue" px="4">
          Send
        </Button>
      </Flex>
    </Flex>
  );
};

export default ChatBox;
