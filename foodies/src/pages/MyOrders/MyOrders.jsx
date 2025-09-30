import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { StoreContext } from '../Contact/StoreContext';
import { assets } from '../../assets/assets';

const MyOrders = () => {
  const { token } = useContext(StoreContext);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);

  const fetchOrders = async () => {
    if (!token) return;
    try {
      setLoading(true);
      setErr(null);
      const res = await axios.get('http://localhost:8081/api/orders', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setData(Array.isArray(res.data) ? res.data : []);
    } catch (e) {
      setErr(e);
      setData([]);
      console.error('Failed to fetch orders:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [token]);

  return (
    <div className="container">
      <div className="py-5 row justify-content-center">
        <div className="col-11 card">
          {/* 顶部标题和全局刷新按钮 */}
          <div className="d-flex align-items-center justify-content-between p-3 border-bottom">
            <h5 className="m-0">My Orders</h5>
            <button 
              className="btn btn-sm btn-warning" 
              onClick={fetchOrders} 
              disabled={loading || !token}
            >
              <i className="bi bi-arrow-clockwise" /> {loading ? 'Refreshing...' : 'Refresh All'}
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

          {/* 订单表格 */}
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <tbody>
                {data.map((order, index) => (
                  <tr key={order.id ?? index}>
                    {/* 配送图标 */}
                    <td className="align-middle" style={{ width: '80px' }}>
                      <img src={assets.delivery} alt="delivery" height={48} width={48} />
                    </td>

                    {/* 订单商品列表 */}
                    <td className="align-middle text-break">
                      {order?.orderedItems?.map((item, i) =>
                        i === order.orderedItems.length - 1
                          ? `${item.name} x ${item.quantity}`
                          : `${item.name} x ${item.quantity}, `
                      )}
                    </td>

                    {/* 总价 */}
                    <td className="align-middle" style={{ minWidth: '100px' }}>
                      &#36;{(order?.totalPrice || order?.amount || 0).toFixed(2)}
                    </td>

                    {/* 商品数量 */}
                    <td className="align-middle" style={{ minWidth: '100px' }}>
                      Items: {order?.orderedItems?.length ?? 0}
                    </td>

                    {/* 订单状态（带圆点） */}
                    <td className="align-middle fw-bold text-capitalize" style={{ minWidth: '120px' }}>
                      <span className="text-warning">&#x25cf;</span> {order?.orderStatus || 'pending'}
                    </td>

                    {/* 单行刷新按钮 */}
                    <td className="align-middle" style={{ width: '60px' }}>
                      <button
                        className="btn btn-sm btn-outline-secondary"
                        onClick={fetchOrders}
                        disabled={loading}
                        title="Refresh this order"
                      >
                        <i className="bi bi-arrow-clockwise"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </div>
  );
};

export default MyOrders;