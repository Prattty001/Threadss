import { Button, Flex, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useShowToast from "../hooks/useShowToast";
import Post from "../components/Posts";
const HomePage = () => {
const [posts,setpost] = useState([]);
const [loading,setloading] = useState(true);
const showtoast  = useShowToast();
useEffect(()=>{
  const getfeedpost = async()=>{
setloading(true);
try {
  const res = await fetch("/api/posts/feed");
  const data  =await res.json();
  console.log(data)
  setpost(data);


} catch (error) {
  showtoast("Error",data.error,"error");
}finally{
  setloading(false);
}
  };
  getfeedpost();

},[showtoast])

  return (
<>
{!loading && posts.length===0 && <h1>Follow some user to see the Feed</h1>}
{loading && (
  <Flex justify={"center"}>
    <Spinner size={"xl"} />
  </Flex>
)}

{posts.map((p)=>(
  <Post key={p._id} post={p} postedBy={p.postedBy} />
))}

</>
  );
};

export default HomePage;
