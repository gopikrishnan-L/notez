import { getBlogById } from "@/db/blogs";
import { getUserAsCreator } from "@/db/users";

export default async function Blog({ params }: { params: { id: string } }) {
  const blog = await getBlogById(params.id);
  let creator;
  if (blog) {
    creator = await getUserAsCreator(blog?.creatorId);
  }

  return (
    <div className="max-w-[60rem] mx-auto max-xl:max-w-[60rem] max-lg:max-w-[40rem]">
      <div className="w-full h-full flex flex-col">
        <h2 className="text-4xl font-bold">{blog?.title}</h2>
        <h3 className="text-2xl mt-4 font-light">{blog?.description}</h3>
        <section className="flex mt-8 gap-2 pt-2 items-center w-fit">
          <div className="w-10 aspect-square rounded-full overflow-hidden bg-gray-700">
            <img src={creator?.image!} alt={creator?.name!} />
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-sm">{creator?.name}</span>
            <span className="ml-auto text-xs opacity-75">
              {blog?.createdAt.toLocaleString("default", { month: "long" }) +
                " " +
                blog?.createdAt.getDate() +
                ", " +
                blog?.createdAt.getFullYear()}
            </span>
          </div>
        </section>
        <article className="text-pretty text-lg w-full mt-8 mx-auto">
          {blog?.content}
        </article>
      </div>
    </div>
  );
}
