import {AxiosPromise} from "axios";
import request from "../utils/http";

const sponsorApi = "/api/website/sponsor"

const api = {
    addSponsor: sponsorApi,
    sponsorList: sponsorApi,
    updateSponsor: sponsorApi,
    deleteSponsor: sponsorApi,
};

export function addSponsor(param: any): AxiosPromise {
    return request({
        url: api.addSponsor,
        method: "post",
        data: param,
    });
}

export function sponsorList(param: any): AxiosPromise {
    return request({
        url: api.sponsorList,
        method: "get",
        data: param,
    });
}

export function updateSponsor(param: any): AxiosPromise {
    return request({
        url: api.updateSponsor + "/" + param.id,
        method: "put",
        data: param,
    });
}

export function deleteSponsor(param: any): AxiosPromise {
    return request({
        url: api.deleteSponsor + "/" + param.id,
        method: "delete",
        data: param,
    });
}
