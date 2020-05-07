type ErrorsFor<T> = {
  [K in keyof T]?: string[]
} | null

interface Shop {
  id: number;
  name: string;
  description: string;
  imgUrl?: string;
  ownerUserId?: number;
  createdAt: string;
  updatedAt: string;
}

interface PagedResources<T> {
  pageNum: number;
  pageSize: number;
  totalPage: number;
  data: T[];
}

interface Resource<T> {
  data: T
}

interface Cart {
  shop: Shop;
  goods: (Good & { number: number })[];
}

interface Good {
  id: number;
  name: string;
  description: string;
  details?: string;
  imgUrl: string;
  price: number;
  stock: number;
  shopId: number;
  createdAt: string;
  updatedAt: string;
}

interface User {
  id: number;
  name: string;
  tel: string;
  avatarUrl: string;
  address: string;
}

interface Order {
  id: number;
  totalPrice?: number,
  expressCompany: null;
  expressId: null;
  status: 'pending' | 'paid' | 'delivered' | 'received';
  address: string;
  shop: Shop;
  goods: (Good & { number: number })[];
  createdAt?: string;
}

type OrderStatus = typeof Order['status']
