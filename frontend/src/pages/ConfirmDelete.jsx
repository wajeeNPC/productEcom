import React from 'react'

const ConfirmDelete = ({isOpen,Toggle,productName,deleteProduct}) => {

    const confirmDelete =()=>{
        deleteProduct();
        Toggle();
        ToggleView();
    }

  return (
    <div 
    className={`${
      isOpen ? "" : "hidden"
    } flex flex-col bg-black/50 fixed top-0 left-0 pt-[20px] justify-center items-center w-full h-screen z-[50]`} 
    onClick={Toggle}
  >
    <div  
      className=" bg-white rounded-lg w-[400px] overflow-y-auto p-5"
      onClick={(e) => e.stopPropagation()}
    >
        <h1 className=' font-bold '>Do you want to delete this product ?</h1>
        <p>{productName}</p>

        <div className="flex justify-end gap-4 mt-8 border-t pt-6">
          <button 
            className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
            onClick={()=>{confirmDelete()}}
          >
            Yes
          </button>
          <button 
            onClick={Toggle}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
          >
            Cancel
          </button>
        </div>
        </div>
        </div>
  )
}

export default ConfirmDelete