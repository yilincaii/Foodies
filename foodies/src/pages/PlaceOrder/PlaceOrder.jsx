import React, { useContext, useMemo, useRef, useState } from "react";
import "./PlaceOrder.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../Contact/StoreContext";
import { calculateCartTotals } from "../../util/cartUtils";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { PAYPAL_CLIENT_ID } from "../../util/contants";
import { createOrder, captureOrder } from "../../service/orderService";

const loadPayPalSdk = (clientId) =>
  new Promise((resolve, reject) => {
    if (window.paypal) return resolve();
    const s = document.createElement("script");
    s.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=USD&intent=capture&components=buttons`;
    s.onload = resolve;
    s.onerror = () => reject(new Error("Failed to load PayPal SDK"));
    document.body.appendChild(s);
  });

const PlaceOrder = () => {
  const { foodList, quantities, setQuantities, token } = useContext(StoreContext);
  const navigate = useNavigate();
  const btnContainerRef = useRef(null);
  const [submitting, setSubmitting] = useState(false);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    address: "",
    state: "",
    city: "",
    zip: "",
  });

  const cartItems = useMemo(
    () => foodList.filter((food) => quantities[food.id] > 0),
    [foodList, quantities]
  );
  const { subtotal, shipping, tax, total } = useMemo(
    () => calculateCartTotals(cartItems, quantities),
    [cartItems, quantities]
  );

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData((d) => ({ ...d, [name]: value }));
  };

  const buildOrderPayload = () => ({
    userAddress: `${data.firstName} ${data.lastName}, ${data.address}, ${data.city}, ${data.state}, ${data.zip}`,
    phoneNumber: data.phoneNumber,
    email: data.email,
    orderedItems: cartItems.map((item) => ({
      foodId: item.id, // ← 修正：用 item.id，而不是 item.foodId
      quantity: quantities[item.id],
      price: item.price * quantities[item.id],
      category: item.category,
      imageUrl: item.imageUrl,
      description: item.description,
      name: item.name,
    })),
    amount: Number(total.toFixed(2)),
    orderStatus: "Preparing",
  });

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!token) {
      toast.error("Please log in first.");
      return;
    }
    if (cartItems.length === 0) {
      toast.error("Your cart is empty.");
      return;
    }

    setSubmitting(true);
    try {
      // 先确保加载 PayPal SDK
      await loadPayPalSdk(PAYPAL_CLIENT_ID);

      // 渲染/重渲染 PayPal 按钮（每次提交都重新挂载，带最新表单数据）
      if (btnContainerRef.current) btnContainerRef.current.innerHTML = "";

      window.paypal
        .Buttons({
          style: { layout: "vertical", shape: "rect", label: "paypal" },

          // 由前端调用后端创建 PayPal 订单，并返回 paypalOrderId
          createOrder: async () => {
            const payload = buildOrderPayload();
            const res = await createOrder(payload, token);
            if (!res?.paypalOrderId) {
              toast.error("Failed to create PayPal order.");
              throw new Error("No paypalOrderId");
            }
            return res.paypalOrderId;
          },

          // 用户在 PayPal 批准后，前端调用后端 capture
          onApprove: async (data /* { orderID, payerID } */) => {
            try {
              await captureOrder(data.orderID, token);
              toast.success("Payment successful!");
              setQuantities({}); // 前端清空购物车（后端也会在 capture 成功后清空数据库购物车）
              navigate("/");     // 你的路由里没有 /myorders，这里回首页
            } catch (err) {
              console.error(err);
              toast.error("Failed to capture payment.");
            }
          },

          onCancel: () => {
            toast.info("Payment cancelled.");
            navigate("/cancel");
          },

          onError: (err) => {
            console.error(err);
            toast.error("PayPal error, please try again.");
          },
        })
        .render("#paypal-buttons-container");
      toast.info("Please complete the payment in the PayPal popup.");
    } catch (err) {
      console.error(err);
      toast.error("Unable to start PayPal checkout.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container mt-4">
      <main>
        <div className="py-5 text-center">
          <img className="d-block mx-auto" src={assets.logo} alt="" width="98" height="98" />
        </div>

        <div className="row g-5">
          {/* 右侧：购物车摘要 */}
          <div className="col-md-5 col-lg-4 order-md-last">
            <h4 className="d-flex justify-content-between align-items-center mb-3">
              <span className="text-primary">Your cart</span>
              <span className="badge bg-primary rounded-pill">{cartItems.length}</span>
            </h4>

            <ul className="list-group mb-3">
              {cartItems.map((item) => (
                <li key={item.id} className="list-group-item d-flex justify-content-between lh-sm">
                  <div>
                    <h6 className="my-0">{item.name}</h6>
                    <small className="text-body-secondary">Qty: {quantities[item.id]}</small>
                  </div>
                  <span className="text-body-secondary">${item.price * quantities[item.id]}</span>
                </li>
              ))}

              <li className="list-group-item d-flex justify-content-between">
                <div><span>Shipping</span></div>
                <span className="text-body-secondary">${subtotal === 0 ? 0 : shipping.toFixed(2)}</span>
              </li>
              <li className="list-group-item d-flex justify-content-between">
                <div><span>Tax (10%)</span></div>
                <span className="text-body-secondary">${tax.toFixed(2)}</span>
              </li>
              <li className="list-group-item d-flex justify-content-between">
                <span>Total (USD)</span>
                <strong>${total.toFixed(2)}</strong>
              </li>
            </ul>
          </div>

          {/* 左侧：地址表单 + PayPal 按钮容器 */}
          <div className="col-md-7 col-lg-8">
            <h4 className="mb-3">Billing address</h4>
            <form className="needs-validation" onSubmit={onSubmitHandler}>
              <div className="row g-3">
                <div className="col-sm-6">
                  <label htmlFor="firstName" className="form-label">First name</label>
                  <input type="text" className="form-control" id="firstName"
                    placeholder="John" required name="firstName" value={data.firstName} onChange={onChangeHandler} />
                </div>

                <div className="col-sm-6">
                  <label htmlFor="lastName" className="form-label">Last name</label>
                  <input type="text" className="form-control" id="lastName"
                    placeholder="Doe" required name="lastName" value={data.lastName} onChange={onChangeHandler} />
                </div>

                <div className="col-12">
                  <label htmlFor="email" className="form-label">Email</label>
                  <div className="input-group has-validation">
                    <span className="input-group-text">@</span>
                    <input type="email" className="form-control" id="email"
                      placeholder="you@example.com" required name="email" value={data.email} onChange={onChangeHandler} />
                  </div>
                </div>

                <div className="col-12">
                  <label htmlFor="phone" className="form-label">Phone Number</label>
                  <input type="tel" className="form-control" id="phone"
                    placeholder="9876543210" required name="phoneNumber" value={data.phoneNumber} onChange={onChangeHandler} />
                </div>

                <div className="col-12">
                  <label htmlFor="address" className="form-label">Address</label>
                  <input type="text" className="form-control" id="address"
                    placeholder="1234 Main St" required name="address" value={data.address} onChange={onChangeHandler} />
                </div>

                <div className="col-md-5">
                  <label htmlFor="state" className="form-label">State</label>
                  <select className="form-select" id="state" required name="state" value={data.state} onChange={onChangeHandler}>
                    <option value="">Choose...</option>
                    <option>Ohio</option>
                  </select>
                </div>

                <div className="col-md-4">
                  <label htmlFor="city" className="form-label">City</label>
                  <select className="form-select" id="city" required name="city" value={data.city} onChange={onChangeHandler}>
                    <option value="">Choose...</option>
                    <option>Cleveland</option>
                  </select>
                </div>

                <div className="col-md-3">
                  <label htmlFor="zip" className="form-label">Zip</label>
                  <input type="number" className="form-control" id="zip"
                    placeholder="44223" required name="zip" value={data.zip} onChange={onChangeHandler} />
                </div>
              </div>

              <hr className="my-4" />

              <button className="w-100 btn btn-primary btn-lg" type="submit" disabled={cartItems.length === 0 || submitting}>
                {submitting ? "Loading PayPal..." : "Continue to checkout"}
              </button>
            </form>

            {/* PayPal 按钮渲染容器 */}
            <div id="paypal-buttons-container" ref={btnContainerRef} className="mt-3" />
          </div>
        </div>
      </main>
    </div>
  );
};

export default PlaceOrder;
