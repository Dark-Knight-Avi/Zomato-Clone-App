import React from 'react';
import '../Styles/Header.css';
import Modal from 'react-modal';
import axios from 'axios';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import {withRouter} from 'react-router-dom';


  const CreateBOXStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: 'white',
      border: 'solid 1px brown',
      height: '345px',
      width: '345px'
    },
  };

  const UserloginBOXStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      background: '#e9ecefd4',
      width: '413px',
      height: '348px',
    border: 'none'
    },
  };

  
  const ANOTHERModalstyle = {

    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      background: '#e9ecefd4',
      width: '328px',
      height: '369px',
    border: 'none'
    },
  };

class Header extends React.Component{
    constructor(){
        super();
        this.state= {
           
            handleCloseModal:false,
            isLoggedIn: false,
            loggedInUser:undefined,
            UserloginModalIsOpen:false,
            user_id:undefined,
            pass:undefined,
            ANOTHERModalIsOpen: false,
            user:[],   

           
        }
    }
     
    handleNavigate=(userID)=>{
      this.props.history.push(`/orders?account=${userID}`);
  }
  homeNavigate=(id)=>{
    this.props.history.push(`/`);
}
    handleInputChange = (event,state)=>{
      this.setState({[state] : event.target.value});
  }

    handleLogedin = (event,state,value) => {
       
      const { email, password} = this.state;
      
        const loginObj = {
          email: email,
          password: password,
      };
      
      if(email ===undefined ){
        alert("Please enter email details");
        return false;
      }
       if(password ===undefined ){
        alert("Please enter password details");
        return false;
      }
      else{
      axios({
          method: 'POST',
          url: 'http://localhost:2029/user',
          headers: { 'Content-Type': 'application/json' },
          data: loginObj
      })
          .then(response => {
            
              this.setState({
                  isLoggedIn: response.data.isauthenticateduser,
                  email: '',
                  password: '',
                  loggedInUser: email,
                  ANOTHERModalIsOpen: false,
                  loginModalIsOpen:false,
                  email:email
                  
                  
                
              });
            localStorage.setItem("isLoggedIn",response.data.isauthenticateduser);
            localStorage.setItem("loggedInUser",email);
              alert(response.data.message);
              this.setState({[state]:value,CreateModalIsOpen:false});
              {window.location.reload(false)}
          
          })
          .catch(err => console.log(err))
          
  }
}
 

///
handleoutputChange = (event,state,value)=>{
  this.setState({[state] : event.target.value});
}
handleregisterclose=(state,value)=>{
  this.setState({[state]:value,ANOTHERModalIsOpen:false});
}
    handlesignup=(event,state,value)=>{
     
      const {firstName,lastName, email, password} = this.state;
      
        const loginObj = {
          firstName:firstName,
          lastName:lastName,
          email: email,
          password: password
          
      };
      {console.log(loginObj)}
      if(firstName ===undefined ){
        alert("Please enter firstname");
        return false;
      }
       if(lastName ===undefined ){
        alert("Please enter lastname");
        return false;
      }
      if(email ===undefined ){
        alert("Please enter email");
        return false;
      }
      if(password ===undefined ){
        alert("Please enter password");
        return false;
      }
      else{
      axios({
          method: 'POST',
          url: 'http://localhost:2029/signup',
          headers: { 'Content-Type': 'application/json' },
          data: loginObj
      })
          .then(response => {
            
              this.setState({
                  isLoggedIn: response.data.isAuthenticated,
                  firstname: '',
                  lastname: '',
                  email: '',
                  password: '',
               
                  
                
              });
              
              alert(response.data.message);
              this.setState({[state]:value,UserloginModalIsOpen:false});
          
          })
          .catch(err => console.log(err))
          
  }
}


    handleCloseModal=(state,value)=>{
    this.setState({[state]:value, ANOTHERModalIsOpen:false});
    
    }
    handleopenaccount=(state,value)=>{
      this.setState({[state]:value});
    }

    responseGoogle = (response) => {
      localStorage.setItem("isLoggedIn","true");
      localStorage.setItem("loggedInUser",response.profileObj.name);
        this.setState({ isLoggedIn: true, loggedInUser: response.profileObj.name,loginModalIsOpen: false});
        
       
      }
      handleout= (response) => {
      
        this.setState({isLoggedIn: false});
        localStorage.removeItem("loggedInUser");
        localStorage.removeItem("isLoggedIn");
        this.props.history.push(`/`);
        {window.location.reload(false)}
      }
      
