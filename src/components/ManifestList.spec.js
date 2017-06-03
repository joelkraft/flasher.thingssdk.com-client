import React from "react";
import ReactDOM from "react-dom";
import { shallow, mount } from "enzyme";
import ManifestList from "./ManifestList";

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
        published: false,
        revision: "ESP-12",
        version: 'Beta 3 "Fat Rabbit", 2016-03-24'
    }
];

const open = jest.fn();
const getComponent = () => <ManifestList manifests={manifests} open={open} />;

it("calls open handler when manifest row is clicked, passes manifest doc object", () => {
    const loadedManifest = manifests[0];
    const wrapper = shallow(getComponent());
    const manifestRow = wrapper.find({
        "data-url": loadedManifest.manifest
    });
    manifestRow.simulate("click");
    wrapper.update();
    expect(open.mock.calls.length).toEqual(1);
    expect(open.mock.calls[0][0]).toEqual(loadedManifest);
});

it("renders author label for manifests authored by current user", () => {
    const loadedManifest = manifests[0];
    const wrapper = shallow(getComponent());
    const manifestRow = wrapper.find({
        "data-url": loadedManifest.manifest
    });
    const label = manifestRow.findWhere(n => n.name() === 'span' && n.text() === 'AUTHOR')
    expect(label.length).toEqual(1);
});

it("does not render author label for manifests not authored by current user", () => {
    const loadedManifest = manifests[1];
    const wrapper = shallow(getComponent());
    const manifestRow = wrapper.find({
        "data-url": loadedManifest.manifest
    });
    const label = manifestRow.findWhere(n => n.name() === 'span' && n.text() === 'AUTHOR')
    expect(label.length).toEqual(0);
});

it("renders published label for published manifests", () => {
    const loadedManifest = manifests[0];
    const wrapper = shallow(getComponent());
    const manifestRow = wrapper.find({
        "data-url": loadedManifest.manifest
    });
    const label = manifestRow.findWhere(n => n.name() === 'span' && n.text() === 'PUBLISHED')
    expect(label.length).toEqual(1);
});

it("enders unpublished label for unpublished manifests", () => {
    const loadedManifest = manifests[1];
    const wrapper = shallow(getComponent());
    const manifestRow = wrapper.find({
        "data-url": loadedManifest.manifest
    });
    const label = manifestRow.findWhere(n => n.name() === 'span' && n.text() === 'UNPUBLISHED')
    expect(label.length).toEqual(1);
});
