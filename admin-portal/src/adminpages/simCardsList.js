import React, { useEffect, useState } from 'react'
import Header from '../Components/header'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { processReportData } from '../DataHelpers/ReportPro';
import Modal from '../Components/Modal';
import ToggleButton from '../Components/ToggleButton';
import {DateTimeFormatter} from '../Components/Date&TimeCell';

function SimCardsList() {

  const [Data, setData] = useState([]);
  const [AllBatches, setAllBatches] = useState([]);
  const [expandedRow, setExpandedRow] = useState(null);
  const [formData, setFormData] = useState({
    batch: "",
    sim1Number: "",
    eSim2Provider: "",
    simId: "",
  });
  const [open, setOpen] = useState(false)

console.log(AllBatches);

  const toggleRow = (id) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  const GetAllSimBatches = async () => {

    try {
      const response = await axios.get('/api-trkadn/get-all-simbatches');
      console.log("makes", response.data.data);

      if (response.status === 200) {
        setAllBatches(response.data.data)
      }
    } catch (error) {
      alert('Error creating user: ' + error.response.data.message);
    }
  };

  useEffect(() => {
    GetAllSimBatches()
  }, [])

  const FindSimByBatch = async (batch) => {

    try {
      console.log("Loading");
      //setIsLoading(true);
      const res = await axios.get(`/api-trkadn/getsim-by-batch/${batch}`);
      if (res.status === 200) {
        console.log(res);
        
        console.log(res.data.data);
        setData(res.data.data)

      } else {
        console.log("Empty data received");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      // Ensure loading and refreshing states are reset
      //   setIsLoading(false);
      //   setIsRefreshing(false);
    }
  };

  const FindSimByNumber = async (number) => {

    try {
      console.log("Loading");
      //setIsLoading(true);
      const res = await axios.get(`/api-trkadn/getsim-by-number/${number}`);
      if (res.status === 200) {
        console.log(res.data.data);
        setData([...res.data.data]);

      } else {
        console.log("Empty data received");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      // Ensure loading and refreshing states are reset
      //   setIsLoading(false);
      //   setIsRefreshing(false);
    }
  };

  const FindSimById = async (id) => {

    try {
      console.log("Loading");
      //setIsLoading(true);
      const res = await axios.get(`/api-trkadn/getsim-by-id/${id}`);
      if (res.status === 200) {
        console.log(res);
        setData([...res.data.data]);

      } else {
        console.log("Empty data received");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      // Ensure loading and refreshing states are reset
      //   setIsLoading(false);
      //   setIsRefreshing(false);
    }
  };

  const FindByESim2Provider = async (provider) => {

    try {
      console.log("Loading");
      //setIsLoading(true);
      const res = await axios.get(`/api-trkadn/getsim-by-provider/${provider}`);
      if (res.status === 200) {
        console.log(res.data.data);
        setData(res.data.data)

      } else {
        console.log("Empty data received");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      // Ensure loading and refreshing states are reset
      //   setIsLoading(false);
      //   setIsRefreshing(false);
    }
  };

  return (
    <>
    <Header />
    <div className="mt-28">
        {/* Page Title */}
        <div className="flex w-full items-left px-6">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-200">
                SIM Cards List
            </h1>
        </div>

        {/* Filters Section */}
        <div className="flex w-full space-x-5 px-5 items-end mt-6">
            {/* Filter By Batch */}
            <div className="flex-1">
                <label
                    className="block text-sm text-gray-700 dark:text-gray-300 mb-1"
                    htmlFor="batch"
                >
                    Filter By Batch
                </label>
                <select
                    id="batch"
                    name="batch"
                    value={formData.batch}
                    onChange={(e) => {
                        const batch = e.target.value;
                        setFormData({ ...formData, batch: batch });
                        FindSimByBatch(batch);
                    }}
                    className="w-full px-4 py-2 border bg-white dark:bg-[#1b1b1d] border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    required
                >
                    <option value="">Select a Batch</option>
                    {Array.isArray(AllBatches) && AllBatches.length > 0 ? (
                        AllBatches.map((batch, index) => (
                            <option key={index} value={`${batch.batchName}, ${batch.gsmProvider}-${batch.purchaseDate}`}>
                                {batch.batchName}, {batch.gsmProvider}-{batch.purchaseDate}
                            </option>
                        ))
                    ) : (
                        <option value="" disabled>No Batch Found, Create One!</option>
                    )}
                </select>
            </div>

            {/* Filter By Provider */}
            <div className="flex-1">
                <label
                    className="block text-sm text-gray-700 dark:text-gray-300 mb-1"
                    htmlFor="eSim2Provider"
                >
                    Filter By Provider
                </label>
                <select
                    id="eSim2Provider"
                    name="eSim2Provider"
                    value={formData.eSim2Provider}
                    onChange={(e) => {
                        const provider = e.target.value;
                        setFormData({ ...formData, eSim2Provider: provider });
                        FindByESim2Provider(provider);
                    }}
                    className="w-full px-4 py-2 border bg-white dark:bg-[#1b1b1d] border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    required
                >
                    <option value="">Select Network Provider</option>
                    <option value="Airtel">Airtel</option>
                    <option value="Vi eSIM">Vi eSIM</option>
                    <option value="BSNL">BSNL</option>
                    <option value="Vodafone">Vodafone</option>
                    <option value="Du">Du</option>
                    <option value="Nawras">Nawras</option>
                    <option value="Etisalat">Etisalat</option>
                    <option value="M2M">M2M</option>
                    <option value="Airtel eSIM">Airtel eSIM</option>
                </select>
            </div>

            {/* Find By SIM Number */}
            <div className="flex-1">
                <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">
                    Find By SIM Number
                </label>
                <input
                    type="text"
                    name="serialNo"
                    value={formData.sim1Number}
                    onChange={(e) => {
                        const num = e.target.value;
                        setFormData({ sim1Number: num, simId: "" });
                    }}
                    className="w-full px-4 py-2 border bg-white dark:bg-[#1b1b1d] border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="Enter SIM Number"
                />
            </div>

            {/* Find By IMSI/ICCID Number */}
            <div className="flex-1">
                <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">
                    Find By IMSI/ICCID Number
                </label>
                <input
                    type="text"
                    name="serialNo"
                    value={formData.simId}
                    onChange={(e) => {
                        const id = e.target.value;
                        setFormData({ sim1Number: "", simId: id });
                    }}
                    className="w-full px-4 py-2 border bg-white dark:bg-[#1b1b1d] border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="Enter IMSI/ICCID Number"
                />
            </div>

            {/* Find Button */}
            <button
                className="bg-orange-600 text-white h-10 px-4 py-2 rounded-lg font-medium hover:bg-orange-700 transition duration-200"
                onClick={() => {
                    if (formData.sim1Number && !formData.simId) {
                        FindSimByNumber(formData.sim1Number);
                    } else if (!formData.sim1Number && formData.simId) {
                        FindSimById(formData.simId);
                    }
                }}
            >
                Find
            </button>
        </div>

        {/* Table Section */}
        <div className="min-h-screen px-6 mt-10">
            <div className="overflow-hidden rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead>
                            <tr className="bg-gray-200 dark:bg-[#3b3b3b]">
                                <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider">Sl No</th>
                                <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider">SIM/eSIM1</th>
                                <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider">eSIM2</th>
                                <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider">eSIM Service Provider</th>
                                <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider">IMSI/ICCID</th>
                                <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider">Batch</th>
                                <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider">Activation</th>
                                <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider">Expiry</th>
                                <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider">Created By</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-[#1b1b1d] divide-y divide-gray-200 dark:divide-gray-700">
                            {Array.isArray(Data) && Data.length > 0 ? (
                                Data.map((item, index) => (
                                    <React.Fragment key={index}>
                                        {/* Main Row */}
                                        <tr
                                            className="hover:bg-gray-100 dark:hover:bg-[#28282a] cursor-pointer transition-colors duration-150"
                                            onClick={() => toggleRow(index)}
                                        >
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-300 text-center">
                                                {index + 1}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300 text-center">
                                                {item.eSim2Number},<br />{item.eSim2Provider}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300 text-center">
                                                {/* Placeholder for eSIM2 data */}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300 text-center">
                                                {item.company}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300 text-center">
                                                {item.simId}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300 text-center">
                                                {item.batch}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300 text-center">
                                                <DateTimeFormatter isoDateTime={item.actDate} />
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300 text-center">
                                                <DateTimeFormatter isoDateTime={item.expyDate} />
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300 text-center">
                                                Bz
                                            </td>
                                        </tr>

                                        {/* Collapsible Row */}
                                        {expandedRow === index && (
                                            <tr>
                                                <td colSpan="9" className="px-6 py-6 bg-gray-50 dark:bg-[#1b1b1d] border-t border-gray-200 dark:border-gray-700">
                                                    <div className="flex flex-col space-y-8">
                                                        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
                                                            <div className="flex flex-col p-4 bg-white dark:bg-[#28282a] rounded-lg shadow-sm">
                                                                <span className="text-xs text-gray-500 dark:text-gray-400 mb-1">Created on</span>
                                                                <span className="text-sm font-medium text-gray-800 dark:text-gray-200">add date needed</span>
                                                            </div>
                                                            <div className="flex flex-col p-4 bg-white dark:bg-[#28282a] rounded-lg shadow-sm">
                                                                <span className="text-xs text-gray-500 dark:text-gray-400 mb-1">Unit Info</span>
                                                                <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                                                                    {item.unitid?.imei}<br />{item.unitid?.shipment} - {item.unitid?.model}
                                                                </span>
                                                            </div>
                                                            <div className="flex flex-col p-4 bg-white dark:bg-[#28282a] rounded-lg shadow-sm">
                                                                <span className="text-xs text-gray-500 dark:text-gray-400 mb-1">Customer & Vehicle Info</span>
                                                                <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                                                                    {item.unitid?.customer.firstname}, {item.unitid?.customer.company}<br />{item.unitid?.assetRegNo} - {item.unitid?.assetMake}, {item.unitid?.assetModel}
                                                                </span>
                                                            </div>
                                                            <div className="flex flex-col p-4 bg-white dark:bg-[#28282a] rounded-lg shadow-sm">
                                                                <span className="text-xs text-gray-500 dark:text-gray-400 mb-1">Comments</span>
                                                                <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                                                                    Attached & Active Last Signal<br />on 12-Sep-2024 07:21 PM
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                    </React.Fragment>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="9" className="px-6 py-12 text-center text-gray-500 dark:text-gray-400">
                                        <div className="flex flex-col items-center">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-10 w-10 mb-2"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={1.5}
                                                    d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                                                />
                                            </svg>
                                            <span className="text-lg font-medium">No data available</span>
                                            <span className="text-sm">Please search for a SIM to view data</span>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</>
  )
}

export default SimCardsList