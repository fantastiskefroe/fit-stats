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
import type { ProductOutput } from './ProductOutput';
import {
    ProductOutputFromJSON,
    ProductOutputFromJSONTyped,
    ProductOutputToJSON,
} from './ProductOutput';
import type { ProductVariantOutput } from './ProductVariantOutput';
import {
    ProductVariantOutputFromJSON,
    ProductVariantOutputFromJSONTyped,
    ProductVariantOutputToJSON,
} from './ProductVariantOutput';

/**
 * 
 * @export
 * @interface ProductVariantStatsOutput
 */
export interface ProductVariantStatsOutput {
    /**
     * 
     * @type {ProductOutput}
     * @memberof ProductVariantStatsOutput
     */
    product: ProductOutput;
    /**
     * 
     * @type {ProductVariantOutput}
     * @memberof ProductVariantStatsOutput
     */
    variant: ProductVariantOutput;
    /**
     * 
     * @type {number}
     * @memberof ProductVariantStatsOutput
     */
    numOrders: number;
    /**
     * 
     * @type {number}
     * @memberof ProductVariantStatsOutput
     */
    numSold: number;
    /**
     * 
     * @type {number}
     * @memberof ProductVariantStatsOutput
     */
    soldPerDay: number;
    /**
     * 
     * @type {number}
     * @memberof ProductVariantStatsOutput
     */
    daysLeft: number;
}

/**
 * Check if a given object implements the ProductVariantStatsOutput interface.
 */
export function instanceOfProductVariantStatsOutput(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "product" in value;
    isInstance = isInstance && "variant" in value;
    isInstance = isInstance && "numOrders" in value;
    isInstance = isInstance && "numSold" in value;
    isInstance = isInstance && "soldPerDay" in value;
    isInstance = isInstance && "daysLeft" in value;

    return isInstance;
}

export function ProductVariantStatsOutputFromJSON(json: any): ProductVariantStatsOutput {
    return ProductVariantStatsOutputFromJSONTyped(json, false);
}

export function ProductVariantStatsOutputFromJSONTyped(json: any, ignoreDiscriminator: boolean): ProductVariantStatsOutput {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'product': ProductOutputFromJSON(json['product']),
        'variant': ProductVariantOutputFromJSON(json['variant']),
        'numOrders': json['num_orders'],
        'numSold': json['num_sold'],
        'soldPerDay': json['sold_per_day'],
        'daysLeft': json['days_left'],
    };
}

export function ProductVariantStatsOutputToJSON(value?: ProductVariantStatsOutput | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'product': ProductOutputToJSON(value.product),
        'variant': ProductVariantOutputToJSON(value.variant),
        'num_orders': value.numOrders,
        'num_sold': value.numSold,
        'sold_per_day': value.soldPerDay,
        'days_left': value.daysLeft,
    };
}

