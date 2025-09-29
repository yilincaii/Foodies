import React from 'react';
import './Login.css';
import { Link,useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { login } from '../../service/authService';
import { useContext } from 'react';
import { StoreContext } from '../../pages/Contact/StoreContext';
import { toast } from 'react-toastify';    

const Login = () => {
    const {setToken,loadCartData} = useContext(StoreContext);
    const navigate = useNavigate();
    const [data, setData] = useState({
        email: '',
        password: ''
    });
    const onChangeHandler = (event) => {
        const name  = event.target.name;
        const value = event.target.value;
        
        setData(data => ({ ...data, [name]: value }));
    }

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        // Handle login logic here
        try {
            const response = await login(data);
            if (response.status === 200) {
                setToken(response.data.token);
                localStorage.setItem("token",response.data.token);
                loadCartData(response.data.token);
                navigate('/');//navigate to home page
            }else{
                toast.error("Login failed. Please try again.");
            }
        } catch (error) {
            console.log("Login error:", error);
            toast.error("Login failed. Please try again.");
            
        }
    }
  return (
      <div className="login-container">
    <div className="row">
      <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
        <div className="card border-0 shadow rounded-3 my-5">
          <div className="card-body p-4 p-sm-5">
            <h5 className="card-title text-center mb-5 fw-light fs-5">Sign In</h5>
            <form onSubmit={onSubmitHandler}>
              <div className="form-floating mb-3">
                <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" name="email" onChange={onChangeHandler} value={data.email} />
                <label htmlFor="floatingInput">Email address</label>
              </div>
              <div className="form-floating mb-3">
                <input type="password" className="form-control" id="floatingPassword" placeholder="Password" name="password" onChange={onChangeHandler} value={data.password}/>
                <label htmlFor="floatingPassword">Password</label>
              </div>
              <div className="d-grid">
                <button className="btn btn-outline-primary btn-login text-uppercase" type="submit">Sign
                  in</button>
                <button className="btn btn-outline-danger btn-login text-uppercase mt-2" type="reset">Reset</button>
              </div>
                <div className="mt-4">
                    Don't have an account? <Link to= "/register">Sign up</Link>
                </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Login;