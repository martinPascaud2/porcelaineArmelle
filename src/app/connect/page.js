import { LoginForm } from "./LoginForm";
import { cookies } from "next/headers";

import { redirect } from "next/navigation";

export default async function Page(params) {
  const cookiesStore = cookies();
  const token = cookiesStore.get("token")?.value;

  if (!token) {
    return (
      <main>
        <LoginForm />
      </main>
    );
  }

  if (params.searchParams.page) redirect(`/${params.searchParams.page}`);
  else redirect("/");
}
