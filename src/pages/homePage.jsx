import { Box, Center, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Friends from "../component/friend";
import axiosInstance from "../config/api";

const HomePage = () => {
  const [user, setUser] = useState([]);
  const [showFriendOrChatList, setShowFriendOrChatList] = useState("friend");

  const fetchUser = async () => {
    try {
      const users = await axiosInstance.get("/user");

      setUser(users.data.result);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const renderUser = () => {
    return user.map((val) => {
      // console.log(val.fullname);
      return <Friends fullname={val.fullname} id={val.id} />;
    });
  };

  return (
    <>
      <Center>
        <Box boxShadow="lg" height={"calc(100vh - 65px)"} overflow={"scroll"}>
          <Box
            width={"500px"}
            height={"25px"}
            display={"flex"}
            justifyContent={"space-around"}
            pt={4}
            py={4}
            my={6}
          >
            <Box>
              <Text
                fontWeight={
                  showFriendOrChatList === "friend" ? "extrabold" : "semibold"
                }
                as={showFriendOrChatList === "friend" ? "ins" : ""}
                onClick={() => setShowFriendOrChatList("friend")}
              >
                Friends
              </Text>
            </Box>
            <Box>
              <Text
                fontWeight={
                  showFriendOrChatList === "chat" ? "extrabold" : "semibold"
                }
                as={showFriendOrChatList === "chat" ? "ins" : ""}
                onClick={() => {
                  setShowFriendOrChatList("chat");
                }}
              >
                Chats
              </Text>
            </Box>
          </Box>
          {showFriendOrChatList == "friend" ? renderUser() : ""}
        </Box>
      </Center>
    </>
  );
};

export default HomePage;
