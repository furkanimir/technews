import { categoriesData } from "@/data"
//01:04:45
export default function CreatePostForm() {
    return (
        <div>
            <h2>Create Post</h2>
            <form className="flex flex-col gap-2">
                <input type="text" placeholder="Title" />
                <textarea placeholder="Content"></textarea>
                <div className="flex gap-2">
                    <input className="flex-1" type="text" placeholder="Pasta for   links or opposites" />
                    <button className="btn flex gap-2 items-center">
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                        </span>
                        Add
                    </button>
                </div>

                <select className="p-3 rounded-md border appearance-none">
                    <option value="">Select a category</option>
                    {categoriesData &&
                        categoriesData.map(category => (
                            <option key={category.id} value={category.name}>{category.name}</option>
                        ))}
                </select>

                <button className="primary-btn" type="submit">Create Post</button>
                <div className="p-2 text-red-500 font-bold">Error Message xd</div>
            </form>
        </div>
    )
}
