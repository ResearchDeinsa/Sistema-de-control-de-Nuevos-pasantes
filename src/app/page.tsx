import { redirect } from "next/navigation";

export default function Home() {
  // Redirecciono a pagina login
  redirect("/login");
}
