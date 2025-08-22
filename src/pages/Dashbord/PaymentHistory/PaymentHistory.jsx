
import React from 'react';
import UseAuth from '../../../hooks/UseAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import {
  FaDollarSign,
  FaCalendarAlt,
  FaCreditCard,
  FaReceipt,
} from "react-icons/fa";

const formatDate = (iso) => new Date(iso).toLocaleString();

const PaymentHistory = () => {
  const { user } = UseAuth();
  const axiosSecure = useAxiosSecure();

  const { isPending, data } = useQuery({
    queryKey: ['payments', user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${user.email}`);
      return res.data;
    },
  });

  if (isPending) {
    return (
      <span className="loading loading-dots loading-xl text-center mt-20"></span>
    );
  }

  const payments = data?.data || [];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-center flex items-center justify-center gap-2">
        <FaReceipt className="text-yellow-600" /> Payment History
      </h2>

      {payments.length === 0 ? (
        <p className="text-center text-gray-500">No payments found.</p>
      ) : (
        <>
          {/* ✅ Large screen = Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="table table-zebra w-full border rounded-lg shadow-md">
              <thead className="bg-gray-200 text-gray-700">
                <tr>
                  <th>No</th>
                  <th>User Email</th>
                  <th>Month</th>
                  <th>Amount</th>
                  <th>Payment Method</th>
                  <th>Transaction ID</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment, index) => (
                  <tr key={payment.transactionId || index}>
                    <td>{index + 1}</td>
                    <td>{payment.userEmail}</td>
                    <td>
                      <FaCalendarAlt className="inline mr-1 text-gray-500" />
                      {payment.month}
                    </td>
                    <td className="font-semibold text-green-600">
                      <FaDollarSign className="inline mr-1" />
                      {payment.amount}
                    </td>
                    <td>
                      <FaCreditCard className="inline mr-1 text-blue-500" />
                      {payment.paymentMethod}
                    </td>
                    <td className="text-xs">{payment.transactionId}</td>
                    <td>{formatDate(payment.date)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ✅ Small/Medium screen = Card Layout */}
          <div className="grid grid-cols-1 gap-4 md:hidden">
            {payments.map((payment, index) => (
              <div
                key={payment.transactionId || index}
                className="card bg-base-100 shadow-md border rounded-lg p-4"
              >
                <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                  <FaCalendarAlt className="text-gray-500" /> {payment.month}
                </h3>
                <p>
                  <span className="font-semibold">Email:</span> {payment.userEmail}
                </p>
                <p className="text-green-600 font-semibold">
                  <FaDollarSign className="inline mr-1" />
                  {payment.amount}
                </p>
                <p>
                  <FaCreditCard className="inline mr-1 text-blue-500" />
                  {payment.paymentMethod}
                </p>
                <p className="text-xs break-all">
                  <span className="font-semibold">Txn:</span>{" "}
                  {payment.transactionId}
                </p>
                <p>
                  <span className="font-semibold">Date:</span>{" "}
                  {formatDate(payment.date)}
                </p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default PaymentHistory;
