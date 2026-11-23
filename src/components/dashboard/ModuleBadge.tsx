"use client";

import React from "react";
import { MODULE_BADGES, type ModuleBadgeData } from "@/src/services/moduleBadges";
import { MaterialIcon } from "./MaterialIcon";

interface ModuleBadgeProps {
  moduleId: string;
  isUnlocked: boolean;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  onClick?: () => void;
  className?: string;
}

export function ModuleBadge({
  moduleId,
  isUnlocked,
  size = "md",
  showLabel = false,
  onClick,
  className = "",
}: ModuleBadgeProps) {
  const badgeData = MODULE_BADGES[moduleId];

  if (!badgeData) return null;

  const sizeClasses = {
    sm: "w-10 h-10 text-xs",
    md: "w-16 h-16 text-sm",
    lg: "w-24 h-24 text-base",
  }[size];

  const iconSizes = {
    sm: 20,
    md: 32,
    lg: 48,
  }[size];

  return (
    <div
      onClick={onClick}
      className={`group relative flex flex-col items-center text-center ${
        onClick ? "cursor-pointer" : ""
      } ${className}`}
    >
      {/* Contenedor del Emblema / Medalla */}
      <div
        className={`relative flex items-center justify-center rounded-2xl transition-all duration-300 ${sizeClasses} ${
          isUnlocked
            ? "bg-white shadow-[0_4px_20px_rgba(0,0,0,0.08)] border-2 hover:scale-105"
            : "bg-neutral-100/90 border border-neutral-200 opacity-60 grayscale hover:grayscale-0 hover:opacity-80"
        }`}
        style={{
          borderColor: isUnlocked ? badgeData.accentColor : undefined,
          boxShadow: isUnlocked
            ? `0 6px 20px ${badgeData.glowColor}`
            : undefined,
        }}
      >
        {/* Render del Logo oficial SVG */}
        <div className="flex items-center justify-center">
          {renderTechnologyLogo(badgeData.slug, iconSizes, isUnlocked)}
        </div>

        {/* Candado si está bloqueada */}
        {!isUnlocked && (
          <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-neutral-900/30 backdrop-blur-[1px]">
            <MaterialIcon
              name="lock"
              size={size === "sm" ? 14 : size === "md" ? 18 : 24}
              className="text-white drop-shadow"
            />
          </div>
        )}

        {/* Indicador de insignia desbloqueada */}
        {isUnlocked && (
          <div
            className="absolute -top-1 -right-1 flex h-4 w-4 sm:h-5 sm:w-5 items-center justify-center rounded-full bg-emerald-500 text-white shadow-sm ring-2 ring-white"
            title="Insignia obtenida"
          >
            <MaterialIcon name="check" size={12} />
          </div>
        )}
      </div>

      {/* Etiqueta opcional */}
      {showLabel && (
        <div className="mt-2 flex flex-col items-center">
          <span
            className={`font-bold transition-colors ${
              size === "sm"
                ? "text-[11px]"
                : size === "md"
                ? "text-xs"
                : "text-sm"
            } ${
              isUnlocked ? "text-neutral-900 group-hover:text-orange-600" : "text-neutral-500"
            }`}
          >
            {badgeData.technology}
          </span>
          <span className="text-[10px] text-neutral-400">
            {isUnlocked ? "Obtenida" : "Bloqueada"}
          </span>
        </div>
      )}
    </div>
  );
}

