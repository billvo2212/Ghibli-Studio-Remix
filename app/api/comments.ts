export type CommentEntry = {
    name: string;
    message: string;
    filmId: string;
};

export async function getComments(filmId:string) {
    const res = await fetch(
        `http://localhost:3001/comments?filmId=${filmId}`
    );

    return res.json();
};

export async function addComment(comment:CommentEntry) {
    const res = await fetch('http://localhost:3001/comments',{
        method: 'POST',
        body: JSON.stringify(comment),
        headers: {
            'Content-type': 'application/json',
        }
    });

    return res.json();
};