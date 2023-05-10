"use client"

import { signIn, signOut } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"
import Cart from "./Cart"
import { useCartStore } from "@/store"
import { AiFillShopping } from "react-icons/ai"
import { motion, AnimatePresence } from "framer-motion"
import DarkLight from "./DarkLight"
import { useSession } from "next-auth/react"

export default function Nav() {
  const cartStore = useCartStore()
  const { data: session, status } = useSession()

  return (
    <nav className="flex items-center justify-between pt-4 pb-12">
      <Link href={"/"}>
        <h1 className="text-xl rounded font-lobster btn-ghost">Styled</h1>
      </Link>
      <ul className="flex items-center justify-center gap-8">
        {/* Toggle the cart */}
        <li
          onClick={() => cartStore.toggleCart()}
          className="relative flex items-center text-3xl cursor-pointer"
        >
          <AiFillShopping />
          <AnimatePresence>
            {cartStore.cart.length > 0 && (
              <motion.span
                animate={{ scale: 1 }}
                initial={{ scale: 0 }}
                exit={{ scale: 0 }}
                className="absolute flex items-center justify-center w-5 h-5 text-sm font-bold text-white rounded-full bg-primary left-4 bottom-4"
              >
                {cartStore.cart.length}
              </motion.span>
            )}
          </AnimatePresence>
        </li>
        {/* {Dark Mode} */}
        <DarkLight />
        {/* If the user is not signed in */}
        {!session?.user && (
          <li className="px-4 py-2 text-white rounded-md bg-primary">
            <button onClick={() => signIn()}>Sign in</button>
          </li>
        )}
        {session?.user && (
          <li>
            <div className="cursor-pointer dropdown dropdown-end">
              <Image
                src={session.user?.image as string}
                alt={session.user.name as string}
                width={36}
                height={36}
                className="rounded-full"
                tabIndex={0}
              />
              <ul
                tabIndex={0}
                className="p-4 space-y-4 shadow dropdown-content menu bg-base-100 rounded-box w-72"
              >
                <Link
                  className="p-4 rounded-md hover:bg-base-300"
                  href={"/dashboard"}
                  onClick={() => {
                    if (document.activeElement instanceof HTMLElement) {
                      document.activeElement.blur()
                    }
                  }}
                >
                  Orders
                </Link>
                <li
                  onClick={() => {
                    signOut()
                    if (document.activeElement instanceof HTMLElement) {
                      document.activeElement.blur()
                    }
                  }}
                  className="p-4 rounded-md hover:bg-base-300"
                >
                  Sign out
                </li>
              </ul>
            </div>
          </li>
        )}
      </ul>
      <AnimatePresence>{cartStore.isOpen && <Cart />}</AnimatePresence>
    </nav>
  )
}
