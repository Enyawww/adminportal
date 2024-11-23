"use client";
import React, { useState, useEffect } from 'react';
import { FaPlus } from 'react-icons/fa';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import { Modal, Button, Form, Input, DatePicker, Table, Space, message } from 'antd';
import axios from 'axios';
import "antd/dist/reset.css";

interface Voucher {
  Voucher_ID: number;
  Voucher_Name: string;
  Promo_Code: string;
  QR_Code: string;
  Description: string;
  Total_Available: number;
  Terms_Conditions: string;
  Start_Date: string;
  End_Date: string;
}

export const Grid = () => {
  const [vouchers, setVouchers] = useState<Voucher[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newVoucher, setNewVoucher] = useState<Voucher | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVouchers = async () => {
      try {
        const response = await axios.get('/api/voucher');
        setVouchers(response.data);
      } catch (error) {
        console.error('Failed to fetch vouchers:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVouchers();
  }, []);

  const showAddVoucherModal = () => {
    setNewVoucher(null);
    setIsModalVisible(true);
  };

  const showEditVoucherModal = (voucher: Voucher) => {
    setNewVoucher(voucher);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleAddOrEditVoucher = async (values: Voucher) => {
    try {
      if (newVoucher) {
        // Edit voucher
        const updatedVoucher = await axios.put(`/api/voucher/${newVoucher.Voucher_ID}`, values);
        setVouchers((prev) => prev.map(v => v.Voucher_ID === newVoucher.Voucher_ID ? updatedVoucher.data : v));
      } else {
        // Add new voucher
        const addedVoucher = await axios.post('/api/voucher', values);
        setVouchers([...vouchers, addedVoucher.data]);
      }
      setIsModalVisible(false);
      message.success(newVoucher ? 'Voucher updated successfully!' : 'Voucher added successfully!');
    } catch (error) {
      console.error('Failed to add or edit voucher:', error);
      message.error('Failed to add or edit voucher.');
    }
  };

  const handleDeleteVoucher = async (voucherId: number) => {
    try {
      await axios.delete(`/api/voucher/${voucherId}`);
      setVouchers((prev) => prev.filter(voucher => voucher.Voucher_ID !== voucherId));
      message.success('Voucher deleted successfully!');
    } catch (error) {
      console.error('Failed to delete voucher:', error);
      message.error('Failed to delete voucher.');
    }
  };

  const columns = [
    {
      title: 'Voucher Name',
      dataIndex: 'Voucher_Name',
      key: 'Voucher_Name',
    },
    {
      title: 'Promo Code',
      dataIndex: 'Promo_Code',
      key: 'Promo_Code',
    },
    {
      title: 'Description',
      dataIndex: 'Description',
      key: 'Description',
    },
    {
      title: 'Total Available',
      dataIndex: 'Total_Available',
      key: 'Total_Available',
    },
    {
      title: 'Start Date',
      dataIndex: 'Start_Date',
      key: 'Start_Date',
    },
    {
      title: 'End Date',
      dataIndex: 'End_Date',
      key: 'End_Date',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: Voucher) => (
        <Space size="middle">
          <Button icon={<AiFillEdit />} onClick={() => showEditVoucherModal(record)}>
            Edit
          </Button>
          <Button icon={<AiFillDelete />} danger onClick={() => handleDeleteVoucher(record.Voucher_ID)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="px-4 grid gap-3 grid-cols-12">
      <div className="col-span-12 text-3xl font-bold mt-3 mb-7 text-stone-700">
        Manage Vouchers (Streak Journey)
      </div>

      <div className="col-span-12 flex justify-end mb-4">
        <Button
          type="primary"
          icon={<FaPlus />}
          onClick={showAddVoucherModal}
        >
          Add Voucher
        </Button>
      </div>

      <div className="col-span-12">
        <Table
          dataSource={vouchers}
          columns={columns}
          loading={loading}
          rowKey="Voucher_ID"
          pagination={{ pageSize: 5 }}
          bordered
        />
      </div>

      <Modal
        title={newVoucher ? 'Edit Voucher' : 'Add Voucher'}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          initialValues={newVoucher ?? {}}
          onFinish={handleAddOrEditVoucher}
          layout="vertical"
        >
          <Form.Item
            label="Voucher Name"
            name="Voucher_Name"
            rules={[{ required: true, message: 'Please enter voucher name!' }]}
          >
            <Input placeholder="Enter voucher name" />
          </Form.Item>

          <Form.Item
            label="Promo Code"
            name="Promo_Code"
            rules={[{ required: true, message: 'Please enter promo code!' }]}
          >
            <Input placeholder="Enter promo code" />
          </Form.Item>

          <Form.Item
            label="QR Code"
            name="QR_Code"
            rules={[{ required: true, message: 'Please upload QR code!' }]}
          >
            <Input placeholder="Enter QR code" />
          </Form.Item>

          <Form.Item
            label="Description"
            name="Description"
            rules={[{ required: true, message: 'Please enter voucher description!' }]}
          >
            <Input.TextArea placeholder="Enter voucher description" />
          </Form.Item>

          <Form.Item
            label="Total Voucher Available"
            name="Total_Available"
            rules={[{ required: true, message: 'Please enter total available!' }]}
          >
            <Input type="number" placeholder="Enter total vouchers available" />
          </Form.Item>

          <Form.Item
            label="Terms & Conditions"
            name="Terms_Conditions"
            rules={[{ required: true, message: 'Please enter terms and conditions!' }]}
          >
            <Input.TextArea placeholder="Enter terms and conditions" />
          </Form.Item>

          <Form.Item
            label="Voucher Start Date"
            name="Start_Date"
            rules={[{ required: true, message: 'Please select start date!' }]}
          >
            <DatePicker format="YYYY-MM-DD" style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            label="Voucher End Date"
            name="End_Date"
            rules={[{ required: true, message: 'Please select end date!' }]}
          >
            <DatePicker format="YYYY-MM-DD" style={{ width: '100%' }} />
          </Form.Item>

          <div className="flex justify-center mt-6">
            <Button type="default" onClick={handleCancel} className="mr-4">
              Cancel
            </Button>
            <Button type="primary" htmlType="submit">
              {newVoucher ? 'Update Voucher' : 'Add Voucher'}
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};
