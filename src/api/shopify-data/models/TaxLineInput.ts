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

import { exists, mapValues } from '../runtime';
import type { PriceSetInput } from './PriceSetInput';
import {
    PriceSetInputFromJSON,
    PriceSetInputFromJSONTyped,
    PriceSetInputToJSON,
} from './PriceSetInput';

/**
 * 
 * @export
 * @interface TaxLineInput
 */
export interface TaxLineInput {
    /**
     * 
     * @type {PriceSetInput}
     * @memberof TaxLineInput
     */
    priceSet: PriceSetInput;
}

/**
 * Check if a given object implements the TaxLineInput interface.
 */
export function instanceOfTaxLineInput(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "priceSet" in value;

    return isInstance;
}

export function TaxLineInputFromJSON(json: any): TaxLineInput {
    return TaxLineInputFromJSONTyped(json, false);
}

export function TaxLineInputFromJSONTyped(json: any, ignoreDiscriminator: boolean): TaxLineInput {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'priceSet': PriceSetInputFromJSON(json['price_set']),
    };
}

export function TaxLineInputToJSON(value?: TaxLineInput | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'price_set': PriceSetInputToJSON(value.priceSet),
    };
}

