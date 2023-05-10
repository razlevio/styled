import Image from "next/image"
import { SearchParamTypes } from "@/types/SearchParamTypes"
import formatPrice from "@/util/PriceFormat"
import AddCart from "./AddCart"

export default async function Product({ searchParams }: SearchParamTypes) {
  return (
    <div className="flex flex-col items-center justify-between gap-8 lg:flex-row ">
      <div className="w-full h-full max-w-2xl max-h-2xl">
        <Image
          src={searchParams.image}
          alt={searchParams.name}
          width={600}
          height={600}
          className="object-contain w-full h-full rounded-lg"
          priority={true}
        />
      </div>

      <div className="font-medium">
        <h1 className="py-2 text-2xl">{searchParams.name}</h1>
        <p className="py-2">{searchParams.description}</p>
        <p className="py-2">{searchParams.features}</p>
        <div className="flex gap-2">
          <p className="font-bold text-primary">
            {searchParams.unit_amount && formatPrice(searchParams.unit_amount)}
          </p>
        </div>
        <AddCart {...searchParams} />
      </div>
    </div>
  )
}
