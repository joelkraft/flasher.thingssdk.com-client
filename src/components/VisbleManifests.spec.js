import test from "ava";
import React from "react";
var jsdom = require('jsdom').jsdom;
import { shallow, mount } from "enzyme";
import { Provider } from "react-redux";

import VisibleManifests from "./VisibleManifests";

global.document = jsdom('');
global.window = document.defaultView;

const getComponent = () => (
    <Provider>
        <VisibleManifests />
    </Provider>
);
test("shallow", t => {
    const wrapper = shallow(getComponent());
    t.is(wrapper.contains(<span>Foo</span>), false);
});

test("mount", t => {
    const wrapper = mount(getComponent());
    const fooInner = wrapper.find(".foo-inner");
    t.is(fooInner.is(".foo-inner"), true);
});
