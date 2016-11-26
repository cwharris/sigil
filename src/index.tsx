import * as React from "react";
import * as ReactRedux from "react-redux";
import * as ReactDom from "react-dom";
import * as Redux from "redux";

import { App } from "./containers/App";

import { IAppState } from "./models/IAppState";

var defaultState: IAppState = {
    contacts: {
        "1234": {
            id: "1234",
            name: "Christopher Harris"
        },
        "8762": {
            id: "8762",
            name: "David Dindak"
        }
    }
};

function reduceApp (state: IAppState = defaultState, action: any) {
    switch (action.type) {
        default: return state;
    }
}

var store = Redux.createStore(reduceApp);

ReactDom.render(
    <ReactRedux.Provider store={store}>
        <App contacts={[]}/>
    </ReactRedux.Provider>,
    document.getElementById("root"));
