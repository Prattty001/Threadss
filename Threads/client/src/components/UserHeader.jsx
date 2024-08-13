import { Avatar } from "@chakra-ui/avatar";
import { Box, Flex, Link, Text, VStack } from "@chakra-ui/layout";
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/menu";
import { Button, Portal, useToast } from "@chakra-ui/react";
import { BsInstagram } from "react-icons/bs";
import { CgMoreO } from "react-icons/cg";
import { Link as RouterLink } from "react-router-dom";
import {useRecoilValue} from "recoil";
import userAtom from "../atoms/userAtom";
import { useState } from "react";
import useShowToast from "../hooks/useShowToast";

const UserHeader = ({user}) => {
  const toast = useToast();
  //getting the current user status!..
const curruser = useRecoilValue(userAtom); //logged in!..
const[follow,setfollowing]=useState(user.followers.includes(curruser._id));
const [update,setupdate] = useState(false);
const showToast = useShowToast();


//Handling follow and unfollow of user!..
const handlefau = async ()=>{
  if(!curruser){
    showToast("Error","Please Login to fololow","error");
    return;
  }
  setupdate(true);
  try {
    const res = await fetch(`/api/users/follow/${user._id}`,{
      method:"POST",
      headers : {
        "Content-Type":"application/json"
      },
      
    }); 
const data = await res.json();
if(data.error){
    showToast("Error",data.error,"error");
    return;
}   
if(follow){
  showToast("Success",  `Unfollowed${user.name}` ,"success");
  user.followers.pop();
}
else{
  showToast("Success",`followed${user.name}` ,"success");
  user.followers.push( curruser._id);
}
setfollowing(!follow); 
  } catch (error) {
    showToast("Error",error,"error");
  }
  finally{
    setupdate(false);
  }
}
  const copyURL = () => {
    const currentURL = window.location.href;
    navigator.clipboard.writeText(currentURL).then(() => {
      console.log(`URL copied: ${currentURL}`);
      toast({
        title: "URL copied.",
        description: "The current URL has been copied to your clipboard.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    });
  };

  return (
    <VStack gap={4} alignItems={"start"}>
      <Flex justifyContent={"space-between"} w={"full"}>
        <Box>
          <Text fontSize={"2xl"} fontWeight={"bold"}>
            {user.name}
          </Text>
          <Flex gap={2} alignItems={"center"}>
            <Text fontSize={"sm"}>{user.username}</Text>
            <Text
              fontSize={"xs"}
              bg={"gray.800"}
              color={"gray.100"}
              borderRadius={"full"}
              px={2}
            >
              threads.next
            </Text>
          </Flex>
        </Box>
        <Box>
          {user.profilePic && (
            <Avatar
            name={user.name}
            src={user.profilePic}
            size={{
              base: "md",
              md: "xl",
            }}
          />
          )}
          {!user.profilePic && (
            <Avatar
            name={user.name}
            src="https://bit.ly/broken-link"
            size={{
              base: "md",
              md: "xl",
            }}
          />
          )}

        </Box>
      </Flex>
      <Text>{user.bio}</Text>
      {curruser._id===user._id &&(
        <Link as={RouterLink} to='/update' >
        <Button size={"sm"}>Update Profile</Button>
        </Link>
      )}
            {curruser._id!==user._id &&(
        <Button size={"sm"} onClick={handlefau} isLoading={update}>
          
          {follow ? "unfollow" : "follow"}
          </Button>
      )}
      <Flex w={"full"} justifyContent={"space-between"}>
        <Flex gap={2} alignItems={"center"}>
          <Text color={"gray.500"}>{user.followers.length} followers</Text>
          <Box w="1" h="1" bg={"gray.500"} borderRadius={"full"}></Box>
          <Link color={"gray.500"}>instagram.com</Link>
        </Flex>
        <Flex gap={2}>
          <Box className="icon-container">
            <BsInstagram size={24} cursor="pointer" />
          </Box>
          <Box className="icon-container">
            <Menu>
              <MenuButton>
                <CgMoreO size={24} cursor="pointer" />
              </MenuButton>
              <Portal>
                <MenuList bg={"gray.800"}>
                  <MenuItem bg={"gray.800"} onClick={copyURL}>
                    copy link
                  </MenuItem>
                </MenuList>
              </Portal>
            </Menu>
          </Box>
        </Flex>
      </Flex>
      <Flex w={"full"}>
        <Flex
          flex={1}
          borderBottom={"1.5px solid white"}
          justifyContent={"center"}
          pb="3"
          cursor={"pointer"}
        >
          <Text fontWeight={"bold"}>Threads</Text>
        </Flex>
        <Flex
          flex={1}
          borderBottom={"1px solid gray"}
          color={"gray.light"}
          justifyContent={"center"}
          pb="3"
          cursor={"pointer"}
        >
          <Text fontWeight={"bold"}>Replies</Text>
        </Flex>
      </Flex>
    </VStack>
  );
};

export default UserHeader;