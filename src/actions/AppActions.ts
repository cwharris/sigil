import * as Redux from "redux";
import * as SmugMug from "smugmug";
import * as AppState from "../models/IAppState"

export function albumsSearch(client: SmugMug.ISmugMugApiClient, text: string) {
    return function (dispatch: Redux.Dispatch<AppState.IAppState>) {
        const albumSearchIterator: Iterator<Promise<SmugMug.IAlbumSearchResponse>> =
            client.findAlbums(text) as any;
        dispatch({ type: "albums-clear" })
        dispatch({ type: "albums-search-response", payload: albumSearchIterator });
        albumsShowNext(albumSearchIterator)(dispatch);
    }
}

export function albumsShowNext(albumSearchIterator: Iterator<Promise<SmugMug.IAlbumSearchResponse>>) {
    return async function (dispatch: Redux.Dispatch<AppState.IAppState>) {
        if (albumSearchIterator) {
            let next = albumSearchIterator.next();
            if (next.done) {
                dispatch({ type: "albums-search-response", payload: null });
            } else {
                var response = await next.value;
                dispatch({ type: "albums-add", payload: response.Response.Album });
            }
        }
    }
}
