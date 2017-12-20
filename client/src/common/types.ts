export interface IProductImage {
    url: string,
    name: string
}

export interface IProduct {
    number?: string,
    name: string,
    description: string,
    images: IProductImage[]
}

export interface IState {
    products:IProduct[],
    product:IProduct
}

export interface IProductRowProps {
    number?: string,
    name: string
}
