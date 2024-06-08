import React, { useState } from "react";
import { Box, Container, VStack, HStack, Text, Input, Button, Avatar, IconButton, useToast } from "@chakra-ui/react";
import { FaPaperPlane, FaUserCircle } from "react-icons/fa";

const contacts = [
  { id: 1, name: "Alice", avatar: 'https://images.unsplash.com/photo-1557053910-d9eadeed1c58?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHBvcnRyYWl0fGVufDB8fHx8MTcxNzg1ODk0OHww&ixlib=rb-4.0.3&q=80&w=1080' },
  { id: 2, name: "Bob", avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxtYW4lMjBwb3J0cmFpdHxlbnwwfHx8fDE3MTc4NTg5NDh8MA&ixlib=rb-4.0.3&q=80&w=1080' },
  { id: 3, name: "Charlie", avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwyfHxtYW4lMjBwb3J0cmFpdHxlbnwwfHx8fDE3MTc4NTg5NDh8MA&ixlib=rb-4.0.3&q=80&w=1080' },
];

const Index = () => {
  const [selectedContact, setSelectedContact] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const toast = useToast();

  const handleSendMessage = () => {
    if (newMessage.trim() === "") {
      toast({
        title: "Message cannot be empty.",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    setMessages([...messages, { sender: "You", text: newMessage }]);
    setNewMessage("");
  };

  return (
    <Container maxW="container.xl" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <HStack spacing={4} width="100%" height="100%">
        <VStack width="30%" height="100%" bg="gray.100" p={4} borderRadius="md" overflowY="auto">
          {contacts.map((contact) => (
            <HStack key={contact.id} width="100%" p={2} borderRadius="md" bg={selectedContact?.id === contact.id ? "gray.300" : "white"} onClick={() => setSelectedContact(contact)} cursor="pointer">
              <Avatar src={contact.avatar} />
              <Text>{contact.name}</Text>
            </HStack>
          ))}
        </VStack>
        <VStack width="70%" height="100%" bg="white" p={4} borderRadius="md" boxShadow="md">
          {selectedContact ? (
            <>
              <HStack width="100%" p={2} borderBottom="1px" borderColor="gray.200">
                <Avatar src={selectedContact.avatar} />
                <Text fontSize="xl">{selectedContact.name}</Text>
              </HStack>
              <VStack width="100%" flex="1" overflowY="auto" spacing={4} p={4}>
                {messages.map((message, index) => (
                  <HStack key={index} width="100%" justifyContent={message.sender === "You" ? "flex-end" : "flex-start"}>
                    <Box bg={message.sender === "You" ? "blue.100" : "gray.100"} p={3} borderRadius="md">
                      <Text>{message.text}</Text>
                    </Box>
                  </HStack>
                ))}
              </VStack>
              <HStack width="100%" p={2} borderTop="1px" borderColor="gray.200">
                <Input value={newMessage} onChange={(e) => setNewMessage(e.target.value)} placeholder="Type a message..." />
                <IconButton aria-label="Send" icon={<FaPaperPlane />} onClick={handleSendMessage} />
              </HStack>
            </>
          ) : (
            <VStack flex="1" justifyContent="center" alignItems="center">
              <FaUserCircle size="100px" color="gray.300" />
              <Text fontSize="xl" color="gray.500">
                Select a contact to start chatting
              </Text>
            </VStack>
          )}
        </VStack>
      </HStack>
    </Container>
  );
};

export default Index;
