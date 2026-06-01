"use client";

import { useState } from "react";
import { Eye, Pencil, Search, Trash2, Upload, X } from "lucide-react";
import { Plus } from "lucide-react";

export default function AdminProduct() {
  const [search, setSearch] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false); // 1. Added View Modal state
  const [selectedProduct, setSelectedProduct] = useState(null);
  
  // Form state for new product
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    image: null,
    imagePreview: ""
  });

  const [products, setProducts] = useState([
    {
      id: 1,
      image: "https://www.bing.com/th/id/OIP.NqrEe43zKVlgMpn3GQQd3QHaE8?w=193&h=135&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2",
      name: "Hydraulic Pump",
      description: "Industrial hydraulic pump system",
    },
    {
      id: 2,
      image: "https://www.bing.com/th/id/OIP.NqrEe43zKVlgMpn3GQQd3QHaE8?w=193&h=135&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2",
      name: "Industrial Valve",
      description: "Heavy duty control valve",
    },
  ]);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  const deleteProduct = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setNewProduct({
        ...newProduct,
        image: file,
        imagePreview: imageUrl
      });
    }
  };

  const addProduct = () => {
    if (newProduct.name && newProduct.description) {
      const product = {
        id: products.length + 1,
        image: newProduct.imagePreview || "/window.svg",
        name: newProduct.name,
        description: newProduct.description,
      };
      setProducts([...products, product]);
      // Reset form
      setNewProduct({
        name: "",
        description: "",
        image: null,
        imagePreview: ""
      });
      setShowAddModal(false);
    }
  };

  const editProduct = () => {
    if (selectedProduct) {
      setProducts(products.map(p => 
        p.id === selectedProduct.id ? selectedProduct : p
      ));
      setShowEditModal(false);
      setSelectedProduct(null);
    }
  };

  return (
    <div className="flex flex-col md:flex-row lg:pl-[260px]  mt-20 min-h-screen bg-gray-100 text-black w-full">
      {/* MAIN CONTENT */}
      <main className="flex-1 p-4 md:p-8 w-full">

        {/* TITLE */}
        <h1 className="text-2xl md:text-4xl font-bold mb-6">
          Products
        </h1>

        {/* SEARCH + BUTTON */}
        <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between mb-6">
          <div className="relative ml-auto w-full md:w-[300px]">
            <Search
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search product..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border border-gray-300 rounded-xl pl-12 pr-4 py-3 bg-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="bg-blue-600 hover:bg-black text-white px-6 py-3 rounded-xl text-center transition flex items-center justify-center"
          >
            <Plus size={20} />
          </button>
        </div>

        {/* TABLE WRAPPER */}
        <div className="bg-white rounded-2xl shadow-md overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead className="bg-black text-white">
              <tr>
                <th className="p-4 text-left">SI NO.</th>
                <th className="p-4 text-left">Image</th>
                <th className="p-4 text-left">Name</th>
                <th className="p-4 text-left">Description</th>
                <th className="p-4 text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredProducts.map((product, index) => (
                <tr key={product.id} className="border-b hover:bg-gray-50">
                  <td className="p-4 font-semibold">{index + 1}</td>
                  <td className="p-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-12 h-12 md:w-16 md:h-16 object-cover rounded"
                    />
                  </td>
                  <td className="p-4 font-medium">{product.name}</td>
                  <td className="p-4 text-gray-600">{product.description}</td>
                  <td className="p-4">
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-2 md:gap-3">
                      {/* 2. Updated Eye Button Click Handler */}
                      <button 
                        onClick={() => {
                          setSelectedProduct(product);
                          setShowViewModal(true);
                        }}
                        className="bg-green-600 hover:bg-green-700 text-white p-2 rounded-lg w-full sm:w-auto flex items-center justify-center"
                      >
                        <Eye size={18} />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedProduct(product);
                          setShowEditModal(true);
                        }}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded-lg w-full sm:w-auto flex items-center justify-center"
                      >
                        <Pencil size={18} />
                      </button>
                      <button
                        onClick={() => deleteProduct(product.id)}
                        className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg w-full sm:w-auto flex items-center justify-center"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ADD PRODUCT MODAL */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
            <div className="bg-white rounded-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl md:text-3xl font-bold">Upload Product</h2>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="hover:bg-gray-100 p-2 rounded-full transition"
                >
                  <X size={24} />
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="w-full">
                  <label className="block mb-2 font-medium">Product Image 1</label>
                  {newProduct.imagePreview && (
                    <div className="mb-3">
                      <img src={newProduct.imagePreview} alt="Preview" className="w-32 h-32 object-cover rounded-lg border-2 border-blue-500" />
                    </div>
                  )}
                  <input type="file" accept="image/*" onChange={handleImageChange} className="w-full border border-gray-300 rounded-xl p-3 bg-white" />
                </div>
                <div className="w-full">
                  <label className="block mb-2 font-medium">Product Name</label>
                  <input type="text" placeholder="Enter product name" value={newProduct.name} onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none" />
                </div>
                <div className="md:col-span-2">
                  <label className="block mb-2 font-medium">Product Description</label>
                  <textarea rows="5" placeholder="Enter product description" value={newProduct.description} onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })} className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none resize-none"></textarea>
                </div>
              </div>
              <div className="mt-6 flex gap-3">
                <button onClick={addProduct} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl flex items-center justify-center gap-2"><Upload size={20} /> Upload Product</button>
                <button onClick={() => { setShowAddModal(false); setNewProduct({ name: "", description: "", image: null, imagePreview: "" }); }} className="flex-1 bg-gray-300 hover:bg-gray-400 text-black px-6 py-3 rounded-xl">Cancel</button>
              </div>
            </div>
          </div>
        )}

        {/* EDIT PRODUCT MODAL */}
        {showEditModal && selectedProduct && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
            <div className="bg-white rounded-xl p-6 w-full max-w-4xl">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl md:text-3xl font-bold">Edit Product</h2>
                <button onClick={() => { setShowEditModal(false); setSelectedProduct(null); }} className="hover:bg-gray-100 p-2 rounded-full transition"><X size={24} /></button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="w-full">
                  <label className="block mb-2 font-medium">Product Image</label>
                  <div className="mb-3">
                    <img src={selectedProduct.image} alt={selectedProduct.name} className="w-32 h-32 object-cover rounded-lg border-2 border-yellow-500" />
                  </div>
                  <input type="file" accept="image/*" className="w-full border border-gray-300 rounded-xl p-3 bg-white" />
                </div>
                <div className="w-full">
                  <label className="block mb-2 font-medium">Product Name</label>
                  <input type="text" value={selectedProduct.name} onChange={(e) => setSelectedProduct({ ...selectedProduct, name: e.target.value })} className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none" />
                </div>
                <div className="md:col-span-2">
                  <label className="block mb-2 font-medium">Product Description</label>
                  <textarea rows="5" value={selectedProduct.description} onChange={(e) => setSelectedProduct({ ...selectedProduct, description: e.target.value })} className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none resize-none"></textarea>
                </div>
              </div>
              <div className="mt-6 flex gap-3">
                <button onClick={editProduct} className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-xl flex items-center justify-center gap-2"><Upload size={20} /> Update Product</button>
                <button onClick={() => { setShowEditModal(false); setSelectedProduct(null); }} className="flex-1 bg-gray-300 hover:bg-gray-400 text-black px-6 py-3 rounded-xl">Cancel</button>
              </div>
            </div>
          </div>
        )}

        {/* 3. VIEW PRODUCT MODAL (NEW ADDITION) */}
        {showViewModal && selectedProduct && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
            <div className="bg-white rounded-xl p-6 w-full max-w-2xl shadow-2xl transition-all">
              
              {/* Modal Header */}
              <div className="flex justify-between items-center mb-6 border-b pb-3">
                <h2 className="text-2xl font-bold text-gray-800">Product Details</h2>
                <button
                  onClick={() => {
                    setShowViewModal(false);
                    setSelectedProduct(null);
                  }}
                  className="hover:bg-gray-100 p-2 rounded-full transition text-gray-500 hover:text-black"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Product Info Grid */}
              <div className="flex flex-col md:flex-row gap-6">
                {/* Product Image */}
                <div className="flex justify-center items-start">
                  <img 
                    src={selectedProduct.image} 
                    alt={selectedProduct.name} 
                    className="w-48 h-48 object-cover rounded-xl border border-gray-200 shadow-sm"
                  />
                </div>

                {/* Text Details */}
                <div className="flex-1 space-y-4">
                  <div>
                    <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Product Name</h3>
                    <p className="text-xl font-bold text-gray-900 mt-1">{selectedProduct.name}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Description</h3>
                    <p className="text-gray-600 mt-1 whitespace-pre-line leading-relaxed">{selectedProduct.description}</p>
                  </div>
                </div>
              </div>

              {/* Bottom Close Button */}
              <div className="mt-8 flex justify-end">
                <button
                  onClick={() => {
                    setShowViewModal(false);
                    setSelectedProduct(null);
                  }}
                  className="bg-gray-900 hover:bg-black text-white px-6 py-2.5 rounded-xl text-sm font-medium transition"
                >
                  Close Window
                </button>
              </div>

            </div>
          </div>
        )}

      </main>
    </div>
  );
}