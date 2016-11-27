import * as React from "react";
import * as ReactRedux from "react-redux";
import * as ReactDom from "react-dom";
import * as Redux from "redux";

import SmugMugApiClient, * as SmugMug from "../../smugmug";

import * as AppSettings from "./AppSettings";

import { App } from "./containers/App";

import { IAppState } from "./models/IAppState";

var defaultState: IAppState = {
    smugMugApiClient: undefined,
    albums: [],
    albumSearchIterator: undefined,
};

SmugMugApiClient.create(AppSettings.SmugMug.ApiKey)
    .then(client => {
        store.dispatch({
            type: "smugmug-api-client-set",
            payload: client
        });
    });

function timeout(time:number): Promise<void> {
    return new Promise(resolve => {
        setTimeout(resolve, time);
    });
}

async function searchAlbums(
    client: SmugMug.ISmugMugApiClient,
    dispatch: (action:any) => void,
    text: string) {
    dispatch({
        type:"albums-search-response",
        payload: client.findAlbums(text)
    });
    dispatch({
        type:"albums-search-next"
    });
}

function reduceApp (state: IAppState = defaultState, action: any): IAppState {
    switch (action.type) {
        case "smugmug-api-client-set":
            return {
                smugMugApiClient: action.payload,
                albums: state.albums,
                albumSearchIterator: state.albumSearchIterator,
            };

        case "albums-clear":
            return {
                smugMugApiClient: state.smugMugApiClient,
                albums: [],
                albumSearchIterator: state.albumSearchIterator,
            };

        case "albums-search":
            if (!state.smugMugApiClient) {
                return state;
            }
            setTimeout(() => {
                store.dispatch({
                    type: "albums-clear"
                })
                store.dispatch({
                    type:"albums-search-response",
                    payload: state.smugMugApiClient.findAlbums(action.payload)
                });
                store.dispatch({
                    type:"albums-search-next"
                });
            }, 0);
            return state;

        case "albums-search-response":
            return {
                smugMugApiClient: state.smugMugApiClient,
                albums: state.albums,
                albumSearchIterator: action.payload
            }

        case "albums-search-next":
            if (state.albumSearchIterator) {
                let result = state.albumSearchIterator.next();
                if (result.done) {
                    setTimeout(() => {
                        store.dispatch({
                            type: "albums-search-response",
                            payload: undefined
                        })
                    });
                } else {
                    result.value.then(response => {
                        store.dispatch({
                            type: "albums-add",
                            payload: response.Response.Album
                        });
                    });
                }
            }
            return state;

        case "albums-add":
            return {
                smugMugApiClient: state.smugMugApiClient,
                albums: state.albums.concat(action.payload),
                albumSearchIterator: state.albumSearchIterator
            };

        default:
            return state;
    }
}

var store = Redux.createStore(reduceApp);

ReactDom.render(
    <ReactRedux.Provider store={store}>
        <App/>
    </ReactRedux.Provider>,
    document.getElementById("root"));
