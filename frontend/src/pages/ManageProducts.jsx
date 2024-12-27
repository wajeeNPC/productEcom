import React, { useEffect, useState } from "react";
import { productShoe } from "../assets/images";
import { Pencil } from "lucide-react";
import ViewProduct from "./viewProduct";
import useAxios from "../hooks/useAxios";
import axios from "../api/axios";
import CreateProduct from "./CreateProduct";
import EditProduct from "./EditProduct";
import { searchIcon } from "../assets/icons";




const ManageProducts = () => {

  const [productResult,error,isLoading,FetchProducts] = useAxios()

  const [openDetail,setOpenDetail] = useState(false);
  const [openCreate,setOpenCreate] = useState(false);
  const [openEdit,setOpenEdit] = useState(false);

  const [products,setProducts] = useState([]);
  const [productID,setproductID] = useState();

  const [searchTerm, setSearchTerm] = useState("");

  const closeCreate = ()=>{
    setOpenCreate(false);
    getProducts();
  }

  const closeEdit = ()=>{
    setOpenEdit(false);
    getProducts();
  }

  const closeDelete = ()=>{
    setOpenDetail(false);
    getProducts();
  }



  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };


  const getProducts = async () => {
   await FetchProducts({
    axiosInstance : axios,
    method : "GET",
    url: '/products',
    headers : {
      "Content-Type" : "application/json",
      withCredentials : true
    }
   })
  }

  useEffect(()=>{
    if(productResult){
      setProducts(productResult)
    }

  },[productResult])

  useEffect(()=>{
    getProducts();
  },[])


  return (

    <div className=" ml-72 mt-8">

      <div className=" flex justify-between mb-5">

        <div className="flex gap-3">
        <div className="relative flex items-center text-gray-400 focus-within:text-gray-600">
          <img src={searchIcon} alt="search icon" width={15} className="absolute ml-3"/>
          <input type="text" name="search" placeholder="Search product" autoComplete="off" value={searchTerm}
            onChange={handleSearchChange} className="pr-3 pl-10 py-2 font-semibold placeholder-gray-500 rounded-lg border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2 w-[400px]"/>
        </div>
        <button className="mr-10 px-4 py-2 border-none text-white bg-customPink rounded-lg  transition-colors duration-200 hover:text-gray-700  hover:bg-white"
        >Filter</button>
        </div>
        
        <button className="mr-10 px-4 py-2 border-none text-white bg-customPink rounded-lg  transition-colors duration-200 hover:text-gray-700  hover:bg-white"
        onClick={()=>{setOpenCreate(!openCreate)}}
        >Add Product</button>
      </div>


<div>
  {isLoading ? (
    <div className="flex items-center justify-center h-full">
      <p className="text-gray-600 text-lg">Loading products...</p>
    </div>
  ) : error ? (
    <div className="text-red-500 py-4 px-4">
      Error loading products. Please try again.
    </div>
  ) : filteredProducts.length > 0 ? (
    <div className="grid grid-cols-2 gap-10 w-[1200px] mb-5">
      {filteredProducts.map((item, index) => (
        <div
          key={index}
          className=" bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
        >
          <div className="flex flex-col md:flex-row p-4 gap-6">
            <div className="w-full md:w-48 h-48 overflow-hidden rounded-lg">
              <img
                src={productShoe}
                alt={item.name || "Product Image"}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>

            <div className="flex-1 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-2">
                  <h1 className="text-2xl font-bold text-gray-800">{item.name}</h1>
                  <button
                    className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors duration-200"
                    aria-label="Edit product"
                  >
                    <Pencil size={20} onClick={()=>{setproductID(item._id) , setOpenEdit(!openEdit)}}/>
                  </button>
                </div>

                <p className="text-gray-600 mb-4 line-clamp-1 w-[300px]">{item.description}</p>

                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold text-customPink">Rs {item.price}</span>
                </div>
              </div>

              <div className="flex gap-3 mt-4">
                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-customPink hover:text-white hover:border-none transition-colors duration-200"
                onClick={()=>{setproductID(item._id) , setOpenDetail(!openDetail)}}>
                  View Details
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  ) : (
    <div className="flex items-center justify-center h-full">
      <p className="text-gray-600 text-lg">No products available.</p>
    </div>
  )}
</div>

      <ViewProduct isOpen={openDetail} Toggle={()=>{setOpenDetail(!openDetail)}} productId={productID} closeDelete={closeDelete}/>
      <CreateProduct isOpen={openCreate} Toggle={()=>{setOpenCreate(!openCreate)}} closeCreate={closeCreate}/>
      <EditProduct isOpen={openEdit} Toggle={()=>{setOpenEdit(!openEdit)}} productId={productID} closeEdit={closeEdit}/>

    </div>

    

    
  );
};

export default ManageProducts;
