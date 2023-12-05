import { Post as PostType } from '@prisma/client';
function formatPost(post: PostType): any {
    return {
        userId: post.userId,
        id: post.id,
        title: post.title,
        body: post.body,
    };
}

export default formatPost;
