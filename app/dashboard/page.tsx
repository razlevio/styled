"use client"

import formatPrice from "@/util/PriceFormat";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Order {
  id: string;
  status: string;
  createdDate: string;
  products: {
    id: string;
    name: string;
    image: string;
    unit_amount: number;
    quantity: number;
  }[];
  amount: number;
}

export default function Dashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchOrders = async () => {
    try {
      const res = await fetch("/api/get-orders");
      const data = await res.json();
      setOrders(data);
      setLoading(false);
    } catch (err: unknown) {
      setError(err as Error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  console.log(orders);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <motion.div layout>
      <motion.div layout initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        {orders.map((order: Order) => (
          <div
            key={order.id}
            className="p-8 my-4 space-y-2 rounded-lg bg-base-200"
          >
            <h2 className="text-xs font-medium">
              Order reference: {order.id}
            </h2>
            <p className="text-xs">
              Status:
              <span
                className={`${
                  order.status === "complete" ? "bg-teal-500" : "bg-orange-500"
                } text-white py-1 rounded-md px-2 mx-2 text-xs`}
              >
                {order.status}
              </span>
            </p>

            <p className="text-xs">
              Time: {new Date(order.createdDate).toString()}
            </p>
            <div className="items-center gap-4 text-sm lg:flex">
              {order.products.map((product) => (
                <div className="py-2" key={product.id}>
                  <h2 className="py-2">{product.name}</h2>
                  <div className="flex items-baseline gap-4">
                    <Image
                      src={product.image!}
                      width={36}
                      height={36}
                      alt={product.name}
                      priority={true}
                      className="w-auto"
                    />
                    <p>{formatPrice(product.unit_amount)}</p>
                    <p>Quantity: {product.quantity}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="py-2 font-medium">
              Total: {formatPrice(order.amount)}
            </p>
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
}