import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function PayPalCancel() {
  const navigate = useNavigate();
  useEffect(() => {
    // todo: 这里可选做点清理工作
  }, []);
  return (
    <div className="container py-5">
      <h3>Payment cancelled</h3>
      <button className="btn btn-secondary mt-3" onClick={() => navigate("/")}>
        Back to Home
      </button>
    </div>
  );
}
