import React,{useState} from 'react';
import './Register.css';
import { Link } from 'react-router-dom';

const Register = () => {
    const [data,setData] = useState({
        name:'',
        email:'',
        password:''
    });

    //handle function
    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({...data, [name]: value}));
    }

    const onSubmitHandler = (event) => {
        event.preventDefault();
        console.log(data);
    }
  return (
          <div className="register-container">
    <div className="row">
      <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
        <div className="card border-0 shadow rounded-3 my-5">
          <div className="card-body p-4 p-sm-5">
            <h5 className="card-title text-center mb-5 fw-light fs-5">Sign Up</h5>
            <form onSubmit={onSubmitHandler}>
                <div className="form-floating mb-3">
                <input type="text" className="form-control" id="floatingName" placeholder="Sam Smith" 
                name="name" onChange={onChangeHandler} value={data.name} required/>
                <label htmlFor="floatingName">Full Name</label>
              </div>
              <div className="form-floating mb-3">
                <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com"  
                name="email" onChange={onChangeHandler} value={data.email} required/>
                <label htmlFor="floatingInput">Email address</label>
              </div>
              <div className="form-floating mb-3">
                <input type="password" className="form-control" id="floatingPassword"  placeholder="Password"
                name="password" onChange={onChangeHandler} value={data.password} required/>
                <label htmlFor="floatingPassword">Password</label>
              </div>
              <div className="d-grid">
                <button className="btn btn-outline-primary btn-login text-uppercase" type="submit">Sign
                  up</button>
                <button className="btn btn-outline-danger btn-login text-uppercase mt-2" type="reset">Reset</button>
              </div>
                <div className="mt-4">
                    Already have an account? <Link to= "/login">Sign In</Link>
                </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Register;