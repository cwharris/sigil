import * as React from "react";
import * as ReactRedux from "react-redux";
import * as ReactDom from "react-dom";
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

ReactDom.render(
    <div>
        <TextComponent text="text" />
        <TextComponent text="text" repeat={10} />
        <TextComponent text="text" repeat={10} seperator=" / " />
    </div>,
    document.getElementById("root"));