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
import type { CancelReasonInput } from './CancelReasonInput';
import {
    CancelReasonInputFromJSON,
    CancelReasonInputFromJSONTyped,
    CancelReasonInputToJSON,
} from './CancelReasonInput';
import type { CustomerInput } from './CustomerInput';
import {
    CustomerInputFromJSON,
    CustomerInputFromJSONTyped,
    CustomerInputToJSON,
} from './CustomerInput';
import type { FinancialStatusInput } from './FinancialStatusInput';
import {
    FinancialStatusInputFromJSON,
    FinancialStatusInputFromJSONTyped,
    FinancialStatusInputToJSON,
} from './FinancialStatusInput';
import type { FulfillmentStatusInput } from './FulfillmentStatusInput';
import {
    FulfillmentStatusInputFromJSON,
    FulfillmentStatusInputFromJSONTyped,
    FulfillmentStatusInputToJSON,
} from './FulfillmentStatusInput';
import type { OrderLineInput } from './OrderLineInput';
import {
    OrderLineInputFromJSON,
    OrderLineInputFromJSONTyped,
    OrderLineInputToJSON,
} from './OrderLineInput';
import type { PriceSetInput } from './PriceSetInput';
import {
    PriceSetInputFromJSON,
    PriceSetInputFromJSONTyped,
    PriceSetInputToJSON,
} from './PriceSetInput';
import type { RefundInput } from './RefundInput';
import {
    RefundInputFromJSON,
    RefundInputFromJSONTyped,
    RefundInputToJSON,
} from './RefundInput';

/**
 * 
 * @export
 * @interface OrderInput
 */
export interface OrderInput {
    /**
     * 
     * @type {number}
     * @memberof OrderInput
     */
    id: number;
    /**
     * 
     * @type {number}
     * @memberof OrderInput
     */
    number: number;
    /**
     * 
     * @type {string}
     * @memberof OrderInput
     */
    name: string;
    /**
     * 
     * @type {CustomerInput}
     * @memberof OrderInput
     */
    customer: CustomerInput;
    /**
     * 
     * @type {CancelReasonInput}
     * @memberof OrderInput
     */
    cancelReason?: CancelReasonInput | null;
    /**
     * 
     * @type {FinancialStatusInput}
     * @memberof OrderInput
     */
    financialStatus?: FinancialStatusInput | null;
    /**
     * 
     * @type {FulfillmentStatusInput}
     * @memberof OrderInput
     */
    fulfillmentStatus?: FulfillmentStatusInput | null;
    /**
     * 
     * @type {PriceSetInput}
     * @memberof OrderInput
     */
    currentTotalDiscountsSet: PriceSetInput;
    /**
     * 
     * @type {PriceSetInput}
     * @memberof OrderInput
     */
    currentSubtotalPriceSet: PriceSetInput;
    /**
     * 
     * @type {PriceSetInput}
     * @memberof OrderInput
     */
    currentTotalTaxSet: PriceSetInput;
    /**
     * 
     * @type {PriceSetInput}
     * @memberof OrderInput
     */
    totalShippingPriceSet: PriceSetInput;
    /**
     * 
     * @type {PriceSetInput}
     * @memberof OrderInput
     */
    currentTotalPriceSet: PriceSetInput;
    /**
     * 
     * @type {number}
     * @memberof OrderInput
     */
    totalWeight: number;
    /**
     * 
     * @type {Date}
     * @memberof OrderInput
     */
    createdAt: Date;
    /**
     * 
     * @type {Array<OrderLineInput>}
     * @memberof OrderInput
     */
    lineItems: Array<OrderLineInput>;
    /**
     * 
     * @type {Array<RefundInput>}
     * @memberof OrderInput
     */
    refunds: Array<RefundInput>;
}

/**
 * Check if a given object implements the OrderInput interface.
 */
export function instanceOfOrderInput(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "id" in value;
    isInstance = isInstance && "number" in value;
    isInstance = isInstance && "name" in value;
    isInstance = isInstance && "customer" in value;
    isInstance = isInstance && "currentTotalDiscountsSet" in value;
    isInstance = isInstance && "currentSubtotalPriceSet" in value;
    isInstance = isInstance && "currentTotalTaxSet" in value;
    isInstance = isInstance && "totalShippingPriceSet" in value;
    isInstance = isInstance && "currentTotalPriceSet" in value;
    isInstance = isInstance && "totalWeight" in value;
    isInstance = isInstance && "createdAt" in value;
    isInstance = isInstance && "lineItems" in value;
    isInstance = isInstance && "refunds" in value;

    return isInstance;
}

export function OrderInputFromJSON(json: any): OrderInput {
    return OrderInputFromJSONTyped(json, false);
}

export function OrderInputFromJSONTyped(json: any, ignoreDiscriminator: boolean): OrderInput {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': json['id'],
        'number': json['number'],
        'name': json['name'],
        'customer': CustomerInputFromJSON(json['customer']),
        'cancelReason': !exists(json, 'cancel_reason') ? undefined : CancelReasonInputFromJSON(json['cancel_reason']),
        'financialStatus': !exists(json, 'financial_status') ? undefined : FinancialStatusInputFromJSON(json['financial_status']),
        'fulfillmentStatus': !exists(json, 'fulfillment_status') ? undefined : FulfillmentStatusInputFromJSON(json['fulfillment_status']),
        'currentTotalDiscountsSet': PriceSetInputFromJSON(json['current_total_discounts_set']),
        'currentSubtotalPriceSet': PriceSetInputFromJSON(json['current_subtotal_price_set']),
        'currentTotalTaxSet': PriceSetInputFromJSON(json['current_total_tax_set']),
        'totalShippingPriceSet': PriceSetInputFromJSON(json['total_shipping_price_set']),
        'currentTotalPriceSet': PriceSetInputFromJSON(json['current_total_price_set']),
        'totalWeight': json['total_weight'],
        'createdAt': json['created_at'],
        'lineItems': ((json['line_items'] as Array<any>).map(OrderLineInputFromJSON)),
        'refunds': ((json['refunds'] as Array<any>).map(RefundInputFromJSON)),
    };
}

export function OrderInputToJSON(value?: OrderInput | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'number': value.number,
        'name': value.name,
        'customer': CustomerInputToJSON(value.customer),
        'cancel_reason': CancelReasonInputToJSON(value.cancelReason),
        'financial_status': FinancialStatusInputToJSON(value.financialStatus),
        'fulfillment_status': FulfillmentStatusInputToJSON(value.fulfillmentStatus),
        'current_total_discounts_set': PriceSetInputToJSON(value.currentTotalDiscountsSet),
        'current_subtotal_price_set': PriceSetInputToJSON(value.currentSubtotalPriceSet),
        'current_total_tax_set': PriceSetInputToJSON(value.currentTotalTaxSet),
        'total_shipping_price_set': PriceSetInputToJSON(value.totalShippingPriceSet),
        'current_total_price_set': PriceSetInputToJSON(value.currentTotalPriceSet),
        'total_weight': value.totalWeight,
        'created_at': value.createdAt,
        'line_items': ((value.lineItems as Array<any>).map(OrderLineInputToJSON)),
        'refunds': ((value.refunds as Array<any>).map(RefundInputToJSON)),
    };
}
