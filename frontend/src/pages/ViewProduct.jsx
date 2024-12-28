import React, { useEffect, useState } from "react";
import { productShoe } from "../assets/images";
import useAxios from "../hooks/useAxios";
import axios from "../api/axios";
import ConfirmDelete from "./confirmDelete";

// ViewProduct Component
// This component displays detailed information about a product and allows the user to delete the product or close the modal view.
// Props:
// - isOpen: Boolean to determine if the modal is visible.
// - Toggle: Function to toggle the modal visibility.
// - productId: The ID of the product to fetch details for.
// - closeDelete: Callback function to close the modal after deletion.

const ViewProduct = ({ isOpen, Toggle, productId, closeDelete }) => {
  
  // Using a custom hook to manipulate product data
  const [productResult, error, isLoading, FetchProduct] = useAxios();
  const [deleteResult, deleteError, isLoadingDelete, sendDelete] = useAxios();

  // State to track confirmation modal visibility
  const [confirmOpen, isConfirmOpen] = useState(false);

  // State to store product details fetched from the API
  const [productDetail, setProductDetail] = useState({
    ID: "loading..",
    name: "loading..",
    description: "loading..",
    price: 0,
    stock: 0,
    category: "loading..",
    createdAt: "loading..",
    updatedAt: null,
  });

  // Format the date
  const formatDate = (isoDate) => {
    if (isoDate === "loading..") return isoDate;
    const date = new Date(isoDate);
    return date.toLocaleString(); // Formats to local date and time
  };

  // Fetch product details from the API using the productId
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

  // Delete the product using its ID
  const deleteProduct = async () => {
    await sendDelete({
      axiosInstance: axios,
      method: "DELETE",
      url: `/products/${productId}`,
      headers: {
        "Content-Type": "application/json",
        withCredentials: true,
      },
    });
  };

  // Handle deletion success or error and close modal on success
  useEffect(() => {
    if (!isLoadingDelete) {
      if (deleteError) {
        alert(deleteError);
      } else if (deleteResult?.message === "product deleted succesfully") {
        alert("product deleted succesfully");
        closeDelete();
      } else {
        console.log(deleteResult);
      }
    }
  }, [isLoadingDelete]);

  // Update productDetail state when API response is received
  useEffect(() => {
    if (productResult) {
      setProductDetail({
        ID: productResult._id,
        name: productResult.name,
        description: productResult.description,
        price: productResult.price,
        stock: productResult.stock,
        category: productResult.category,
        createdAt: productResult.createdAt,
        updatedAt: productResult.updatedAt
      });
    }
  }, [productResult]);

  // Fetch product details whenever the productId changes
  useEffect(() => {
    if (productId) {
      getProduct();
    }
  }, [productId]);

  return (
    <div
      className={`${
        isOpen ? "" : "hidden"
      } flex flex-col bg-black/50 fixed top-0 left-0 pt-[20px] justify-center items-center w-full h-screen z-[50]`}
      onClick={Toggle} // Close modal when clicking outside the content
    >
      <div
        className="flex bg-white rounded-lg w-[1000px] overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Left Section: Product Image */}
        <div className="w-1/2 p-6">
          <div className="w-full h-[550px] overflow-hidden rounded-lg">
            <img
              src={productShoe}
              alt="Product"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

         {/* Right Section: Product Details */}
        <div className="w-1/2 p-8 flex flex-col">
          <div className="flex-1">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                  {productDetail.name}
                </h2>
                <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                  {productDetail.category}
                </span>
              </div>
            </div>

            {/* Price and Stock */}
            <div className="mb-6">
              <div className="text-2xl font-bold text-blue-600 mb-2">
                Rs {productDetail.price}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-600">Stock Available:</span>
                <span className="font-semibold">
                  {productDetail.stock} units
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Description</h3>
              <p className="text-gray-600 leading-relaxed">
                {productDetail.description}
              </p>
            </div>

            {/* Additional Details */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold mb-2">Product Details</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-sm">
                  <span className="text-gray-500">Product ID:</span>
                  <span className="ml-2 font-medium">{productDetail.ID}</span>
                </div>
                <div className="text-sm">
                  <span className="text-gray-500">Added On:</span>
                  <span className="ml-2 font-medium">{formatDate(productDetail.createdAt)}</span>
                </div>
                <div className="text-sm">
                  <span className="text-gray-500">Last Updated:</span>
                  {productDetail.updatedAt && (
                  <span className="ml-2 font-medium">{formatDate(productDetail.updatedAt)}</span>)}
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 mt-8 border-t pt-6">
            <button
              className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
              onClick={() => {
                isConfirmOpen(!confirmOpen);
              }}
            >
              Delete Product
            </button>
            <button
              onClick={Toggle}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              Close
            </button>
          </div>
        </div>

        {/* Confirmation Modal for Deletion */}
        <ConfirmDelete
          isOpen={confirmOpen}
          Toggle={() => {
            isConfirmOpen(!confirmOpen);
          }}
          productName={productDetail.name}
          deleteProduct={deleteProduct}
          ToggleView={Toggle}
        />
      </div>
    </div>
  );
};

export default ViewProduct;
