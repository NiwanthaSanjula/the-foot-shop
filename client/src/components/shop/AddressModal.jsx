/* eslint-disable react-hooks/set-state-in-effect */
import React, { useState, useEffect } from 'react'
import { IoMdClose } from "react-icons/io";
import toast from 'react-hot-toast';
import { DISTRICTS_DATA } from '../../assets/districtsData';
import { useAppContext } from '../../context/AppContext';
import Spinner from '../common/Spinner';


const AddressModal = ({ isOpen, onClose, onSave, addressData, isEditMode }) => {


  const { globalLoading } = useAppContext()

  // Form state
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    street: '',
    district: '',
    city: '',
    postalCode: '',
    isDefault: false
  });

  // State for available cities based on selected district
  const [cities, setCities] = useState([]);

  // Initialize form with existing address if editing
  useEffect(() => {
    if (isEditMode && addressData) {
      setFormData({
        fullName: addressData.fullName || '',
        phoneNumber: addressData.phoneNumber || '',
        street: addressData.street || '',
        district: addressData.district || '',
        city: addressData.city || '',
        postalCode: addressData.postalCode || '',
        isDefault: addressData.isDefault || false
      });

      // Load cities for the selected district
      if (addressData.district && DISTRICTS_DATA[addressData.district]) {
        setCities(DISTRICTS_DATA[addressData.district].cities);
      }
    } else {
      // Reset form for add mode
      setFormData({
        fullName: '',
        phoneNumber: '',
        street: '',
        district: '',
        city: '',
        postalCode: '',
        isDefault: false
      });
      setCities([]);
    }
  }, [addressData, isEditMode, isOpen]);

  // Handle district selection and update cities
  const handleDistrictChange = (e) => {
    const selectedDistrict = e.target.value;
    setFormData({ ...formData, district: selectedDistrict, city: '' });

    // Get cities for selected district
    if (selectedDistrict && DISTRICTS_DATA[selectedDistrict]) {
      setCities(DISTRICTS_DATA[selectedDistrict].cities);
    } else {
      setCities([]);
    }
  };

  // Validate form before submission
  const validateForm = () => {
    if (!formData.fullName.trim()) {
      toast.error("Please enter full name");
      return false;
    }
    if (!formData.phoneNumber.trim()) {
      toast.error("Please enter phone number");
      return false;
    }
    if (!/^\d{10}/.test(formData.phoneNumber.replace(/\D/g, ''))) {
      toast.error("Please enter a valid phone number");
      return false;
    }
    if (!formData.street.trim()) {
      toast.error("Please enter street address");
      return false;
    }
    if (!formData.district.trim()) {
      toast.error("Please select a district");
      return false;
    }
    if (!formData.city.trim()) {
      toast.error("Please select a city");
      return false;
    }
    if (!formData.postalCode.trim()) {
      toast.error("Please enter postal code");
      return false;
    }

    return true;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }
    onSave(formData);
  };

  // Modal not visible if not open
  if (!isOpen) {
    return null;
  }

  return (
    <div className='fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4'>
      <div className='bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-screen overflow-y-auto'>

        {/* Modal Header */}
        <div className='flex items-center justify-between p-6 border-b-2 border-gray-200 sticky top-0 bg-white'>
          <h3 className='text-2xl font-bold text-gray-800'>
            {isEditMode ? '✏️ Edit Address' : '📍 Add New Address'}
          </h3>
          <button
            onClick={onClose}
            className='text-gray-500 hover:text-gray-700 hover:bg-gray-100 p-2 rounded-lg transition-colors'
          >
            <IoMdClose size={28} />
          </button>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className='p-6 space-y-5'>

          {/* Full Name Input */}
          <div>
            <label className='block text-sm font-bold text-gray-700 mb-2'>Full Name *</label>
            <input
              type="text"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              className='w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all'
            />
          </div>

          {/* Phone Number Input */}
          <div>
            <label className='block text-sm font-bold text-gray-700 mb-2'>Phone Number *</label>
            <input
              type="tel"
              placeholder="e.g., 0712345678"
              value={formData.phoneNumber}
              onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
              className='w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all'
            />
          </div>

          {/* Street Address Input */}
          <div>
            <label className='block text-sm font-bold text-gray-700 mb-2'>Street Address *</label>
            <textarea
              placeholder="Enter your street address (e.g., 123 Main Street, Apartment 4B)"
              value={formData.street}
              onChange={(e) => setFormData({ ...formData, street: e.target.value })}
              rows="3"
              className='w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all resize-none'
            />
          </div>

          {/* District & City Selection */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>

            {/* District Dropdown */}
            <div>
              <label className='block text-sm font-bold text-gray-700 mb-2'>District *</label>
              <select
                value={formData.district}
                onChange={handleDistrictChange}
                className='w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all bg-white'
              >
                <option value="">Select a district</option>
                {Object.keys(DISTRICTS_DATA).sort().map(district => (
                  <option key={district} value={district}>
                    {district}
                  </option>
                ))}
              </select>
            </div>

            {/* City Dropdown - Populated based on district */}
            <div>
              <label className='block text-sm font-bold text-gray-700 mb-2'>City *</label>
              <select
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                disabled={!formData.district}
                className='w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all bg-white disabled:bg-gray-100 disabled:cursor-not-allowed'
              >
                <option value="">
                  {!formData.district ? 'Select district first' : 'Select a city'}
                </option>
                {cities.map(city => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Postal Code Input */}
          <div>
            <label className='block text-sm font-bold text-gray-700 mb-2'>Postal Code *</label>
            <input
              type="text"
              placeholder="e.g., 10230"
              value={formData.postalCode}
              onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
              className='w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all'
            />
          </div>

          {/* Set as Default Checkbox */}
          <div className='flex items-center gap-3 p-4 bg-gray-50 rounded-lg border-2 border-gray-200'>
            <input
              type="checkbox"
              id="setDefault"
              checked={formData.isDefault}
              onChange={(e) => setFormData({ ...formData, isDefault: e.target.checked })}
              className='w-5 h-5 accent-red-500 cursor-pointer'
            />
            <label htmlFor="setDefault" className='text-sm font-semibold text-gray-700 cursor-pointer'>
              Set as default address for future orders
            </label>
          </div>

          {/* Form Actions */}
          <div className='flex gap-4 pt-6 border-t-2 border-gray-200'>
            <button
              type="button"
              onClick={onClose}
              className='flex-1 px-6 py-3 border-2 border-gray-300 rounded-lg text-gray-700 font-bold hover:bg-gray-50 transition-all'
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={globalLoading}
              className='flex-1 px-6 py-3 flex items-center justify-center bg-linear-to-r from-red-500 to-red-600 text-white rounded-lg font-bold hover:shadow-lg cursor-pointer hover:scale-105 transition-all duration-200'
            >
              {globalLoading ? (
                <Spinner />
              ) : (
                isEditMode ? 'Update Address' : 'Add Address'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddressModal