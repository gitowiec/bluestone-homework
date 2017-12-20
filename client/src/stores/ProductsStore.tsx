import { EventEmitter } from "events";
import { IProduct } from '../common/types';
import dispatcher, { IDispatcherPayload } from '../dispatcher';

// const jsonData = require('../data.json');

export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const READ_PRODUCT = 'READ_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const FETCH_PRODUCTS = 'FETCH_PRODUCTS';
export const FETCH_PRODUCT = 'FETCH_PRODUCT';
export const RECEIVE_PRODUCTS = 'RECEIVE_PRODUCTS';
export const RECEIVE_PRODUCT = 'RECEIVE_PRODUCT';
export const FETCH_PRODUCTS_ERROR = 'FETCH_PRODUCTS_ERROR';


class ProductsStore extends EventEmitter {
    products: Array<any> = [];
    product: object = {};

    constructor() {
        super();
        this.products = [];
    }

    getAll() {
        return this.products;
    }

    get(number: string) {
        const indexToGet = this.findProductIndexByNumber(number);
        if (-1 < indexToGet) {
            return this.products[indexToGet];
        } else {
            return false;
        }
    }

    createProduct(product: IProduct) {
        const number = String(Date.now());
        this.products.push({number, ...product});
        this.emit('change');
    }

    deleteProduct(number: string) {
        const indexToDelete = this.findProductIndexByNumber(number);
        if (-1 < indexToDelete) {
            this.products.splice(indexToDelete, 1);
            this.emit('change');
        }
    }

    protected findProductIndexByNumber(number: string): number {
        return this.products.findIndex((product: IProduct) => product.number === number);
    }

    handleActions(action: IDispatcherPayload) {
        switch (action.type) {
            case CREATE_PRODUCT: {
                this.createProduct(action.product);
                break;
            }
            case DELETE_PRODUCT: {
                this.deleteProduct(action.number);
                break;
            }
            case RECEIVE_PRODUCTS: {
                this.products = action.products;
                this.emit('change');
                break;
            }
            case RECEIVE_PRODUCT: {
                this.products.push(action.product);
                this.emit('change');
                break;
            }
            case READ_PRODUCT : {


            }
        }
    }
}

const productsStore = new ProductsStore();
dispatcher.register(productsStore.handleActions.bind(productsStore));
export default productsStore;
