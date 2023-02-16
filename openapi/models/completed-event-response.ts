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


import { EventStatus } from './event-status';

/**
 * 
 * @export
 * @interface CompletedEventResponse
 */
export interface CompletedEventResponse {
    /**
     * 
     * @type {EventStatus}
     * @memberof CompletedEventResponse
     */
    'status': EventStatus;
    /**
     * 
     * @type {string}
     * @memberof CompletedEventResponse
     */
    'eventcode': string;
    /**
     * 
     * @type {string}
     * @memberof CompletedEventResponse
     */
    'previewlink': string;
    /**
     * 
     * @type {string}
     * @memberof CompletedEventResponse
     */
    'participantKey': string;
    /**
     * 
     * @type {string}
     * @memberof CompletedEventResponse
     */
    'participantLink': string;
    /**
     * 
     * @type {number}
     * @memberof CompletedEventResponse
     */
    'calenderId': number;
    /**
     * 
     * @type {number}
     * @memberof CompletedEventResponse
     */
    'eventstart': number;
    /**
     * 
     * @type {number}
     * @memberof CompletedEventResponse
     */
    'eventend': number;
    /**
     * 
     * @type {number}
     * @memberof CompletedEventResponse
     */
    'eventduration': number;
    /**
     * 
     * @type {number}
     * @memberof CompletedEventResponse
     */
    'id': number;
    /**
     * 
     * @type {string}
     * @memberof CompletedEventResponse
     */
    'datestart'?: string;
    /**
     * 
     * @type {string}
     * @memberof CompletedEventResponse
     */
    'timezone'?: string;
    /**
     * 
     * @type {string}
     * @memberof CompletedEventResponse
     */
    'duration'?: string;
    /**
     * 
     * @type {string}
     * @memberof CompletedEventResponse
     */
    'stipulation'?: string;
    /**
     * 
     * @type {number}
     * @memberof CompletedEventResponse
     */
    'stipulationobjectid'?: number;
    /**
     * 
     * @type {number}
     * @memberof CompletedEventResponse
     */
    'invited': number;
    /**
     * 
     * @type {number}
     * @memberof CompletedEventResponse
     */
    'exhibit': number;
    /**
     * 
     * @type {number}
     * @memberof CompletedEventResponse
     */
    'matterid': number;
    /**
     * 
     * @type {string}
     * @memberof CompletedEventResponse
     */
    'title': string;
    /**
     * 
     * @type {string}
     * @memberof CompletedEventResponse
     */
    'eventtype': CompletedEventResponseEventtypeEnum;
    /**
     * 
     * @type {number}
     * @memberof CompletedEventResponse
     */
    'tenantid': number;
}

export const CompletedEventResponseEventtypeEnum = {
    Deposition: 'Deposition',
    Hearing: 'Hearing',
    Arbitration: 'Arbitration'
} as const;

export type CompletedEventResponseEventtypeEnum = typeof CompletedEventResponseEventtypeEnum[keyof typeof CompletedEventResponseEventtypeEnum];


