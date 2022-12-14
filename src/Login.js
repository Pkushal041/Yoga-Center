import './Login.css';
import logo from "./images/logo.png";
import phone from "./images/phone.png";
import pass from "./images/pass.png";


import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref , set, child , update, remove, onValue, get} from "firebase/database";

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
function Login() {

    function openregister(){
        document.getElementById("register").style.visibility = "visible";
        document.getElementById("login").style.visibility = "hidden";
    }
    function innerLogin() {
        function dispinfo(sid){
            
              get(child(ref(db), "yogacenter/" + sid)).then((snapshot) => {
                  if (snapshot.exists()) {
                  var name = snapshot.child('name').val();
                  var mobile = snapshot.child('mobile').val();
                  var dob = snapshot.child('dob').val();
                  var classs = snapshot.child('class').val();
                  var pwd = snapshot.child('password').val();
                  var batchh = snapshot.child('batch').val();
                  document.getElementById("dname").innerHTML = " Name : "+name;
                  document.getElementById("dmobile").innerHTML = " Mobile : "+mobile;
                  document.getElementById("ddob").innerHTML = " DOB : "+dob;
                  sessionStorage.setItem("class",classs);
                  sessionStorage.setItem("pwd",pwd);
                  if(classs==="active"){
                    document.getElementById("paid").style.visibility = "visible";
                    document.getElementById("timeslot").innerHTML = batchh;
                  }
                  }
              });
              alert("sdsd");
            } 
        var sid = document.getElementById("lphone").value;
        var spass = document.getElementById("lpass").value;
        if (sid === "" || spass === "") {
            alert("Please fill all details!");
        }
        get(child(ref(db), "yogacenter/" + sid)).then(async (snapshot) => {

            if (snapshot.exists()) {
                var pass = snapshot.child('password').val();
                var CryptoJS = require("crypto-js");
                pass = CryptoJS.AES.decrypt(pass, "anits").toString(CryptoJS.enc.Utf8);
                if (pass === spass) {
                    document.getElementById("homeblock").style.visibility = "visible";
                    document.getElementById("phone").value = "";
                    document.getElementById("pass").value = "";
                    document.getElementById("fullname").value = "";
                    document.getElementById("lphone").value = "";
                    document.getElementById("lpass").value = "";
                    document.getElementById("conpassword").value = "";
                    document.getElementById("dob").value = "";
                    dispinfo(sid);
                }
                else {
                    alert("Wrong password");
                }
            }
            else {
                alert("Invalid user");
            }
        });


    }



    return (
        <div className='lmain'>
            <div className='linner-main'>
                <div>
                    <div className='lform'>
                        <div className='linner-form'>
                            <div>
                                <div className='llogin-logo'>
                                    <img src={logo} alt="logo" className='llogo' />
                                </div>
                            </div>

                            <h1>Login</h1>
                            <div className='ldetails'>
                                <div>
                                    
                                    <input type="text" id="lphone" name='phone' placeholder='Phone' className='lname' />
                                </div>
                                <div>
                                   
                                    <input type="password" id="lpass" name='lpass' placeholder='Password' className='lname' />
                                </div>
                                <div className='lbutton'>
                                    <button onClick={innerLogin}><b>Login</b></button>
                                </div>
                            </div>

                            <div className='lregister'>
                                <a href='#' onClick={openregister}><b>Don't have account?</b></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
