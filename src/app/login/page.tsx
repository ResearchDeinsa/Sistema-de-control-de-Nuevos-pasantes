import Link from "next/link";
import Image from "next/image";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4 py-12">
      
      {/* Encabezado y Logo */}
      <div className="flex flex-col items-center mb-8">
        <div className="mb-4 flex w-48 items-center justify-center rounded-xl bg-white p-3 shadow-sm">
          <Image
            src="/deinsa%20logo.svg"
            alt="Deinsa Global"
            width={650}
            height={255}
            className="h-auto w-full object-contain"
            priority
          />
        </div>
        <h1 className="text-xl font-semibold text-foreground">R&D Onboarding</h1>
        <p className="text-sm text-text-secondary mt-1">Leadership Acceleration Program</p>
      </div>

      {/* Tarjeta del Formulario */}
      <div className="w-full max-w-[420px] p-8 border border-border rounded-2xl bg-surface shadow-xl">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-foreground mb-1.5">Iniciar sesión</h2>
          <p className="text-sm text-text-secondary">Ingresa con tu cuenta de Deinsa Global</p>
        </div>

        <form className="space-y-5">
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-text-support">
              Correo electrónico
            </label>
            <input 
              type="email" 
              id="email"
              placeholder="nombre@deinsaglobal.com" 
              className="w-full px-4 py-2.5 bg-background border border-border rounded-lg text-foreground placeholder:text-text-secondary focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-text-support">
              Contraseña
            </label>
            <input 
              type="password" 
              id="password"
              placeholder="••••••••" 
              className="w-full px-4 py-2.5 bg-background border border-border rounded-lg text-foreground placeholder:text-text-secondary focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors"
            />
          </div>

          <div className="flex justify-end">
            <Link href="#" className="text-sm text-orange-500 hover:text-orange-400 transition-colors">
              ¿Olvidaste tu contraseña?
            </Link>
          </div>

          <button 
            type="button" 
            className="w-full bg-orange-500 text-white py-2.5 rounded-lg font-medium hover:bg-orange-600 transition-colors mt-2"
          >
            Entrar
          </button>
        </form>
      </div>

      {/* Enlace de soporte en el Footer */}
      <div className="mt-8">
        <p className="text-sm text-text-secondary">
          ¿Problemas para entrar?{" "}
          <Link href="#" className="text-text-support hover:text-foreground underline decoration-border underline-offset-4 transition-colors">
            Contacta a tu mentor
          </Link>
        </p>
      </div>
      
    </main>
  );
}