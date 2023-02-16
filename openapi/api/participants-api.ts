/* tslint:disable */
/* eslint-disable */
/**
 * Skrib
 * Skrib
 *
 * The version of the OpenAPI document: 2.11.7
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import globalAxios, { AxiosPromise, AxiosInstance, AxiosRequestConfig } from 'axios';
import { Configuration } from '../configuration';
// Some imports not used depending on template conditions
// @ts-ignore
import { DUMMY_BASE_URL, assertParamExists, setApiKeyToObject, setBasicAuthToObject, setBearerAuthToObject, setOAuthToObject, setSearchParams, serializeDataIfNeeded, toPathString, createRequestFunction } from '../common';
// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS, RequestArgs, BaseAPI, RequiredError } from '../base';
// @ts-ignore
import { CreateParticipantRequest } from '../models';
// @ts-ignore
import { ParticipantResponse } from '../models';
// @ts-ignore
import { ParticipantsResponse } from '../models';
// @ts-ignore
import { UpdateParticipantRequest } from '../models';
// @ts-ignore
import { UpdateParticipantRole } from '../models';
/**
 * ParticipantsApi - axios parameter creator
 * @export
 */
export const ParticipantsApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @summary 
         * @param {UpdateParticipantRole} updateParticipantRole 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        changeParticipantRole: async (updateParticipantRole: UpdateParticipantRole, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'updateParticipantRole' is not null or undefined
            assertParamExists('changeParticipantRole', 'updateParticipantRole', updateParticipantRole)
            const localVarPath = `/main/participants/changeParticipantRole`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'PUT', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication bearer required
            await setApiKeyToObject(localVarHeaderParameter, "authorization", configuration)


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(updateParticipantRole, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary 
         * @param {CreateParticipantRequest} createParticipantRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createParticipant: async (createParticipantRequest: CreateParticipantRequest, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'createParticipantRequest' is not null or undefined
            assertParamExists('createParticipant', 'createParticipantRequest', createParticipantRequest)
            const localVarPath = `/main/participants`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication bearer required
            await setApiKeyToObject(localVarHeaderParameter, "authorization", configuration)


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(createParticipantRequest, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary 
         * @param {number} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        deleteParticipant: async (id: number, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('deleteParticipant', 'id', id)
            const localVarPath = `/main/participants/{id}`
                .replace(`{${"id"}}`, encodeURIComponent(String(id)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'DELETE', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication bearer required
            await setApiKeyToObject(localVarHeaderParameter, "authorization", configuration)


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary 
         * @param {string} participantKey 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getParticipantByKey: async (participantKey: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'participantKey' is not null or undefined
            assertParamExists('getParticipantByKey', 'participantKey', participantKey)
            const localVarPath = `/main/participants/getParticipantDetails/{participantKey}`
                .replace(`{${"participantKey"}}`, encodeURIComponent(String(participantKey)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication bearer required
            await setApiKeyToObject(localVarHeaderParameter, "authorization", configuration)


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary 
         * @param {string} participantKey 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getParticipantMeetingInfo: async (participantKey: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'participantKey' is not null or undefined
            assertParamExists('getParticipantMeetingInfo', 'participantKey', participantKey)
            const localVarPath = `/main/participants/{participantKey}/getParticipantMeetingInfo`
                .replace(`{${"participantKey"}}`, encodeURIComponent(String(participantKey)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication bearer required
            await setApiKeyToObject(localVarHeaderParameter, "authorization", configuration)


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary 
         * @param {number} eventid 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getParticipants: async (eventid: number, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'eventid' is not null or undefined
            assertParamExists('getParticipants', 'eventid', eventid)
            const localVarPath = `/main/participants/{eventid}`
                .replace(`{${"eventid"}}`, encodeURIComponent(String(eventid)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication bearer required
            await setApiKeyToObject(localVarHeaderParameter, "authorization", configuration)


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary 
         * @param {number} id 
         * @param {UpdateParticipantRequest} updateParticipantRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        updateParticipant: async (id: number, updateParticipantRequest: UpdateParticipantRequest, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('updateParticipant', 'id', id)
            // verify required parameter 'updateParticipantRequest' is not null or undefined
            assertParamExists('updateParticipant', 'updateParticipantRequest', updateParticipantRequest)
            const localVarPath = `/main/participants/{id}`
                .replace(`{${"id"}}`, encodeURIComponent(String(id)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'PUT', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication bearer required
            await setApiKeyToObject(localVarHeaderParameter, "authorization", configuration)


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(updateParticipantRequest, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * ParticipantsApi - functional programming interface
 * @export
 */
export const ParticipantsApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = ParticipantsApiAxiosParamCreator(configuration)
    return {
        /**
         * 
         * @summary 
         * @param {UpdateParticipantRole} updateParticipantRole 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async changeParticipantRole(updateParticipantRole: UpdateParticipantRole, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.changeParticipantRole(updateParticipantRole, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary 
         * @param {CreateParticipantRequest} createParticipantRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async createParticipant(createParticipantRequest: CreateParticipantRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.createParticipant(createParticipantRequest, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary 
         * @param {number} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async deleteParticipant(id: number, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<boolean>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.deleteParticipant(id, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary 
         * @param {string} participantKey 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getParticipantByKey(participantKey: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ParticipantResponse>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getParticipantByKey(participantKey, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary 
         * @param {string} participantKey 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getParticipantMeetingInfo(participantKey: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ParticipantResponse>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getParticipantMeetingInfo(participantKey, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary 
         * @param {number} eventid 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getParticipants(eventid: number, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ParticipantsResponse>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getParticipants(eventid, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary 
         * @param {number} id 
         * @param {UpdateParticipantRequest} updateParticipantRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async updateParticipant(id: number, updateParticipantRequest: UpdateParticipantRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.updateParticipant(id, updateParticipantRequest, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * ParticipantsApi - factory interface
 * @export
 */
export const ParticipantsApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = ParticipantsApiFp(configuration)
    return {
        /**
         * 
         * @summary 
         * @param {UpdateParticipantRole} updateParticipantRole 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        changeParticipantRole(updateParticipantRole: UpdateParticipantRole, options?: any): AxiosPromise<void> {
            return localVarFp.changeParticipantRole(updateParticipantRole, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary 
         * @param {CreateParticipantRequest} createParticipantRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createParticipant(createParticipantRequest: CreateParticipantRequest, options?: any): AxiosPromise<void> {
            return localVarFp.createParticipant(createParticipantRequest, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary 
         * @param {number} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        deleteParticipant(id: number, options?: any): AxiosPromise<boolean> {
            return localVarFp.deleteParticipant(id, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary 
         * @param {string} participantKey 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getParticipantByKey(participantKey: string, options?: any): AxiosPromise<ParticipantResponse> {
            return localVarFp.getParticipantByKey(participantKey, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary 
         * @param {string} participantKey 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getParticipantMeetingInfo(participantKey: string, options?: any): AxiosPromise<ParticipantResponse> {
            return localVarFp.getParticipantMeetingInfo(participantKey, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary 
         * @param {number} eventid 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getParticipants(eventid: number, options?: any): AxiosPromise<ParticipantsResponse> {
            return localVarFp.getParticipants(eventid, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary 
         * @param {number} id 
         * @param {UpdateParticipantRequest} updateParticipantRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        updateParticipant(id: number, updateParticipantRequest: UpdateParticipantRequest, options?: any): AxiosPromise<void> {
            return localVarFp.updateParticipant(id, updateParticipantRequest, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * ParticipantsApi - object-oriented interface
 * @export
 * @class ParticipantsApi
 * @extends {BaseAPI}
 */
export class ParticipantsApi extends BaseAPI {
    /**
     * 
     * @summary 
     * @param {UpdateParticipantRole} updateParticipantRole 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ParticipantsApi
     */
    public changeParticipantRole(updateParticipantRole: UpdateParticipantRole, options?: AxiosRequestConfig) {
        return ParticipantsApiFp(this.configuration).changeParticipantRole(updateParticipantRole, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary 
     * @param {CreateParticipantRequest} createParticipantRequest 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ParticipantsApi
     */
    public createParticipant(createParticipantRequest: CreateParticipantRequest, options?: AxiosRequestConfig) {
        return ParticipantsApiFp(this.configuration).createParticipant(createParticipantRequest, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary 
     * @param {number} id 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ParticipantsApi
     */
    public deleteParticipant(id: number, options?: AxiosRequestConfig) {
        return ParticipantsApiFp(this.configuration).deleteParticipant(id, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary 
     * @param {string} participantKey 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ParticipantsApi
     */
    public getParticipantByKey(participantKey: string, options?: AxiosRequestConfig) {
        return ParticipantsApiFp(this.configuration).getParticipantByKey(participantKey, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary 
     * @param {string} participantKey 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ParticipantsApi
     */
    public getParticipantMeetingInfo(participantKey: string, options?: AxiosRequestConfig) {
        return ParticipantsApiFp(this.configuration).getParticipantMeetingInfo(participantKey, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary 
     * @param {number} eventid 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ParticipantsApi
     */
    public getParticipants(eventid: number, options?: AxiosRequestConfig) {
        return ParticipantsApiFp(this.configuration).getParticipants(eventid, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary 
     * @param {number} id 
     * @param {UpdateParticipantRequest} updateParticipantRequest 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ParticipantsApi
     */
    public updateParticipant(id: number, updateParticipantRequest: UpdateParticipantRequest, options?: AxiosRequestConfig) {
        return ParticipantsApiFp(this.configuration).updateParticipant(id, updateParticipantRequest, options).then((request) => request(this.axios, this.basePath));
    }
}