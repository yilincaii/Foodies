import React, { useEffect, useState } from "react";
import { assets } from "../../assets/assets";
import { fetchAllOrders, updateOrderStatus } from "../../services/orderService";
import { toast } from "react-toastify";

const Orders = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setErr(null);
      const response = await fetchAllOrders();
      setData(Array.isArray(response) ? response : []);
    } catch (error) {
      setErr(error);
      setData([]);
      toast.error("Unable to display the orders. Please try again.");
      console.error("Failed to fetch orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (event, orderId) => {
    try {
      const success = await updateOrderStatus(orderId, event.target.value);
      if (success) {
        await fetchOrders();
        toast.success("Order status updated successfully!");
      } else {
        toast.error("Failed to update order status. Please try again.");
      }
    } catch (error) {
      toast.error("Failed to update order status. Please try again.");
      console.error("Failed to update status:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="container">
      <div className="py-5 row justify-content-center">
        <div className="col-11 card">
          {/* 顶部标题和刷新按钮 */}
          <div className="d-flex align-items-center justify-content-between p-3 border-bottom">
            <h5 className="m-0">All Orders</h5>
            <button 
              className="btn btn-sm btn-warning" 
              onClick={fetchOrders} 
              disabled={loading}
            >
              <i className="bi bi-arrow-clockwise"></i> {loading ? 'Refreshing...' : 'Refresh All'}
            </button>
          </div>

          {/* 错误提示 */}
          {err && (
            <div className="alert alert-danger m-3">
              Failed to load orders{err.response?.status ? ` (HTTP ${err.response.status})` : ''}. Please try again.
            </div>
          )}

          {/* 空状态 */}
          {!err && !loading && data.length === 0 && (
            <div className="text-muted p-3 text-center">No orders yet.</div>
          )}

          {/* 加载状态 */}
          {loading && (
            <div className="text-center p-4">
              <div className="spinner-border text-warning" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )}

          {/* 订单表格 */}
          {!loading && (
            <div className="table-responsive">
              <table className="table table-hover mb-0">
                <tbody>
                  {data.map((order, index) => {
                    return (
                      <tr key={order.id ?? index}>
                        {/* 配送图标 */}
                        <td className="align-middle" style={{ width: '80px' }}>
                          <img src={assets.parcel} alt="" height={48} width={48} />
                        </td>

                        {/* 订单商品列表 + 用户地址 */}
                        <td className="align-middle text-break">
                          <div className="mb-2">
                            {order.orderedItems.map((item, index) => {
                              if (index === order.orderedItems.length - 1) {
                                return item.name + " x " + item.quantity;
                              } else {
                                return item.name + " x " + item.quantity + ", ";
                              }
                            })}
                          </div>
                          <div className="text-muted small">
                            {order.userAddress || 'No address provided'}
                          </div>
                        </td>

                        {/* 总价 */}
                        <td className="align-middle" style={{ minWidth: '100px' }}>
                          &#x20B9;{(order.amount || 0).toFixed(2)}
                        </td>

                        {/* 商品数量 */}
                        <td className="align-middle" style={{ minWidth: '100px' }}>
                          Items: {order.orderedItems.length}
                        </td>

                        {/* 订单状态（带圆点） */}
                        <td className="align-middle fw-bold text-capitalize" style={{ minWidth: '120px' }}>
                          <span className="text-warning">&#x25cf;</span> {order.orderStatus || 'pending'}
                        </td>

                        {/* 状态更新下拉框 */}
                        <td className="align-middle" style={{ minWidth: '180px' }}>
                          <select
                            className="form-select form-select-sm"
                            onChange={(event) => updateStatus(event, order.id)}
                            value={order.orderStatus}
                          >
                            <option value="Food Preparing">Food Preparing</option>
                            <option value="Out for delivery">Out for delivery</option>
                            <option value="Delivered">Delivered</option>
                          </select>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Orders;