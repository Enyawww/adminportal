import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Spin } from 'antd';
import { FiPlus } from 'react-icons/fi';

interface Merchant {
  Merchant_ID?: number;
  Branch: string;
  Branch_Address: string;
  Collaboration_Start_Timestamp: string;
  Collaboration_End_Timestamp: string;
  Collaboration_Status: string;
  Collaboration_Type: string;
  Person_In_Charge: string;
  PIC_Contact_Number: string;
  PIC_Email: string;
  Password: string;
}

export const Grid = () => {
  const [merchants, setMerchants] = useState<Merchant[]>([]);
  const [newMerchant, setNewMerchant] = useState<Merchant>({
    Branch: '',
    Branch_Address: '',
    Collaboration_Start_Timestamp: '',
    Collaboration_End_Timestamp: '',
    Collaboration_Status: '',
    Collaboration_Type: '',
    Person_In_Charge: '',
    PIC_Contact_Number: '',
    PIC_Email: '',
    Password: ''
  });
  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({});
  const [isAddFormVisible, setIsAddFormVisible] = useState(false);
  const [selectedMerchant, setSelectedMerchant] = useState<Merchant | null>(null);
  const [isDeleteConfirmVisible, setIsDeleteConfirmVisible] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchMerchants() {
      try {
        setIsLoading(true);
        const response = await axios.get('/api/merchant');
        setMerchants(response.data);
      } catch (error) {
        console.error('Failed to fetch merchants:', error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchMerchants();
  }, []);

  const validateInputs = () => {
    const errors: { [key: string]: string } = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]+$/;

    if (!newMerchant.Branch.trim()) errors.Branch = 'Branch is required.';
    if (!newMerchant.Branch_Address.trim()) errors.Branch_Address = 'Branch Address is required.';
    if (!newMerchant.Collaboration_Start_Timestamp.trim()) errors.Collaboration_Start_Timestamp = 'Start Timestamp is required.';
    if (!newMerchant.Collaboration_End_Timestamp.trim()) errors.Collaboration_End_Timestamp = 'End Timestamp is required.';
    if (!newMerchant.Collaboration_Status.trim()) errors.Collaboration_Status = 'Status is required.';
    if (!newMerchant.Collaboration_Type.trim()) errors.Collaboration_Type = 'Type is required.';
    if (!newMerchant.Person_In_Charge.trim()) errors.Person_In_Charge = 'Person in Charge is required.';
    if (!newMerchant.PIC_Contact_Number.trim() || !phoneRegex.test(newMerchant.PIC_Contact_Number)) errors.PIC_Contact_Number = 'Valid Contact Number is required.';
    if (!newMerchant.PIC_Email.trim() || !emailRegex.test(newMerchant.PIC_Email)) errors.PIC_Email = 'Valid Email is required.';
    if (!newMerchant.Password.trim()) errors.Password = 'Password is required.';

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleAddMerchant = async () => {
    if (!validateInputs()) {
      return; // Keep the form open if validation fails
    }

    // Check if the Branch and Branch Address already exist
    const existingMerchant = merchants.find(
      (merchant) =>
        merchant.Branch.toLowerCase() === newMerchant.Branch.toLowerCase() &&
        merchant.Branch_Address.toLowerCase() === newMerchant.Branch_Address.toLowerCase()
    );

    if (existingMerchant) {
      setFieldErrors({
        Branch: 'Branch already exists.',
        Branch_Address: 'Branch Address already exists.'
      });
      return;
    }

    setIsAdding(true);

    try {
      const response = await axios.post('/api/merchant', newMerchant);
      const addedMerchant = response.data;
      setMerchants([...merchants, addedMerchant]);
      setNewMerchant({
        Branch: '',
        Branch_Address: '',
        Collaboration_Start_Timestamp: '',
        Collaboration_End_Timestamp: '',
        Collaboration_Status: '',
        Collaboration_Type: '',
        Person_In_Charge: '',
        PIC_Contact_Number: '',
        PIC_Email: '',
        Password: ''
      });
      setIsAddFormVisible(false);
      setFieldErrors({});
    } catch (error) {
      console.error('Failed to add merchant:', error);
    } finally {
      setIsAdding(false);
    }
  };

  const handleCancelAddMerchant = () => {
    // Clear form and errors when user cancels
    setIsAddFormVisible(false);
    setNewMerchant({
      Branch: '',
      Branch_Address: '',
      Collaboration_Start_Timestamp: '',
      Collaboration_End_Timestamp: '',
      Collaboration_Status: '',
      Collaboration_Type: '',
      Person_In_Charge: '',
      PIC_Contact_Number: '',
      PIC_Email: '',
      Password: ''
    });
    setFieldErrors({});
  };

  const handleDeleteMerchant = async (merchantId: number) => {
    setIsDeleting(true);

    setTimeout(async () => {
      try {
        await axios.delete(`/api/merchant/${merchantId}`);
        setMerchants(merchants.filter(merchant => merchant.Merchant_ID !== merchantId));
        setIsDeleteConfirmVisible(false);
        setSelectedMerchant(null);
      } catch (error) {
        console.error('Failed to delete merchant:', error);
      } finally {
        setIsDeleting(false);
      }
    }, 500);
  };

  return (
    <>
      <div className="flex justify-between items-center px-5 mt-4 mb-8">
        <div className="text-3xl font-bold text-stone-700">
          Merchant Account Management
        </div>
        <button
          onClick={() => setIsAddFormVisible(true)}
          className="bg-purple-500 text-white px-5 py-2 rounded-md hover:bg-purple-600"
        >
          + Add Merchant   
        </button>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Spin size="large" />
        </div>
      ) : (
        <div className="px-4 grid gap-6 grid-cols-12">
          {merchants.map((merchant) => (
            <div
              key={merchant.Merchant_ID}
              className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 border rounded-lg shadow-md p-4 bg-white hover:bg-purple-50 cursor-pointer"
              onClick={() => {
                setSelectedMerchant(merchant);
                setIsDeleteConfirmVisible(true);
              }}
            >
              <h2 className="text-lg font-bold my-2 bg-purple-500 text-white px-3 py-2 rounded">
                {merchant.Branch}
              </h2>
              <div className="text-sm text-gray-700 mt-6 px-2 pb-1">
                <p><strong>Address:</strong> {merchant.Branch_Address}</p><br/>
                <p><strong>Start:</strong> {merchant.Collaboration_Start_Timestamp}</p><br/>
                <p><strong>End:</strong> {merchant.Collaboration_End_Timestamp}</p><br/>
                <p><strong>Status:</strong> {merchant.Collaboration_Status}</p><br/>
                <p><strong>Type:</strong> {merchant.Collaboration_Type}</p><br/>
                <p><strong>PIC:</strong> {merchant.Person_In_Charge}</p><br/>
                <p><strong>Contact:</strong> {merchant.PIC_Contact_Number}</p><br/>
                <p><strong>Email:</strong> {merchant.PIC_Email}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add New Merchant Modal */}
      {isAddFormVisible && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-lg p-8 w-full max-w-2xl">
            <h2 className="text-2xl font-bold mb-4">Add New Merchant</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[{
                label: 'Branch', value: newMerchant.Branch, field: 'Branch'
              }, {
                label: 'Branch Address', value: newMerchant.Branch_Address, field: 'Branch_Address'
              }, {
                label: 'Start Timestamp', value: newMerchant.Collaboration_Start_Timestamp, field: 'Collaboration_Start_Timestamp', type: 'datetime-local'
              }, {
                label: 'End Timestamp', value: newMerchant.Collaboration_End_Timestamp, field: 'Collaboration_End_Timestamp', type: 'datetime-local'
              }, {
                label: 'Status', value: newMerchant.Collaboration_Status, field: 'Collaboration_Status'
              }, {
                label: 'Type', value: newMerchant.Collaboration_Type, field: 'Collaboration_Type'
              }, {
                label: 'Person In Charge', value: newMerchant.Person_In_Charge, field: 'Person_In_Charge'
              }, {
                label: 'Contact Number', value: newMerchant.PIC_Contact_Number, field: 'PIC_Contact_Number'
              }, {
                label: 'Email', value: newMerchant.PIC_Email, field: 'PIC_Email'
              }, {
                label: 'Password', value: newMerchant.Password, field: 'Password', type: 'password'
              }].map(({ label, value, field, type = 'text' }) => (
                <div key={field}>
                  <label className="block text-gray-700 font-bold mb-2">{label}</label>
                  <input
                    type={type}
                    placeholder={label}
                    value={value}
                    onChange={(e) => setNewMerchant({ ...newMerchant, [field]: e.target.value })}
                    className={`border p-2 rounded w-full ${fieldErrors[field] ? 'border-red-500' : ''}`}
                  />
                  {fieldErrors[field] && (
                    <p className="text-red-500 text-xs mt-1">{fieldErrors[field]}</p>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-6 flex justify-center space-x-6">
              <button
                onClick={handleCancelAddMerchant}
                className="bg-gray-400 text-white py-2 px-6 rounded-lg hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={handleAddMerchant}
                className={`bg-purple-500 text-white py-2 px-6 rounded-lg hover:bg-purple-600 ${isAdding ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={isAdding}
              >
                {isAdding ? 'Adding...' : 'Add Merchant'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteConfirmVisible && selectedMerchant && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-lg p-8 max-w-sm w-full">
            <h2 className="text-xl font-bold mb-4">Confirm Delete</h2>
            <p>Are you sure you want to delete the merchant "{selectedMerchant.Branch}"?</p>
            <div className="mt-6 flex justify-evenly">
              <button
                onClick={() => {
                  setIsDeleteConfirmVisible(false);
                  setSelectedMerchant(null);
                }}
                className="bg-gray-400 text-white py-2 px-4 rounded-lg hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteMerchant(selectedMerchant.Merchant_ID!)}
                className={`bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 ${isDeleting ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={isDeleting}
              >
                {isDeleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
