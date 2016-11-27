import * as React from "react";
import * as ReactRedux from "react-redux";
import * as ReactDom from "react-dom";
import * as Redux from "redux";

import SmugMugApiClient, * as SmugMug from "../../smugmug";

import * as AppSettings from "./AppSettings";

import { App } from "./containers/App";

import { IAppState } from "./models/IAppState";

var defaultState: IAppState = {
    albums: []
};

var smugMugApiClient = SmugMugApiClient.create(AppSettings.SmugMug.ApiKey);

function timeout(time:number): Promise<void> {
    return new Promise(resolve => {
        setTimeout(resolve, time);
    });
}

async function searchAlbums(
    client: SmugMug.ISmugMugApiClient,
    dispatch: (action:any) => void,
    text: string) {
    for (let request of client.findAlbums(text)) {
        let response = await request;
            dispatch({
                type: "add-albums",
                payload: response.Response.Album
            });
        // for (let album of response.Response.Album) {
        //     console.log(album);
        // }
        await timeout(1000);
    }
}

function reduceApp (state: IAppState = defaultState, action: any): IAppState {
    switch (action.type) {
        case "clear-albums":
            return {
                albums: []
            };

        case "search-albums":
            setTimeout(() => store.dispatch({ type: "clear-albums" }), 0);
            smugMugApiClient.then(client => searchAlbums(client, store.dispatch, action.payload));
            return state;

        case "add-albums":
            return {
                albums: state.albums.concat(action.payload)
            };

        default:
            return state;
    }
}

var store = Redux.createStore(reduceApp);

ReactDom.render(
    <ReactRedux.Provider store={store}>
        <App idHeader="ID" nameHeader="Name"/>
    </ReactRedux.Provider>,
    document.getElementById("root"));
