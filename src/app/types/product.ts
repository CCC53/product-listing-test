
export interface Product {
    id: number;
    tittle: string;
    description: string;
    price: number;
    currency: string;
    image: string;
    rating: number;
}

export interface InitialState {
    products: Product[];
    totalProducts: Product[];
    cartProducts: Product[];
    total: number;
    loading: boolean;
}

export interface State {
    products: {
        products: Product[];
        totalProducts: Product[];
        cartProducts: Product[];
        total: number;
        loading: boolean;
    }
}

export interface FetchProductResponse {
    data: {
        data: Product[];
    }
}

export interface SortActionPayload {
    key: string;
    order: string;
}

export interface AddToCartActionPayload {
    product: Product;
}