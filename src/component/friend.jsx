import { Box, Button, Text } from "@chakra-ui/react";

const Friends = ({ id, fullname, username }) => {
  return (
    <>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        width={"500px"}
        borderRadius="lg"
        boxShadow={"sm"}
        py={2}
        px={6}
      >
        <Text>{fullname}</Text>
        <Button colorScheme={"teal"}>Chat</Button>
      </Box>
    </>
  );
};

export default Friends;
