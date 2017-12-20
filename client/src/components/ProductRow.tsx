import * as React from "react";
import { IProductImage, IProductRowProps } from '../common/types';
import { Link } from 'react-router-dom';
import * as ProductsActions from '../actions/ProductsActions';

class ProductRow extends React.Component<IProductRowProps> {

    deleteProduct(number: string) {
        ProductsActions.deleteProduct(number);
    }

    render() {
        const {name, number} = this.props,
            productLink = `/product/${number}`;

        const textStyle = {
            textAlign: "left"
        };

        return (
            <tr>
                <th>{number}</th>
                <td style={textStyle}><Link to={productLink}>{name}</Link></td>
                <td>
                    <button type="button" className="btn btn-danger" onClick={() => this.deleteProduct.call(this, number)}>X</button>
                </td>
            </tr>
        );
    }
}

export default ProductRow;
