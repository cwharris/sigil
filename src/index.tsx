import * as React from "react";
import * as ReactRedux from "react-redux";
import * as ReactDom from "react-dom";
import * as Redux from "redux";

import * as AppSettings from "./AppSettings";

import { App } from "./containers/App";

import { IAppState } from "./models/IAppState";
import { IContact } from "./models/IContact";

import SmugMugApiClient, * as SmugMug from "smugmug";

var defaultState: IAppState = {
    contacts: [
        {
            id: "1234",
            name: "Christopher Harris"
        },
        {
            id: "8762",
            name: "David Dindak"
        },
        {
            id: "4321",
            name: "Whatever"
        }
    ],
    albums: []
};

var smugMugApiClient = SmugMugApiClient.create(AppSettings.SmugMug.ApiKey);

function reduceApp (state: IAppState = defaultState, action: any): IAppState {
    switch (action.type) {
        case "set-albums":
            return {
                contacts: state.contacts,
                albums: action.payload
            };
            
        case "search-albums":
            smugMugApiClient
                .then(client => client.findAlbums(action.payload))
                .then(response => store.dispatch({
                    type:"set-albums",
                    payload: response.Response.Album
                }));
            return state;

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
