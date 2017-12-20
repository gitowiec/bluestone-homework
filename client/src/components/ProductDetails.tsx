import * as React from "react";
import { IProduct, IProductImage } from '../common/types';
import ProductsStore, { RECEIVE_PRODUCT } from '../stores/ProductsStore';
import * as ProductsActions from '../actions/ProductsActions';
import { FormEvent } from 'react';
import dispatcher from '../dispatcher';

interface IProductDetailsState {
    product: IProduct;
    productPast: IProduct;
    editable: boolean;
}

interface IProductDetailsProps {
    match: {
        params: {
            productId: string
        }
    }
}

interface IProductFormInputs {
    number?: HTMLInputElement;
    name?: HTMLInputElement;
    description?: HTMLTextAreaElement;
}

const formStyle = {
    marginTop: '20px'
};

const imageWrapStyle = {
    display: 'inline-block',
    margin: '10px'
};

class ProductDetails extends React.Component<IProductDetailsProps, IProductDetailsState> {

    protected productId: string;
    protected inputs: IProductFormInputs = {};

    constructor(props: any) {
        super(props);
        this.getProduct = this.getProduct.bind(this);
        this.configureInputs = this.configureInputs.bind(this);
        this.renderImage = this.renderImage.bind(this);
        this.persistLocally = this.persistLocally.bind(this);

        this.productId = this.props.match.params.productId;
        this.state = {
            product: {} as IProduct,
            productPast: {} as IProduct,
            editable: false
        };
    }

    componentWillMount() {
        ProductsStore.on('change', this.getProduct);
    }

    componentWillUnmount() {
        ProductsStore.removeListener('change', this.getProduct);
    }

    componentDidMount() {
        const lsPayload = localStorage.getItem(this.productId);
        if (!lsPayload) {
            ProductsActions.loadProduct(this.productId);
        } else {
            dispatcher.dispatch({type: RECEIVE_PRODUCT, product: JSON.parse(lsPayload)});
        }
    }

    getProduct() {
        let product = ProductsStore.get(this.productId);
        if (false !== product) {
            this.setState({
                product: product
            });
        }
    }

    handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        switch (e.type) {
            case 'submit': {
                this.persistLocally();
                break;
            }
            case 'reset': {
                const stateCopy = {...this.state};
                stateCopy.editable = false;
                stateCopy.product = {...stateCopy.productPast};
                stateCopy.productPast = {} as IProduct;
                this.setState(stateCopy);
                break;
            }
        }
    }

    persistLocally() {
        const data = Object.entries(this.inputs).reduce((container, pair) => {
            let [name, element] = pair;
            container[name] = element.value;
            return container;
        }, {});
        localStorage.setItem(this.productId, JSON.stringify(data));
    }

    configureInputs(product: IProduct) {
        let that = this;
        Object.keys(this.inputs).forEach(function (this: IProductFormInputs, inputKey) {
            this[inputKey].value = product[inputKey];
            this[inputKey].readOnly = !that.state.editable;
        }, this.inputs);
    }

    handleUpdate(e: FormEvent<HTMLButtonElement>) {
        const stateCopy = {...this.state};
        stateCopy.editable = true;
        stateCopy.productPast = {...stateCopy.product};
        this.setState(stateCopy);
    }

    renderImage(image: IProductImage) {
        return (
            <span style={imageWrapStyle} key={image.url}><img src={image.url} alt={image.name}/></span>
        );
    }

    render() {
        const product = {...this.state.product};
        const buttons = this.state.editable ? [
            <button className="btn btn-sm btn-primary form-control-sm" key="saveButton" type="submit"
                    name="save">Save</button>,
            <button className="btn btn-sm btn-secondary" key="cancelButton" type="reset" name="cancel">Cancel</button>
        ] : [
            <button className="btn btn-sm btn-warning" onClick={(e) => this.handleUpdate(e)} key="updateButton"
                    type="button" name="update">Update</button>
        ];
        this.configureInputs(product);
        return (
            <form style={formStyle} onSubmit={(e) => this.handleSubmit(e)} onReset={(e) => this.handleSubmit(e)}>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Product number</label>
                    <div className="col-sm-7">
                        <input className="form-control form-control-sm"
                               ref={(input: HTMLInputElement) => this.inputs.number = input}
                               name="number" type="text"/>
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Product name</label>
                    <div className="col-sm-7">
                        <input className="form-control form-control-sm"
                               ref={(input: HTMLInputElement) => this.inputs.name = input}
                               name="name" type="text"/>
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Product description</label>
                    <div className="col-sm-7">
                    <textarea className="form-control form-control-sm"
                              ref={(input: HTMLTextAreaElement) => this.inputs.description = input} name="description"/>
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Product images</label>
                    <div className="col-sm-7">{product.images && product.images.map(this.renderImage)}</div>
                </div>
                <div className="form-group row">
                    <div className="col-md-5 btn-group" role="group" aria-label="Basic example">
                        {buttons}
                    </div>
                </div>
            </form>
        );
    }
}


export default ProductDetails;
