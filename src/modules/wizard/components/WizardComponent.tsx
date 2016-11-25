import * as React from "react";

export interface IProps {
}

export class WizardComponent extends React.Component<IProps, any> {
    constructor(props:any) {
        super(props);
    }

    render() {
        return (
            <div>
                <h2>Wizard</h2>
                <ul>
                    {React.Children.map(this.props.children, x => <li>{x}</li>)}
                </ul>
            </div>
        );
    }
}
