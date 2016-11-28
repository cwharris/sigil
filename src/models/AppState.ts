import * as SmugMug from "smugmug";

export interface IAppState extends
    IAppAlbumsState,
    IAppSmugMugApiClientState,
    IAppAlbumSearchIteratorState {
}

export interface IAppAlbumsState {
    albums: Array<SmugMug.IAlbum>;
}

export interface IAppSmugMugApiClientState {
    smugMugApiClient: SmugMug.ISmugMugApiClient;
}

export interface IAppAlbumSearchIteratorState {
    albumSearchIterator: Iterator<Promise<SmugMug.IAlbumSearchResponse>>;
}

export function create<TState extends TPartial, TPartial>(state: TState, obj: TPartial): TState {
    return Object.assign<{}, TState, TPartial>({}, state, obj); 
}