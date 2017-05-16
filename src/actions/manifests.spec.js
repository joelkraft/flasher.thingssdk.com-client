import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import * as actions from "./manifests";
import * as types from "../actiontypes/manifests";
import nock from "nock";
import { apiUrl } from "../config";

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe("async manifest actions", () => {
    afterEach(() => {
        nock.cleanAll();
    });
    const token = "signedJwt";
    const reqheaders = {
        Authorization: `Bearer: ${token}`,
        "Content-Type": "application/json"
    };
    const bodyDocument = {
        options: [
            {
                name: "Espruino",
                versions: [
                    {
                        version: "1v85",
                        board: "ESP8266",
                        revision: "ESP-12",
                        published: true,
                        isAuthor: false,
                        manifest: `${apiUrl.base}${apiUrl.version}/manifests/5906d98f2e4f60e34879bff8`,
                        latest: false
                    }
                ]
            }
        ]
    };
    const manifestDoc = {
        board: "ESP8266",
        manifest: `${apiUrl.base}${apiUrl.version}/manifests/5906d98f2e4f60e34879bff8`,
        name: "Espruino",
        revision: "ESP-12",
        version: "1v85",
        published: true,
        isAuthor: false,
        latest: false
    };
    const manifestDocCollection = [manifestDoc];

    it("creates RECEIVE_MANIFESTS when manifests have been returned", () => {
        nock(apiUrl.base, { reqheaders })
            .get(apiUrl.version)
            .reply(200, bodyDocument);

        const expectedActions = [
            { type: types.REQUEST_MANIFESTS },
            { type: types.RECEIVE_MANIFESTS, items: manifestDocCollection }
        ];

        const store = mockStore({});

        return store
            .dispatch(actions.fetchManifests(token))
            .then(() => {
                expect(store.getActions()).toEqual(expectedActions);
            })
            .catch(err => {
                expect(err).toBe(null);
            });
    });
    it("creates RECEIVE_MANIFESTS_FAILED when manifests have failed to be returned", () => {
        nock(apiUrl.base, { reqheaders })
            .get(apiUrl.version)
            .replyWithError("Manifests cannot be returned");

        const expectedActions = [
            { type: types.REQUEST_MANIFESTS },
            { type: types.RECEIVE_MANIFESTS_FAILED }
        ];

        const store = mockStore({});

        return store.dispatch(actions.fetchManifests(token)).catch(err => {
            expect(err).toBeInstanceOf(Error);
            expect(store.getActions()).toEqual(expectedActions);
        });
    });
    it("creates MANIFEST_WAS_SAVED after successful save", () => {
        nock(apiUrl.base, { reqheaders })
            .put(
                `${apiUrl.version}/manifests/5906d98f2e4f60e34879bff8`,
                manifestDoc
            )
            .reply(200, manifestDoc);

        const expectedActions = [
            { type: types.REQUEST_SAVE_MANIFEST },
            { type: types.MANIFEST_WAS_SAVED, item: manifestDoc }
        ];

        const store = mockStore({});

        return store
            .dispatch(actions.saveManifest(manifestDoc, token))
            .then(data => {
                expect(store.getActions()).toEqual(expectedActions);
            })
            .catch(err => {
                expect(err).toBe(null);
            });
    });
    it("creates MANIFEST_WAS_NOT_SAVED after unsuccessful save", () => {
        nock(apiUrl.base, { reqheaders })
            .put(
                `${apiUrl.version}/manifests/5906d98f2e4f60e34879bff8`,
                manifestDoc
            )
            .replyWithError("Manifest not saved");

        const expectedActions = [
            { type: types.REQUEST_SAVE_MANIFEST },
            { type: types.MANIFEST_WAS_NOT_SAVED }
        ];

        const store = mockStore({});

        return store
            .dispatch(actions.saveManifest(manifestDoc, token))
            .catch(err => {
                expect(err).toBeInstanceOf(Error);
                expect(store.getActions()).toEqual(expectedActions);
            });
    });
    it("creates MANIFEST_WAS_CREATED after successful creation", () => {
        const newlyCreatedDoc = {
            ...manifestDoc,
            _id: "1234",
            isAuthor: true,
            manifest: `${apiUrl.root}/manifests/1234`
        };
        nock(apiUrl.base, { reqheaders })
            .post(`${apiUrl.version}/manifests`, manifestDoc)
            .reply(201, newlyCreatedDoc);

        const expectedActions = [
            { type: types.REQUEST_CREATE_MANIFEST },
            { type: types.MANIFEST_WAS_CREATED, item: newlyCreatedDoc }
        ];

        const store = mockStore({});

        return store
            .dispatch(actions.createManifest(manifestDoc, token))
            .then(data => {
                expect(store.getActions()).toEqual(expectedActions);
            })
            .catch(err => {
                expect(err).toBeInstanceOf(Error);
                expect(store.getActions()).toEqual(expectedActions);
            });
    });
    it("creates MANIFEST_WAS_NOT_CREATED after unsuccessful creation", () => {
        nock(apiUrl.base, { reqheaders })
            .post(`${apiUrl.version}/manifests`, manifestDoc)
            .replyWithError("Manifest not created");

        const expectedActions = [
            { type: types.REQUEST_CREATE_MANIFEST },
            { type: types.MANIFEST_WAS_NOT_CREATED }
        ];

        const store = mockStore({});

        return store
            .dispatch(actions.createManifest(manifestDoc, token))
            .catch(err => {
                expect(err).toBeInstanceOf(Error);
                expect(store.getActions()).toEqual(expectedActions);
            });
    });
});

describe("manifest actions", () => {
    it("should create an action to request all manifests", () => {
        const expectedAction = {
            type: types.REQUEST_MANIFESTS
        };
        expect(actions.requestManifests()).toEqual(expectedAction);
    });

    it("should create an action to receive all manifests", () => {
        const items = [{ manifest: "Example Manifest" }];
        const expectedAction = {
            type: types.RECEIVE_MANIFESTS,
            items
        };
        expect(actions.receiveManifests(items)).toEqual(expectedAction);
    });

    it("should create an action to fetch all manifests", () => {});

    it("should create an action to save a manifest", () => {
        const expectedAction = {
            type: types.REQUEST_SAVE_MANIFEST
        };
        expect(actions.requestSaveManifest()).toEqual(expectedAction);
    });

    it("should create an action to receive saved manifest", () => {
        const item = { manifest: "Example Manifest" };
        const expectedAction = {
            type: types.MANIFEST_WAS_SAVED,
            item
        };
        expect(actions.manifestWasSaved(item)).toEqual(expectedAction);
    });

    it("should create an action to send failure when manifest was not saved", () => {
        const expectedAction = {
            type: types.MANIFEST_WAS_NOT_SAVED
        };
        expect(actions.manifestWasNotSaved()).toEqual(expectedAction);
    });
});
