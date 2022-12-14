import './Register.css';
import logo from "./images/logo.png";

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, set,onValue } from "firebase/database";


const firebaseConfig = {
    apiKey: "AIzaSyD2dGEzAwGkLH6prQ3vWd4xyKxJftuJDt4",
    authDomain: "jjjj-4255f.firebaseapp.com",
    projectId: "jjjj-4255f",
    storageBucket: "jjjj-4255f.appspot.com",
    messagingSenderId: "772022340394",
    appId: "1:772022340394:web:5c7570080e6a68742eec53",
    measurementId: "G-XNN2CCBSV0"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase();

const current = new Date();

function register() {
    function openlogin(){
        document.getElementById("register").style.visibility = "hidden";
        document.getElementById("login").style.visibility = "visible";
        
        
    }
    function innerRegister() {
        var rname = document.getElementById("fullname").value;
        var remail = document.getElementById("email").value;
        var rphone = document.getElementById("phone").value;
        var rage = document.getElementById("dob").value;
        var rpass = document.getElementById("password").value;
        var rcpass = document.getElementById("conpassword").value;
        var passtemp = rpass;
        var CryptoJS = require("crypto-js");
        rpass = CryptoJS.AES.encrypt(rpass, "anits").toString();;

        if (rname === "" || rphone === "" || rage === "" || rpass === "") {
            alert("Please fill all details...");
            return;
        }

        if (rphone.length !== 10) {
            alert("invalid number");
            return;
        }

        if (passtemp !== rcpass) {
            alert("Passwords mismatch!");
            return;
        }
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (!re.test(remail)) {
            alert("Enter Correct email address");
            return;
        }

        var dob = new Date(rage);  
            var month_diff = Date.now() - dob.getTime();  
            var age_dt = new Date(month_diff);   
            var year = age_dt.getUTCFullYear(); 
            var age = Math.abs(year - 1970);  

            if(age<18 || age>65){
              alert("You are not eligible for our classes as you didn't meet the age requirements");
              return;
            }

        var dbref = ref(db, "/yogacenter/" + rphone);


        onValue(dbref, async (snapshot) => {

            if (snapshot.exists()) {
                alert("User already registered! Please login");
            }
            else {
                set(dbref, {
                    name: rname,
                    email: remail,
                    dob: rage,
                    mobile: rphone,
                    password: rpass,
                    class: "inactive",
                })
                    .then(async () => {
                        alert("register successfull");
                    })
                    .catch(async () => {
                        alert("Registration failed!");
                    });
            }
        }
            , {
                onlyOnce: true
            }
        );

    }


    return (
        <div className='main'>
            <div className='inner-main'>
                <div>
                    <div className='form'>
                        <div className='inner-form'>
                            <div>
                                <div className='login-logo'>
                                    <img src={logo} alt="logo" className='logo' />
                                </div>
                            </div>

                            <h1>Register</h1>
                            
                            <div className='details'>
                                <label>Full Name</label>
                                <input type='text' id='fullname' name='fullname' placeholder='Enter Name' /><br></br>
                                <label>Date of Birth</label>
                                <input type='date' id='dob' name='dob' placeholder='Enter Date of Birth' /><br></br>
                                <label>Email</label>
                                <input type='text' id='email' name='email' placeholder='Enter Email' /><br></br>
                                <label>Phone</label>
                                <input type='number' id='phone' name='phone' placeholder='Enter Phone' /><br></br>
                                <label>Password</label>
                                <input type='password' id='password' name='password' placeholder='Enter Password' /><br></br>
                                <label>Confirm Password</label>
                                <input type='password' id='conpassword' name='conpassword' placeholder='Confirm Password' /><br></br><br></br>
                                <button onClick={innerRegister}>Register</button>
                            </div>

                        </div>
                        <div className='rlogin'>
                                <a href='#' onClick={openlogin}><b>have account?</b></a>
                            </div>
                    </div>
                </div>
            </div>
        </div>
    );
}



export default register;
