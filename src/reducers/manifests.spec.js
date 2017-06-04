import reducer from "./manifests";
import * as actions from "../actiontypes/manifests";

describe("manifests reducer", () => {
    it("should return the initial state", () => {
        expect(reducer(undefined, {})).toEqual({ items: [] });
    });
});
