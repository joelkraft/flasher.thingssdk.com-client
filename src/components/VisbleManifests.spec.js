import React from "react";
import ReactDOM from "react-dom";
import { shallow, mount } from "enzyme";
import { Button } from "react-bootstrap";

import { ManifestList } from "./VisibleManifests";

const manifests = [
    {
        board: "ESP8266",
        isAuthor: true,
        latest: false,
        manifest: "http://localhost:3001/v2/manifests/5906d98f2e4f60e34879bff8",
        name: "Espruino",
        published: true,
        revision: "ESP-12",
        version: "1v85"
    },
    {
        board: "ESP8266",
        isAuthor: false,
        latest: false,
        manifest: "http://localhost:3001/v2/manifests/5906d98f2e4f60e34879c00c",
        name: "Smart.js",
        published: true,
        revision: "ESP-12",
        version: 'Beta 3 "Fat Rabbit", 2016-03-24'
    }
];

const fetchManifestsOnMount = jest.fn();
fetchManifestsOnMount.mockReturnValue(Promise.resolve());

const getComponent = () => (
    <ManifestList
        manifests={manifests}
        fetchManifestsOnMount={fetchManifestsOnMount}
    />
);

it("renders without crashing", () => {
    const div = document.createElement("div");
    const wrapper = getComponent();
    ReactDOM.render(wrapper, div);
});

it("renders a spinner while manifests are being fetched");
it("renders a message when no manifests are returned");

it("renders a table of manifests", () => {
    const wrapper = shallow(getComponent());
    const table = wrapper.find("table");
    const tbody = table.find("tbody");
    const manifestRows = tbody.find("tr");
    expect(manifestRows.length).toEqual(2);
    expect(manifestRows.contains("Espruino")).toBe(true);
    expect(manifestRows.contains("Smart.js")).toBe(true);
});

