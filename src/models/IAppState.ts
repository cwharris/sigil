import * as SmugMug from "smugmug";

export interface IAppState {
    smugMugApiClient: SmugMug.ISmugMugApiClient;
    albums: Array<SmugMug.IAlbum>;
    albumSearchIterator: Iterator<Promise<SmugMug.IAlbumSearchResponse>>;
}
