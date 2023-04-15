
import { async } from "q";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router";

const Login = (props) => {

    const navigate = useNavigate()

    const [exsists, setExsists] = useState(false)

    const handleSignUp = async (e) => {
        e.preventDefault();
      
        const email = e.target.elements.email.value;
        const password = e.target.elements.password.value;
      
        await fetch('http://localhost:3001/api/register', {
          method: 'POST',
          body: JSON.stringify({
            email: email,
            password: password
          }),
          headers: {'Content-type':'application/json'}
        })
        .then(res => {
            return res.json()
          
        }).then(data => {
            if (data.msg == "error"){
                setExsists(true)
            } else{ 
            console.log(data.msg); // Access the msg field from the parsed JSON response
            // navigate("/", {state :{id: data.msg}})
            }
        })
        .catch(err => {
            console.log("fuck")
        })
      }

    const handleLogin = async(e) => {
        e.preventDefault();
    
        const email = e.target.elements.email.value;
        const password = e.target.elements.password.value;

        await fetch('http://localhost:3001/api/login', {
            method: 'POST',
            body: JSON.stringify({
              email: email,
              password: password
            }),
            headers: {'Content-type':'application/json'}
          })
          .then(res => {
              return res.json()
            
          }).then(data => {
            console.log(data)
          })
          .catch(err => {
              console.log("fuck")
          })
    
    }
    

    return(
        <>
        <div style={{height:"6vh", display:"flex", flexDirection:"row", alignItems:"center", backgroundColor:"#7D7DFF", justifyContent:"center"}}>
            <button style={{border:"none", height: "30px", fontSize:"16px", borderRadius:"6px"}}>Login</button>
        </div>

        <form onSubmit={(e) => handleLogin(e)}style={{display: "flex", flexDirection:"column", alignItems: "center", marginTop:"25px"}}>
            <label style={{textAlign:"center"}} name="email">Email Address</label>
            <input style={{borderRadius:"20px", padding: "2px 10px", marginTop:"2px", width:"140px"}} required type="text" name="email" placeholder="Please type here..." maxLength="50"></input>
            <label style={{textAlign:"center", marginTop:"20px"}}name="password">Password </label>
            <input style={{borderRadius:"20px", padding: "2px 10px", marginTop:"2px", width:"140px"}} required type="password" name="password" placeholder="Please type here..." maxLength="50"></input>
            <input style={{marginTop:"20px"}} type="submit" value="Login" />
        </form>

        <div style={{marginTop: "30px", height:"6vh", display:"flex", flexDirection:"row", alignItems:"center", backgroundColor:"#7D7DFF", justifyContent:"center"}}>
            <button style={{border:"none", height: "30px", fontSize:"16px", borderRadius:"6px"}}>Sign Up</button>
        </div>

        <form onSubmit={(e) => handleSignUp(e)} style={{display: "flex", flexDirection:"column", alignItems: "center", marginTop:"25px"}}>
            <label style={{textAlign:"center"}} name="email">Email Address</label>
            <input style={{borderRadius:"20px", padding: "2px 10px", marginTop:"2px", width:"140px"}}  required type="text" name="email" placeholder="Please type here..." maxLength="50"></input>
            <label style={{textAlign:"center", marginTop:"20px"}}name="password">Password <br/>Do not use a password you use elsewhere<br/><u style={{color:"orange"}}>Screen shot your password</u></label>
            <input style={{borderRadius:"20px", padding: "2px 10px", marginTop:"2px", width:"140px"}} required type="text" name="password" placeholder="Please type here..." maxLength="50"></input>
            <input style={{marginTop:"20px"}} type="submit" value="Sign Up" />
        </form>

        <h2 style={{textAlign:"center", color:"orange", display: exsists == false? "none": "block" }}>Email already exsists</h2>

        <p style={{margin:"20px"}}>Please screenshot your password because if you forget it, 
        your conent will need to be manually recovered.<br/><br/>
            This is just a prototype, password recoverery is coming soon!
        </p>
        
        </>
    )
}

export default Login