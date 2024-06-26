import express from 'express';
import { createComment, getPostComments, likeComment, editComment, deleteComment, getComments } from '../controllers/comment.controller.js';
import { verifyToken } from '../utils/verifyuser.js';

const router = express.Router();

router.post('/create',verifyToken, createComment);
router.get('/getpostcomments/:postId', getPostComments);
router.put('/likecomment/:commentId', verifyToken, likeComment);
router.put('/editcomment/:commentId', verifyToken, editComment);
router.delete('/deletecomment/:commentId', verifyToken, deleteComment);
router.get('/getcomments',verifyToken, getComments);


export default router;