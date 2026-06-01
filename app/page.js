import React from 'react';
import { Package, CheckCircle2, AlertTriangle, ArrowUpRight, ArrowDownRight, RefreshCw, BarChart3 } from 'lucide-react';

export default function AdminDashboard() {

  const products = [
    { code: "HYD-VAL-01", name: "Directional Control Valve", category: "Hydraulics", stock: 142, status: "In Stock" },
    { code: "PST-RNG-08", name: "High-Pressure Piston Ring", category: "Spares", stock: 12, status: "Low Stock" },
    { code: "ST-SEAL-12", name: "Industrial Iron Nitrile Seal", category: "Seals", stock: 84, status: "In Stock" },
    { code: "MTR-PMP-04", name: "Variable Displacement Pump", category: "Motors", stock: 0, status: "Out of Stock" },
  ];

  return (
    <div className="bg-red-50 lg:pl-[290px]  mt-20 min-h-screen antialiased p-4 sm:p-6 lg:p-10">
      <div className=" max-w-full mx-auto w-full space-y-8">
        
        {/* Top Header Row */}
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-2">
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Stock Command Center</h1>
            <p className="text-sm text-slate-500">Real-time breakdown of warehouse capacities and product distribution.</p>
          </div>
          <button className="inline-flex items-center gap-2 bg-white border border-slate-200 text-slate-600 px-3 py-2 rounded-xl text-xs font-semibold hover:bg-slate-50 transition-colors shadow-xs">
            <RefreshCw className="w-3.5 h-3.5 text-slate-400" /> Sync Metrics
          </button>
        </header>

        {/* 1. Top Core 3 Stat Cards */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card: Total Products */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex justify-between items-center">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Products</span>
              <h3 className="text-3xl font-black text-slate-900">1,248</h3>
              <p className="text-xs text-emerald-600 font-medium flex items-center gap-1">
                <ArrowUpRight className="w-3 h-3" /> +14 New items added this month
              </p>
            </div>
            <div className="p-4 bg-blue-50 text-blue-600 rounded-2xl flex-shrink-0">
              <Package className="w-6 h-6" />
            </div>
          </div>

          {/* Card: In Stock */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex justify-between items-center">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">In Stock</span>
              <h3 className="text-3xl font-black text-slate-900">1,216</h3>
              <p className="text-xs text-slate-500 font-medium">
                97.4% of catalog active in inventory
              </p>
            </div>
            <div className="p-4 bg-emerald-50 text-emerald-600 rounded-2xl flex-shrink-0">
              <CheckCircle2 className="w-6 h-6" />
            </div>
          </div>

          {/* Card: Out of Stock */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex justify-between items-center">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Out of Stock</span>
              <h3 className="text-3xl font-black text-slate-900">32</h3>
              <p className="text-xs text-amber-600 font-medium flex items-center gap-1">
                <ArrowDownRight className="w-3 h-3" /> 2.6% requiring procurement
              </p>
            </div>
            <div className="p-4 bg-amber-50 text-amber-600 rounded-2xl flex-shrink-0">
              <AlertTriangle className="w-6 h-6" />
            </div>
          </div>
        </section>

        {/* 2. Middle Row: Side-by-Side Analytics Charts */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: Donut Chart Card */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs lg:col-span-6 flex flex-col justify-between w-full">
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-1">Stock Breakdown</h3>
              <p className="text-xs text-slate-400">Categorized catalog share by items volume.</p>
            </div>

            {/* Centered Donut Container */}
            <div className="relative flex items-center justify-center my-6 w-full auto-cols-max">
              <svg className="w-44 h-44 transform -rotate-90 overflow-visible" viewBox="0 0 100 100">
                {/* Background Track Circle */}
                <circle cx="50" cy="50" r="40" fill="transparent" stroke="#f1f5f9" strokeWidth="12" />
                {/* Segment 1: Hydraulics (55%) */}
                <circle cx="50" cy="50" r="40" fill="transparent" stroke="#2563eb" strokeWidth="12" strokeDasharray="251.2" strokeDashoffset="113.0" />
                {/* Segment 2: Seals (30%) */}
                <circle cx="50" cy="50" r="40" fill="transparent" stroke="#10b981" strokeWidth="12" strokeDasharray="251.2" strokeDashoffset="188.4" style={{ transformOrigin: 'center', transform: 'rotate(198deg)' }} />
                {/* Segment 3: Others (15%) */}
                <circle cx="50" cy="50" r="40" fill="transparent" stroke="#f59e0b" strokeWidth="12" strokeDasharray="251.2" strokeDashoffset="213.5" style={{ transformOrigin: 'center', transform: 'rotate(306deg)' }} />
              </svg>
              {/* Inner Circle Text */}
              <div className="absolute text-center flex flex-col items-center justify-center">
                <span className="text-xl font-black text-slate-900 leading-tight">3 Major</span>
                <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Clusters</p>
              </div>
            </div>

            {/* Legend Labels Grid */}
            <div className="space-y-2 border-t border-slate-100 pt-4 w-full">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-sm bg-blue-600"></span> <span className="text-slate-600 font-medium">Hydraulics</span></div>
                <span className="font-bold text-slate-900">55%</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-sm bg-emerald-500"></span> <span className="text-slate-600 font-medium">Iron Seals</span></div>
                <span className="font-bold text-slate-900">30%</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-sm bg-amber-500"></span> <span className="text-slate-600 font-medium">Mechanical Spares</span></div>
                <span className="font-bold text-slate-900">15%</span>
              </div>
            </div>
          </div>

          {/* Right Column: Growth Trend Chart */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs lg:col-span-6 flex flex-col justify-between w-full">
            <div>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1">Growth & Acquisition Trend</h3>
                  <p className="text-xs text-slate-400">Consistent increasing trajectory of total active warehouse assets.</p>
                </div>
                <div className="p-2 bg-slate-50 border border-slate-100 rounded-lg text-slate-500 flex-shrink-0">
                  <BarChart3 className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* Interactive Bar Layout */}
            <div className="my-auto pt-6 pb-2 w-full">
              <div className="relative h-44 w-full flex items-end justify-between px-2 gap-3">
                
                {/* Background Guidelines */}
                <div className="absolute inset-x-0 top-0 border-b border-dashed border-slate-100 text-[10px] text-slate-300 pt-1">1,200 units</div>
                <div className="absolute inset-x-0 top-1/2 border-b border-dashed border-slate-100 text-[10px] text-slate-300 pt-1">600 units</div>

                {/* Jan Bar */}
                <div className="flex-1 flex flex-col items-center gap-2 group z-10">
                  <div className="w-full bg-slate-100 group-hover:bg-blue-100 transition-colors rounded-t-lg h-12 relative flex justify-center">
                    <span className="opacity-0 group-hover:opacity-100 absolute -top-7 bg-slate-950 text-white text-[10px] px-1.5 py-0.5 rounded font-bold transition-opacity whitespace-nowrap">340 units</span>
                  </div>
                  <span className="text-xs font-semibold text-slate-400">Jan</span>
                </div>

                {/* Feb Bar */}
                <div className="flex-1 flex flex-col items-center gap-2 group z-10">
                  <div className="w-full bg-slate-200/70 group-hover:bg-blue-200/70 transition-colors rounded-t-lg h-20 relative flex justify-center">
                    <span className="opacity-0 group-hover:opacity-100 absolute -top-7 bg-slate-950 text-white text-[10px] px-1.5 py-0.5 rounded font-bold transition-opacity whitespace-nowrap">580 units</span>
                  </div>
                  <span className="text-xs font-semibold text-slate-400">Feb</span>
                </div>

                {/* Mar Bar */}
                <div className="flex-1 flex flex-col items-center gap-2 group z-10">
                  <div className="w-full bg-blue-400 group-hover:bg-blue-500 transition-colors rounded-t-lg h-28 relative flex justify-center">
                    <span className="opacity-0 group-hover:opacity-100 absolute -top-7 bg-slate-950 text-white text-[10px] px-1.5 py-0.5 rounded font-bold transition-opacity whitespace-nowrap">890 units</span>
                  </div>
                  <span className="text-xs font-bold text-slate-500">Mar</span>
                </div>

                {/* Apr Bar (Highest) */}
                <div className="flex-1 flex flex-col items-center gap-2 group z-10">
                  <div className="w-full bg-blue-600 group-hover:bg-blue-700 transition-colors rounded-t-lg h-36 relative flex justify-center">
                    <span className="opacity-0 group-hover:opacity-100 absolute -top-7 bg-slate-950 text-white text-[10px] px-1.5 py-0.5 rounded font-bold transition-opacity whitespace-nowrap">1,248 units</span>
                  </div>
                  <span className="text-xs font-bold text-blue-600">Apr</span>
                </div>

              </div>
            </div>

            <div className="border-t border-slate-100 pt-3 flex items-center justify-between text-xs text-slate-500 w-full">
              <span>Quarterly Delta: <strong className="text-slate-900 font-bold">+266%</strong></span>
              <span className="text-emerald-600 font-semibold flex items-center gap-0.5"><ArrowUpRight className="w-3 h-3" /> Target Met</span>
            </div>
          </div>

        </section>

        {/* 3. Bottom Row: Table */}
        <section className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs w-full overflow-hidden">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-5">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Product Line Status</h3>
              <p className="text-xs text-slate-500 font-normal">Active monitoring of core inventory products metrics.</p>
            </div>
            <span className="text-xs font-medium bg-slate-100 px-3 py-1.5 rounded-lg text-slate-600 border border-slate-200/40 whitespace-nowrap">
              Total SKUs: {products.length} Active
            </span>
          </div>

          <div className="overflow-x-auto -mx-6 px-6">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 text-xs uppercase font-semibold tracking-wider bg-slate-50/50">
                  <th className="p-3">Product Code</th>
                  <th className="p-3">Product Name</th>
                  <th className="p-3">Category</th>
                  <th className="p-3 text-right">Available Stock</th>
                  <th className="p-3 text-center">Status Badge</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {products.map((prod, index) => (
                  <tr key={index} className="hover:bg-slate-50/40 transition-colors">
                    <td className="p-3 font-mono font-bold text-slate-900">{prod.code}</td>
                    <td className="p-3 font-medium text-slate-700">{prod.name}</td>
                    <td className="p-3 text-slate-500"><span className="bg-slate-100 px-2 py-0.5 rounded text-xs">{prod.category}</span></td>
                    <td className="p-3 text-right font-semibold font-mono text-slate-900">{prod.stock} units</td>
                    <td className="p-3 text-center">
                      <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wide
                        ${prod.status === "In Stock" ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : ""}
                        ${prod.status === "Low Stock" ? "bg-amber-50 text-amber-700 border border-amber-200" : ""}
                        ${prod.status === "Out of Stock" ? "bg-rose-50 text-rose-700 border border-rose-200" : ""}
                      `}>
                        {prod.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
        
      </div>
    </div>
  );
}