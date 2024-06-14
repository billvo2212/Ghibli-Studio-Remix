import { ActionFunction, LoaderFunction, MetaFunction, redirect } from "@remix-run/node";
import { Film, getFilmById } from "~/api/films";
import invariant from "tiny-invariant";
import { useLoaderData } from "@remix-run/react";
import FilmBanner from "~/components/FilmBanner";
import CharacterList from "~/components/CharacterList";
import { Outlet } from "@remix-run/react";
import CommentsList from "~/components/CommentsList";
import { addComment } from "~/api/comments";

// export const meta: MetaFunction = ({ data }) => {
//     return { title: data.title, description: 'A description'};
// }

export const action: ActionFunction = async ({request, params}) => {
    invariant(params.filmId, 'expected params.filmId');
    const body = await request.formData();

    const comment = {
        name: body.get('name') as string,
        message: body.get('message') as string,
        filmId: params.filmId
    };

    const errors = {name: '', message: ''};
    
    if(!comment.name) {
        errors.name = 'Please provide your name';
    }

    if(!comment.message) {
        errors.name = 'Please provide a comment';
    }

    if(errors.name || errors.message) {
        const values = Object.fromEntries(body);
        return { errors, values };
    }

    await addComment(comment);

    return redirect(`/films/${params.filmId}`);
}

export const loader:LoaderFunction = async ({ params }) => {
    invariant(params.filmId, 'expected params.filmId');
    const film = await getFilmById(params.filmId);

    return film;
}

export default function Film() {
    const film = useLoaderData<Film>();
    return (
        <div>
            <FilmBanner film={film} />

            <div className="p-10">
                <p>{film.description}</p>
                <div className="flex py-5 space-x-5">
                    <CharacterList characters={film.characters}/>

                    <div className="flex-1 flex flex-col justify-between">
                       <Outlet/>

                       <CommentsList filmId={film.id} comments={film.comments || []} />
                    </div>
                </div>
            </div>
        </div>
    );
};