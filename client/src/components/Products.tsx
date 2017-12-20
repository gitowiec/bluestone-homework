import * as React from "react";
import ProductRow from './ProductRow';
import TableHeader from './TableHeader';
import * as ProductsActions from '../actions/ProductsActions';
import ProductsStore from '../stores/ProductsStore';
import { IProduct, IProductImage } from '../common/types';

interface IProductsState {
    products: IProduct[]
}

class Products extends React.Component<any, IProductsState> {

    constructor(props: any) {
        super(props);
        this.getProducts = this.getProducts.bind(this);
        this.state = {
            products: [] as IProduct[]
        };
    }

    componentWillMount() {
        ProductsStore.on('change', this.getProducts);
    }

    componentWillUnmount() {
        ProductsStore.removeListener('change', this.getProducts);
    }

    getProducts() {
        this.setState({
            products: ProductsStore.getAll()
        });
    }

    componentDidMount() {
        ProductsActions.loadProducts();
    }


    static createProduct() {
        ProductsActions.createProduct({
            name: String(Date.now()),
            description: 'testtest',
            images: [] as IProductImage[]
        });
    }

    render() {
        const {products} = this.state;

        const ProductRows = products.map((product: IProduct) => {
            return <ProductRow key={product.number} {...product}/>;
        });

        return (
            <div className="row">
                <div className="col-md-12">
                    <table className="table">
                        <thead>
                        <TableHeader/>
                        </thead>
                        <tbody>
                        {ProductRows}
                        </tbody>
                    </table>
                    {/*<button onClick={Products.createProduct.bind(this)}>Create</button>*/}
                </div>
            </div>
        );
    }
}

export default Products;
