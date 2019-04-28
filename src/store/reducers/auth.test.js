import reducer from "./auth";
import {AUTH_SUCCESS} from "../actions/actionsEnum";

describe("auth reducer", () => {

    it("should return initial state", () => {
        expect(reducer(undefined, {})).toEqual({
            token: null,
            userId: null,
            error: null,
            loading: false,
            authRedirect: "/builder",
        });
    });

    it("should store token upon login", () => {
        expect(reducer({
            token: null,
            userId: null,
            error: null,
            loading: false,
            authRedirect: "/builder",
        }, {
            type: AUTH_SUCCESS,
            payload: {idToken: "test-token", localId: "test-userId"}
        })).toEqual({
            token: "test-token",
            userId: "test-userId",
            error: null,
            loading: false,
            authRedirect: "/builder",
        });
    });
});