'use client'
//benimki.. . . 
import { TCategory } from "@/app/types";
import Link from "next/link";
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation";
import { CldUploadButton, CloudinaryUploadWidgetResults } from "next-cloudinary";
import Image from "next/image";

export default function CreatePostForm() {
    const [links, setLinks] = useState<string[]>([]);
    const [linkInput, setLinkInput] = useState("");
    const [title, setTitle] = useState("");
    const [categories, setCategories] = useState<TCategory[]>([]);
    const [content, setContent] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [publicId, setPublicId] = useState("");
    const [error, setError] = useState("");


    const router = useRouter();


    useEffect(() => {
        const fetchAllCategories = async () => {
            const res = await fetch("api/categories");
            const catNames = await res.json();
            setCategories(catNames);
        };

        fetchAllCategories();

    }, []);

    const handleImageUpload = (result: CloudinaryUploadWidgetResults) =>{
        console.log(result);
        const info = result.info as object;

        if("secure_url" in info && "public_id" in info){
            const url = info.secure_url as string;
            const public_id = info.public_id as string;
            setImageUrl(url);
            setPublicId(publicId);
            console.log("url:", url);
            console.log("publicId:", public_id);
        }
    }

    const addLink = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        if (linkInput.trim() !== "") {
            setLinks((prev) => [...prev, linkInput]);
            setLinkInput("");
        }
    };

    const deleteLink = (index: number) => {
        setLinks((prev) => prev.filter((_, i) => i !== index));
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title || !content) {
            setError("buralar boş la");
            return;
        }

        try {
            const res = await fetch("api/posts/", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({
                    title,
                    content,
                    links,
                    selectedCategory,
                    imageUrl,
                    publicId,
                }),
            });

            if (res.ok) {
                router.push("/dashboard");
                router.refresh();
            } else {
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <h2>Create Post</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                <input onChange={e => setTitle(e.target.value)} type="text" placeholder="Title" />
                <textarea onChange={e => setContent(e.target.value)} placeholder="Content"></textarea>

                {links &&
                    links.map((link, i) =>
                        <div key={i} className="flex items-center gap-2">
                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
                                </svg>

                            </span>
                            <Link className="link" href={link}>{link}</Link>
                            <span className="cursor-pointer" onClick={() => deleteLink(i)} >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 fill-slate-400 stroke-red-400 hover:stroke-red-600">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                </svg>

                            </span>
                        </div>
                    )}

                <div className="flex gap-2">
                    <input className="flex-1"
                        type="text"
                        onChange={e => setLinkInput(e.target.value)}
                        value={linkInput}
                        placeholder="Pasta for links or opposites" />
                    <button onClick={addLink} className="btn flex gap-2 items-center">
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                        </span>
                        Add
                    </button>
                </div>

                <CldUploadButton uploadPreset="iz3bdrj2" 
                className="bg-slate-100 rounded-lg h-48 border-2 mt-3 
                border-dotted grid place-items-center relative"
                onUpload={handleImageUpload}
                >
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                        </svg>

                    </div>

                {imageUrl && <Image src={imageUrl} fill className="absolute object-cover inset-0" alt={title} />}
                </CldUploadButton>

                <select onChange={e => setSelectedCategory(e.target.value)} className="p-3 rounded-md border appearance-none">
                    <option value="">Select a category</option>
                    {categories &&
                        categories.map(category => (
                            <option key={category.id} value={category.catName}>
                                {category.catName}
                            </option>
                        ))}
                </select>

                <button className="primary-btn" type="submit">Create Post</button>

                {error && <div className="p-2 text-red-500 font-bold">Error Message : {error}</div>}

            </form>
        </div>
    )
}
