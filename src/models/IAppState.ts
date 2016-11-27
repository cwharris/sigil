import * as SmugMug from "smugmug";

import { IContact } from "./IContact";

export interface IAppState {
    contacts: Array<IContact>;
    albums: Array<SmugMug.IAlbum>;
}
