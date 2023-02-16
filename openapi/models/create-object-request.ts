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
 * @interface CreateObjectRequest
 */
export interface CreateObjectRequest {
    /**
     * 
     * @type {string}
     * @memberof CreateObjectRequest
     */
    'mimetype': string;
    /**
     * 
     * @type {string}
     * @memberof CreateObjectRequest
     */
    'filename': string;
    /**
     * 
     * @type {number}
     * @memberof CreateObjectRequest
     */
    'filesize': number;
    /**
     * 
     * @type {number}
     * @memberof CreateObjectRequest
     */
    'tenantid': number;
    /**
     * 
     * @type {number}
     * @memberof CreateObjectRequest
     */
    'eventid': number;
    /**
     * 
     * @type {string}
     * @memberof CreateObjectRequest
     */
    'objecttype': CreateObjectRequestObjecttypeEnum;
    /**
     * 
     * @type {string}
     * @memberof CreateObjectRequest
     */
    'bucketlocation'?: string;
}

export const CreateObjectRequestObjecttypeEnum = {
    Stipulation: 'Stipulation',
    Exhibit: 'Exhibit',
    ArchiveVideo: 'ArchiveVideo'
} as const;

export type CreateObjectRequestObjecttypeEnum = typeof CreateObjectRequestObjecttypeEnum[keyof typeof CreateObjectRequestObjecttypeEnum];


