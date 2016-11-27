import * as React from "react";
import * as ReactRedux from "react-redux";
import * as SmugMug from "smugmug";

import { IAppState } from "../models/IAppState";

interface IProps {
    idHeader: string;
    nameHeader: string;
}

interface IStateProps {
    albums: Array<SmugMug.IAlbum>;
}

interface IDispatchProps {
    searchAlbums: (text: string) => void;
}

function mapStateToProps(state: IAppState): IStateProps {
    return {
        albums: state.albums
    };
}

function mapDispatchToProps(dispatch: (action: any) => void): IDispatchProps {
    return {
        searchAlbums: (text: string) => dispatch({ type: "albums-search", payload: text })
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
                <input
                    type="text"
                    placeholder="search"
                    ref={x => this.searchInput = x}
                    onChange={x => this.props.searchAlbums(this.searchInput.value)} />
                    
                <div>
                    {this.props.albums.map(this.renderAlbumRow)}
                </div>
            </div>
        );
    }

    renderAlbumRow(album: SmugMug.IAlbum, index: number): React.ReactNode {
        return (
            <div key={index}>
                <a href={album.WebUri}>{album.AlbumKey}: {album.Name}</a>
            </div>
        );
    }
}

export const App = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(Component) as React.ComponentClass<IProps>;
