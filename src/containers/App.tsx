import * as React from "react";
import * as ReactRedux from "react-redux";
import * as SmugMug from "smugmug";

import { IAppState } from "../models/IAppState";
import { IContact } from "../models/IContact";

interface IProps {
    idHeader: string;
    nameHeader: string;
}

interface IStateProps {
    contacts: Array<IContact>;
    albums: Array<SmugMug.IAlbum>;
}

interface IDispatchProps {
    searchAlbums: (text: string) => void;
}

function mapStateToProps(state: IAppState): IStateProps {
    return {
        contacts: state.contacts,
        albums: state.albums
    };
}

function mapDispatchToProps(dispatch: (action: any) => void): IDispatchProps {
    return {
        searchAlbums: (text: string) => dispatch({ type: "search-albums", payload: text })
    };
}

export class Component extends React.Component<IProps & IStateProps & IDispatchProps, any> {

    searchInput: HTMLInputElement;

    render() {
        return (
            <div>
                <h1>
                    React Redux Testing
                </h1>
                <table>
                    <thead>
                        <tr>
                            <td>{this.props.idHeader}</td>
                            <td>{this.props.nameHeader}</td>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.contacts.map(this.renderContactRow)}
                    </tbody>
                </table>
                <input
                    type="text"
                    placeholder="search"
                    ref={x => this.searchInput = x}
                    onChange={x => this.props.searchAlbums(this.searchInput.value)} />
                    
                {this.props.albums.map(this.renderAlbumRow)}
            </div>
        );
    }

    renderContactRow(contact: IContact, index: number): React.ReactNode {
        return (
            <tr key={index}>
                <td>{contact.id}</td>
                <td>{contact.name}</td>
            </tr>
        );
    }

    renderAlbumRow(album: SmugMug.IAlbum, index: number): React.ReactNode {
        return (
            <div>
                <a href={album.WebUri}>{album.AlbumKey}: {album.Name}</a>
            </div>
        );
    }
}

export const App = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(Component) as React.ComponentClass<IProps>;
