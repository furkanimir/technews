//4602

import { link } from "fs";
import Image from "next/image";
import Link from "next/link";
import DeleteButton from "./DeleteButton";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

interface PostProps {
  id: string,
  author: string,
  authorEmail?: string,
  date: string,
  thumbnail?: string,
  category?: string,
  title: string,
  content: string,
  links?: string[]
}

export default async function Post({ id,
  author,
  authorEmail,
  date,
  thumbnail,
  category,
  title,
  content,
  links
}: PostProps) {

  const session = await getServerSession(authOptions);

  const isEditable = session && session?.user?.email === authorEmail;

  const dateObj=new Date(date);
  const dateOptions: Intl.DateTimeFormatOptions = {
    month:"long",
    day:"numeric",
    year:"numeric",
  };
  const formatedDate = dateObj.toLocaleDateString(undefined,dateOptions);

  return (
    <div className="my-4 border-b border-b-300 py-8">
      <div className="mb-2">Posted by : <span className="font-bold font-orange-400">{author}</span> on {formatedDate} </div>
      {/* resim divi */}
      <div className="w-full h-72 relative">
        {thumbnail ? (<Image src={thumbnail} alt="deneme" fill
          className="object-cover rounded-md object-center" />) : (<Image src={"/1920x1080.jpg"} alt="deneme" fill
            className="object-cover rounded-md object-center" />)}
      </div>
      {category && (<Link className="bg-slate-800 w-fit text-orange-100 px-2 py-0.5 rounded-md my-2 block" href={`/categories/${category}`}>{category}</Link>)}
      <h2>{title}</h2>
      <p className="content" >{content}</p>

      {links && (
        <div className="my-4 flex flex-col gap-3" >
          {links.map((link, i) => (
            <div key={i} className="flex gap-2 items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
                </svg>
              <Link className="link" href={link}>{link}</Link>
            </div>))}
        </div>
      )}

      {isEditable && (
        <div className="flex gap-3 font-bold py-2 px-4 rounded-md bg-slate-200 w-fit">
          <Link href={`/edit-post/${id}`}>Edit</Link>
          <DeleteButton id={id} />
        </div>

      )}

    </div>
  );
}
