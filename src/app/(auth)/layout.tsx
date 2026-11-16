import Image from "next/image";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      <div className="min-h-screen w-full grid grid-cols-1 md:grid-cols-2 items-center justify-center gap-8">
        {/* Imagen */}
        <div className="hidden md:block">
          <Image
            src="/logo.svg"
            alt="Logo Deinsa Global"
            width={300}
            height={300}
            className="mx-auto"
            priority
          />
        </div>

        {/* Vistas correspondientes Login, Register, Reset Password */}
        <div className="px-4">{children}</div>
      </div>
    </div>
  );
}