function renderTechnologyLogo(slug: string, size: number, isUnlocked: boolean) {
  switch (slug) {
    case "github":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill={isUnlocked ? "#24292F" : "#71717A"}
          className="transition-colors"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
          />
        </svg>
      );

    case "react-nextjs":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke={isUnlocked ? "#0284C7" : "#71717A"}
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <ellipse cx="12" cy="12" rx="10" ry="4.5" />
          <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(60 12 12)" />
          <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(120 12 12)" />
          <circle cx="12" cy="12" r="1.5" fill={isUnlocked ? "#0284C7" : "#71717A"} />
        </svg>
      );

    case "nodejs-express":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke={isUnlocked ? "#16A34A" : "#71717A"}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 2L3 7v10l9 5 9-5V7l-9-5z" />
          <path d="M12 12l9-5" />
          <path d="M12 12v10" />
          <path d="M12 12L3 7" />
        </svg>
      );

    case "supabase-firebase":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill={isUnlocked ? "#059669" : "#71717A"}
        >
          <path d="M21.362 9.354H12V.396a.396.396 0 0 0-.716-.233L2.203 12.424a.792.792 0 0 0 .616 1.282H12v9.898a.396.396 0 0 0 .716.233l9.262-13.203a.792.792 0 0 0-.616-1.28z" />
        </svg>
      );

    case "notion":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill={isUnlocked ? "#1F2937" : "#71717A"}
        >
          <path d="M4.459 4.208c.746.606 1.026.56 2.428.466l11.43-.84c1.12-.093 1.353-.466 1.353-1.12 0-.28-.093-.653-.326-.84-.233-.186-.653-.28-1.074-.233L5.485 2.528c-.84.093-1.026.513-1.026 1.12 0 .187 0 .373 0 .56zm.793 4.293v11.85c0 .933.467 1.307 1.493 1.213l12.41-.933c1.027-.093 1.354-.653 1.354-1.587V7.218c0-.793-.373-1.167-1.26-1.12l-12.737.933c-.84.094-1.26.56-1.26 1.47zm11.337.887c.093.513.093 1.073.093 1.633v6.392c0 .7-.373.98-1.027 1.027-.653.047-.933-.14-1.166-.653l-4.153-6.579v6.112c.28.187.653.373.653.84 0 .373-.28.56-.84.607l-2.613.186c-.373.047-.653-.186-.653-.56 0-.373.28-.653.7-.746.513-.093.653-.327.653-.98V10.28c0-.7-.373-.933-1.027-.933-.28 0-.466-.093-.466-.373 0-.327.327-.513.793-.56l3.36-.233c.7-.047 1.073.186 1.4.7l3.873 6.065V9.953c-.327-.233-.747-.373-.747-.84 0-.327.28-.513.747-.56l2.333-.186c.467 0 .747.28.747.607 0 .093 0 .186-.047.373z" />
        </svg>
      );

    case "make":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke={isUnlocked ? "#7C3AED" : "#71717A"}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="6" cy="6" r="3" />
          <circle cx="18" cy="6" r="3" />
          <circle cx="12" cy="18" r="3" />
          <line x1="8.5" y1="7.5" x2="10.5" y2="15.5" />
          <line x1="15.5" y1="7.5" x2="13.5" y2="15.5" />
          <line x1="9" y1="6" x2="15" y2="6" />
        </svg>
      );

    case "n8n":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke={isUnlocked ? "#EA580C" : "#71717A"}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="2" y="7" width="6" height="6" rx="1.5" />
          <rect x="16" y="3" width="6" height="6" rx="1.5" />
          <rect x="16" y="15" width="6" height="6" rx="1.5" />
          <path d="M8 10h4a2 2 0 0 0 2-2V6h2" />
          <path d="M12 10v6a2 2 0 0 0 2 2h2" />
        </svg>
      );

    case "ia-gemini-studio":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill={isUnlocked ? "#D97706" : "#71717A"}
        >
          <path d="M12 0C12 6.627 6.627 12 0 12c6.627 0 12 5.373 12 12 0-6.627 5.373-12 12-12-6.627 0-12-5.373-12-12z" />
        </svg>
      );

    default:
      return (
        <MaterialIcon
          name="workspace_premium"
          size={size}
          className={isUnlocked ? "text-orange-500" : "text-neutral-400"}
          filled={isUnlocked}
        />
      );
  }
}
