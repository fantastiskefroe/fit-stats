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


import * as runtime from '../runtime';
import type {
  GroupByUnitInput,
  ProductVariantStatsOutput,
  StatsOutput,
} from '../models';
import {
    GroupByUnitInputFromJSON,
    GroupByUnitInputToJSON,
    ProductVariantStatsOutputFromJSON,
    ProductVariantStatsOutputToJSON,
    StatsOutputFromJSON,
    StatsOutputToJSON,
} from '../models';

export interface GetProductVariantStatsRequest {
    from: Date;
    xFitToken?: string | null;
}

export interface GetStatsRequest {
    from: Date;
    to: Date;
    xFitToken?: string | null;
}

export interface GetStatsGroupedRequest {
    from: Date;
    to: Date;
    unit: GroupByUnitInput;
    xFitToken?: string | null;
}

/**
 * 
 */
export class StatsControllerApi extends runtime.BaseAPI {

    /**
     */
    async getProductVariantStatsRaw(requestParameters: GetProductVariantStatsRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<ProductVariantStatsOutput>>> {
        if (requestParameters.from === null || requestParameters.from === undefined) {
            throw new runtime.RequiredError('from','Required parameter requestParameters.from was null or undefined when calling getProductVariantStats.');
        }

        const queryParameters: any = {};

        if (requestParameters.from !== undefined) {
            queryParameters['from'] = (requestParameters.from as any).toISOString();
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (requestParameters.xFitToken !== undefined && requestParameters.xFitToken !== null) {
            headerParameters['x-fit-token'] = String(requestParameters.xFitToken);
        }

        const response = await this.request({
            path: `/stats/remaining`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(ProductVariantStatsOutputFromJSON));
    }

    /**
     */
    async getProductVariantStats(requestParameters: GetProductVariantStatsRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<ProductVariantStatsOutput>> {
        const response = await this.getProductVariantStatsRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async getStatsRaw(requestParameters: GetStatsRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<StatsOutput>> {
        if (requestParameters.from === null || requestParameters.from === undefined) {
            throw new runtime.RequiredError('from','Required parameter requestParameters.from was null or undefined when calling getStats.');
        }

        if (requestParameters.to === null || requestParameters.to === undefined) {
            throw new runtime.RequiredError('to','Required parameter requestParameters.to was null or undefined when calling getStats.');
        }

        const queryParameters: any = {};

        if (requestParameters.from !== undefined) {
            queryParameters['from'] = (requestParameters.from as any).toISOString();
        }

        if (requestParameters.to !== undefined) {
            queryParameters['to'] = (requestParameters.to as any).toISOString();
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (requestParameters.xFitToken !== undefined && requestParameters.xFitToken !== null) {
            headerParameters['x-fit-token'] = String(requestParameters.xFitToken);
        }

        const response = await this.request({
            path: `/stats`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => StatsOutputFromJSON(jsonValue));
    }

    /**
     */
    async getStats(requestParameters: GetStatsRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<StatsOutput> {
        const response = await this.getStatsRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async getStatsGroupedRaw(requestParameters: GetStatsGroupedRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<StatsOutput>>> {
        if (requestParameters.from === null || requestParameters.from === undefined) {
            throw new runtime.RequiredError('from','Required parameter requestParameters.from was null or undefined when calling getStatsGrouped.');
        }

        if (requestParameters.to === null || requestParameters.to === undefined) {
            throw new runtime.RequiredError('to','Required parameter requestParameters.to was null or undefined when calling getStatsGrouped.');
        }

        if (requestParameters.unit === null || requestParameters.unit === undefined) {
            throw new runtime.RequiredError('unit','Required parameter requestParameters.unit was null or undefined when calling getStatsGrouped.');
        }

        const queryParameters: any = {};

        if (requestParameters.from !== undefined) {
            queryParameters['from'] = (requestParameters.from as any).toISOString();
        }

        if (requestParameters.to !== undefined) {
            queryParameters['to'] = (requestParameters.to as any).toISOString();
        }

        if (requestParameters.unit !== undefined) {
            queryParameters['unit'] = requestParameters.unit;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (requestParameters.xFitToken !== undefined && requestParameters.xFitToken !== null) {
            headerParameters['x-fit-token'] = String(requestParameters.xFitToken);
        }

        const response = await this.request({
            path: `/stats/grouped`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(StatsOutputFromJSON));
    }

    /**
     */
    async getStatsGrouped(requestParameters: GetStatsGroupedRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<StatsOutput>> {
        const response = await this.getStatsGroupedRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
