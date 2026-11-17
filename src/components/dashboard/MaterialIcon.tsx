"use client";

import React from "react";

interface MaterialIconProps {
  name: string;
  className?: string;
  filled?: boolean;
  size?: number;
  ariaHidden?: boolean;
}

/**
 * Crisp 24x24 geometric Material-style vector icons (zero emojis, zero font-load flicker).
 */
export function MaterialIcon({
  name,
  className = "",
  filled = false,
  size = 20,
  ariaHidden = true,
}: MaterialIconProps) {
  const strokeWidth = filled ? 2.1 : 1.9;

  const renderGlyph = (): React.ReactNode => {
    switch (name) {
      case "space_dashboard":
        return (
          <>
            <rect x="3" y="3" width="8" height="10" rx="2" fill={filled ? "currentColor" : "none"} />
            <rect x="13" y="3" width="8" height="6" rx="2" fill={filled ? "currentColor" : "none"} />
            <rect x="13" y="11" width="8" height="10" rx="2" fill={filled ? "currentColor" : "none"} />
            <rect x="3" y="15" width="8" height="6" rx="2" fill={filled ? "currentColor" : "none"} />
          </>
        );
      case "menu_book":
        return (
          <>
            <path d="M2 5.5A2.5 2.5 0 0 1 4.5 3H11a3 3 0 0 1 3 3v14a2.5 2.5 0 0 0-2.5-2.5H4.5A2.5 2.5 0 0 1 2 15V5.5Z" />
            <path d="M22 5.5A2.5 2.5 0 0 0 19.5 3H14a3 3 0 0 0-3 3v14a2.5 2.5 0 0 1 2.5-2.5h6A2.5 2.5 0 0 0 22 15V5.5Z" />
          </>
        );
      case "workspace_premium":
        return (
          <>
            <circle cx="12" cy="9" r="5.5" fill={filled ? "currentColor" : "none"} fillOpacity={filled ? 0.16 : 0} />
            <path d="M9.5 9.2 11.2 11 14.8 7.4" />
            <path d="M8.5 14 7 21l5-2.5L17 21l-1.5-7" />
          </>
        );
      case "person":
        return (
          <>
            <circle cx="12" cy="8" r="4" fill={filled ? "currentColor" : "none"} fillOpacity={filled ? 0.18 : 0} />
            <path d="M4.5 20a7.5 7.5 0 0 1 15 0" />
          </>
        );
      case "logout":
        return (
          <>
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <path d="M16 17l5-5-5-5" />
            <path d="M21 12H9" />
          </>
        );
      case "menu":
        return (
          <>
            <path d="M4 7h16" />
            <path d="M4 12h16" />
            <path d="M4 17h16" />
          </>
        );
      case "close":
        return (
          <>
            <path d="M6 6l12 12" />
            <path d="M18 6 6 18" />
          </>
        );
      case "search":
        return (
          <>
            <circle cx="11" cy="11" r="6.5" />
            <path d="m20 20-4.2-4.2" />
          </>
        );
      case "search_off":
      case "filter_list_off":
        return (
          <>
            <circle cx="11" cy="11" r="6.5" />
            <path d="m20 20-4.2-4.2" />
            <path d="M8.5 8.5l5 5" />
            <path d="M13.5 8.5l-5 5" />
          </>
        );
      case "bolt":
        return (
          <path
            d="M13 2 4.5 13.5H11L10 22l9.5-11.5H13L13 2Z"
            fill={filled ? "currentColor" : "none"}
            fillOpacity={filled ? 0.2 : 0}
          />
        );
      case "school":
        return (
          <>
            <path d="M2.5 9.5 12 4.5l9.5 5L12 14.5l-9.5-5Z" />
            <path d="M6 11.5V16c0 1.8 2.7 3.2 6 3.2s6-1.4 6-3.2v-4.5" />
            <path d="M21.5 9.5v5.5" />
          </>
        );
      case "schedule":
        return (
          <>
            <circle cx="12" cy="12" r="9" />
            <path d="M12 7.5V12l3 2" />
          </>
        );
      case "arrow_forward":
        return (
          <>
            <path d="M5 12h14" />
            <path d="m13 6 6 6-6 6" />
          </>
        );
      case "arrow_back":
        return (
          <>
            <path d="M19 12H5" />
            <path d="m11 6-6 6 6 6" />
          </>
        );
      case "arrow_right":
        return <path d="m9 6 6 6-6 6" />;
      case "flag":
        return (
          <>
            <path d="M5 21V4" />
            <path
              d="M5 5h11l-1.8 4L16 13H5"
              fill={filled ? "currentColor" : "none"}
              fillOpacity={filled ? 0.2 : 0}
            />
          </>
        );
      case "lock":
        return (
          <>
            <rect
              x="5"
              y="11"
              width="14"
              height="9.5"
              rx="2.5"
              fill={filled ? "currentColor" : "none"}
              fillOpacity={filled ? 0.16 : 0}
            />
            <path d="M8 11V7.8a4 4 0 0 1 8 0V11" />
            <circle cx="12" cy="15.8" r="1.1" fill="currentColor" stroke="none" />
          </>
        );
      case "lock_open":
        return (
          <>
            <rect
              x="5"
              y="11"
              width="14"
              height="9.5"
              rx="2.5"
              fill={filled ? "currentColor" : "none"}
              fillOpacity={filled ? 0.16 : 0}
            />
            <path d="M8 11V7.8a4 4 0 0 1 7.6-1.7" />
            <circle cx="12" cy="15.8" r="1.1" fill="currentColor" stroke="none" />
          </>
        );
      case "check":
        return <path d="M5 12.5 9.5 17 19 7.5" />;
      case "check_circle":
        return (
          <>
            <circle
              cx="12"
              cy="12"
              r="9"
              fill={filled ? "currentColor" : "none"}
              fillOpacity={filled ? 0.16 : 0}
            />
            <path d="m8.5 12.3 2.3 2.3 4.8-5" />
          </>
        );
      case "radio_button_unchecked":
        return <circle cx="12" cy="12" r="8.5" />;
      case "play_circle":
        return (
          <>
            <circle cx="12" cy="12" r="9" />
            <path d="M10 8.8 15.6 12 10 15.2V8.8Z" fill="currentColor" stroke="none" />
          </>
        );
      case "play_arrow":
        return <path d="M8.5 6.5 17.5 12l-9 5.5V6.5Z" fill="currentColor" stroke="none" />;
      case "verified":
      case "verified_user":
        return (
          <>
            <path
              d="M12 3 4.5 6.2V12c0 4.6 3.2 8.2 7.5 9.5 4.3-1.3 7.5-4.9 7.5-9.5V6.2L12 3Z"
              fill={filled ? "currentColor" : "none"}
              fillOpacity={filled ? 0.16 : 0}
            />
            <path d="m9 12.2 2 2 4.3-4.5" />
          </>
        );
      case "hourglass_top":
        return (
          <>
            <path d="M6.5 3h11" />
            <path d="M6.5 21h11" />
            <path d="M7.5 3v4.2a4.5 4.5 0 0 0 2.3 3.9l2.2 1.2 2.2-1.2a4.5 4.5 0 0 0 2.3-3.9V3" />
            <path d="M7.5 21v-4.2a4.5 4.5 0 0 1 2.3-3.9l2.2-1.2 2.2 1.2a4.5 4.5 0 0 1 2.3 3.9V21" />
          </>
        );
      case "edit":
        return (
          <>
            <path d="M4 20h4.5L19.2 9.3a2.1 2.1 0 0 0 0-3l-1.5-1.5a2.1 2.1 0 0 0-3 0L4 15.5V20Z" />
            <path d="m13.5 6 4.5 4.5" />
          </>
        );
      case "content_copy":
        return (
          <>
            <rect x="9" y="9" width="11" height="11" rx="2" />
            <path d="M6 15H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v1" />
          </>
        );
      case "print":
        return (
          <>
            <path d="M7 9V4h10v5" />
            <rect x="4" y="9" width="16" height="8" rx="2" />
            <path d="M7 14h10v6H7v-6Z" fill="#ffffff" />
          </>
        );
      case "target":
        return (
          <>
            <circle cx="12" cy="12" r="8.5" />
            <circle cx="12" cy="12" r="4.5" />
            <circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none" />
          </>
        );
      case "checklist":
        return (
          <>
            <path d="M4 7.5 5.8 9.2 9 6" />
            <path d="M4 15.5 5.8 17.2 9 14" />
            <path d="M12 8h8" />
            <path d="M12 16h8" />
          </>
        );
      case "library_books":
        return (
          <>
            <rect x="7" y="3.5" width="13" height="15" rx="2" />
            <path d="M4 7.5v11a2 2 0 0 0 2 2h10" />
            <path d="M10.5 8.5h6" />
            <path d="M10.5 12h6" />
          </>
        );
      case "open_in_new":
        return (
          <>
            <path d="M14 4h6v6" />
            <path d="M10 14 20 4" />
            <path d="M19 13v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h5" />
          </>
        );
      case "code":
        return (
          <>
            <path d="m8.5 7-5 5 5 5" />
            <path d="m15.5 7 5 5-5 5" />
            <path d="m13.5 5-3 14" />
          </>
        );
      case "fact_check":
        return (
          <>
            <rect x="3" y="4.5" width="18" height="15" rx="2.5" />
            <path d="M6.5 9.5h4.5" />
            <path d="M6.5 14h4.5" />
            <path d="m13.5 12.2 1.8 1.8 3.2-3.6" />
          </>
        );
      case "badge":
        return (
          <>
            <rect x="3.5" y="5" width="17" height="14" rx="2.5" />
            <circle cx="9" cy="11" r="2" />
            <path d="M6.5 15.5a2.8 2.8 0 0 1 5 0" />
            <path d="M14 10h3.5" />
            <path d="M14 14h3.5" />
          </>
        );
      case "apartment":
        return (
          <>
            <path d="M4 20V6a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v14" />
            <path d="M15 10h3a2 2 0 0 1 2 2v8" />
            <path d="M2.5 20h19" />
            <path d="M8 8h2" />
            <path d="M8 12h2" />
            <path d="M8 16h2" />
          </>
        );
      case "manage_accounts":
        return (
          <>
            <circle cx="9.5" cy="8.5" r="3.5" />
            <path d="M3.5 19a6 6 0 0 1 12 0" />
            <circle cx="18" cy="15.5" r="2.2" />
            <path d="M18 11.8v1.2" />
            <path d="M18 18v1.2" />
            <path d="M14.3 15.5h1.2" />
            <path d="M20.5 15.5h1.2" />
          </>
        );
      case "save":
        return (
          <>
            <path d="M5 4h11l3 3v12a1.5 1.5 0 0 1-1.5 1.5h-12A1.5 1.5 0 0 1 4 19V5.5A1.5 1.5 0 0 1 5 4Z" />
            <path d="M8 4v5h7V4" />
            <rect x="7.5" y="13" width="9" height="6.5" rx="1" />
          </>
        );
      case "error":
        return (
          <>
            <circle cx="12" cy="12" r="9" />
            <path d="M12 8v5" />
            <circle cx="12" cy="16.2" r="0.9" fill="currentColor" stroke="none" />
          </>
        );
      case "account_tree":
        return (
          <>
            <circle cx="6.5" cy="6.5" r="2.5" />
            <circle cx="17.5" cy="6.5" r="2.5" />
            <circle cx="6.5" cy="17.5" r="2.5" />
            <path d="M6.5 9v6" />
            <path d="M17.5 9a5 5 0 0 1-5 5H9" />
          </>
        );
      case "web":
        return (
          <>
            <rect x="3" y="4.5" width="18" height="15" rx="2.5" />
            <path d="M3 9h18" />
            <path d="M9.5 9v10.5" />
          </>
        );
      case "dns":
        return (
          <>
            <rect x="3.5" y="4" width="17" height="6.5" rx="2" />
            <rect x="3.5" y="13.5" width="17" height="6.5" rx="2" />
            <circle cx="7.5" cy="7.2" r="1" fill="currentColor" stroke="none" />
            <circle cx="7.5" cy="16.8" r="1" fill="currentColor" stroke="none" />
          </>
        );
      case "database":
        return (
          <>
            <ellipse cx="12" cy="6.5" rx="7.5" ry="3" />
            <path d="M4.5 6.5v11c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3v-11" />
            <path d="M4.5 12c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3" />
          </>
        );
      case "description":
        return (
          <>
            <path d="M6 3.5h8l4 4v13a1.5 1.5 0 0 1-1.5 1.5h-10A1.5 1.5 0 0 1 5 20.5V5A1.5 1.5 0 0 1 6 3.5Z" />
            <path d="M14 3.5V8h4" />
            <path d="M8.5 12.5h7" />
            <path d="M8.5 16h5" />
          </>
        );
      case "hub":
        return (
          <>
            <circle cx="12" cy="12" r="2.8" />
            <circle cx="5.5" cy="6.5" r="2" />
            <circle cx="18.5" cy="6.5" r="2" />
            <circle cx="5.5" cy="17.5" r="2" />
            <circle cx="18.5" cy="17.5" r="2" />
            <path d="m7.2 7.8 2.6 2.2" />
            <path d="m16.8 7.8-2.6 2.2" />
            <path d="m7.2 16.2 2.6-2.2" />
            <path d="m16.8 16.2-2.6-2.2" />
          </>
        );
      case "workflow":
        return (
          <>
            <rect x="3" y="4" width="6.5" height="5.5" rx="1.5" />
            <rect x="14.5" y="14.5" width="6.5" height="5.5" rx="1.5" />
            <rect x="14.5" y="4" width="6.5" height="5.5" rx="1.5" />
            <path d="M9.5 6.8h5" />
            <path d="M12 6.8v10.4h2.5" />
          </>
        );
      case "auto_awesome":
        return (
          <>
            <path
              d="m11 3.5 1.7 4.8L17.5 10l-4.8 1.7L11 16.5l-1.7-4.8L4.5 10l4.8-1.7L11 3.5Z"
              fill={filled ? "currentColor" : "none"}
              fillOpacity={filled ? 0.18 : 0}
            />
            <path d="m18.5 14 .8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8.8-2.2Z" />
          </>
        );
      default:
        return <circle cx="12" cy="12" r="6" />;
    }
  };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden={ariaHidden}
      className={`inline-block shrink-0 ${className}`}
    >
      {renderGlyph()}
    </svg>
  );
}
