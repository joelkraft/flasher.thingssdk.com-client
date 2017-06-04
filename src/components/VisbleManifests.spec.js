import React from "react";
import ReactDOM from "react-dom";
import { shallow, mount } from "enzyme";
import { Button } from "react-bootstrap";

import { ManifestPage } from "./VisibleManifests";
import ManifestList from "./ManifestList";
import { getIdFromUrl } from "../util";

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

const blankManifestObject = {
    name: "",
    version: "",
    board: "",
    revision: "",
    description: "",
    download: "",
    flash: {
        frequency: "",
        images: [
            {
                address: "",
                path: "",
                sha: ""
            }
        ]
    }
};

const handleSubmitCreate = jest.fn();
handleSubmitCreate.mockReturnValue(Promise.resolve());

const handleSubmitSave = jest.fn();
handleSubmitSave.mockReturnValue(Promise.resolve());

const getManifests = jest.fn();
getManifests.mockReturnValue(Promise.resolve());

const getComponent = () => (
    <ManifestPage
        manifests={manifests}
        handleSubmitCreate={handleSubmitCreate}
        handleSubmitSave={handleSubmitSave}
        getManifests={getManifests}
    />
);

it("renders without crashing", () => {
    const div = document.createElement("div");
    const wrapper = getComponent();
    ReactDOM.render(wrapper, div);
});

it("renders a spinner while manifests are being fetched");
it("renders a message when no manifests are returned");

it("renders ManifestList", () => {
    const wrapper = shallow(getComponent());
    const ManifestList = wrapper.find("ManifestList");
    const ManifestListProps = ManifestList.props();
    expect(ManifestList.length).toBe(1);
    expect(ManifestListProps.manifests.length).toEqual(2);
    expect(ManifestListProps.manifests[0].name).toEqual("Espruino");
    expect(ManifestListProps.manifests[1].name).toEqual("Smart.js");
});

it("fetches all available manifests on loading", () => {
    const wrapper = shallow(getComponent());
    expect(getManifests.mock.calls.length).toEqual(1);
});

it('sets modal to visible when "create new" button is clicked', () => {
    const wrapper = shallow(getComponent());
    const createNewButton = wrapper.find("#createManifestButton");
    createNewButton.simulate("click");
    wrapper.update();
    const ManifestEdit = wrapper.find("ManifestEdit");
    const modalProps = ManifestEdit.props();
    expect(modalProps.showModal).toBe(true);
});

it('passes blank manifest object to ManifestEdit when "create new" button is clicked', () => {
    const newManifest = { ...blankManifestObject, isNew: true, isAuthor: true };
    const wrapper = shallow(getComponent());
    const createNewButton = wrapper.find("#createManifestButton");
    createNewButton.simulate("click");
    wrapper.update();
    const ManifestEdit = wrapper.find("ManifestEdit");
    const modalProps = ManifestEdit.props();
    expect(modalProps.manifestDetails).toEqual(newManifest);
});

it("calls handleSubmitCreate when ManifestEdit calls handleSubmit, passes new manifest & token");
