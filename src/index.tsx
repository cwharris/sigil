import * as React from "react";
import * as ReactRedux from "react-redux";
import * as ReactDom from "react-dom";

import { MathWizard } from "./modules/math-wizard"

ReactDom.render(
    <div>
        <MathWizard/>
    </div>,
    document.getElementById("root"));
