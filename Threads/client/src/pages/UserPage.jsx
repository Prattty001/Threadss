import { useParams } from "react-router-dom";
import UserHeader from "../components/UserHeader";
import UserPost from "../components/UserPost";
import useShowToast from "../hooks/useShowToast";
import { useState, useEffect } from "react";
import { Flex, Spinner } from "@chakra-ui/react";

const UserPage = () => {
  const [user,setuser] = useState(null);
  const {username} = useParams();
  const showtoast = useShowToast();
  const [loading,setloading] = useState(true);
  useEffect(()=>{
    const getuser = async()=>{
      try {
        const res = await fetch(`/api/users/profile/${username}`);
        const data  =await res.json();
        if(data.error){
          showtoast("Error",data.error,"error");
          return;
        }  
        setuser(data);
        
      } catch (error) {
        showtoast("Error",error,"error");
      }finally{
        setloading(false)
      }
    };
    getuser();
  },[username,showtoast]);
if(!user && loading){
  return (
    <Flex justifyContent={"center"}>
    <Spinner size={"xl"} />
    </Flex>
  )
}
if(!user && !loading){
  return <h1>User Not Found</h1>
}
  return (
    <>
      <UserHeader user={user} />
      <UserPost
        likes={1200}
        replies={909}
        postImg={"/post1.png"}
        postTitle={"hello there"}
        postId={1}
      />
      <UserPost
        likes={1200}
        replies={909}
        postImg={"/post2.png"}
        postTitle={"hello there"}
        postId={2}
      />
      <UserPost
        likes={1200}
        replies={909}
        postImg={"/post3.png"}
        postTitle={"hello there"}
        postId={3}
      />
    </>
  );
};

export default UserPage;
