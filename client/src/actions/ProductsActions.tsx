import dispatcher from '../dispatcher';
import { IProduct } from '../common/types';
import {
    CREATE_PRODUCT, DELETE_PRODUCT, FETCH_PRODUCT, FETCH_PRODUCTS, FETCH_PRODUCTS_ERROR, READ_PRODUCT, RECEIVE_PRODUCT,
    RECEIVE_PRODUCTS,
    UPDATE_PRODUCT
} from '../stores/ProductsStore';
import Http from '../services/Http';

export function createProduct(product: IProduct) {
    dispatcher.dispatch({type: CREATE_PRODUCT, product});
}

export function readProduct(number: string) {
    dispatcher.dispatch({type: READ_PRODUCT, number});
}

export function updateProduct(product: IProduct) {
    dispatcher.dispatch({type: UPDATE_PRODUCT, product});
}

export function deleteProduct(number: string) {
    dispatcher.dispatch({type: DELETE_PRODUCT, number});
}


export function loadProducts() {
    dispatcher.dispatch({type: FETCH_PRODUCTS});
    Http.products().then(products => {
        dispatcher.dispatch({type: RECEIVE_PRODUCTS, products});
    }, () => {
        dispatcher.dispatch({type: FETCH_PRODUCTS_ERROR});
    });
}

// export function getProduct(number:string){
//
//     dispatcher.dispatch({type:})
// }

export function loadProduct(number:string){
    dispatcher.dispatch({type: FETCH_PRODUCT});
    Http.product(number).then(product => {
        dispatcher.dispatch({type: RECEIVE_PRODUCT, product});
    }, () => {
        dispatcher.dispatch({type: FETCH_PRODUCTS_ERROR});
    });

}
