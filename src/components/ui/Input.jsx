// src/components/ui/Input.jsx
import { forwardRef, useState } from "react";

const EyeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
);

const EyeOffIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
    <line x1="1" y1="1" x2="23" y2="23"/>
  </svg>
);

/**
 * Input reusable dengan dukungan icon kiri, toggle password, dan error state.
 *
 * Props:
 *  - icon       : ReactNode — icon di sisi kiri (opsional)
 *  - error      : string   — pesan error, memicu border merah (opsional)
 *  - type       : string   — default "text"; kalau "password" otomatis ada toggle show/hide
 *  - className  : string   — tambahan class Tailwind untuk <input> (opsional)
 *  - semua props <input> HTML lainnya di-forward langsung
 */
const Input = forwardRef(function Input(
  { icon, error, type = "text", className = "", ...props },
  ref
) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const resolvedType = isPassword ? (showPassword ? "text" : "password") : type;

  return (
    <div className="flex flex-col gap-1">
      <div className="relative flex items-center">
        {/* Icon kiri */}
        {icon && (
          <span className="absolute left-3.5 text-gray-400 pointer-events-none flex items-center">
            {icon}
          </span>
        )}

        <input
          ref={ref}
          type={resolvedType}
          className={[
            "w-full rounded-full border bg-gray-50 py-3 text-sm text-gray-700 outline-none",
            "transition duration-200 placeholder:text-gray-400",
            "focus:bg-white focus:ring-2",
            icon    ? "pl-10" : "pl-4",
            isPassword ? "pr-10" : "pr-4",
            error
              ? "border-red-400 focus:border-red-400 focus:ring-red-100"
              : "border-gray-200 focus:border-teal-500 focus:ring-teal-100",
            className,
          ].join(" ")}
          {...props}
        />

        {/* Toggle show/hide password */}
        {isPassword && (
          <button
            type="button"
            tabIndex={-1}
            onClick={() => setShowPassword((v) => !v)}
            className="absolute right-3.5 text-gray-400 hover:text-teal-600 transition-colors"
          >
            {showPassword ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        )}
      </div>

      {/* Pesan error inline */}
      {error && (
        <p className="pl-4 text-xs text-red-500 animate-[shake_0.3s_ease-in-out]">
          {error}
        </p>
      )}
    </div>
  );
});

export default Input;