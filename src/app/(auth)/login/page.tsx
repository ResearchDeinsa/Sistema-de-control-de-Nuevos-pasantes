"use client";

import Link from "next/link";
import Image from "next/image";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { loginWithFirebase, loginWithGoogle } from "@/src/lib/firebase/authService";
import { login as supabaseLogin } from "@/src/actions/auth";
import { MaterialIcon } from "@/src/components/dashboard/MaterialIcon";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const email = emailInput.trim();
    const password = passwordInput;

    try {
      // 1. Autenticar con Firebase (reconoce cuenta secreta ingenieros2026@gmail.com con admin12345)
      const fbResult = await loginWithFirebase(email, password);

      if (fbResult.success) {
        router.push("/dashboard");
        router.refresh();
        return;
      }

      // 2. Fallback con Supabase
      const sbResult = await supabaseLogin({ email, password });
      if (sbResult.suscess) {
        router.push("/dashboard");
        router.refresh();
        return;
      }

      setError(fbResult.message || sbResult.message || "Credenciales no válidas.");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Error de comunicación con el servicio de autenticación."
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleLogin() {
    setGoogleLoading(true);
    setError(null);
    try {
      const result = await loginWithGoogle();
      if (result.success) {
        router.push("/dashboard");
        router.refresh();
        return;
      }
      setError(result.message);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "No fue posible autenticar con Google."
      );
    } finally {
      setGoogleLoading(false);
    }
  }

  return (
    <div className="relative overflow-hidden rounded-3xl border border-[#EAE5DB] bg-[#FAF7F2] p-7 sm:p-9 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)]">
      {/* Línea de resplandor luminosa superior en naranja Delphos */}
      <div className="pointer-events-none absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[#F05A28] to-transparent opacity-90" />

      {/* Cabecera del formulario inspirada exactamente en Delphos Screen 00 */}
      <div className="text-center sm:text-left">
        {/* Logotipo en móviles */}
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
          <MaterialIcon name="verified_user" size={13} className="text-[#F05A28]" />
          <span>ACCESO INSTITUCIONAL · DEINSA GLOBAL</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#121316] tracking-tight">
          Bienvenida de vuelta.
        </h2>
        <p className="mt-1.5 text-xs sm:text-sm text-[#6C707A] leading-relaxed">
          Ingresa tus credenciales institucionales para acceder a tus módulos de capacitación y proyectos activos.
        </p>
      </div>

      {/* Botón oficial de Google Auth estilo Delphos */}
      <div className="mt-6">
        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={googleLoading || loading}
          className="group relative flex w-full items-center justify-center gap-3 rounded-2xl border border-[#E5DFD5] bg-white px-4 py-3 text-sm font-bold text-[#121316] shadow-sm transition-all duration-200 hover:border-neutral-300 hover:bg-[#F5F0E8] hover:shadow focus:outline-none focus:ring-4 focus:ring-[#F05A28]/20 disabled:opacity-50 cursor-pointer"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" className="shrink-0">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          <span>{googleLoading ? "Conectando con Google..." : "Google institucional"}</span>
        </button>
      </div>

      {/* Separador elegante */}
      <div className="relative my-6 flex items-center justify-center">
        <div className="w-full border-t border-[#EAE5DB]" />
        <span className="absolute bg-[#FAF7F2] px-3 text-[11px] font-bold uppercase tracking-wider text-[#6C707A]">
          o con correo y contraseña
        </span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
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

        {/* Campo Contraseña */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label
              htmlFor="password"
              className="block text-xs font-bold uppercase tracking-wider text-[#121316]"
            >
              Contraseña
            </label>
            <Link
              href="/forgot-password"
              className="text-xs font-semibold text-[#F05A28] hover:text-[#E04D1B] transition-colors"
            >
              ¿Olvidaste tu contraseña?
            </Link>
          </div>
          <div className="relative">
            <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400">
              <MaterialIcon name="lock" size={18} />
            </span>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              required
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              autoComplete="current-password"
              placeholder="••••••••"
              className="w-full rounded-2xl border border-[#E5DFD5] bg-white py-2.5 pl-10 pr-11 text-sm text-[#121316] placeholder:text-neutral-400 outline-none transition-all duration-200 focus:border-[#F05A28] focus:ring-4 focus:ring-[#F05A28]/15 shadow-2xs"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 transition-colors p-1 cursor-pointer rounded-lg hover:bg-neutral-100"
              title={showPassword ? "Ocultar contraseña" : "Ver contraseña"}
              aria-label={showPassword ? "Ocultar contraseña" : "Ver contraseña"}
            >
              <MaterialIcon
                name={showPassword ? "visibility_off" : "visibility"}
                size={20}
              />
            </button>
          </div>
        </div>

        {error && (
          <div className="flex items-start gap-2.5 rounded-2xl border border-red-200 bg-red-50 p-3.5 text-xs font-semibold text-red-700">
            <MaterialIcon name="error" size={16} className="text-red-600 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Botón Submit en Terracota Naranja (#F05A28) */}
        <button
          type="submit"
          disabled={loading || googleLoading}
          className="group relative flex w-full items-center justify-center gap-2 rounded-2xl bg-[#F05A28] py-3.5 px-4 text-sm font-bold text-white shadow-lg shadow-[#F05A28]/25 transition-all duration-200 hover:bg-[#E04D1B] hover:shadow-[#F05A28]/40 focus:outline-none focus:ring-4 focus:ring-[#F05A28]/30 disabled:opacity-50 cursor-pointer"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              <span>Verificando credenciales...</span>
            </span>
          ) : (
            <>
              <span>Entrar a mi misión</span>
              <MaterialIcon name="arrow_forward" size={16} />
            </>
          )}
        </button>

        {/* Enlace para Registro */}
        <div className="pt-2 text-center">
          <p className="text-xs text-[#6C707A]">
            ¿Eres un nuevo integrante?{" "}
            <Link
              href="/register"
              className="font-bold text-[#F05A28] hover:text-[#E04D1B] transition-colors"
            >
              Crear cuenta
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
