"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { signup } from "@/src/actions/auth";
import { redirect, useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    const formData = new FormData(e.currentTarget);
    const name = String(formData.get("name"));
    const email = String(formData.get("email"));
    const password = String(formData.get("password"));

    try {
      const res = await signup({ name, email, password });

      if (!res.success) {
        setError(res.message);
        return;
      }

      setMessage(res.message);

      router.push("/login");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Algo salió mal");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid mx-auto w-full max-w-md rounded-r-2xl border border-gray-300 bg-gray-100 p-6 shadow-sm">
      {/* Título */}
      <div className="mb-4 text-center">
        <div className="flex items-center justify-center gap-2">
          <p className="text-2xl font-semibold text-gray-600">
            Sistema de Onboarding
          </p>
          <p className="text-2xl font-semibold text-orange-400">
            Deinsa Global
          </p>
        </div>
        <p className="mt-2 text-sm text-gray-500">
          Crea tu cuenta para comenzar
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        Nombre
        <div className="mt-4">
          <label
            htmlFor="name"
            className="block mb-1.5 text-sm font-medium text-gray-500"
          >
            Nombre completo
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            autoComplete="name"
            placeholder="Tu nombre"
            className="w-full px-4 py-2.5 rounded-lg border border-gray-400 bg-transparent text-gray-900 placeholder:text-gray-400 outline-none transition-all duration-200 focus:border-orange-500 focus:bg-orange-50/30 focus:ring-2 focus:ring-orange-200/50"
          />
        </div>
        {/* Correo */}
        <div className="mt-4">
          <label
            htmlFor="email"
            className="block mb-1.5 text-sm font-medium text-gray-500"
          >
            Correo electrónico
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            autoComplete="email"
            placeholder="tu@ejemplo.com"
            className="w-full px-4 py-2.5 rounded-lg border border-gray-400 bg-transparent text-gray-900 placeholder:text-gray-400 outline-none transition-all duration-200 focus:border-orange-500 focus:bg-orange-50/30 focus:ring-2 focus:ring-orange-200/50"
          />
        </div>
        {/* Contraseña */}
        <div className="mt-4">
          <label
            htmlFor="password"
            className="block mb-1.5 text-sm font-medium text-gray-500"
          >
            Contraseña
          </label>
          <input
            type="password"
            id="password"
            name="password"
            required
            autoComplete="new-password"
            placeholder="••••••••"
            className="w-full px-4 py-2.5 rounded-lg border border-gray-400 bg-transparent text-gray-900 placeholder:text-gray-400 outline-none transition-all duration-200 focus:border-orange-500 focus:bg-orange-50/30 focus:ring-2 focus:ring-orange-200/50"
          />
        </div>
        {error && (
          <p className="mt-4 text-center text-sm text-red-600">{error}</p>
        )}
        {message && (
          <p className="mt-4 text-center text-sm text-green-600">{message}</p>
        )}
        {/* Botón */}
        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full rounded-lg bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-200/50 disabled:opacity-50"
        >
          {loading ? "Cargando..." : "Registrarme"}
        </button>
        {/* Enlaces */}
        <div className="mt-4 flex items-center justify-center">
          <p className="text-gray-400 font-bold text-sm">
            ¿Ya tienes una cuenta?{" "}
            <Link href="/login" className="text-orange-400 font-bold text-sm">
              Iniciar sesión
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
