import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { captureOrder } from "../service/orderService";
import { toast } from "react-toastify";

export default function PayPalSuccess({ token }) {
  const { search } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(search);
    const orderId = params.get("token"); // Paypal returns the order ID as 'token'
    if (!orderId) {
      toast.error("Missing PayPal order id.");
      navigate("/");
      return;
    }
    (async () => {
      try {
        await captureOrder(orderId, token);
        toast.success("Payment successful!");
        navigate("/");
      } catch {
        toast.error("Capture failed.");
        navigate("/");
      }
    })();
  }, [search, token, navigate]);

  return <div className="container py-5">Processing payment...</div>;
}
