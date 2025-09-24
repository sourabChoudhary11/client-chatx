import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useGetAdminQuery, useLoginAdminMutation } from '../../store/api/api';
import { useAsyncMutation } from '../../hooks/hook';
import { adminExists } from "../../store/reducers/auth"
import Title from '../../components/shared/Title';

const AdminLogin = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [secret, setSecret] = useState("");

    const [loginAdmin, isLoginAdminLoading, loginAdminData] = useAsyncMutation(useLoginAdminMutation);
    const {data, isLoading} = useGetAdminQuery("");

    const submitHandler = () => {
        loginAdmin("Admin Logging....", secret);
    }

    useEffect(() => {
        if (loginAdminData) {
            dispatch(adminExists(true))
            navigate("/admin/dashboard");
        }
    }, [loginAdminData])

    useEffect(()=>{
        if(data?.admin){
            dispatch(adminExists(true))
            navigate("/admin/dashboard");
        }
    },[data])

    return !isLoading && (
        <div className='flex flex-col w-screen h-screen items-center justify-center bg-black text-white px-4 md:px-0'>
            <Title title='ChatX - Admin Login' description="Admin dashboard to analyze the data" />

            <h1 className=' text-purple-600 text-4xl mb-4'>
                Admin Login
            </h1>

            <input type="password" value={secret} onChange={(e) => setSecret(e.target.value)} className='w-50% rounded-sm p-4 text-lg' placeholder='secret key *' />

            <button className='mt-5 bg-purple-700 p-3 w-[40%] text-white rounded-sm cursor-pointer' onClick={submitHandler} disabled={isLoginAdminLoading}>
                Login
            </button>

        </div>
    )
}

export default AdminLogin