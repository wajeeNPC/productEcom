import React, { useEffect, useState } from "react";
import useAxios from "../hooks/useAxios";
import axios from "../api/axios";
import { ToastContainer, toast } from "react-toastify";

// EditProduct Component
// This component allows users to edit an existing product's details.
// Props:
// - isOpen: Boolean that determines whether the modal is visible.
// - Toggle: Function to toggle the modal visibility.
// - productId: ID of the product to be edited.
// - closeEdit: Callback function to close the modal after successful edit.

const EditProduct = ({ isOpen, Toggle, productId, closeEdit }) => {

  // Custom hooks for handling API requests and state management
  const [editResult, errorEdit, isLoadingEdit, sendEdit] = useAxios();
  const [productResult, error, isLoading, FetchProduct] = useAxios();

  // Form data state to hold input field values
  const [formData, setFormData] = useState({
    name: "loading..",
    description: "loading..",
    price: 0,
    stock: 0,
    category: "loading..",
  });

  // State for form validation errors
  const [errors, setErrors] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
  });

  // Function to reset form data and close the modal
  const cancelForn = () => {
    setFormData({
      name: "loading..",
      description: "loading..",
      price: 0,
      stock: 0,
      category: "loading..",
    }),
      setErrors({
        name: "",
        description: "",
        price: "",
        stock: "",
        category: "",
      }),
      Toggle();
  };

  // Handle form field changes and clear error messages on change
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

  // Form validation function
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

  // Fetch product details by productId
  const getProduct = async () => {
    await FetchProduct({
      axiosInstance: axios,
      method: "GET",
      url: `/products/${productId}`,
      headers: {
        "Content-Type": "application/json",
        withCredentials: true,
      },
    });
  };

  // Submit edited product details to the server
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      // Send the product data to the backend using axios.
      await sendEdit({
        axiosInstance: axios,
        method: "PUT",
        url: `/products/${productId}`,
        reqConfig: {
          data: formData,
        },
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (err) {
      toast.error("Failed to update product. Please try again.");
    }
  };

  // Populate form data when product details are fetched successfully
  useEffect(() => {
    if (productResult) {
      setFormData({
        name: productResult.name,
        description: productResult.description,
        price: productResult.price,
        stock: productResult.stock,
        category: productResult.category,
      });
    }
  }, [productResult]);

  // Fetch product details when productId or isOpen changes
  useEffect(() => {
    if (productId) {
      getProduct();
    }
  }, [productId, isOpen]);

  // Handle API response and close modal on success
  useEffect(() => {
    if (!isLoadingEdit) {
      if (errorEdit) {
        alert(errorEdit);
      } else if (editResult?.message === "Product updated successfully") {
        alert("Product updated successfully");
        closeEdit();
      } else {
        console.log(editResult);
      }
    }
  }, [isLoadingEdit]);

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
        <h1 className=" font-bold text-center text-[30px] mb-5 text-customPink">
          Edit Product
        </h1>

        {/* Product name input */}
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
        
        {/* Description input */}
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
        
        {/* Price and Stock inputs */}
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
        
        {/* Category selection */}
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
            Confirm
          </button>
          <button
            type="button"
            onClick={() => {
              cancelForn();
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

export default EditProduct;
