"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { forgotPassword } from "@/src/actions/auth";

export default function ForgotPasswordPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    const formData = new FormData(e.currentTarget);
    const email = String(formData.get("email"));

    try {
      const result = await forgotPassword(email);

      if (!result.suscess) {
        //checar esto muy bien
        setError(result.message);
        return;
      }

      setMessage(result.message);
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
          Te enviaremos un enlace a tu correo para restablecerla
        </p>
      </div>

      <form onSubmit={handleSubmit}>
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
          {loading ? "Cargando..." : "Enviar enlace"}
        </button>

        {/* Enlaces */}
        <div className="mt-4 flex items-center justify-center">
          <p className="text-gray-400 font-bold text-sm">
            ¿Ya la recordaste?{" "}
            <Link href="/login" className="text-orange-400 font-bold text-sm">
              Volver al login
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
