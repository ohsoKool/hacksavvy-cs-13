import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createComment = async (
    content: string,
    ownerId: string,
    postId: string,
    parentCommentId?: string
) => {
    return prisma.comment.create({
        data: {
            content,
            ownerId,
            postId,
            parentCommentId,
        },
    });
};

export const getCommentsByPost = async (postId: string) => {
    return prisma.comment.findMany({
        where: { postId },
        include: {
            owner: true,
            childComments: {
                include: {
                    childComments: true, // Nested loading, adjust as needed for performance
                },
            },
        },
        orderBy: {
            createdAt: 'asc',
        },
    });
};

export const updateComment = async (commentId: string, content: string) => {
    return prisma.comment.update({
        where: { id: commentId },
        data: { content, updatedAt: new Date() },
    });
};

export const deleteComment = async (commentId: string) => {
    await prisma.comment.delete({
        where: { id: commentId },
    });
};
