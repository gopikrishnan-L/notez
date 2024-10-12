import { Button } from "@/components/ui/button";
import { Session } from "next-auth";
import { signIn } from "@/lib/auth";
import UserControl from "./UserControl";
import NavLinks from "./NavLinks";

export default function Navbar({ session }: { session: Session | null }) {
  return (
    <nav className="sticky top-0 left-0 bg-white h-fit w-[8] mx-auto z-50 backdrop-blur-lg flex justify-between items-center py-2 rounded-b-lg">
      <h1 className="text-3xl font-bold">Notez</h1>
      {/* {JSON.stringify(session)} */}
      <NavLinks />
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
