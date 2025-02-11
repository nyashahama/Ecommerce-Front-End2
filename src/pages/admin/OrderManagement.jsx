import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function OrderManagement() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/orders");
      setOrders(response.data);
      setLoading(false);
    } catch (error) {
      toast.error("Failed to load orders");
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      await axios.put(`http://localhost:8080/api/orders/${orderId}`, {
        status: newStatus,
      });
      toast.success("Order status updated");
      fetchOrders();
    } catch (error) {
      toast.error("Failed to update order status");
    }
  };

  if (loading) return <div>Loading orders...</div>;

  return (
    <div className="order-management">
      <h3>Order Management</h3>

      <table className="table table-striped">
        <thead className="thead-dark">
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Total</th>
            <th>Status</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>#{order.id}</td>
              <td>
                {order.user?.firstName} {order.user?.lastName}
              </td>
              <td>R{order.totalAmount.toFixed(2)}</td>
              <td>
                <select
                  className="form-select"
                  value={order.status}
                  onChange={(e) => handleStatusUpdate(order.id, e.target.value)}
                >
                  <option value="PENDING">Pending</option>
                  <option value="PROCESSING">Processing</option>
                  <option value="SHIPPED">Shipped</option>
                  <option value="DELIVERED">Delivered</option>
                  <option value="CANCELLED">Cancelled</option>
                </select>
              </td>
              <td>{new Date(order.orderDate).toLocaleDateString()}</td>
              <td>
                <button
                  className="btn btn-sm btn-info"
                  onClick={() => {
                    /* Implement view details */
                  }}
                >
                  Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default OrderManagement;
