import {
  Configuration,
  OrderControllerApi,
  ProductControllerApi,
  StatsControllerApi
} from '@/api/shopify-data';

const config = new Configuration({
      basePath: 'https://shopify-data.it.fantastiskefroe.dk'
    }
);

export const OrderApi = new OrderControllerApi(config);
export const ProductApi = new ProductControllerApi(config);
export const StatsApi = new StatsControllerApi(config);
