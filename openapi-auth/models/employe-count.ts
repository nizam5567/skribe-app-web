/* tslint:disable */
/* eslint-disable */
/**
 * Skribe Authentication Endpoints
 * Endpoints used during the authentication, session verification or user creation processes.
 *
 * The version of the OpenAPI document: 1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */



/**
 * Total number of employees using this platform
 * @export
 * @enum {string}
 */

export const EmployeCount = {
    _19: '1-9',
    _1099: '10-99',
    _100499: '100-499',
    _500: '500'
} as const;

export type EmployeCount = typeof EmployeCount[keyof typeof EmployeCount];


