import { useEffect, useState } from 'react';

export default function VendaiCreditWidget({ amount, currency = "KES", onApproved }) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Load VendAI widget script
    const script = document.createElement('script');
    script.src = 'https://cdn.vendai.digital/widget.js';
    script.async = true;
    script.onload = () => setIsLoaded(true);
    document.body.appendChild(script);

    // Listen for credit approval events
    const handleCreditApproved = (event) => {
      if (onApproved) {
        onApproved(event.detail);
      }
    };

    window.addEventListener('vendai:credit:approved', handleCreditApproved);

    return () => {
      document.body.removeChild(script);
      window.removeEventListener('vendai:credit:approved', handleCreditApproved);
    };
  }, [onApproved]);

  if (!isLoaded) {
    return (
      <div style={{ padding: "1rem", background: "#f3f4f6", borderRadius: "0.5rem" }}>
        <div style={{ height: "1rem", background: "#d1d5db", borderRadius: "0.25rem", width: "75%", marginBottom: "0.5rem" }} />
        <div style={{ height: "1rem", background: "#d1d5db", borderRadius: "0.25rem", width: "50%" }} />
      </div>
    );
  }

  return (
    <div
      data-vendai-widget
      data-amount={amount}
      data-currency={currency}
      style={{ margin: "1rem 0", padding: "1rem", border: "1px solid #e5e7eb", borderRadius: "0.5rem" }}
    />
  );
}