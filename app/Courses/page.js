'use client';

import { useState } from 'react';

export default function Courses() {
  const [courses, setCourses] = useState([
    {
      id: 1,
      title: 'Hydraulic Engineering Fundamentals',
      category: 'Engineering',
      duration: '6 Months',
      price: '₹15,000',
      status: 'Active',
      createdAt: '02-Jun-2026',
      description: 'Learn hydraulic engineering principles and applications.',
    },
    {
      id: 2,
      title: 'Motor Engineering',
      category: 'Engineering',
      duration: '3 Months',
      price: '₹8,000',
      status: 'Active',
      createdAt: '01-Jun-2026',
      description: 'Learn motor engineering principles and applications.',
    },
  ]);

  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  
  // Form state for new course
  const [newCourse, setNewCourse] = useState({
    title: '',
    category: '',
    duration: '',
    price: '',
    description: '',
    status: 'Active'
  });

  const handleView = (course) => {
    setSelectedCourse(course);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      setCourses((prev) => prev.filter((course) => course.id !== id));
    }
  };

  const handleAddCourse = () => {
    setIsAddModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCourse(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmitCourse = () => {
    // Validate form
    if (!newCourse.title || !newCourse.category || !newCourse.duration || !newCourse.price) {
      alert('Please fill in all required fields');
      return;
    }

    // Create new course object
    const courseToAdd = {
      id: courses.length + 1,
      title: newCourse.title,
      category: newCourse.category,
      duration: newCourse.duration,
      price: newCourse.price,
      status: newCourse.status,
      createdAt: new Date().toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      }).replace(/ /g, '-'),
      description: newCourse.description || 'No description provided'
    };

    // Add to courses list
    setCourses(prev => [...prev, courseToAdd]);
    
    // Reset form and close modal
    setNewCourse({
      title: '',
      category: '',
      duration: '',
      price: '',
      description: '',
      status: 'Active'
    });
    setIsAddModalOpen(false);
    
    // Show success message
    alert('Course added successfully!');
  };

  return (
    <div className="w-full min-h-screen lg:pl-[260px] bg-gray-50 p-4 md:p-8">

      <div className="max-w-7xl mt-[70px] mx-auto bg-white rounded-xl shadow-md border border-gray-100 p-6">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-gray-100 pb-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Courses Management
            </h2>
            <p className="text-sm text-gray-500">
              Manage all courses from one place.
            </p>
          </div>

          <button 
            onClick={handleAddCourse}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            + Add Course
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="min-w-full text-sm">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="px-6 py-4 text-left">Course Name</th>
                <th className="px-6 py-4 text-left">Category</th>
                <th className="px-6 py-4 text-center">Duration</th>
                <th className="px-6 py-4 text-center">Price</th>
                <th className="px-6 py-4 text-center">Status</th>
                <th className="px-6 py-4 text-center">Created At</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {courses.map((course) => (
                <tr
                  key={course.id}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="px-6 py-4 font-semibold">
                    {course.title}
                   </td>
                  <td className="px-6 py-4">
                    {course.category}
                   </td>
                  <td className="px-6 py-4 text-center">
                    {course.duration}
                   </td>
                  <td className="px-6 py-4 text-center">
                    {course.price}
                   </td>
                  <td className="px-6 py-4 text-center">
                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">
                      {course.status}
                    </span>
                   </td>
                  <td className="px-6 py-4 text-center">
                    {course.createdAt}
                   </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => handleView(course)}
                        className="bg-blue-50 hover:bg-blue-100 text-blue-600 px-3 py-1 rounded border transition-colors"
                      >
                        View
                      </button>
                      <button
                        className="bg-yellow-50 hover:bg-yellow-100 text-yellow-700 px-3 py-1 rounded border transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(course.id)}
                        className="bg-red-50 hover:bg-red-100 text-red-600 px-3 py-1 rounded border transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                   </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* View Modal */}
      {isModalOpen && selectedCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setIsModalOpen(false)}
          />
          <div className="relative z-10 bg-white rounded-xl w-full max-w-xl shadow-xl overflow-hidden">
            <div className="bg-blue-600 text-white p-5 flex justify-between items-center">
              <h3 className="text-lg font-bold">Course Details</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-white text-xl hover:text-gray-200 transition-colors"
              >
                ×
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <p className="text-xs text-gray-500">Course Name</p>
                <p className="font-semibold">{selectedCourse.title}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Category</p>
                <p>{selectedCourse.category}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Duration</p>
                <p>{selectedCourse.duration}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Price</p>
                <p>{selectedCourse.price}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Status</p>
                <p>{selectedCourse.status}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Created At</p>
                <p>{selectedCourse.createdAt}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Description</p>
                <p>{selectedCourse.description}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Course Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setIsAddModalOpen(false)}
          />
          <div className="relative z-10 bg-white rounded-xl w-full max-w-2xl shadow-xl overflow-hidden">
            <div className="bg-blue-600 text-white p-5 flex justify-between items-center">
              <h3 className="text-lg font-bold">Add New Course</h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-white text-xl hover:text-gray-200 transition-colors"
              >
                ×
              </button>
            </div>
            
            <div className="p-6">
              <form onSubmit={(e) => { e.preventDefault(); handleSubmitCourse(); }} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Course Title *
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={newCourse.title}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter course title"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Category *
                    </label>
                    <select
                      name="category"
                      value={newCourse.category}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="">Select category</option>
                      <option value="Programming">Programming</option>
                      <option value="Frontend">Frontend</option>
                      <option value="Backend">Backend</option>
                      <option value="Database">Database</option>
                      <option value="DevOps">DevOps</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Duration *
                    </label>
                    <input
                      type="text"
                      name="duration"
                      value={newCourse.duration}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., 6 Months"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Price *
                    </label>
                    <input
                      type="text"
                      name="price"
                      value={newCourse.price}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., ₹15,000"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Status
                    </label>
                    <select
                      name="status"
                      value={newCourse.status}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                      <option value="Draft">Draft</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={newCourse.description}
                    onChange={handleInputChange}
                    rows="4"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter course description"
                  />
                </div>
                
                <div className="flex justify-end gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Add Course
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}