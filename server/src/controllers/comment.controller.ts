import { Request, Response } from 'express';
import {
    createComment,
    getCommentsByPost,
    updateComment,
    deleteComment,
} from '../helpers/comment.service';

export const addComment = async (req: Request, res: Response) => {
    const { content, ownerId, postId, parentCommentId } = req.body;

    if (!content || !ownerId || !postId) {
        return res
            .status(400)
            .json({ error: 'content, ownerId, and postId are required' });
    }

    try {
        const comment = await createComment(
            content,
            ownerId,
            postId,
            parentCommentId || undefined
        );
        res.status(201).json(comment);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Failed to add comment',
            details: error,
        });
    }
};

export const fetchCommentsByPost = async (req: Request, res: Response) => {
    const { postId } = req.params;

    if (!postId) {
        return res.status(400).json({ error: 'postId is required' });
    }

    try {
        const comments = await getCommentsByPost(postId);
        res.status(200).json(comments);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Failed to fetch comments',
            details: error,
        });
    }
};

export const modifyComment = async (req: Request, res: Response) => {
    const { commentId } = req.params;
    const { content } = req.body;

    if (!content) {
        return res.status(400).json({ error: 'content is required' });
    }

    try {
        const updatedComment = await updateComment(commentId, content);
        res.status(200).json(updatedComment);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Failed to update comment',
            details: error,
        });
    }
};

export const removeComment = async (req: Request, res: Response) => {
    const { commentId } = req.params;

    try {
        await deleteComment(commentId);
        res.status(200).json({ message: 'Comment deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Failed to delete comment',
            details: error,
        });
    }
};
