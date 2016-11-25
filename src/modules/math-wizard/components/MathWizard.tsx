import * as React from "react";

import { WizardComponent } from "../../wizard";

import { NumberWizardPage } from "./NumberWizardPage";
import { OperationWizardPage } from "./OperationWizardPage";

export interface IProps {
}

export class MathWizard extends React.Component<IProps, any> {
    constructor(props:any) {
        super(props);
    }

    render() {
        return (
            <WizardComponent>
                <NumberWizardPage/>
                <NumberWizardPage/>
                <OperationWizardPage/>
            </WizardComponent>
        );
    }
}
