import { redirect } from "next/navigation";

export default function Home() {
  // Redirige automáticamente al usuario a la ruta /login
  redirect("/login");
}