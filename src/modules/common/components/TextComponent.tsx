import * as React from "react";
import * as lodash from "lodash";

export interface IProps {
    text: string;
    repeat?: number;
    seperator?: string;
}

export class TextComponent extends React.Component<IProps, any> {
    constructor(props:any) {
        super(props);
    }

    render() {

        var text = lodash
            .range(0, this.props.repeat || 1)
            .map(n => this.props.text)
            .join(this.props.seperator || " "); 

        return <div>{text}</div>;
    }
}