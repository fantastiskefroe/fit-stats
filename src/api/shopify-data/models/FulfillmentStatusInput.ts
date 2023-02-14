/* tslint:disable */
/* eslint-disable */
/**
 * fit-shopify-data API
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.0.0-SNAPSHOT
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


/**
 * 
 * @export
 */
export const FulfillmentStatusInput = {
    Null: 'NULL',
    Fulfilled: 'FULFILLED',
    Partial: 'PARTIAL',
    Restocked: 'RESTOCKED',
    Pending: 'PENDING'
} as const;
export type FulfillmentStatusInput = typeof FulfillmentStatusInput[keyof typeof FulfillmentStatusInput];


export function FulfillmentStatusInputFromJSON(json: any): FulfillmentStatusInput {
    return FulfillmentStatusInputFromJSONTyped(json, false);
}

export function FulfillmentStatusInputFromJSONTyped(json: any, ignoreDiscriminator: boolean): FulfillmentStatusInput {
    return json as FulfillmentStatusInput;
}

export function FulfillmentStatusInputToJSON(value?: FulfillmentStatusInput | null): any {
    return value as any;
}
