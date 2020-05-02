import useSWR from 'swr';
import {defaultHttpClient} from '../lib/HttpClient';

export const useCart = () => {
  const {data: cart, error: error} = useSWR('/shoppingCart', async (url) => {
    return (await defaultHttpClient.get<PagedResources<Cart>>(url, {
      params: {pageSize: 100, pageNum: 1},
      autoHandlerError: true
    })).data.data;
  });
  //FIXME: 删除假数据
  if (cart?.length === 0) {
    cart.push({
      'shop': {
        'id': 1, 'name': '小明的店铺', 'description': 'desc1', 'imgUrl': 'url1', 'ownerUserId': 1,
        'createdAt': '2020-04-21T16:12:12.000+0000', 'updatedAt': '2020-04-21T16:12:12.000+0000'
      },
      'goods': [{
        'id': 1, 'shopId': 1, 'name': '你不知道的JavaScript（上卷）', 'description': 'desc1',
        'imgUrl': '', 'price': 100,
        'createdAt': '2020-04-21T16:12:12.000+0000', 'updatedAt': '2020-04-21T16:12:12.000+0000',
        'stock': 1,
        'details': 'desc1', 'number': 1
      }, {
        'id': 2, 'shopId': 1, 'name': '你不知道的JavaScript（中卷）', 'description': 'desc1',
        'imgUrl': '', 'price': 100,
        'createdAt': '2020-04-21T16:12:12.000+0000', 'updatedAt': '2020-04-21T16:12:12.000+0000',
        'stock': 1,
        'details': 'desc1', 'number': 1
      }, {
        'id': 3, 'shopId': 1, 'name': '你不知道的JavaScript（下卷）', 'description': 'desc1',
        'imgUrl': '', 'price': 100,
        'createdAt': '2020-04-21T16:12:12.000+0000', 'updatedAt': '2020-04-21T16:12:12.000+0000',
        'stock': 1,
        'details': 'desc1', 'number': 1
      }]
    });
    cart.push({
      'shop': {
        'id': 2, 'name': '小方的店铺', 'description': 'desc1', 'imgUrl': 'url1', 'ownerUserId': 1,
        'createdAt': '2020-04-21T16:12:12.000+0000', 'updatedAt': '2020-04-21T16:12:12.000+0000'
      },
      'goods': [{
        'id': 11, 'shopId': 1, 'name': '你不知道的JavaScript（上卷）', 'description': 'desc1',
        'imgUrl': '', 'price': 100,
        'createdAt': '2020-04-21T16:12:12.000+0000', 'updatedAt': '2020-04-21T16:12:12.000+0000',
        'stock': 1,
        'details': 'desc1', 'number': 1
      }, {
        'id': 12, 'shopId': 1, 'name': '你不知道的JavaScript（中卷）', 'description': 'desc1',
        'imgUrl': '', 'price': 100,
        'createdAt': '2020-04-21T16:12:12.000+0000', 'updatedAt': '2020-04-21T16:12:12.000+0000',
        'stock': 1,
        'details': 'desc1', 'number': 1
      }, {
        'id': 13, 'shopId': 1, 'name': '你不知道的JavaScript（下卷）', 'description': 'desc1',
        'imgUrl': '', 'price': 100,
        'createdAt': '2020-04-21T16:12:12.000+0000', 'updatedAt': '2020-04-21T16:12:12.000+0000',
        'stock': 1,
        'details': 'desc1', 'number': 1
      }]
    });
  }
  return {
    cart, error
  };
};
