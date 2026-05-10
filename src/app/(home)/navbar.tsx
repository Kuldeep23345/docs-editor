import Image from "next/image"
import Link from "next/link"
import SearchInput from "./search-input"
import { UserButton } from "@clerk/nextjs"


const Navbar = () => {
  return (
    <nav className="flex items-center justify-between h-full w-full">
      <div className="flex gap-3 items-center shrink-0 pr-6">
        <Link href="/">
          <Image src="/logo.png" alt="Logo" width={56} height={56} />
        </Link>
        <h3 className="text-xl">Docs</h3>
      </div>
      <SearchInput/>
      <UserButton/>
    </nav>
  )
}

export default Navbar