import React, { useEffect, useState } from "react";
import useAxios from "../hooks/useAxios";
import axios from "../api/axios";
import { ToastContainer, toast } from "react-toastify";

// CreateProduct Component
// This component allows users to create a new product by filling out a form with product details.
// Props:
// - isOpen: Boolean that determines whether the modal is visible.
// - Toggle: Function to toggle the modal visibility (open or close).
// - closeCreate: Callback function to close the modal after successful product creation.

const CreateProduct = ({ isOpen, Toggle, closeCreate }) => {

  // Custom hook to handle the axios requests for product creation.
  const [response, error, isLoading, sendCreate] = useAxios();

  // State for storing form data inputs.
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
  });

  // State for handling file upload (product image).(NOT IMPLEMENTED YET)
  const [file, setFile] = useState();

  // State for handling form validation errors.
  const [errors, setErrors] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
  });

  // Clears the form data and errors after successful submission or when canceled.
  const clearForm = () => {
    setFormData({
      name: "",
      description: "",
      price: "",
      stock: "",
      category: "",
    }),
      setErrors({
        name: "",
        description: "",
        price: "",
        stock: "",
        category: "",
      });
  };

  // Function to cancel the form and close the modal.
  const cancelForm = () => {
    clearForm(), Toggle();
  };

  // Handle form input change for controlled components.
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Reset error message for the field if there's a previous error.
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  // Function to validate the form inputs.
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Product name is required";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }

    if (!formData.price || formData.price <= 0) {
      newErrors.price = "Please enter a valid price";
    }

    if (!formData.stock || formData.stock < 0) {
      newErrors.stock = "Please enter a valid stock quantity";
    }

    if (!formData.category) {
      newErrors.category = "Please select a category";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle the form submission to create a new product.
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      // Send the product data to the backend using axios.
      await sendCreate({
        axiosInstance: axios,
        method: "POST",
        url: `/products/add`,
        reqConfig: {
          data: formData,
        },
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (err) {
      toast.error("Failed to create product. Please try again.");
    }
  };

  // Handle API response and close modal on success
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
      } flex flex-col bg-black/50 fixed top-0 left-0 py-[20px] justify-center items-center w-full h-screen z-[50] `}
      onClick={() => {
        cancelForm();
      }}
    >
      <div
        className=" bg-white rounded-lg w-[600px] overflow-y-auto p-5"
        onClick={(e) => e.stopPropagation()}
      >
        <h1 className=" font-bold text-center text-[30px] mb-5 text-customPink">
          Create New Product
        </h1>

        {/* Product Image Upload */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Product Image <span className="text-blue-600 text-sm font-medium">Not Implemented</span>
          </label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
            <div className="space-y-1 text-center">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
                aria-hidden="true"
              >
                <path
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div className="flex text-sm text-gray-600">
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                >
                  <span>Upload a file</span>
                  <input
                    id="file-upload"
                    name="image"
                    type="file"
                    className="sr-only"
                    onChange={(e) => setFile(e.target.files[0])}
                    accept="image/*"
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
            </div>
          </div>
        </div>

        {/* Product Name Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Product Name
          </label>
          {errors.name && (
            <p className="mt-1 text-[13px] text-red-500 font-semibold">
              {errors.name}
            </p>
          )}
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
        
        {/* Product Description Input */}
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 mb-1 mt-5"
          >
            Description
          </label>

          {errors.description && (
            <p className="mt-1 text-[13px] text-red-500 font-semibold">
              {errors.description}
            </p>
          )}
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
        
        {/* Price and Stock Inputs */}
        <div className="grid grid-cols-2 gap-4 mt-5">
          <div>
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Price (Rs)
            </label>
            {errors.price && (
              <p className="mt-1 text-[13px] text-red-500 font-semibold">
                {errors.price}
              </p>
            )}
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

            {errors.stock && (
              <p className="mt-1 text-[13px] text-red-500 font-semibold">
                {errors.stock}
              </p>
            )}
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
        
        {/* Product Category Selection */}
        <div>
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700 mb-1 mt-5"
          >
            Category
          </label>

          {errors.category && (
            <p className="mt-1 text-[13px] text-red-500 font-semibold">
              {errors.category}
            </p>
          )}
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
        
        {/* Buttons */}
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
            onClick={() => {
              cancelForm();
            }}
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
