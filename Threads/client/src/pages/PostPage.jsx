import {
  Avatar,
  Flex,
  Text,
  Image,
  Box,
  Divider,
  Button,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { BsThreeDots } from "react-icons/bs";
import { useState } from "react";
import Actions from "../components/Actions"; // Ensure you have the Actions component
import Comment from "../components/Comment";

const PostPage = () => {
  const { pid } = useParams(); // Get the pid from the URL
  const [liked, setLiked] = useState(false);

  // You might fetch post data based on pid here
  // For example purposes, static data is used
  const post = {
    username: "markzuckerberg",
    avatar: "/zuck-avatar.png",
    verified: "/verified.png",
    postImg: "/post1.png",
    postTitle: "hello there",
    likes: 678,
    replies: 900,
    time: "1d",
  };

  return (
    <>
      <Flex direction="column" p={4}>
        <Flex w="full" alignItems="center" gap={3}>
          <Avatar size="md" name="Mark Zuckerberg" src={post.avatar} />
          <Flex alignItems="center">
            <Text fontSize="sm" fontWeight="bold">
              {post.username}
            </Text>
            <Image src={post.verified} w={4} h={4} ml={1} />
          </Flex>
        </Flex>

        <Flex gap={4} alignItems="center" my={2}>
          <Text fontSize="sm" color="gray.light">
            {post.time}
          </Text>
          <BsThreeDots />
        </Flex>
      </Flex>
      <Text fontSize="sm">{post.postTitle}</Text>

      <Box
        borderRadius={6}
        overflow="hidden"
        border="1px solid"
        borderColor="gray.light"
        my={2}
      >
        <Image src={post.postImg} w="full" />
      </Box>

      <Flex gap={3} my={3}>
        <Actions liked={liked} setLiked={setLiked} />
      </Flex>

      <Flex gap={2} alignItems="center">
        <Text color="gray.light" fontSize="sm">
          {post.replies} replies
        </Text>
        <Box w={0.5} h={0.5} borderRadius="full" bg="gray.light"></Box>
        <Text color="gray.light" fontSize="sm">
          {`${post.likes}` + (liked ? 1 : 0)} likes
        </Text>
      </Flex>
      <Divider my={4} />
      <Flex justifyContent={"space-between"}>
        <Flex gap={2} alignItems={"center"}>
          <Text fontSize="2xl" color="gray.light">
            👋
          </Text>
          <Text color={"gray.light"}>Get the app to like,reply and share</Text>
        </Flex>
        <Button>GET</Button>
      </Flex>
      <Divider my={4} />
      <Comment
        comments="great"
        createdAt="2d"
        likes="400"
        username="Jhondoe"
        avatar="https://bit.ly/sage-adebayo"
      />
      <Comment
        comments="nice"
        createdAt="8d"
        likes="34"
        username="Ramesh"
        avatar="https://bit.ly/prosper-baba"
      />
      <Comment
        comments="awesome"
        createdAt="3h"
        likes="3900"
        username="Ram"
        avatar="https://bit.ly/kent-c-dodds"
      ></Comment>
    </>
  );
};

export default PostPage;
