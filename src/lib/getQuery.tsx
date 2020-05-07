import {Location} from 'history';

export class HashQuery<T> {
  query: URLSearchParams;

  constructor(public location: Location) {
    this.query = new URLSearchParams(location.search);
  }

  get(name: keyof T) {
    return this.query.get(name.toString());
  }
}

