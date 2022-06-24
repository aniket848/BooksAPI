import React,{useEffect , useState } from "react";
import jwt_decode  from 'jwt-decode';
import { useNavigate } from "react-router-dom";
import Search from "./components/Search";


const App = ()=>{

  const [user,setUser] = useState({});
  const navigate = useNavigate();

  const handleCallBAck = async (res)=>{
       var userObject = jwt_decode(res.credential);
       setUser(() =>{
           return {...userObject};
       });
       document.getElementById("signInDiv").hidden = true;
      
      const name = userObject.name;
      const email = userObject.email;
      console.log(name,email);


      const response = await fetch("/login",{
         method:"POST",
         headers:{
            "Content-Type" : "application/json"
         },
         body: JSON.stringify({
            email,name
         })
      });

      const data = response.json();

      if(data.status===422 || !data){
           console.log("Login Unsuccessful");
      }else{
        console.log("Login Successful");
        navigate('/search');
      }

       
  }

  const handleSignOut = (e)=>{
     setUser({});
     document.getElementById('signInDiv').hidden = false;
     navigate('/');
  }

  /* global google*/

  useEffect(()=>{
     google.accounts.id.initialize({
       client_id: "1097593189179-4f09p5mj2hg056a3bb21nn0teuobq58l.apps.googleusercontent.com",
       callback: handleCallBAck
     });

     google.accounts.id.renderButton(
        document.getElementById("signInDiv"),
        { theme: "outline" , size:"large"}
     );
  },[])

  

  return(
    <React.Fragment>
        <div id="signInDiv"></div>
        { Object.keys(user).length !==0 &&
           <button onClick={ (e)=> handleSignOut(e)}>SIGN OUT</button>}
        {user.email && <Search/>}
    </React.Fragment>
  )
}

export default App;
