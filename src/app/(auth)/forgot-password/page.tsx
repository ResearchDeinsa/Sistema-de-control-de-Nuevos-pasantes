"use client";

import Link from "next/link";
import Image from "next/image";
import { FormEvent, useState } from "react";
import { resetPasswordWithFirebase } from "@/src/lib/firebase/authService";
import { forgotPassword as supabaseForgotPassword } from "@/src/actions/auth";
import { MaterialIcon } from "@/src/components/dashboard/MaterialIcon";

export default function ForgotPasswordPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [emailInput, setEmailInput] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    const email = emailInput.trim();

    try {
      // 1. Firebase Auth reset
      const fbResult = await resetPasswordWithFirebase(email);
      if (fbResult.success) {
        setMessage(fbResult.message);
        return;
      }

      // 2. Supabase fallback
      const sbResult = await supabaseForgotPassword(email);
      if (sbResult.suscess) {
        setMessage(sbResult.message);
        return;
      }

      setError(fbResult.message || sbResult.message || "No fue posible enviar las instrucciones.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Algo salió mal");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative overflow-hidden rounded-3xl border border-[#EAE5DB] bg-[#FAF7F2] p-7 sm:p-9 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)]">
      {/* Línea de resplandor luminosa superior en naranja Delphos */}
      <div className="pointer-events-none absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[#F05A28] to-transparent opacity-90" />

      {/* Cabecera del formulario */}
      <div className="text-center sm:text-left">
        <div className="flex lg:hidden justify-center mb-5">
          <Image
            src="/deinsa logo.svg"
            alt="Deinsa Global"
            width={140}
            height={50}
            className="h-8 w-auto object-contain"
            priority
          />
        </div>

        <div className="inline-flex items-center gap-1.5 rounded-full border border-[#F05A28]/30 bg-[#F05A28]/10 px-3 py-1 text-[11px] font-bold text-[#F05A28] mb-3">
          <MaterialIcon name="vpn_key" size={13} className="text-[#F05A28]" />
          <span>SEGURIDAD Y CREDENCIALES · DEINSA GLOBAL</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#121316] tracking-tight">
          Recuperar Contraseña
        </h2>
        <p className="mt-1.5 text-xs sm:text-sm text-[#6C707A] leading-relaxed">
          Ingresa tu correo institucional y te enviaremos un enlace seguro para restablecer el acceso a tu cuenta.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        {/* Campo Correo */}
        <div>
          <label
            htmlFor="email"
            className="block text-xs font-bold uppercase tracking-wider text-[#121316] mb-1.5"
          >
            Correo Electrónico
          </label>
          <div className="relative">
            <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400">
              <MaterialIcon name="mail" size={18} />
            </span>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              autoComplete="email"
              placeholder="pasante@deinsaglobal.com"
              className="w-full rounded-2xl border border-[#E5DFD5] bg-white py-2.5 pl-10 pr-4 text-sm text-[#121316] placeholder:text-neutral-400 outline-none transition-all duration-200 focus:border-[#F05A28] focus:ring-4 focus:ring-[#F05A28]/15 shadow-2xs"
            />
          </div>
        </div>

        {error && (
          <div className="flex items-start gap-2.5 rounded-2xl border border-red-200 bg-red-50 p-3.5 text-xs font-semibold text-red-700">
            <MaterialIcon name="error" size={16} className="text-red-600 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {message && (
          <div className="flex items-start gap-2.5 rounded-2xl border border-emerald-200 bg-emerald-50 p-3.5 text-xs font-semibold text-emerald-800">
            <MaterialIcon name="check_circle" size={16} className="text-emerald-600 shrink-0 mt-0.5" filled />
            <span>{message}</span>
          </div>
        )}

        {/* Botón Submit en Terracota Naranja (#F05A28) */}
        <button
          type="submit"
          disabled={loading}
          className="group relative flex w-full items-center justify-center gap-2 rounded-2xl bg-[#F05A28] py-3.5 px-4 text-sm font-bold text-white shadow-lg shadow-[#F05A28]/25 transition-all duration-200 hover:bg-[#E04D1B] hover:shadow-[#F05A28]/40 focus:outline-none focus:ring-4 focus:ring-[#F05A28]/30 disabled:opacity-50 cursor-pointer"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              <span>Enviando enlace seguro...</span>
            </span>
          ) : (
            <>
              <span>Enviar Instrucciones de Recuperación</span>
              <MaterialIcon name="arrow_forward" size={16} />
            </>
          )}
        </button>

        {/* Enlace volver a Login */}
        <div className="pt-2 text-center">
          <p className="text-xs text-[#6C707A]">
            ¿Recordaste tu contraseña?{" "}
            <Link
              href="/login"
              className="font-bold text-[#F05A28] hover:text-[#E04D1B] transition-colors"
            >
              Volver a iniciar sesión
            </Link>
          </p>
        </div>

        {/* Garantía */}
        <div className="flex items-center justify-center gap-1.5 pt-2 text-[11px] text-[#6C707A]">
          <MaterialIcon name="shield" size={13} className="text-emerald-600" />
          <span>Datos protegidos bajo políticas de seguridad de Deinsa Global</span>
        </div>
      </form>
    </div>
  );
}
