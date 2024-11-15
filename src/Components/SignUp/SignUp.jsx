import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from 'firebase/auth';
import React, { useState } from 'react';
import auth from '../../firebase.init';
import { TbEyeglass } from "react-icons/tb";
import { TbEyeglassOff } from "react-icons/tb";

const SignUp = () => {

    const [success, setSuccess] = useState(false)
    const [errorMassage, setErrorMassage] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    // const showPassword = false;

    const password = () => {
        setShowPassword(!showPassword)
    }


    const handleSignUp = (event) => {
        event.preventDefault()
        setErrorMassage('')
        setSuccess(false)

        const email = event.target.email.value;
        const name = event.target.name.value;
        const photo = event.target.photo.value;
        const password = event.target.password.value;

        if (password.length < 6) {
            alert('Password has to be at least 6 characters long')
            return;
        }

        // const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{6,}$/;

        // if (!passwordRegex.test(password)) {
        //     setErrorMassage('password conditions not fulfilled')
        //     return;
        // }

        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result)
                setSuccess(true)

                sendEmailVerification(auth.currentUser)
                .then(()=> console.log('email sent'))

                const profile ={
                    displayName: name,
                    photoURL: photo,
                }
                updateProfile(auth.currentUser, profile)
                .then(()=>{console.log('user profile updated');})
                .catch(error => console.log(error))
            })
            .catch(error => setErrorMassage(error.message))
    }




    return (
        <div className='text-center w-1/2 mx-auto relative'>
            <form onSubmit={handleSignUp} className="card-body">
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input type="email" name='email' placeholder="email" className="input input-bordered" required />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Name</span>
                    </label>
                    <input type="text" name='name' placeholder="name" className="input input-bordered" required />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Photo</span>
                    </label>
                    <input type="text" name='photo' placeholder="photo URL" className="input input-bordered" required />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Password</span>
                    </label>
                    <input type={showPassword ? 'text' : 'password'} name='password' placeholder="password" className="input input-bordered" required />
                </div>
                <div className="form-control mt-6">
                    <button className="btn bg-lime-300 btn-primary">Sign Up</button>
                </div>
            </form>
            <button onClick={password} className='absolute right-12 top-[360px]' >{showPassword ? <TbEyeglassOff /> : <TbEyeglass />}</button>
            {
                errorMassage ? <div className='text-red-600'>{errorMassage}</div> : ''
            }
            {
                success ? <div className='text-green-600'>Sign in successful</div> : ''
            }
        </div>
    );
};

export default SignUp;