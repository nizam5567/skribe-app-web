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
 * @interface CreateTenantRequest
 */
export interface CreateTenantRequest {
    /**
     * 
     * @type {string}
     * @memberof CreateTenantRequest
     */
    'email': string;
    /**
     * 
     * @type {string}
     * @memberof CreateTenantRequest
     */
    'firstname': string;
    /**
     * 
     * @type {string}
     * @memberof CreateTenantRequest
     */
    'lastname': string;
    /**
     * 
     * @type {string}
     * @memberof CreateTenantRequest
     */
    'company': string;
    /**
     * 
     * @type {string}
     * @memberof CreateTenantRequest
     */
    'phone'?: string;
    /**
     * 
     * @type {string}
     * @memberof CreateTenantRequest
     */
    'country': string;
    /**
     * 
     * @type {string}
     * @memberof CreateTenantRequest
     */
    'state'?: string;
    /**
     * 
     * @type {string}
     * @memberof CreateTenantRequest
     */
    'invitationcode'?: string;
}
