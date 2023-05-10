import Product from "./components/Product"
import getProducts from "@/util/getProducts"

export default async function Home() {
  const products = await getProducts()

  return (
    <main className="grid gap-12 grid-cols-fluid">
      {products.map((product) => (
        <Product {...product} key={product.id} />
      ))}
    </main>
  )
}
