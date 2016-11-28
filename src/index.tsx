import * as React from "react";
import * as ReactRedux from "react-redux";
import * as ReactDom from "react-dom";
import * as Redux from "redux";
import * as SmugMug from "../../smugmug";

import * as AppSettings from "./AppSettings";
import * as AppState from "./models/AppState";

import thunkMiddleware from "redux-thunk";

import { App } from "./containers/App";

var defaultState: AppState.IAppState = {
    smugMugApiClient: undefined,
    albums: [],
    albumSearchIterator: undefined,
};

function reduceApp (state: AppState.IAppState = defaultState, action: any): AppState.IAppState {
    switch (action.type) {
        case "smugmug-api-client-set":
            return AppState.create<AppState.IAppState, AppState.IAppSmugMugApiClientState>(
                state, {
                    smugMugApiClient: action.payload
                });

        case "albums-clear":
            return AppState.create<AppState.IAppState, AppState.IAppAlbumsState>(
                state, {
                    albums: []
                });

        case "albums-add":
            return AppState.create<AppState.IAppState, AppState.IAppAlbumsState>(
                state, {
                    albums: state.albums.concat(action.payload)
                });

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
            });
            return state;

        case "albums-search-response":
            return AppState.create<AppState.IAppState, AppState.IAppAlbumSearchIteratorState>(
                state, {
                    albumSearchIterator: action.payload
                });

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

        default:
            return state;
    }
}

const middlewareEnhancer: Redux.StoreEnhancer<AppState.IAppState> =
    Redux.applyMiddleware(
        thunkMiddleware
    );

const root: any = window;
const composeEnhancers = root.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || Redux.compose;
const enhancers: Redux.StoreEnhancer<AppState.IAppState> =
    composeEnhancers(
        middlewareEnhancer);

const store = Redux.createStore<AppState.IAppState>(reduceApp, enhancers);

ReactDom.render(
    <ReactRedux.Provider store={store}>
        <App/>
    </ReactRedux.Provider>,
    document.getElementById("root"));

SmugMug.default.create(AppSettings.SmugMug.ApiKey)
    .then(client => {
        store.dispatch({
            type: "smugmug-api-client-set",
            payload: client
        });
    });