
import { getDownloadURL, getStorage, uploadBytesResumable, ref } from 'firebase/storage';
import { Alert, Button, FileInput, Select, TextInput } from 'flowbite-react'
import { useEffect, useState } from 'react'
import ReactQuill from 'react-quill';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import 'react-quill/dist/quill.snow.css';
import { useNavigate, useParams } from 'react-router-dom';
import { app } from '../firebase';
import { useSelector } from 'react-redux';

export default function UpdatePost() {
    const {currentUser} = useSelector(state=> state.user);
    const [file, setFile] = useState(null);
    const [imageUploadProgress, setImageUploadProgress] = useState(null);
    const [imageUploadError, setImageUploadError] = useState(null);
    const [formdata, setFormdata] = useState({});
    const [publishError, setPublishError] = useState(null);
    const {postId} = useParams();


    useEffect(()=>{
        try {
            const fetchPost = async()=>{
                const res = await fetch(`/api/post/getposts?postId=${postId}`)
                const data = await res.json();
                if(!res.ok){
                    console.log(data.message);
                    setPublishError(data.message);
                    return;
                }
                else{
                    setPublishError(null);
                    setFormdata(data.posts[0]);
                }
            }
            fetchPost();
        } catch (error) {
            console.log(error.message);
        }
    }, [postId])

    const navigate = useNavigate();
   
    const hadleUploadImage = async () => {
        try {
            if (!file) {
                setImageUploadError('Please Select an Image');
                return;
            }
            setImageUploadError(null);
            const storage = getStorage(app);
            const fileName = new Date().getTime() + '-' + file.name;
            const storageRef = ref(storage, fileName);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setImageUploadProgress(progress.toFixed(0));
                },
                (error) => {
                    setImageUploadError('Image upload Failed');
                    setImageUploadProgress(null);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setImageUploadProgress(null);
                        setImageUploadError(null);
                        setFormdata({ ...formdata, image: downloadURL });
                    })
                }
            )
        } catch (error) {
            setImageUploadError('Image upload Failed');
            setImageUploadProgress(null);
            console.log(error);
        }
    }

    const handleSubmit = async(e)=>{
        e.preventDefault();
        try {
            const res = await fetch(`/api/post/updatepost/${formdata._id}/${currentUser._id}`,{
                method: "PUT",
                headers:{
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify(formdata)
            })
            const data = await res.json();
            if(!res.ok){
                setPublishError(data.message);
                return;
            }
            if(data.success === false){
                setPublishError(data.message);
                return;
            }
            else{
                setPublishError(null);
                navigate(`/post/${data.slug}`);
            }

        } catch (error) {
            setPublishError('something went wrong');
            console.log(error)
        }
    }

    return (
        <div className='p-3 max-w-3xl mx-auto min-h-screen'>
            <h1 className='text-center text-3xl my-7 font-semibold'>Update a Post</h1>
            <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
                <div className='flex flex-col gap-4 sm:flex-row justify-between'>
                    <TextInput type='text'
                        placeholder='Title'
                        required id='title'
                        className='flex-1'
                        onChange={(e) => {
                            setFormdata({ ...formdata, title: e.target.value })
                        }}value={formdata.title} />
                    <Select onChange={(e) => {
                        setFormdata({ ...formdata, category: e.target.value })
                    }}
                    value={formdata.category}>
                        <option value='uncategorized'>Select a Category:</option>
                        <option value='javascript'>JavaScript</option>
                        <option value='react'>React.js</option>
                        <option value='nodejs'>Node.js</option>
                        <option value='nextjs'>Next.js</option>
                    </Select>
                </div>
                <div className='flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3'>
                    <FileInput type='file' accept='image/*' onChange={(e) => { setFile(e.target.files[0]) }} />
                    <Button type='button' gradientDuoTone='purpleToBlue' size='sm' outline onClick={hadleUploadImage} disabled={imageUploadProgress}>
                        {
                            imageUploadProgress ? (
                                <div className='w-16 h-16'>
                                    <CircularProgressbar value={imageUploadProgress} text={`${imageUploadProgress || 0}%`} />
                                </div>
                            ) : (
                                'Upload Image'
                            )
                        }
                    </Button>
                </div>
                {
                    imageUploadError && (
                        <Alert color='failure'>
                            {imageUploadError}
                        </Alert>
                    )
                }
                {
                    formdata.image && (
                        <img
                            src={formdata.image}
                            alt='upload'
                            className='w-full h-72 object-cover'>
                        </img>
                    )
                }
                <ReactQuill theme='snow' placeholder='Write something...' value={formdata.content} className='h-72 mb-12' required onChange={(value) => {
                    setFormdata({ ...formdata, content: value });
                }} />
                <Button type='submit' gradientDuoTone='purpleToPink'>
                    Update Post
                </Button>
                {
                    publishError && <Alert className='mt-5' color='failure'>{publishError}</Alert>
                }
            </form>
        </div>
    )
}
