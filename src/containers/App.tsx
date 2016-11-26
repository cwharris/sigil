import * as React from "react";
import * as ReactRedux from "react-redux";

import { IAppState } from "../models/IAppState";
import { IContact } from "../models/IContact";

interface IOwnProps {
}

interface IStateProps {
    contacts: Array<IContact>;
}

interface IDispatchProps {
}

function mapStateToProps(state: IAppState): IStateProps {
    return {
        contacts: (Object as any).values(state.contacts) as Array<IContact>
    };
}

function mapDispatchToProps(dispatch: (action: any) => void): IDispatchProps {
    return {
    };
}

@ReactRedux.connect(mapStateToProps, mapDispatchToProps)
export class App extends React.Component<IStateProps & IDispatchProps, any> {
    render() {
        return (
            <div>
                <h1>
                    React Redux Testing
                </h1>
                <ul>
                    {this.props.contacts
                        .map(this.renderContact)
                        .map(x => <li>{x}</li>)}
                </ul>
            </div>
        );
    }

    renderContact(contact: IContact, index: number): React.ReactNode {
        return <span>{contact.id}: {contact.name}</span>;
    }
}