import { Button } from 'flowbite-react'
import React from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signInSuccess } from '../redux/user/userSlice';
import { AiFillGoogleCircle } from 'react-icons/ai'
import {GoogleAuthProvider, signInWithPopup, getAuth} from 'firebase/auth';
import { app } from '../firebase';

export default function Oauth() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const auth = getAuth(app);
    const handleGoogleClick = async()=>{
        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({ prompt: 'select_account' });
        try {
            const ressultsFromGoogle = await signInWithPopup(auth, provider);
            const res = await fetch('/api/auth/google',{
                method:"POST",
                headers:{
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify({
                    name:ressultsFromGoogle.user.displayName,
                    email: ressultsFromGoogle.user.email,
                    googlePhotoUrl: ressultsFromGoogle.user.photoURL
                }),
            }) 
            const data = await res.json();
            if(res.ok){
                dispatch(signInSuccess(data));
                navigate('/');
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <Button type='button' gradientDuoTone='pinkToOrange' className='text-black border-black' outline onClick={handleGoogleClick}>
            <AiFillGoogleCircle className='w-6 h-6 mr-2' />
            Continue with Google
        </Button>
    )
}
