"use client";

import { useState } from "react";
import { Eye, Pencil, Search, Trash2, Upload, X, Plus, Image as ImageIcon } from "lucide-react";

export default function AdminProduct() {
  const [search, setSearch] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  
  // Form state for new product
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    modelNo: "",
    images: [],
    imagePreviews: []
  });

  const [products, setProducts] = useState([
    {
      id: 1,
      images: ["https://www.bing.com/th/id/OIP.NqrEe43zKVlgMpn3GQQd3QHaE8?w=193&h=135&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2"],
      name: "Hydraulic Pump",
      description: "Industrial hydraulic pump system",
      modelNo: "HP-2024-001"
    },
    {
      id: 2,
      images: ["https://www.bing.com/th/id/OIP.NqrEe43zKVlgMpn3GQQd3QHaE8?w=193&h=135&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2"],
      name: "Industrial Valve",
      description: "Heavy duty control valve",
      modelNo: "IV-2024-002"
    },
  ]);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase()) ||
    product.modelNo.toLowerCase().includes(search.toLowerCase())
  );

  const deleteProduct = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  const handleMultipleImages = (e) => {
    const files = Array.from(e.target.files);
    const newPreviews = files.map(file => URL.createObjectURL(file));
    
    setNewProduct({
      ...newProduct,
      images: [...newProduct.images, ...files],
      imagePreviews: [...newProduct.imagePreviews, ...newPreviews]
    });
  };

  const removeImage = (index) => {
    const updatedImages = newProduct.images.filter((_, i) => i !== index);
    const updatedPreviews = newProduct.imagePreviews.filter((_, i) => i !== index);
    
    // Revoke the URL to avoid memory leaks
    URL.revokeObjectURL(newProduct.imagePreviews[index]);
    
    setNewProduct({
      ...newProduct,
      images: updatedImages,
      imagePreviews: updatedPreviews
    });
  };

  const addProduct = () => {
    if (newProduct.name && newProduct.description && newProduct.modelNo) {
      const product = {
        id: products.length + 1,
        images: newProduct.imagePreviews.length > 0 ? newProduct.imagePreviews : ["/window.svg"],
        name: newProduct.name,
        description: newProduct.description,
        modelNo: newProduct.modelNo,
      };
      setProducts([...products, product]);
      // Reset form
      setNewProduct({
        name: "",
        description: "",
        modelNo: "",
        images: [],
        imagePreviews: []
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
    <div className="flex flex-col md:flex-row lg:pl-[260px] mt-20 min-h-screen bg-gray-100 text-black w-full">
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
              placeholder="Search by name or model no..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border border-gray-300 rounded-xl pl-12 pr-4 py-3 bg-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="bg-blue-600 hover:bg-black text-white px-6 py-3 rounded-xl text-center transition flex items-center justify-center gap-2"
          >
            <Plus size={20} /> Add Product
          </button>
        </div>

        {/* TABLE WRAPPER */}
        <div className="bg-white rounded shadow-md overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="p-3 text-left">SI NO.</th>
                <th className="p-3 text-left">Images</th>
                <th className="p-3 text-left">Model No.</th>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Description</th>
                <th className="p-3 text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredProducts.map((product, index) => (
                <tr key={product.id} className="border-b hover:bg-gray-50">
                  <td className="p-2 font-semibold">{index + 1}</td>
                  <td className="p-2">
                    <div className="flex gap-1">
                      {product.images.slice(0, 2).map((img, idx) => (
                        <img
                          key={idx}
                          src={img}
                          alt={product.name}
                          className="w-10 h-10 object-cover rounded"
                        />
                      ))}
                      {product.images.length > 2 && (
                        <div className="w-10 h-10 bg-gray-200 rounded flex items-center justify-center text-xs font-semibold">
                          +{product.images.length - 2}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="p-2 font-mono text-sm">{product.modelNo}</td>
                  <td className="p-2 font-medium">{product.name}</td>
                  <td className="p-2 text-gray-600 max-w-xs truncate">{product.description}</td>
                  <td className="p-2">
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-2 md:gap-3">
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
                          setSelectedProduct({...product});
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
                <h2 className="text-2xl md:text-3xl font-bold">Add New Product</h2>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="hover:bg-gray-100 p-2 rounded-full transition"
                >
                  <X size={24} />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Multiple Images Upload */}
                <div className="md:col-span-2">
                  <label className="block mb-2 font-medium">Product Images (Multiple)</label>
                  
                  {/* Image Preview Grid */}
                  {newProduct.imagePreviews.length > 0 && (
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mb-3">
                      {newProduct.imagePreviews.map((preview, index) => (
                        <div key={index} className="relative group">
                          <img 
                            src={preview} 
                            alt={`Preview ${index + 1}`} 
                            className="w-full h-24 object-cover rounded-lg border-2 border-blue-500"
                          />
                          <button
                            onClick={() => removeImage(index)}
                            className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  <input 
                    type="file" 
                    accept="image/*" 
                    multiple
                    onChange={handleMultipleImages} 
                    className="w-full border border-gray-300 rounded-xl p-3 bg-white"
                  />
                  <p className="text-xs text-gray-500 mt-1">You can select multiple images at once</p>
                </div>

                {/* Model Number */}
                <div className="w-full">
                  <label className="block mb-2 font-medium">Model No.</label>
                  <input 
                    type="text" 
                    placeholder="Enter model number" 
                    value={newProduct.modelNo} 
                    onChange={(e) => setNewProduct({ ...newProduct, modelNo: e.target.value })} 
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-blue-500"
                  />
                </div>

                {/* Product Name */}
                <div className="w-full">
                  <label className="block mb-2 font-medium">Product Name</label>
                  <input 
                    type="text" 
                    placeholder="Enter product name" 
                    value={newProduct.name} 
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} 
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-blue-500"
                  />
                </div>

                {/* Product Description */}
                <div className="md:col-span-2">
                  <label className="block mb-2 font-medium">Product Description</label>
                  <textarea 
                    rows="5" 
                    placeholder="Enter product description" 
                    value={newProduct.description} 
                    onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })} 
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none resize-none focus:border-blue-500"
                  ></textarea>
                </div>
              </div>
              
              <div className="mt-6 flex gap-3">
                <button 
                  onClick={addProduct} 
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl flex items-center justify-center gap-2"
                >
                  <Upload size={20} /> Upload Product
                </button>
                <button 
                  onClick={() => { 
                    setShowAddModal(false); 
                    setNewProduct({ name: "", description: "", modelNo: "", images: [], imagePreviews: [] }); 
                  }} 
                  className="flex-1 bg-gray-300 hover:bg-gray-400 text-black px-6 py-3 rounded-xl"
                >
                  Cancel
                </button>
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
                <button onClick={() => { setShowEditModal(false); setSelectedProduct(null); }} className="hover:bg-gray-100 p-2 rounded-full transition">
                  <X size={24} />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Product Images Display */}
                <div className="md:col-span-2">
                  <label className="block mb-2 font-medium">Product Images</label>
                  <div className="grid grid-cols-3 gap-3 mb-3">
                    {selectedProduct.images.map((img, idx) => (
                      <img 
                        key={idx}
                        src={img} 
                        alt={`${selectedProduct.name} ${idx + 1}`} 
                        className="w-full h-24 object-cover rounded-lg border-2 border-yellow-500"
                      />
                    ))}
                  </div>
                  <input 
                    type="file" 
                    accept="image/*" 
                    multiple
                    className="w-full border border-gray-300 rounded-xl p-3 bg-white"
                  />
                </div>

                {/* Model Number */}
                <div className="w-full">
                  <label className="block mb-2 font-medium">Model No.</label>
                  <input 
                    type="text" 
                    value={selectedProduct.modelNo} 
                    onChange={(e) => setSelectedProduct({ ...selectedProduct, modelNo: e.target.value })} 
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none"
                  />
                </div>

                {/* Product Name */}
                <div className="w-full">
                  <label className="block mb-2 font-medium">Product Name</label>
                  <input 
                    type="text" 
                    value={selectedProduct.name} 
                    onChange={(e) => setSelectedProduct({ ...selectedProduct, name: e.target.value })} 
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none"
                  />
                </div>

                {/* Product Description */}
                <div className="md:col-span-2">
                  <label className="block mb-2 font-medium">Product Description</label>
                  <textarea 
                    rows="5" 
                    value={selectedProduct.description} 
                    onChange={(e) => setSelectedProduct({ ...selectedProduct, description: e.target.value })} 
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none resize-none"
                  ></textarea>
                </div>
              </div>
              
              <div className="mt-6 flex gap-3">
                <button onClick={editProduct} className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-xl flex items-center justify-center gap-2">
                  <Upload size={20} /> Update Product
                </button>
                <button onClick={() => { setShowEditModal(false); setSelectedProduct(null); }} className="flex-1 bg-gray-300 hover:bg-gray-400 text-black px-6 py-3 rounded-xl">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* VIEW PRODUCT MODAL */}
        {showViewModal && selectedProduct && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
            <div className="bg-white rounded-xl p-6 w-full max-w-3xl shadow-2xl transition-all">
              
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

              {/* Product Images Gallery */}
              <div className="mb-6">
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Product Images</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {selectedProduct.images.map((img, idx) => (
                    <img 
                      key={idx}
                      src={img} 
                      alt={`${selectedProduct.name} - ${idx + 1}`} 
                      className="w-full h-32 object-cover rounded-lg border border-gray-200 shadow-sm"
                    />
                  ))}
                </div>
              </div>

              {/* Product Info Grid */}
              <div className="space-y-4">
                {/* Model Number */}
                <div>
                  <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Model Number</h3>
                  <p className="text-lg font-mono font-bold text-gray-900 mt-1">{selectedProduct.modelNo}</p>
                </div>

                {/* Product Name */}
                <div>
                  <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Product Name</h3>
                  <p className="text-xl font-bold text-gray-900 mt-1">{selectedProduct.name}</p>
                </div>
                
                {/* Description */}
                <div>
                  <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Description</h3>
                  <p className="text-gray-600 mt-1 whitespace-pre-line leading-relaxed">{selectedProduct.description}</p>
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