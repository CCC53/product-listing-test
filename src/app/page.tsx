'use client';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { State } from "./types/product";
import { Card } from "./components/Card";
import { fetchProducts } from "./helpers/products";
import { filterByTitle, loadMoreProducts, sortByKeyAndOrder } from "./slice/product.slice";
import { AppDispatch } from "./store/store";

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const [value, setValue] = useState("");
  const [key, setKey] = useState("");
  const [order, setOrder] = useState("");
  const totalProducts = useSelector((state: State) => state.products.totalProducts);
  const products = useSelector((state: State) => state.products.products);
  const cartProducts = useSelector((state: State) => state.products.cartProducts);
  const total = useSelector((state: State) => state.products.total);

  const handleKeyUp = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
    if (event.target.value.trim().length === 0) {
      dispatch(fetchProducts());
      return;
    }
    dispatch(filterByTitle(value))
  }

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedKey = event.target.value;
    setKey(selectedKey);
  }

  const handleSelectOrderChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOrder = event.target.value;
    setOrder(selectedOrder);
    if (key.length !== 0) {
      dispatch(sortByKeyAndOrder({key, order: selectedOrder}))
    }
  }

  const handleClear = () => {
    setValue("")
    setKey("")
    dispatch(fetchProducts())
  }

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
      <div className="space-y-8 mt-5 ">
        <div className="flex justify-between gap-4 mx-4 sm:mx-10 items-center">
          <input onChange={handleKeyUp} value={value}
            className="block w-1/2 rounded-md border border-gray-300 py-1.5 px-2 text-lg text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none sm:text-lg"
            type="text" placeholder="Search by tittle"/>
          <div className="flex space-x-4 items-center">
            <label className="text-white">Order by</label>
            <select className="rounded-md border border-gray-300 py-1.5 px-2" value={key} onChange={handleSelectChange}>
              <option value={''}>Select filter</option>
              <option value={'price'}>Price</option>
              <option value={'rating'}>Rating</option>
            </select>
            <select value={order} onChange={handleSelectOrderChange} 
              className="col-start-1 row-start-1 w-full rounded-md border py-1.5 pr-7 pl-3 sm:w-auto">
              <option value={''}>Select order</option>
              <option value={'asc'}>Ascending</option>
              <option value={'desc'}>Descending</option>
            </select>
            <button onClick={handleClear} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Clear</button>
            <div className="flex flex-col items-center justify-center bg-white border border-gray-300 pl-3 pr-3 rounded-lg">
              <span className="text-lg">Shopping Cart</span>
              <div>
                <span>Articles added: {cartProducts.length} </span>
                <span> Total payable: ${total}</span>
              </div>
            </div>
          </div>
        </div>
    
        <div className="flex flex-wrap justify-between gap-4 mx-4">
          {
            products.length === 0 ? <div className="text-white flex items-center justify-center w-full h-32"><h1>No data found</h1></div> : products.map(p => <Card key={p.id} product={p}/>)
          }
        </div>

        {
          products.length < totalProducts.length && value.length === 0 && (
            <div className="w-full mx-4">
              <button onClick={() => dispatch(loadMoreProducts())} className="w-full py-4 bg-blue-500 text-white font-semibold text-lg rounded-md">
                Load more products...
              </button>
            </div>
          )
        }
      </div>
  );
}