      responseFacebook = (response) => {
        localStorage.setItem("isLoggedIn","true");
      localStorage.setItem("loggedInUser",response.name);
        this.setState({ userName: response.name, isLoggedIn: true, loginModalIsOpen: false })
    }
        

render(){
  
    const {loginModalIsOpen,CreateModalIsOpen,UserloginModalIsOpen,ANOTHERModalIsOpen,}=this.state;
    return(
        <div className="app-header">


                    <a href="/" className="af" >e!</a>
                    <span className="datetime">{datetime}</span>
                 {/*<span id="time"></span> */}
                   
                    {localStorage.getItem("isLoggedIn")==="true" ? 
                    
                    <a className="maccountname">{localStorage.getItem("loggedInUser")}
                   <span class="dropdown">
 
 <span class="glyphicon glyphicon-user dropbtn"></span>
 <span class="dropdown-content">
 <a href="" onClick={() =>this.homeNavigate()}>Home</a>
   <a href="" onClick={() =>this.handleNavigate(localStorage.getItem("loggedInUser"))}>Orders</a>
   <a className="mlogout" onClick={() =>this.handleout()}>Logout
                    <span class="glyphicon">&#xe163;</span>
                    
                    </a>
 </span>
</span>
                    
                    </a>:
                     
                    <div> 
                    <a href="#" className="allmlogin" onClick={() => this.handleopenaccount('loginModalIsOpen', true)}>Login</a>
                    <a href="#" className="maccount" onClick={() => this.handleopenaccount('ANOTHERModalIsOpen', true)}>Create an account</a>
                    </div>
                }


             {/* Login modal */}
    <Modal
     isOpen={loginModalIsOpen}
     style={UserloginBOXStyles}
                >
   <div className="glyphicon glyphicon-remove" style={{ float: 'right', margin: '5px' }} onClick={() => this.handleCloseModal('loginModalIsOpen', false)}></div>
   <div className="Login-form">
        <span className="loginh">LOGIN</span>
                            <input type="email" aria-describedby="emailHelp" placeholder="Email address"  className="form-control" required onChange={(event) => this.handleInputChange(event, 'email')} />
                             <br/>
                            <input type="password" placeholder="Password" className="form-control" required onChange={(event) => this.handleInputChange(event, 'password')} />
                            <button className="btn btn-danger PROCEED" onClick={this.handleLogedin}>LOGIN </button>
                            <hr className="hrline"/> 
                    </div>
                 
   <GoogleLogin
    clientId="185919428299-0u0vajn8n0vabgm5cqahv8i1i8ama9fv.apps.googleusercontent.com"
    buttonText="Continue with Google"
    onSuccess={this.responseGoogle}
    onFailure={this.responseGoogle}
    cookiePolicy={'single_host_origin'}
    className="Googlelogin"
  />
<FacebookLogin
                                appId="147211824006116"
                                fields="name,email,picture"
                                textButton="login with FB"
                                callback={this.responseFacebook} />
                            <div className="signUp login"> </div>

                            
 
                    </Modal>


{/* Create account modal */}

                    <Modal
     isOpen={CreateModalIsOpen}
     style={CreateBOXStyles}
                >
   <div className="glyphicon glyphicon-remove" style={{ float: 'right', margin: '5px' }} onClick={() => this.handleCloseModal('CreateModalIsOpen', false)}></div>
  
  <div>
<a href="#" onClick={()=>this.handleuserlogin('UserloginModalIsOpen',true)}>Signup</a>
<a href="#" className="loginmodal" onClick={() => this.handleCloseModal('ANOTHERModalIsOpen', true)}>Login</a>
</div>
                    </Modal>


                    <Modal
     isOpen={UserloginModalIsOpen}
     style={ANOTHERModalstyle}
                >
   <div className="glyphicon glyphicon-remove" style={{ float: 'right', margin: '5px' }} onClick={() => this.handleCloseModal('UserloginModalIsOpen', false)}></div>
   <span className="res-acc">Register account</span>
   <div className="Login-form">
   <input type="firstName" class="form-control" placeholder="First name" required onChange={(event) => this.handleoutputChange(event, 'firstName')}/>
   <br/>
   <input type="lastName" class="form-control" placeholder="Last name" required onChange={(event) => this.handleoutputChange(event, 'lastName')}/>
   <br/>
                            <input type="email" aria-describedby="emailHelp" placeholder="Email address"  className="form-control" required onChange={(event) => this.handleoutputChange(event, 'email')} />
                             <br/>
                            <input type="password" placeholder="Password" className="form-control" required onChange={(event) => this.handleoutputChange(event, 'password')} />
                            <button className="btn btn-danger PROCEED" onClick={this.handlesignup}>Register </button>
                            
                    </div>
                    </Modal>    

{/* login manual modal */}

                <Modal
                    isOpen={ANOTHERModalIsOpen}
                    style={ANOTHERModalstyle}
                    ariaHideApp={false}
                >
                    <div>
                    <span className="loginModal">Sign in with</span>
                    <i class="fab fa-facebook" onClick={() => this.handleCloseModal('loginModalIsOpen', true)}></i>
                    <i class="fab fa-google-plus" onClick={() => this.handleCloseModal('loginModalIsOpen', true)}></i>
                    <div className="glyphicon glyphicon-remove" style={{ float: 'right', margin: '5px' }} onClick={() => this.handleCloseModal('ANOTHERModalIsOpen', false)}></div>
     
                    <div className="Login-form">
                    <hr/>
                            <input type="email" aria-describedby="emailHelp" placeholder="Email address"  className="form-control" required onChange={(event) => this.handleInputChange(event, 'email')} />
                             <br/>
                            <input type="password" placeholder="Password" className="form-control" required onChange={(event) => this.handleInputChange(event, 'password')} />
                            <button className="btn btn-danger PROCEED" onClick={this.handleLogedin}>LOGIN </button>
                    </div>
                    <p class="small fw-bold mt-2 pt-1 mb-0">Don't have an account? <a href="#!"
                class="link-danger" onClick={()=>this.handleregisterclose('UserloginModalIsOpen',true)}>Register</a></p>
                    </div>
                    </Modal>
        </div>
    )
}


}
var d = new Date();
 
var date = d.getDate()+'/'+(d.getMonth()+1)+'/'+d.getFullYear();
var time = d.getHours() + ":" + d.getMinutes() ;
var datetime= date+' , '+time;


/*const checkTime=(i) =>{
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }
    
   const startTime=()=> {
    
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    // add a zero in front of numbers<10
    m = checkTime(m);
    s = checkTime(s);
  window.onload= function(){
  
    {document.getElementById('time').innerHTML = h + ":" + m + ":" + s};
  
  }
   const t = setTimeout(()=> {
      startTime()
    }, 500);
  
  }
startTime(); */
  


export default withRouter(Header);