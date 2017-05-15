import { getCookie } from "./util";

const cookieString = "color=blue; margarine=butter; gables=stucco";

it("getCookie returns the correct value for a key in the cookie", () => {
    expect(getCookie(cookieString, "color")).toEqual("blue");
    expect(getCookie(cookieString, "margarine")).toEqual("butter");
    expect(getCookie(cookieString, "gables")).toEqual("stucco");
});

test("getCookie returns null if provided key isn't in cookie", () => {
    expect(getCookie(cookieString, "barn")).toBeNull();
});
