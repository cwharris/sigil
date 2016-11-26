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
        return <div>{TextComponent.computeText(this.props)}</div>;
    }

    private static computeText({repeat, text, seperator}: IProps): string {
        return lodash
            .range(0, repeat || 1)
            .map(n => text)
            .join(seperator || " ");
    }
}