import React, { useEffect, useState } from "react";
import { productShoe } from "../assets/images";
import { Pencil } from "lucide-react";
import ViewProduct from "./viewProduct";
import useAxios from "../hooks/useAxios";
import axios from "../api/axios";
import CreateProduct from "./CreateProduct";
import EditProduct from "./EditProduct";
import { searchIcon } from "../assets/icons";


// ManageProducts Component
// This component manages the display, creation, editing, and deletion of products in the system.
// It includes search functionality to filter products by name and provides a user interface to view product details,
// add new products, and edit existing products.
// Features:
// - Search: Filter products by their name using a search bar.
// - Add Product: Open a modal to create a new product.
// - Edit Product: Open a modal to edit an existing product.
// - View Details: Open a modal to view detailed information about a product.
// - Dynamic Loading: Fetch products dynamically using a custom hook (`useAxios`).

// State:
// - productResult: Holds the result of the fetched products.
// - error: Stores any errors encountered during product fetching.
// - isLoading: Indicates if the products are being fetched.
// - openDetail, openCreate, openEdit: Boolean states to manage modal visibility.
// - products: Array of all products fetched from the server.
// - productID: Stores the ID of the selected product for viewing or editing.
// - searchTerm: Holds the current search query entered by the user.

// Props passed to child components:
// - ViewProduct: Displays product details with options to delete or close the modal.
// - CreateProduct: Opens a form to create a new product.
// - EditProduct: Opens a form to edit an existing product.

const ManageProducts = () => {

  // Using a custom hook to fetch product data
  const [productResult, error, isLoading, FetchProducts] = useAxios();

  // States to control the visibility of modals for viewing, creating, and editing products
  const [openDetail, setOpenDetail] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const [products, setProducts] = useState([]); // State to hold the list of products fetched from the server
  const [productID, setproductID] = useState(); // State to track the ID of the currently selected product for operations

  // State for handling search functionality
  const [searchTerm, setSearchTerm] = useState("");

  // Callback to close the CreateProduct modal and refresh the product list
  const closeCreate = () => {
    setOpenCreate(false);
    getProducts();
  };

  // Callback to close the EditProduct modal and refresh the product list
  const closeEdit = () => {
    setOpenEdit(false);
    getProducts();
  };

  // Callback to close the ViewProduct modal and refresh the product list
  const closeDelete = () => {
    setOpenDetail(false);
    getProducts();
  };

  // Filter products based on the search term entered by the user
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Update the search term as the user types in the search box
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Fetch products from the API
  const getProducts = async () => {
    await FetchProducts({
      axiosInstance: axios,
      method: "GET",
      url: "/products",
      headers: {
        "Content-Type": "application/json",
        withCredentials: true,
      },
    });
  };

  // Update products state whenever new data is fetched
  useEffect(() => {
    if (productResult) {
      setProducts(productResult);
    }
  }, [productResult]);

  // Initial fetch of products when the component mounts
  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className=" mt-8">
      {/* Header Section */}
      <div className=" flex justify-between mb-5">
        <div className="flex gap-3">
          {/* Search Input */}
          <div className="relative flex items-center text-gray-400 focus-within:text-gray-600">
            <img
              src={searchIcon}
              alt="search icon"
              width={15}
              className="absolute ml-3"
            />
            <input
              type="text"
              name="search"
              placeholder="Search product"
              autoComplete="off"
              value={searchTerm}
              onChange={handleSearchChange}
              className="pr-3 pl-10 py-2 font-semibold placeholder-gray-500 rounded-lg border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2 w-[400px]"
            />
          </div>
          <button className="mr-10 px-4 py-2 border-none text-white bg-customPink rounded-lg  transition-colors duration-200 hover:text-gray-700  hover:bg-white">
            Filter
          </button>
        </div>

        {/* Add Product Button */}
        <button
          className="mr-10 px-4 py-2 border-none text-white bg-customPink rounded-lg  transition-colors duration-200 hover:text-gray-700  hover:bg-white"
          onClick={() => {
            setOpenCreate(!openCreate);
          }}
        >
          Add Product
        </button>
      </div>
      
      {/* Main Content Section */}
      <div>
        {isLoading ? (
          // Show loading state when data is being fetched
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-600 text-lg">Loading products...</p>
          </div>
        ) : error ? (
          // Show error message if data fetch fails
          <div className="text-red-500 py-4 px-4">
            Error loading products. Please try again.
          </div>
        ) : filteredProducts.length > 0 ? (
          // Display filtered products if available
          <div className="grid grid-cols-2 gap-10 w-[1200px] mb-5">
            {filteredProducts.map((item, index) => (
              <div
                key={index}
                className=" bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex flex-col md:flex-row p-4 gap-6">
                  {/* Product Image */}
                  <div className="w-full md:w-48 h-48 overflow-hidden rounded-lg">
                    <img
                      src={productShoe}
                      alt={item.name || "Product Image"}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <h1 className="text-2xl font-bold text-gray-800">
                          {item.name}
                        </h1>
                        <button
                          className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors duration-200"
                          aria-label="Edit product"
                        >
                          <Pencil
                            size={20}
                            onClick={() => {
                              setproductID(item._id), setOpenEdit(!openEdit);
                            }}
                          />
                        </button>
                      </div>

                      <p className="text-gray-600 mb-4 line-clamp-1 w-[300px]">
                        {item.description}
                      </p>

                      <div className="flex items-center gap-2">
                        <span className="text-xl font-bold text-customPink">
                          Rs {item.price}
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-3 mt-4">
                      <button
                        className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-customPink hover:text-white hover:border-none transition-colors duration-200"
                        onClick={() => {
                          setproductID(item._id), setOpenDetail(!openDetail);
                        }}
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Show message if no products are available
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-600 text-lg">No products available.</p>
          </div>
        )}
      </div>
      
      {/* Modals for Viewing, Creating, and Editing Products */}
      <ViewProduct
        isOpen={openDetail}
        Toggle={() => {
          setOpenDetail(!openDetail);
        }}
        productId={productID}
        closeDelete={closeDelete}
      />
      <CreateProduct
        isOpen={openCreate}
        Toggle={() => {
          setOpenCreate(!openCreate);
        }}
        closeCreate={closeCreate}
      />
      <EditProduct
        isOpen={openEdit}
        Toggle={() => {
          setOpenEdit(!openEdit);
        }}
        productId={productID}
        closeEdit={closeEdit}
      />
    </div>
  );
};

export default ManageProducts;
