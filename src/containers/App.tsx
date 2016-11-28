import * as React from "react";
import * as ReactRedux from "react-redux";
import * as SmugMug from "smugmug";

import * as AppActions from "../actions/AppActions";

import { IAppState } from "../models/IAppState";

interface IOwnProps {
}

interface IStateProps {
    client: SmugMug.ISmugMugApiClient;
    albumSearchIterator: Iterator<Promise<SmugMug.IAlbumSearchResponse>>;
    albums: Array<SmugMug.IAlbum>;
}

interface IDispatchProps {
    albumsSearch: (client: SmugMug.ISmugMugApiClient, text: string) => void;
    albumsShowMore: (albumSearchIterator: Iterator<Promise<SmugMug.IAlbumSearchResponse>>) => void;
}

function mapStateToProps(state: IAppState): IStateProps {
    return {
        client: state.smugMugApiClient,
        albumSearchIterator: state.albumSearchIterable,
        albums: state.albums
    };
}

function mapDispatchToProps(dispatch: (action: any) => void): IDispatchProps {
    return {
        albumsSearch: (client, text) => {
            const asyncAction = AppActions.albumsSearch(client, text);
            dispatch(asyncAction);
        },
        albumsShowMore: (albumSearchIterator) => {
            dispatch(AppActions.albumsShowNext(albumSearchIterator))
        }
    };
}

export class Component extends React.Component<IOwnProps & IStateProps & IDispatchProps, any> {

    searchInput: HTMLInputElement;

    render() {
        return (
            <div>
                <h1>SmugMug Album Search</h1>
                <input
                    type="text"
                    placeholder="search"
                    ref={x => this.searchInput = x}
                    onChange={x => this.props.albumsSearch(this.props.client, this.searchInput.value)} />
                    
                <div>
                    {this.props.albums.map(this.renderAlbumRow)}
                </div>
                <button onClick={() => this.props.albumsShowMore(this.props.albumSearchIterator)}>Show More</button>
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

export const App = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(Component) as React.ComponentClass<IOwnProps>;
