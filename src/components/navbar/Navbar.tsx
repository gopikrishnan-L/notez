import { Button } from "@/components/ui/button";
import { Session } from "next-auth";
import { signIn } from "@/lib/auth";
import UserControl from "./UserControl";

export default function Navbar({ session }: { session: Session | null }) {
  return (
    <nav className="sticky top-0 left-0  h-fit w-4/5 mx-auto z-1 bg-black text-white backdrop-blur-lg border-b-[1px] flex justify-between items-center py-2 px-4 rounded-b-lg">
      <h1 className="text-3xl font-bold">Notez</h1>
      <section className="flex gap-6 items-center">
        {session && !session.error ? (
          <>
            <UserControl picture={session.user?.image!} />
          </>
        ) : (
          <form
            action={async () => {
              "use server";
              await signIn("google");
            }}
          >
            <Button type="submit" variant="secondary" size="sm">
              Google
            </Button>
          </form>
        )}
      </section>
    </nav>
  );
}
