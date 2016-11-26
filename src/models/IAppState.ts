import { IContact } from "./IContact";

export interface IAppState {
    contacts: { [id: string]: IContact };
}
