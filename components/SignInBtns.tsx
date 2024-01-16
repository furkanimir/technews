import Image from "next/image";

export default function SignInBtns() {
    return (
        <>
            <h1 className="text-center mt-7">Sign in</h1>
            <div className="mt-4 p-4 flex flex-col items-center justify-center gap-4">
                <button className="flex items-center border p-4 rounded-3xl gap-4 hover:bg-slate-600/15 transition">
                    <span>
                        <Image
                        src={"/github-mark.svg"}
                        width={30}
                        height={30}
                        alt="Github Logo" />
                    </span>
                    Sign In with Github
                </button>
                <button className="flex items-center border p-4 rounded-3xl gap-4 hover:bg-slate-600/15 transition">
                    <span>
                        <Image
                        src={"/google-logo.svg"}
                        width={30}
                        height={30}
                        alt="Google Logo" />
                    </span>
                    Sign In with Google
                </button>

            </div>
        </>
    )
}
