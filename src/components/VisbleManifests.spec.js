import React from "react";
import ReactDOM from 'react-dom';
// import { shallow, mount } from "enzyme";
import { Provider } from "react-redux";

import VisibleManifests from "./VisibleManifests";

const getComponent = () => (
    <Provider>
        <VisibleManifests />
    </Provider>
);
it("renders without crashing", () => {
    const div = document.createElement('div')
    const wrapper = getComponent();
    ReactDOM.render(wrapper, div);
});

xit("mount", t => {
    const wrapper = mount(getComponent());
    const fooInner = wrapper.find(".foo-inner");
    t.is(fooInner.is(".foo-inner"), true);
});
