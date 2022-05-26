import { Box, Button, Icon, Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { BiLogIn, BiLogOut } from "react-icons/bi";

const Navbar = () => {
  const authSelector = useSelector((state) => state.user);

  return (
    <Box
      as={"nav"}
      sx={{ position: "sticky", top: 0, backgroundColor: "white" }}
      zIndex={9}
    >
      <Box
        display={"flex"}
        justifyContent="space-between"
        alignItems={"center"}
        py={3}
        boxShadow={"md"}
      >
        <Box mx={8}>
          <Text fontWeight={"bold"} fontSize={"2xl"}>
            Chat-App
          </Text>
        </Box>
        <Box mx={8}>
          {authSelector.id ? (
            <Button
              colorScheme={"teal"}
              size="md"
              rightIcon={<Icon as={BiLogOut} />}
            >
              Logout
            </Button>
          ) : (
            <Button
              colorScheme={"teal"}
              size="md"
              rightIcon={<Icon as={BiLogIn} />}
            >
              Login
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Navbar;
