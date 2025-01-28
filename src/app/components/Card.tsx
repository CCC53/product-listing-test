import { useDispatch } from "react-redux"
import { Product } from "../types/product"
import { addToCart, getTotal } from "../slice/product.slice";

interface Props {
    product: Product
}

export const Card = ({product}: Props) => {

    const dispatch = useDispatch<any>();

    const handleAddCart = () => {
        dispatch(addToCart({product}));
        dispatch(getTotal());
    }

    return (
        <div className="max-w-sm mx-auto bg-white rounded-2xl shadow-lg overflow-hidden mt-10">
            <img className="w-full h-48 object-cover" src={product.image}/>
            <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-800">{product.tittle}</h2>
                <div className="flex justify-between">
                    <span>Rating:  
                        <span className="ml-2 inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-green-600/20 ring-inset">{product.rating}</span>
                    </span>
                    <span>Price:
                        <span className="ml-2 inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-green-600/20 ring-inset">
                            {product.price} {product.currency}
                        </span>
                    </span>
                    <button onClick={handleAddCart} className="px-4 bg-blue-500 text-white rounded">Add to cart</button>
                </div>
                <p className="text-gray-600 mt-2">{product.description}</p>
            </div>
        </div>

    )
}
