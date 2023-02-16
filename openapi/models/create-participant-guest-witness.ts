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
 * @interface CreateParticipantGuestWitness
 */
export interface CreateParticipantGuestWitness {
    /**
     * 
     * @type {string}
     * @memberof CreateParticipantGuestWitness
     */
    'eventcode': string;
    /**
     * 
     * @type {string}
     * @memberof CreateParticipantGuestWitness
     */
    'firstname': string;
    /**
     * 
     * @type {string}
     * @memberof CreateParticipantGuestWitness
     */
    'lastname': string;
    /**
     * 
     * @type {string}
     * @memberof CreateParticipantGuestWitness
     */
    'email': string;
    /**
     * 
     * @type {string}
     * @memberof CreateParticipantGuestWitness
     */
    'title'?: string;
    /**
     * 
     * @type {string}
     * @memberof CreateParticipantGuestWitness
     */
    'role': CreateParticipantGuestWitnessRoleEnum;
    /**
     * 
     * @type {number}
     * @memberof CreateParticipantGuestWitness
     */
    'eventid': number;
}

export const CreateParticipantGuestWitnessRoleEnum = {
    Attending: 'ATTENDING',
    Scheduling: 'SCHEDULING',
    Guest: 'GUEST',
    Witness: 'WITNESS'
} as const;

export type CreateParticipantGuestWitnessRoleEnum = typeof CreateParticipantGuestWitnessRoleEnum[keyof typeof CreateParticipantGuestWitnessRoleEnum];


