// import { useState } from 'react';
// import './CSS/LoginSignUp.css';
// import { FaFacebook, FaGoogle } from 'react-icons/fa';

// const LoginSignUp = () => {

//   const [isLoginSignup, setIsLoginSignup] = useState("Login");
//   const [formData, setFormData] = useState({
//     username: "",
//     email: "",
//     password: "",
//     // confirmPassword: "",
//   });

//   const Login = async () => {
//     console.log("login", formData);
//     let responseData;
//     await fetch("http://localhost:5173/login",{
//       method: "POST",
//       headers: {
//         Accept: "application/form-data",
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(formData),
//     }).then((response)=> response.json()).then((data)=> responseData = data);

//     if(responseData.success){
//       alert("Login Successfully");
//       localStorage.setItem('auth-token', responseData.token);
//       // redirect home page
//       window.location.replace("/");
//     }else{
//       alert(responseData.error);
//       console.error("Error during login:");
//     }
//   };

//   const SignUp = async () => {
//     console.log("signup", formData);
//     let responseData;
//     await fetch("http://localhost:5173/signup",{
//       method: "POST",
//       headers: {
//         Accept: "application/form-data",
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(formData),
//     }).then((response)=> response.json()).then((data)=> responseData = data);

//     if(responseData.success){
//       alert("Sign Up Successfull");
//       localStorage.setItem('auth-token', responseData.token);
//       // redirect home page
//       window.location.replace("/");
//     }else{
//       alert(responseData.error);
//     }
//   };

//   const inputChangeHandler = (event) => {
//     setFormData({
//       ...formData,
//       [event.target.name]: event.target.value,
//       })
//   };
  

//   const handleFormSubmit = (event) => {
//     event.preventDefault();
//     if (isLoginSignup === 'Login') {
//       Login();
//     } else {
//       SignUp();
//     }
//   };

//   return (
//     <div className="auth-container">
//       <div className="auth-form">
//         <h2>{isLoginSignup}</h2>
//         <form onSubmit={handleFormSubmit}>
//           {isLoginSignup === 'Sign Up' && <input type="text" name='username' value={formData.username} onChange={inputChangeHandler} placeholder="Name" required />}
//           <input
//             type="email" name='email' value={formData.email} onChange={inputChangeHandler}
//             placeholder="Email"
//             required
//           />
//           <input
//             type="password" name='password' value={formData.password} onChange={inputChangeHandler}
//             placeholder=" password"
//             required
//           />
//           {/* {isLoginSignup === 'Sign Up' && <input
//             type="password" name='confirmPassword' value={formData.confirmPassword} onChange={inputChangeHandler}
//             placeholder="Confirm password"
//             required
//           />} */}
//           {isLoginSignup === 'Sign Up' && <div className="checkbox-container">
//             <input
//               type="checkbox"
//               id="terms"
              
//             />
//             <label htmlFor="terms">I accept terms and conditions</label>
//           </div>}
//           <button type="submit" className='btn'>{isLoginSignup}</button>
//         </form>
//         {isLoginSignup === 'Sign Up' ? 
//           <span onClick={() => setIsLoginSignup('Login')}>
//             Already have an account? <a href="#login" className="auth-link">Login</a>
//           </span> 
//           : 
//           <span onClick={() => setIsLoginSignup('Sign Up')}>
//             Create an account? <a href="#signup" className="auth-link">Click here</a>
//           </span>
//         }
//         <div className="social-login">
//           <button className='btn'>
//             <FaFacebook size={20} /> Login with Facebook
//           </button>
//           <button className='btn'>
//             <FaGoogle size={20} /> Login with Google
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginSignUp;

import { useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import './CSS/LoginSignUp.css';
import { FaFacebook, FaGoogle } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import OTPVerification from './OTPVerification';
import emailjs from 'emailjs-com';

const LoginSignUp = () => {
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();
  const [isLoginSignup, setIsLoginSignup] = useState("Login");
  const [otpResent, setOtpResent] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [isOTPRequired, setIsOTPRequired] = useState(false);
  const [generatedOTP, setGeneratedOTP] = useState('');
  const [responseData, setResponseData] = useState(null);

  const validateForm = () => {
    let errors = {};
    const usernameRegex = /^[a-zA-Z]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  
    if (isLoginSignup === 'Sign Up' && !formData.username) {
      errors.username = "Username is required";
    } else if (isLoginSignup === 'Sign Up' && !usernameRegex.test(formData.username)) {
      errors.username = "Username should only contain letters";
    }
    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      errors.email = "Email address is invalid";
    }
    if (!formData.password) {
      errors.password = "Password is required";
    } else if (isLoginSignup === 'Sign Up' && !passwordRegex.test(formData.password)) {
      errors.password = "Password must be at least 6 characters, and include uppercase, lowercase, number, and special character";
    } 
    if (isLoginSignup === 'Sign Up' && formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }
    return errors;
  };

  const Login = async () => {
    console.log("login", formData);
    let responseData;
    await fetch("http://localhost:5173/login", {
      method: "POST",
      headers: {
        Accept: "application/form-data",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }).then((response) => response.json()).then((data) => responseData = data);

    if (responseData.success) {
      setResponseData(responseData);
      sendOTP(formData.email);
    } else {
      toast.error(responseData.error);
      console.error("Error during login:", responseData.error);
    }
  };

  const SignUp = async () => {
    console.log("signup", formData);
    let responseData;
    await fetch("http://localhost:5173/signup", {
      method: "POST",
      headers: {
        Accept: "application/form-data",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }).then((response) => response.json()).then((data) => responseData = data);

    if (responseData.success) {
      toast.success("Sign Up Successfully");
      localStorage.setItem('auth-token', responseData.token);
      window.location.replace("/login");
    } else {
      toast.error(responseData.error);
      console.error("Error during sign up:", responseData.error);
    }
  };

  const inputChangeHandler = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
    setErrors({
      ...errors,
      [event.target.name]: '', 
    });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length === 0) {
      if (isLoginSignup === 'Login') {
        Login();
      } else {
        SignUp();
      }
    } else {
      setErrors(formErrors);
    }
  };

  const toggleForm = () => {
    setIsLoginSignup(isLoginSignup === 'Login' ? 'Sign Up' : 'Login');
    setErrors({});
    setFormData({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  const handleGoogleAuth = () => {
    if (isAuthenticated) {
      logout({ returnTo: window.location.origin });
    } else {
      loginWithRedirect();
    }
  };

  const generateOTP = () => {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOTP(otp);
    return otp;
  };

  const sendOTP = (email) => {
    const otp = generateOTP();
    const templateParams = {
      to_email: email,
      otp: otp,
    };

    emailjs.send('service_hv93xeo', 'template_6qthvak', templateParams, 'snnj4zUhD3s5UYh1l')
      .then((response) => {
        console.log('OTP sent successfully!', response.status, response.text);
        toast.success('OTP sent to your email.');
        setIsOTPRequired(true);
      }, (err) => {
        console.error('Failed to send OTP:', err);
        toast.error('Failed to send OTP. Please try again.');
      });
  };

  const resendOTP = (e) => {
    e.preventDefault();
    sendOTP(formData.email);
    setOtpResent(true);
    toast.info('Resent OTP to your email.');
  };

  const handleOTPVerification = (enteredOTP) => {
    if (enteredOTP === generatedOTP) {
      toast.success("OTP Verified Successfully");
      localStorage.setItem('auth-token', responseData.token);
      window.location.replace("/");
    } else {
      toast.error("Invalid OTP");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <ToastContainer />
        {!isOTPRequired ? (
          <>
            <h2>{isLoginSignup}</h2>
            <form onSubmit={handleFormSubmit}>
              {isLoginSignup === 'Sign Up' && (
                <>
                  <input
                    type="text"
                    name='username'
                    value={formData.username}
                    onChange={inputChangeHandler}
                    placeholder="Name"
                  />
                  {errors.username && <span className="error">{errors.username}</span>}
                </>
              )}
              <input
                type="email"
                name='email'
                value={formData.email}
                onChange={inputChangeHandler}
                placeholder="Email"
              />
              {errors.email && <span className="error">{errors.email}</span>}
              <input
                type="password"
                name='password'
                value={formData.password}
                onChange={inputChangeHandler}
                placeholder="Password"
              />
              {errors.password && <span className="error">{errors.password}</span>}
              {isLoginSignup === 'Sign Up' && (
                <>
                  <input
                    type="password"
                    name='confirmPassword'
                    value={formData.confirmPassword}
                    onChange={inputChangeHandler}
                    placeholder="Confirm password"
                  />
                  {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
                  <div className="checkbox-container">
                    <input
                      type="checkbox"
                      id="terms"
                    />
                    <label htmlFor="terms">I accept terms and conditions</label>
                  </div>
                </>
              )}
              <button type="submit" className='btn'>{isLoginSignup}</button>
            </form>
            {isLoginSignup === 'Sign Up' ? 
              <span onClick={toggleForm}>
                Already have an account? <a href="#login" className="auth-link">Login</a>
              </span> 
              : 
              <span onClick={toggleForm}>
                Create an account? <a href="#signup" className="auth-link">Click here</a>
              </span>
            }
            <div className="social-login">
              <button className='btn' onClick={handleGoogleAuth}>
                <FaFacebook size={20} /> {isAuthenticated ? "Logout from Facebook" : "Login with Facebook"}
              </button>
              <button className='btn' onClick={handleGoogleAuth}>
                <FaGoogle size={20} /> {isAuthenticated ? "Logout from Google" : "Login with Google"}
              </button>
            </div>
          </>
        ) : (
          <OTPVerification onVerify={handleOTPVerification} onResendOTP = {resendOTP} />
        )}
      </div>
    </div>
  );
};

export default LoginSignUp;









