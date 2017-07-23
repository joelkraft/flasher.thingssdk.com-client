import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import * as actions from "./manifests";
import {
    REQUEST_MANIFESTS,
    RECEIVE_MANIFESTS,
    RECEIVE_MANIFESTS_FAILED,
    REQUEST_MANIFEST,
    RECEIVE_MANIFEST,
    RECEIVE_MANIFEST_FAILED,
    MANIFEST_WAS_SAVED,
    MANIFEST_WAS_NOT_SAVED,
    REQUEST_SAVE_MANIFEST,
    REQUEST_CREATE_MANIFEST,
    MANIFEST_WAS_CREATED,
    MANIFEST_WAS_NOT_CREATED,
    REQUEST_DELETE_MANIFEST,
    MANIFEST_WAS_DELETED,
    MANIFEST_WAS_NOT_DELETED
} from "../actiontypes/manifests";
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
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
    };
    const manifestId = "5906d98f2e4f60e34879bff8";
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
                        manifest: `${apiUrl.base}${apiUrl.version}/manifests/${manifestId}`,
                        latest: false
                    }
                ]
            }
        ]
    };
    const manifestDoc = {
        board: "ESP8266",
        manifest: `${apiUrl.base}${apiUrl.version}/manifests/${manifestId}`,
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
            { type: REQUEST_MANIFESTS },
            { type: RECEIVE_MANIFESTS, items: manifestDocCollection }
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
            { type: REQUEST_MANIFESTS },
            { type: RECEIVE_MANIFESTS_FAILED }
        ];

        const store = mockStore({});

        return store.dispatch(actions.fetchManifests(token)).catch(err => {
            expect(err).toBeInstanceOf(Error);
            expect(store.getActions()).toEqual(expectedActions);
        });
    });
    it("creates RECEIVE_MANIFEST when manifest has been returned", () => {
        nock(apiUrl.base, { reqheaders })
            .get(`${apiUrl.version}/manifests/${manifestId}`)
            .reply(200, manifestDoc);

        const expectedActions = [
            { type: REQUEST_MANIFEST },
            { type: RECEIVE_MANIFEST, item: manifestDoc }
        ];

        const store = mockStore({});

        return store
            .dispatch(actions.fetchManifest(manifestId, token))
            .then(() => {
                expect(store.getActions()).toEqual(expectedActions);
            })
            .catch(err => {
                expect(err).toBe(null);
            });
    });
    it("creates RECEIVE_MANIFEST_FAILED when manifest has failed to be returned", () => {
        nock(apiUrl.base, { reqheaders })
            .get(`${apiUrl.version}/manifests/${manifestId}`)
            .replyWithError("Manifest cannot be returned");

        const expectedActions = [
            { type: REQUEST_MANIFEST },
            { type: RECEIVE_MANIFEST_FAILED }
        ];

        const store = mockStore({});

        return store
            .dispatch(actions.fetchManifest(manifestDoc, token))
            .catch(err => {
                expect(err).toBeInstanceOf(Error);
                expect(store.getActions()).toEqual(expectedActions);
            });
    });
    it("creates MANIFEST_WAS_SAVED after successful save", () => {
        nock(apiUrl.base, { reqheaders })
            .put(`${apiUrl.version}/manifests/${manifestId}`, manifestDoc)
            .reply(200, manifestDoc);

        const expectedActions = [
            { type: REQUEST_SAVE_MANIFEST },
            { type: MANIFEST_WAS_SAVED, item: manifestDoc }
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
            .put(`${apiUrl.version}/manifests/${manifestId}`, manifestDoc)
            .replyWithError("Manifest not saved");

        const expectedActions = [
            { type: REQUEST_SAVE_MANIFEST },
            { type: MANIFEST_WAS_NOT_SAVED }
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
            { type: REQUEST_CREATE_MANIFEST },
            { type: MANIFEST_WAS_CREATED, item: newlyCreatedDoc }
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
            { type: REQUEST_CREATE_MANIFEST },
            { type: MANIFEST_WAS_NOT_CREATED }
        ];

        const store = mockStore({});

        return store
            .dispatch(actions.createManifest(manifestDoc, token))
            .catch(err => {
                expect(err).toBeInstanceOf(Error);
                expect(store.getActions()).toEqual(expectedActions);
            });
    });
    it("creates MANIFEST_WAS_DELETED after successful deletion", () => {
        nock(apiUrl.base, { reqheaders })
            .delete(`${apiUrl.version}/manifests/${manifestId}`)
            .reply(200, { message: "Success" });

        const expectedActions = [
            { type: REQUEST_DELETE_MANIFEST },
            { type: MANIFEST_WAS_DELETED }
        ];

        const store = mockStore({});

        return store
            .dispatch(actions.deleteManifest(manifestId, token))
            .then(data => {
                expect(store.getActions()).toEqual(expectedActions);
            })
            .catch(err => {
                expect(err).toBeInstanceOf(Error);
                expect(store.getActions()).toEqual(expectedActions);
            });
    });
    it("creates MANIFEST_WAS_NOT_DELETED after unsuccessful deletion", () => {
        nock(apiUrl.base, { reqheaders })
            .delete(`${apiUrl.version}/manifests/${manifestId}`)
            .replyWithError("Manifest not created");

        const expectedActions = [
            { type: REQUEST_DELETE_MANIFEST },
            { type: MANIFEST_WAS_NOT_DELETED }
        ];

        const store = mockStore({});

        return store
            .dispatch(actions.deleteManifest(manifestDoc, token))
            .catch(err => {
                expect(err).toBeInstanceOf(Error);
                expect(store.getActions()).toEqual(expectedActions);
            });
    });
});

describe("manifest actions", () => {
    it("should create an action to request all manifests", () => {
        const expectedAction = {
            type: REQUEST_MANIFESTS
        };
        expect(actions.requestManifests()).toEqual(expectedAction);
    });

    it("should create an action to receive all manifests", () => {
        const items = [{ manifest: "Example Manifest" }];
        const expectedAction = {
            type: RECEIVE_MANIFESTS,
            items
        };
        expect(actions.receiveManifests(items)).toEqual(expectedAction);
    });

    it("should create an action to fetch all manifests", () => {});

    it("should create an action to save a manifest", () => {
        const expectedAction = {
            type: REQUEST_SAVE_MANIFEST
        };
        expect(actions.requestSaveManifest()).toEqual(expectedAction);
    });

    it("should create an action to receive saved manifest", () => {
        const item = { manifest: "Example Manifest" };
        const expectedAction = {
            type: MANIFEST_WAS_SAVED,
            item
        };
        expect(actions.manifestWasSaved(item)).toEqual(expectedAction);
    });

    it("should create an action to send failure when manifest was not saved", () => {
        const expectedAction = {
            type: MANIFEST_WAS_NOT_SAVED
        };
        expect(actions.manifestWasNotSaved()).toEqual(expectedAction);
    });
    it("should create an action to delete a manifest", () => {
        const expectedAction = {
            type: REQUEST_DELETE_MANIFEST
        };
        expect(actions.requestDeleteManifest()).toEqual(expectedAction);
    });

    it("should create an action to indicate successful deletion of manifest", () => {
        const id = 'id1234';
        const expectedAction = {
            type: MANIFEST_WAS_DELETED,
            id
        };
        expect(actions.manifestWasDeleted(id)).toEqual(expectedAction);
    });

    it("should create an action to send failure when manifest was not deleted", () => {
        const expectedAction = {
            type: MANIFEST_WAS_NOT_DELETED
        };
        expect(actions.manifestWasNotDeleted()).toEqual(expectedAction);
    });
});
