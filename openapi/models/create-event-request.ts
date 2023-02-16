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



/**
 * 
 * @export
 * @interface CreateEventRequest
 */
export interface CreateEventRequest {
    /**
     * 
     * @type {number}
     * @memberof CreateEventRequest
     */
    'matterid': number;
    /**
     * 
     * @type {string}
     * @memberof CreateEventRequest
     */
    'title': string;
    /**
     * 
     * @type {string}
     * @memberof CreateEventRequest
     */
    'eventtype': CreateEventRequestEventtypeEnum;
    /**
     * 
     * @type {string}
     * @memberof CreateEventRequest
     */
    'datestart'?: string;
    /**
     * 
     * @type {string}
     * @memberof CreateEventRequest
     */
    'timezone'?: string;
    /**
     * 
     * @type {string}
     * @memberof CreateEventRequest
     */
    'duration'?: string;
    /**
     * 
     * @type {string}
     * @memberof CreateEventRequest
     */
    'status': CreateEventRequestStatusEnum;
    /**
     * 
     * @type {number}
     * @memberof CreateEventRequest
     */
    'tenantid': number;
}

export const CreateEventRequestEventtypeEnum = {
    Deposition: 'Deposition',
    Hearing: 'Hearing',
    Arbitration: 'Arbitration'
} as const;

export type CreateEventRequestEventtypeEnum = typeof CreateEventRequestEventtypeEnum[keyof typeof CreateEventRequestEventtypeEnum];
export const CreateEventRequestStatusEnum = {
    Draft: 'DRAFT',
    Scheduled: 'SCHEDULED',
    InProgress: 'IN_PROGRESS',
    Preflight: 'PREFLIGHT',
    Complete: 'COMPLETE',
    Cancelled: 'CANCELLED',
    Archive: 'ARCHIVE',
    ArchiveComplete: 'ARCHIVE_COMPLETE'
} as const;

export type CreateEventRequestStatusEnum = typeof CreateEventRequestStatusEnum[keyof typeof CreateEventRequestStatusEnum];


