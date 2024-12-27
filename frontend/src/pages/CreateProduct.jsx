import React, { useEffect, useState } from "react";
import useAxios from "../hooks/useAxios";
import axios from "../api/axios";
import { ToastContainer, toast } from "react-toastify";



const CreateProduct = ({isOpen,Toggle,closeCreate}) => {

  const [response,error,isLoading,sendCreate] = useAxios()

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
  });

  const clearForm = () =>{
    setFormData({
      name: "",
      description: "",
      price: "",
      stock: "",
      category: "",
    })
  }

  const cancelForm =()=>{
    clearForm(),
    Toggle()
  }


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      toast.error("Product name is required");
      return false;
    }
    
    if (!formData.description.trim()) {
      toast.error("Product description is required");
      return false;
    }
    
    if (!formData.price || formData.price <= 0) {
      toast.error("Please enter a valid price");
      return false;
    }
    
    if (!formData.stock || formData.stock < 0) {
      toast.error("Please enter a valid stock quantity");
      return false;
    }
    
    if (!formData.category) {
      toast.error("Please select a category");
      return false;
    }
    
    return true;
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      await sendCreate({
        axiosInstance: axios,
        method: "POST",
        url: `/products/add`,
        reqConfig: {
          data: formData,
        },
        headers: {
          "Content-Type": "application/json"
        },
      });
    } catch (err) {
      toast.error("Failed to create product. Please try again.");
    }
  };

  useEffect(() => {
    if (!isLoading) {
        if (error) {
            alert(error);
        } else if (response?.message === "product created successfully") {
            alert("product created successfully");
            closeCreate();  
        } else {
            console.log(response);
        }
    }
}, [isLoading]);

  return (

    <div 
    className={`${
      isOpen ? "" : "hidden"
    } flex flex-col bg-black/50 fixed top-0 left-0 pt-[20px] justify-center items-center w-full h-screen z-[50]`} 
    onClick={Toggle}
  >
    <div  
      className=" bg-white rounded-lg w-[600px] overflow-y-auto p-5"
      onClick={(e) => e.stopPropagation()}
    >
    
      <h1 className=" font-bold text-center text-[30px] mb-5 text-customPink">Create New Product</h1>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
        <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
              placeholder="Enter product name"
              required
            />
      </div>

      <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-1 mt-5"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors resize-none"
              placeholder="Enter product description"
              required
            />
        </div>

        <div className="grid grid-cols-2 gap-4 mt-5">
            <div>
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Price (Rs)
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                placeholder="0.00"
                min="0"
                step="0.01"
                required
              />
            </div>

            <div>
              <label
                htmlFor="stock"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Stock
              </label>
              <input
                type="number"
                id="stock"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                placeholder="0"
                min="0"
                required
              />
            </div>
          </div>


          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700 mb-1 mt-5"
            >
              Category
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors bg-white"
              required
            >
              <option value="">Select a category</option>
              <option value="soda">Soda</option>
              <option value="juice">Juice</option>
              <option value="water">Water</option>
              <option value="energy">Energy Drink</option>
            </select>
          </div>

          <div className=" flex justify-end mt-5 gap-3">
          <button
              type="submit"
              className=" bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 "
              onClick={handleSubmit}
            >
              Create Product
            </button>
            <button
              type="button"
              onClick={()=>{cancelForm()}}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              Cancel
            </button>
          </div>


        </div>
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
  );
};

export default CreateProduct;
