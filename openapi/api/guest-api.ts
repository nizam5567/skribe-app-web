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
import { CreateParticipantGuestWitness } from '../models';
// @ts-ignore
import { EventResponse } from '../models';
// @ts-ignore
import { ExhibitsResponse } from '../models';
// @ts-ignore
import { ParticipantResponse } from '../models';
// @ts-ignore
import { ResponseParticipantGuest } from '../models';
/**
 * GuestApi - axios parameter creator
 * @export
 */
export const GuestApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @summary 
         * @param {CreateParticipantGuestWitness} createParticipantGuestWitness 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createParticipantGuestWitness: async (createParticipantGuestWitness: CreateParticipantGuestWitness, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'createParticipantGuestWitness' is not null or undefined
            assertParamExists('createParticipantGuestWitness', 'createParticipantGuestWitness', createParticipantGuestWitness)
            const localVarPath = `/main/guest/createParticipantGuestWitness`;
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
            localVarRequestOptions.data = serializeDataIfNeeded(createParticipantGuestWitness, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary 
         * @param {number} eventId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getExhibitsByEvent: async (eventId: number, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'eventId' is not null or undefined
            assertParamExists('getExhibitsByEvent', 'eventId', eventId)
            const localVarPath = `/main/guest/event/{eventId}/exhibits`
                .replace(`{${"eventId"}}`, encodeURIComponent(String(eventId)));
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
         * @param {string} eventcode 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getGuestEvent: async (eventcode: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'eventcode' is not null or undefined
            assertParamExists('getGuestEvent', 'eventcode', eventcode)
            const localVarPath = `/main/guest/eventsbycode/{eventcode}`
                .replace(`{${"eventcode"}}`, encodeURIComponent(String(eventcode)));
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
        getGuestEvent_1: async (eventid: number, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'eventid' is not null or undefined
            assertParamExists('getGuestEvent_1', 'eventid', eventid)
            const localVarPath = `/main/guest/events/{eventid}`
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
         * @param {string} participantKey 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getParticipantByKeyPublic: async (participantKey: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'participantKey' is not null or undefined
            assertParamExists('getParticipantByKeyPublic', 'participantKey', participantKey)
            const localVarPath = `/main/guest/participants/getParticipantDetails/{participantKey}`
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
        getParticipantMeetingInfoPublic: async (participantKey: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'participantKey' is not null or undefined
            assertParamExists('getParticipantMeetingInfoPublic', 'participantKey', participantKey)
            const localVarPath = `/main/guest/participants/{participantKey}/getParticipantMeetingInfo`
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
         * @param {number} eventId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getParticipants: async (eventId: number, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'eventId' is not null or undefined
            assertParamExists('getParticipants', 'eventId', eventId)
            const localVarPath = `/main/guest/event/{eventId}/participants`
                .replace(`{${"eventId"}}`, encodeURIComponent(String(eventId)));
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
    }
};

/**
 * GuestApi - functional programming interface
 * @export
 */
export const GuestApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = GuestApiAxiosParamCreator(configuration)
    return {
        /**
         * 
         * @summary 
         * @param {CreateParticipantGuestWitness} createParticipantGuestWitness 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async createParticipantGuestWitness(createParticipantGuestWitness: CreateParticipantGuestWitness, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ResponseParticipantGuest>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.createParticipantGuestWitness(createParticipantGuestWitness, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary 
         * @param {number} eventId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getExhibitsByEvent(eventId: number, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ExhibitsResponse>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getExhibitsByEvent(eventId, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary 
         * @param {string} eventcode 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getGuestEvent(eventcode: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<EventResponse>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getGuestEvent(eventcode, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary 
         * @param {number} eventid 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getGuestEvent_1(eventid: number, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<EventResponse>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getGuestEvent_1(eventid, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary 
         * @param {string} participantKey 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getParticipantByKeyPublic(participantKey: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ParticipantResponse>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getParticipantByKeyPublic(participantKey, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary 
         * @param {string} participantKey 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getParticipantMeetingInfoPublic(participantKey: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ParticipantResponse>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getParticipantMeetingInfoPublic(participantKey, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary 
         * @param {number} eventId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getParticipants(eventId: number, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getParticipants(eventId, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * GuestApi - factory interface
 * @export
 */
export const GuestApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = GuestApiFp(configuration)
    return {
        /**
         * 
         * @summary 
         * @param {CreateParticipantGuestWitness} createParticipantGuestWitness 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createParticipantGuestWitness(createParticipantGuestWitness: CreateParticipantGuestWitness, options?: any): AxiosPromise<ResponseParticipantGuest> {
            return localVarFp.createParticipantGuestWitness(createParticipantGuestWitness, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary 
         * @param {number} eventId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getExhibitsByEvent(eventId: number, options?: any): AxiosPromise<ExhibitsResponse> {
            return localVarFp.getExhibitsByEvent(eventId, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary 
         * @param {string} eventcode 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getGuestEvent(eventcode: string, options?: any): AxiosPromise<EventResponse> {
            return localVarFp.getGuestEvent(eventcode, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary 
         * @param {number} eventid 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getGuestEvent_1(eventid: number, options?: any): AxiosPromise<EventResponse> {
            return localVarFp.getGuestEvent_1(eventid, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary 
         * @param {string} participantKey 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getParticipantByKeyPublic(participantKey: string, options?: any): AxiosPromise<ParticipantResponse> {
            return localVarFp.getParticipantByKeyPublic(participantKey, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary 
         * @param {string} participantKey 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getParticipantMeetingInfoPublic(participantKey: string, options?: any): AxiosPromise<ParticipantResponse> {
            return localVarFp.getParticipantMeetingInfoPublic(participantKey, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary 
         * @param {number} eventId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getParticipants(eventId: number, options?: any): AxiosPromise<void> {
            return localVarFp.getParticipants(eventId, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * GuestApi - object-oriented interface
 * @export
 * @class GuestApi
 * @extends {BaseAPI}
 */
export class GuestApi extends BaseAPI {
    /**
     * 
     * @summary 
     * @param {CreateParticipantGuestWitness} createParticipantGuestWitness 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof GuestApi
     */
    public createParticipantGuestWitness(createParticipantGuestWitness: CreateParticipantGuestWitness, options?: AxiosRequestConfig) {
        return GuestApiFp(this.configuration).createParticipantGuestWitness(createParticipantGuestWitness, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary 
     * @param {number} eventId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof GuestApi
     */
    public getExhibitsByEvent(eventId: number, options?: AxiosRequestConfig) {
        return GuestApiFp(this.configuration).getExhibitsByEvent(eventId, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary 
     * @param {string} eventcode 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof GuestApi
     */
    public getGuestEvent(eventcode: string, options?: AxiosRequestConfig) {
        return GuestApiFp(this.configuration).getGuestEvent(eventcode, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary 
     * @param {number} eventid 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof GuestApi
     */
    public getGuestEvent_1(eventid: number, options?: AxiosRequestConfig) {
        return GuestApiFp(this.configuration).getGuestEvent_1(eventid, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary 
     * @param {string} participantKey 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof GuestApi
     */
    public getParticipantByKeyPublic(participantKey: string, options?: AxiosRequestConfig) {
        return GuestApiFp(this.configuration).getParticipantByKeyPublic(participantKey, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary 
     * @param {string} participantKey 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof GuestApi
     */
    public getParticipantMeetingInfoPublic(participantKey: string, options?: AxiosRequestConfig) {
        return GuestApiFp(this.configuration).getParticipantMeetingInfoPublic(participantKey, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary 
     * @param {number} eventId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof GuestApi
     */
    public getParticipants(eventId: number, options?: AxiosRequestConfig) {
        return GuestApiFp(this.configuration).getParticipants(eventId, options).then((request) => request(this.axios, this.basePath));
    }
}
