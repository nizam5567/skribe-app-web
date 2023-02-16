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
 * @interface CreateVideoClipRequest
 */
export interface CreateVideoClipRequest {
    /**
     * 
     * @type {number}
     * @memberof CreateVideoClipRequest
     */
    'eventid': number;
    /**
     * 
     * @type {number}
     * @memberof CreateVideoClipRequest
     */
    'tenantid': number;
    /**
     * 
     * @type {string}
     * @memberof CreateVideoClipRequest
     */
    'title': string;
    /**
     * 
     * @type {string}
     * @memberof CreateVideoClipRequest
     */
    'description': string;
    /**
     * 
     * @type {string}
     * @memberof CreateVideoClipRequest
     */
    'recordingtype': CreateVideoClipRequestRecordingtypeEnum;
    /**
     * 
     * @type {string}
     * @memberof CreateVideoClipRequest
     */
    'starttimecode': string;
    /**
     * 
     * @type {string}
     * @memberof CreateVideoClipRequest
     */
    'endtimecode': string;
    /**
     * 
     * @type {string}
     * @memberof CreateVideoClipRequest
     */
    'bucketlocation': string;
}

export const CreateVideoClipRequestRecordingtypeEnum = {
    ActiveSpeaker: 'active_speaker',
    GalleryView: 'gallery_view',
    ArchiveVideo: 'archive_video'
} as const;

export type CreateVideoClipRequestRecordingtypeEnum = typeof CreateVideoClipRequestRecordingtypeEnum[keyof typeof CreateVideoClipRequestRecordingtypeEnum];

