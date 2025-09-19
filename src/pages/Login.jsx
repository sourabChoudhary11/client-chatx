import { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import axios from "axios";
import { server } from '../constants/config';
import { useNavigate } from 'react-router-dom';
import authSlice from '../store/reducers/auth';
import toast from 'react-hot-toast';
import { useLoginUserMutation, useRegisterUserMutation } from '../store/api/api';
import { useAsyncMutation } from '../hooks/hook';


// login component includes signin and signup component
const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { userExists, userNotExists } = authSlice.actions;
    const [loginUser, loginUserLoading, loginUserData] = useAsyncMutation(useLoginUserMutation);
    const [registerUser, registerUserLoading, registerUserData] = useAsyncMutation(useRegisterUserMutation);


    const { register, handleSubmit, getValues, reset, formState: { errors } } = useForm();

    const [isLogin, setIsLogin] = useState(true)

    const submitHandler = async (data) => {
        if (isLogin) {
            await loginUser("User Logging....", data);
            navigate("/");
        } else {
            const { name, email, password, avatar, bio } = data;
            let formData = new FormData();

            formData.append("name", name);
            formData.append("email", email);
            formData.append("password", password);
            formData.append("avatar", avatar[0]);
            formData.append("bio", bio);

            await registerUser("User Signing....", formData);
            navigate("/");
        }
    }
    const toggleHandler = () => {
        setIsLogin(prev => !prev)
        reset()
    }

    useEffect(()=>{
        if(loginUserData) dispatch(userExists(loginUserData.user)); 
        if(registerUserData) dispatch(userExists(registerUserData.user)); 
    }, [loginUserData, registerUserData])

    return (
        <div className={`flex flex-col w-screen h-screen items-center justify-center bg-black text-white px-4 md:px-0 ${ (loginUserLoading || registerUserLoading) ?  "cursor-not-allowed" : "cursor-default" }`}>
            <h1 className=' text-purple-600 text-4xl mb-4'>
                {
                    isLogin ? "Sign In" : "Sign Up"
                }
            </h1>

            {
                isLogin ?
                    <SignIn register={register} handleSubmit={handleSubmit} submitHandler={submitHandler} errors={errors} /> :
                    <SignUp register={register} handleSubmit={handleSubmit} submitHandler={submitHandler} errors={errors} getValues={getValues} />
            }
            <p className='space-x-2 mt-2'>
                <span>
                    {isLogin ? "Haven't" : "Have"} a account?
                </span>
                <button className='text-purple-600 hover:text-purple-400 hover:cursor-pointer' onClick={toggleHandler}>
                    {
                        isLogin ? "signup" : "signin"
                    }
                </button>
            </p>

        </div>
    )
}

// sign in component
const SignIn = ({ submitHandler, register, handleSubmit, errors }) => {

    return <form onSubmit={handleSubmit(submitHandler)} className='flex flex-col items-center justify-center md:w-sm gap-y-2'>
        <InputField label='Email' type="email" placeholder='email' register={register} errors={errors} />
        <InputField label='Password' type="password" placeholder='password' register={register} errors={errors} />
        <Button type='submit' btnName='Sign In' />
    </form>
}

//signup component
const SignUp = ({ submitHandler, register, handleSubmit, errors, getValues }) => {

    const [imagePreview, setImagePreview] = useState();

    const imagePreviewHandler = (e) => {
        setImagePreview(URL.createObjectURL(e.target.files[0]))
    }

    return <form onSubmit={handleSubmit(submitHandler)} className='flex flex-col items-center justify-center md:w-sm gap-y-2'>
        <InputField label='Name' type="text" placeholder='name' register={register} errors={errors} />
        <InputField label='Bio' type="text" placeholder='bio' register={register} errors={errors} />
        <InputField label='Email' type="email" placeholder='email' register={register} errors={errors} />
        <div className='w-full'>
            <label>Profile Photo *</label>
            <div className='flex justify-between align-center py-3'>

                <input
                    type="file"
                    className='w-[50%] file:placeholder: file:w-full file:bg-purple-700 file:rounded-2xl file:p-2'
                    {...register("avatar", {
                        required: "profile photo is required"
                    })}

                    onChange={imagePreviewHandler}
                />

                {
                    imagePreview && <img className='w-10' src={imagePreview} />
                }
            </div>
            {
                errors.avatar && <span className='text-red-700'>{errors.avatar.message}</span>
            }
        </div>
        <InputField label='Password' type="password" placeholder='password' register={register} errors={errors} />
        <InputField label='Confirm Password' type="password" placeholder='confirm password' register={register} errors={errors} getValues={getValues} />
        <Button type='submit' btnName='Sign Up' />
    </form>
}

// input component with react-hook-form
const InputField = ({ label, type, placeholder, register, errors, getValues }) => {
    const fieldName = label.replace(" ", "_").toLowerCase();
    return (
        <div className='w-full'>
            <label>{label} *</label>
            <input
                className='w-full outline-purple-700 rounded-sm p-4 text-lg'
                placeholder={placeholder}
                type={type}
                {...register(fieldName, {
                    required: `${fieldName} is required`,
                    validate: (value) => {
                        if (label !== "Confirm Password") return;
                        return value === getValues().password || "password must match"
                    }
                })}

            />
            {errors[fieldName] && <p className='w-full text-red-700'>{errors[fieldName].message}</p>}
        </div>
    )
}

// button component
const Button = ({ type, btnName }) => (
    <button type={type} className='bg-purple-700 p-3 w-full text-white rounded-sm cursor-pointer' >{btnName}</button>
)

export default Login