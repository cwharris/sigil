import * as React from "react";

export interface IProps {
    value: number;
    onIncrement: () => void;
    onDecrement: () => void;
}

export class NumberStepperComponent extends React.Component<IProps, any> {
    constructor(props:any) {
        super(props);
    }

    render() {
        return (
            <div>
                <button onClick={this.props.onIncrement}>-</button>
                <span>{this.props.value}</span>
                <button onClick={this.props.onDecrement}>+</button>
            </div>
        );
    }
}
