import { AxiosPromise } from "axios";
import request from "../utils/http";

const api = {
    login: "/api/user/login",
    getAllUsers: "/api/user/getAllUsers",
};

export function login(param: any): AxiosPromise {
    return request({
        url: api.login,
        method: "post",
        data: param,
    });
}
