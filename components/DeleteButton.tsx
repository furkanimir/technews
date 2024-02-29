"use client";

export default function DeleteButton({id}:{id:string}) {

  const deleteImage = async (publicId:string) =>{
    const res = await fetch(`/api/removeImage`,{
      method:"POST",
      headers:{"Content-Type": "application/json"},
      body: JSON.stringify({publicId})
    })
  }

  const handleDelete = async () =>{
    const confirm = window.confirm("Are you sure ?");

    if(confirm){
      try {
        const res = await fetch(`/api/posts/${id}`,{
          method:"DELETE",
          headers:{
            "Content-type":"application/json",
          },
        });
        if (res.ok) {
          const post = await res.json();
          const {publicId} = post;
          await deleteImage(publicId);
          console.log("Post deleted");
          // window.location.reload();
        }
      } catch (error) {
        console.log(error);
        return null;
      }
    }
  }

  return <button onClick={handleDelete}
   className="text-red-600">
    Delete
  </button>
  
}
