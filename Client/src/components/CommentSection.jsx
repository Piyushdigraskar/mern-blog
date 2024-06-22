import { Button, Textarea } from 'flowbite-react';
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import Comment from './Comment';

export default function CommentSection({ postId }) {
    const { currentUser } = useSelector(state => state.user);
    const [comment, setComment] = useState('');
    const [commentError, setCommentError] = useState(null);
    const [comments, setComments] = useState([]);
    console.log(comments);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('/api/comment/create', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ content: comment, postId, userId: currentUser._id })
            })

            const data = await res.json();
            if (res.ok) {
                setComment('');
                setCommentError(null);
                setComments([data, ...comments])
            }
        } catch (error) {
            setCommentError(error.message);
        }
    }

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const res = await fetch(`/api/comment/getpostcomments/${postId}`);
                if (res.ok) {
                    const data = await res.json();
                    setComments(data)
                }
            } catch (error) {
                console.log(error.message);
            }
        }
        fetchComments();
    }, [])

    return (
        <div className='max-w-2xl mx-auto w-full p-3'>
            {
                currentUser ? (
                    <div className="flex items-center gap-1 my-5 text-gray-500 text-sm">
                        <p>Signed in as:</p>
                        <img className='h-5 w-5 object-cover rounded-full' src={currentUser.profilePicture} alt="user Picture" />
                        <Link className='text-cyan-600 hover:underline' to='/dashboard?tab=profile'>
                            @{currentUser.username}
                        </Link>
                    </div>
                ) : (
                    <div className="text-sm text-teal-500 my-5">
                        You must be signed in to comment.
                        <Link className='text-blue-500 hover:underline' to='/sign-in'>
                            Sign In
                        </Link>
                    </div>
                )
            }
            {
                currentUser && (
                    <form className='border border-teal-500 rounded-md p-3' onSubmit={handleSubmit}>
                        <Textarea
                            placeholder='Add a comment...'
                            rows='3'
                            maxLength='200'
                            onChange={(e) => { setComment(e.target.value) }}
                            value={comment}
                        />
                        <div className="flex justify-between items-center mt-5">
                            <p className='text-gray-500 text-xs' >{200 - comment.length} Chracters left</p>
                            <Button outline gradientDuoTone='purpleToBlue' type='submit'>
                                Submit
                            </Button>
                        </div>
                        {
                            commentError && (
                                <Alert color='failure' className='mt-5'>
                                    {commentError}
                                </Alert>
                            )
                        }
                    </form>
                )
            }
            {
                comments.length === 0 ? (
                    <p className='text-sm my-5'>No comments yet! be the first to comment...</p>
                ) : (
                    <>
                        <div className='text-sm my-5 flex items-center gap-1'>
                            <p>Comments</p>
                            <div className='border border-gray-400 py-1 px-2 rounded-sm'>
                                <p>{comments.length}</p>
                            </div>
                        </div>
                        {
                            comments.map((comment) => (
                                <Comment
                                    key={comment._id}
                                    comment={comment}
                                />
                            ))
                        }
                    </>
                )
            }
        </div>
    )
}
