'use client'
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";


export default function Navbar() {
    const { status, data: session } = useSession();
    const [isPopUpVisible, setIsPopUpVisible] = useState(false);
    const popupRef = useRef<HTMLDivElement | null>(null);

    useEffect(()=>{
        const handleClickOutside = (e:MouseEvent)=>{
            if(popupRef.current && !popupRef.current.contains(e.target as Node)){
                setIsPopUpVisible(false);
            }
        };
        document.addEventListener("click", handleClickOutside);

        if(!isPopUpVisible){
            document.removeEventListener("click", handleClickOutside);
        }

        return() =>{
            document.removeEventListener("click", handleClickOutside);
            
        }

    },[isPopUpVisible])

    return (
        <div className="flex justify-between border-b pb-3 mb-3 relative">
            <div className="">
                <Link href={'/'} >
                    <h1 className="text-dark text-4xl font-bold tracking-tighter">TechNews</h1>
                </Link>
                <p className="text-sm">Cart curt burası <br />alt satırda fasafiso</p>
            </div>

            {
                status === 'authenticated' ? (
                    <>
                    {/* pop-up div */}
                        <div ref={popupRef}
                        className={`absolute z-30 right-0 top-20 bg-gradient-to-b from-white to-slate-100 p-6 shadow-lg
                        rounded-md flex-col gap-2 text-right min-w-[160px] ${isPopUpVisible ? 'flex':'hidden'}`}>
                            <div className="font-bold">{session?.user?.name} </div>
                            <div className="text-slate-400">{session?.user?.email} </div>
                            <Link onClick={()=>setIsPopUpVisible(false)} className="hover:underline" href={'/dashboard'}>Dashboard</Link>
                            <Link onClick={()=>setIsPopUpVisible(false)} className="hover:underline" href={'/create-post'}>Create Post</Link>
                            <button className="btn"
                                onClick={() => signOut()}
                            >
                                Logout!
                            </button>
                        </div>
                        <div className="flex gap-2 items-center">
                            <Link className="hidden md:flex gap-1 mr-6 text-green-500" href={'/create-post'}>
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                    </svg>
                                </span>
                                <span>Create New</span>

                            </Link>
                            <Image src={session?.user?.image || ""}
                                width={36}
                                height={36}
                                alt="pp"
                                className="rounded-full cursor-pointer"
                                onClick={()=>setIsPopUpVisible((prev) => !prev)}
                            />

                        </div>
                    </>
                ) : (
                    <div className="flex items-center ">
                        <Link className="btn" href={'/sign-in'}>Sign In</Link>
                    </div>
                )
            }



        </div>
    );
}
