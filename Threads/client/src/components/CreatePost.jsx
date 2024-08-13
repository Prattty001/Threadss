import { AddIcon } from "@chakra-ui/icons";
import { Button, FormControl, Modal, useColorModeValue, useDisclosure, ModalOverlay, ModalFooter, ModalContent, ModalHeader, Input, Flex, CloseButton } from "@chakra-ui/react";
import { ModalCloseButton, ModalBody } from "@chakra-ui/react";
import { Textarea } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import usePreviewImg from "../hooks/usePreviewImg";
import { useRef, useState } from "react";
import { BsFillImageFill } from "react-icons/bs";
import { Image } from "@chakra-ui/react";
import userAtom from "../atoms/userAtom";
import useShowToast from "../hooks/useShowToast";
import { useRecoilValue } from "recoil";

const MAX_CHAR = 500;

const CreatePost = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setloading] = useState(false);
  const { handleImageChange, imgUrl, setImgUrl } = usePreviewImg();
  const [postText, setpostText] = useState('');
  const [remainingchar, setremainingchar] = useState(MAX_CHAR);
  const imageref = useRef(null);
  const showtoast = useShowToast();
  const user = useRecoilValue(userAtom);

  const handletextchange = (e) => {
    const inputText = e.target.value;
    if (inputText.length > MAX_CHAR) {
      const tructext = inputText.slice(0, MAX_CHAR);
      setpostText(tructext);
      setremainingchar(0);
    } else {
      setpostText(inputText);
      setremainingchar(MAX_CHAR - inputText.length);
    }
  };

  const handle = async () => {
    setloading(true);
    try {
      console.log("Hello I am called");
      const res = await fetch('/api/posts/create', { // Ensure port matches your server's port
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ postedBy: user._id, text: postText, img: imgUrl })
      });
      const data = await res.json();
      if (data.error) {
        showtoast("Error", data.error, "error");
      } else {
        showtoast("Success", "Post created successfully", "success");
        onClose();
        setpostText("");
        setImgUrl("");
      }
    } catch (error) {
      showtoast("Error", "An unexpected error occurred", "error");
    } finally {
      setloading(false);
    }
  };
  

  return (
    <>
      <Button
        position={"fixed"}
        bottom={10}
        right={10}
        leftIcon={<AddIcon />}
        bg={useColorModeValue("gray.300", "gray.dark")}
        onClick={onOpen}
      >
        Post
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Post</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <Textarea
                placeholder="Post content here.."
                onChange={handletextchange}
                value={postText}
              />
              <Text
                fontWeight={"bold"}
                textAlign={"right"}
                color={"gray.800"}
              >
                {remainingchar}/{MAX_CHAR}
              </Text>
              <Input
                type="file"
                hidden
                ref={imageref}
                onChange={handleImageChange}
              />
              <BsFillImageFill
                style={{ marginLeft: "5px", cursor: "pointer" }}
                onClick={() => imageref.current.click()}
              />
            </FormControl>

            {imgUrl && (
              <Flex mt={5} width={"full"} position={"relative"}>
                <Image src={imgUrl} />
                <CloseButton
                  onClick={() => {
                    setImgUrl("");
                  }}
                  bg={"gray.800"}
                  position={"absolute"}
                  top={2}
                  right={2}
                />
              </Flex>
            )}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={handle} isLoading={loading}>
              Post
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreatePost;
