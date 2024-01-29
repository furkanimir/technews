'use client'
import Link from "next/link";
import { useSession,signOut } from "next-auth/react";


export default function Navbar() {
    const { status } = useSession();

    return (
        <div className="flex justify-between border-b pb-3 mb-3">
            <div className="">
                <Link href={'/'} >
                    <h1 className="text-dark text-4xl font-bold tracking-tighter">TechNews</h1>
                </Link>
                <p className="text-sm">Cart curt burası <br />alt satırda fasafiso</p>
            </div>

            {
                status === 'authenticated' ? (
                    <div>
                        <button className="btn"
                        onClick={() => signOut()}
                        >
                            Logout!
                        </button>
                    </div>
                ) : (
                    <div className="flex items-center ">
                        <Link className="btn" href={'/sign-in'}>Sign In</Link>
                    </div>
                )
            }



        </div>
    );
}
