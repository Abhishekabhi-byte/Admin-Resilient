'use client';
import { useState, useEffect } from 'react';

export default function EnquiryDatabaseView() {
  const [dbRecords, setDbRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Modal States
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    async function fetchDatabaseData() {
      try {
        const mockData = [
          {
            id: "ENQ-9041",
            company_name: "Acme Industrial Solutions",
            company_address: "Plot 42, Phase 3, Industrial Area, New Delhi",
            company_gst_no: "07AAAAA1111A1Z1",
            contact_person_name: "Rajesh Kumar",
            phone_number: "9876543210",
            quantity: 5,
            additional_message: "Please ensure bulk packaging standards are followed.",
            created_at: "01-Jun-2026"
          },
          {
            id: "ENQ-8832",
            company_name: "Quantum Tech Corp",
            company_address: "Electronic City, Sector 5, Bangalore",
            company_gst_no: "29BBBBB2222B2Z2",
            contact_person_name: "Anjali Sharma",
            phone_number: "9123456789",
            quantity: 1,
            additional_message: "Standard delivery requested.",
            created_at: "31-May-2026"
          }
        ];
        
        setDbRecords(mockData);
      } catch (error) {
        console.error("Failed to load database records", error);
      } finally {
        setLoading(false);
      }
    }
    fetchDatabaseData();
  }, []);

  // Open modal handler
  const handleOpenModal = (record) => {
    setSelectedRecord(record);
    setIsModalOpen(true);
  };

  // Close modal handler
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedRecord(null);
  };

  // Delete handler to remove dynamic records from state
  const handleDeleteRecord = (id) => {
    if (confirm("Are you sure you want to delete this enquiry record?")) {
      setDbRecords(prevRecords => prevRecords.filter(record => record.id !== id));
      
      // Optional: If you hook this up to your real API later, add:
      // await fetch(`/api/enquiry/${id}`, { method: 'DELETE' });
    }
  };

  return (
    <div className="w-full min-h-screen lg:pl-[260px]  mt-7  bg-gray-50 p-4 md:p-8 relative">
      
      {/* SEPARATOR SPACE & SECTION CONTAINER */}
      <div className="max-w-7xl mx-auto mt-12 bg-white rounded-xl shadow-md border border-gray-100 p-6">
        
        {/* Header Block */}
        <div className="border-b border-gray-100 pb-4 mb-6">
          <h2 className="text-xl font-bold text-gray-900 tracking-tight">
            Database Records: Order Enquiries
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            Real-time visual table pulling dynamic row values from the submitted form layout.
          </p>
        </div>

        {/* LOADING STATE */}
        {loading ? (
          <div className="py-12 text-center text-sm font-medium text-gray-500 animate-pulse">
            Loading dynamic database entries...
          </div>
        ) : (
          
          /* RESPONSIVE SCROLL WRAPPER */
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200 text-left text-sm">
              <thead className="bg-blue-600 text-white font-semibold">
                <tr>
                  <th scope="col" className="px-6 py-4 whitespace-nowrap">ID</th>
                  <th scope="col" className="px-6 py-4 min-w-[200px]">Company Name</th>
                  <th scope="col" className="px-6 py-4 min-w-[180px]">Contact Person</th>
                  <th scope="col" className="px-6 py-4 whitespace-nowrap text-center">Phone Number</th>
                  
                  <th scope="col" className="px-6 py-4 whitespace-nowrap">Submitted Date</th>
                  <th scope="col" className="px-6 py-4 whitespace-nowrap text-center">Actions</th>
                </tr>
              </thead>
              
              <tbody className="divide-y divide-gray-200 bg-white text-gray-700">
                {dbRecords.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="px-6 py-12 text-center text-gray-400 italic">
                      No data found inside database collection.
                    </td>
                  </tr>
                ) : (
                  dbRecords.map((record) => (
                    <tr key={record.id} className="hover:bg-gray-50/80 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap font-mono font-bold text-blue-600">
                        {record.id}
                      </td>
                      <td className="px-6 py-4 font-semibold text-gray-900">
                        {record.company_name}
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-900">
                        {record.contact_person_name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-gray-600">
                        +91 {record.phone_number}
                      </td>
                     
                      <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-400 font-medium">
                        {record.created_at}
                      </td>
                      
                      {/* Actions Column */}
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <div className="inline-flex gap-2">
                          {/* View Button */}
                          <button
                            onClick={() => handleOpenModal(record)}
                            className="inline-flex items-center gap-1.5 bg-blue-50 hover:bg-blue-100 text-blue-600 text-xs font-semibold px-2.5 py-1.5 rounded transition-colors border border-blue-200"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            </svg>
                            {/* View */}
                          </button>

                          {/* Delete Button */}
                          <button
                            onClick={() => handleDeleteRecord(record.id)}
                            className="inline-flex items-center gap-1.5 bg-red-50 hover:bg-red-100 text-red-600 text-xs font-semibold px-2.5 py-1.5 rounded transition-colors border border-red-200"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                              <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                            </svg>
                            {/* Delete */}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* POPUP MODAL (Vertical Layout Format) */}
      {isModalOpen && selectedRecord && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" onClick={handleCloseModal}></div>
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden transform transition-all z-10 border border-gray-100 animate-in fade-in zoom-in-95 duration-200">
            <div className="bg-blue-600 px-6 py-4 flex items-center justify-between text-white">
              <div>
                <h3 className="font-bold text-lg">Enquiry Full Details</h3>
                <p className="text-xs text-blue-100 font-mono mt-0.5">ID: {selectedRecord.id}</p>
              </div>
              <button onClick={handleCloseModal} className="text-white/80 hover:text-white hover:bg-white/10 p-1.5 rounded-lg transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto bg-white">
              <div className="border-b border-gray-100 pb-3">
                <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">🏢 Company Name</span>
                <p className="text-sm font-semibold text-gray-900">{selectedRecord.company_name}</p>
              </div>
              <div className="border-b border-gray-100 pb-3">
                <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">📍 Company Address</span>
                <p className="text-sm text-gray-700 leading-relaxed">{selectedRecord.company_address}</p>
              </div>
              <div className="border-b border-gray-100 pb-3">
                <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">📄 Company GST No.</span>
                <p className="text-sm font-mono font-bold text-gray-800 uppercase bg-gray-50 inline-block px-2 py-0.5 rounded border border-gray-200">{selectedRecord.company_gst_no}</p>
              </div>
              <div className="border-b border-gray-100 pb-3">
                <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">👤 Person Name</span>
                <p className="text-sm font-semibold text-gray-900">{selectedRecord.contact_person_name}</p>
              </div>
              <div className="border-b border-gray-100 pb-3">
                <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">📞 Phone Number</span>
                <p className="text-sm font-medium text-gray-800">+91 {selectedRecord.phone_number}</p>
              </div>
              <div className="border-b border-gray-100 pb-3">
                <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">🛒 Quantity Ordered</span>
                <p className="text-sm font-bold text-blue-600 bg-blue-50 border border-blue-100 inline-block px-3 py-0.5 rounded">{selectedRecord.quantity}</p>
              </div>
              <div className="border-b border-gray-100 pb-3">
                <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">💬 Additional Message</span>
                <p className="text-sm text-gray-600 whitespace-pre-wrap bg-gray-50/50 p-2.5 rounded border border-dashed border-gray-200 leading-relaxed">
                  {selectedRecord.additional_message || <span className="text-gray-400 italic">No special message specified.</span>}
                </p>
              </div>
              <div>
                <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">📅 Submission Timestamp</span>
                <p className="text-xs font-medium text-gray-500">{selectedRecord.created_at}</p>
              </div>
            </div>

            <div className="bg-gray-50 px-6 py-3.5 flex justify-end border-t border-gray-100">
              <button onClick={handleCloseModal} className="bg-gray-200 hover:bg-gray-300 text-gray-700 text-sm font-semibold px-4 py-2 rounded-lg transition-colors">
                Close View
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}