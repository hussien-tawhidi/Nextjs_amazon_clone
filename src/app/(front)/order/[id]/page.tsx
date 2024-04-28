import OrderDetailsComp from "@/components/OrderDetails";

export function generateMetadata({ params }: { params: { id: string } }) {
  return {
    title: `Order ${params.id}`,
  };
}

const OrderDetials = ({ params }: { params: { id: string } }) => {
  return (
    <OrderDetailsComp
      orderId={params.id}
      paymentClientId={process.env.PAYPAL_CLIENT_ID || "sb"}
    />
  );
};

export default OrderDetials;
