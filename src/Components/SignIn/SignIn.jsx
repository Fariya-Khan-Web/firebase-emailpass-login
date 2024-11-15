import React, { useRef, useState } from 'react';
import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import auth from '../../firebase.init';
import { TbEyeglassOff } from "react-icons/tb";
import { TbEyeglass } from "react-icons/tb";

const SignIn = () => {
    const [user, setUser] = useState('')
    const [error, setError] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const emailRef = useRef()

    const password = () => {
        setShowPassword(!showPassword)
    }

    const handleResetPass = () => {
        console.log('password reset email sent to', emailRef.current.value)
        const email = emailRef.current.value
        if (email) {
            sendPasswordResetEmail(auth, email)
                .then(() => console.log('password reset email set', emailRef))
                .catch(error => console.log(error.message))
        }
        else{
            setError('No email address given')
            setUser('')
        }
    }

    const handleSignIn = (event) => {
        event.preventDefault()
        const email = event.target.email.value
        const password = event.target.password.value;
        console.log(email, password);

        setUser('')
        setError('')

        signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result.user)
                if (!result.user.emailVerified) {
                    setError('email not varified')
                    return;
                }
                setUser(result.user)
            })
            .catch(error => {
                console.log(error.message)
                setError(error.message)
            })
    }
    return (
        <div className='text-center w-1/2 mx-auto relative'>
            <form onSubmit={handleSignIn} className="card-body">
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input ref={emailRef} type="email" name='email' placeholder="email" className="input input-bordered" required />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Password</span>
                    </label>
                    <input type={showPassword ? 'text' : 'password'} name='password' placeholder="password" className="input input-bordered" required />
                    <label className="label">
                        <a onClick={handleResetPass} href="#" className="label-text-alt link link-hover">Forgot password?</a>
                    </label>
                </div>
                <div className="form-control mt-6">
                    <button className="btn btn-primary">Login</button>
                </div>
                {
                    user ? <div className='text-green-600 my-2'>You are loged In</div> : ''
                }
                {
                    error ? <div className='text-red-600 my-2'>{error}</div> : ''
                }
            </form>
            <button className='absolute top-44 right-12' onClick={password}>
                {
                    showPassword ? <TbEyeglassOff /> : <TbEyeglass />
                }
            </button>
        </div>
    );
};

export default SignIn;