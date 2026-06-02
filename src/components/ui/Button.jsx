export default function Button({
  children,
  variant = "outline",
  className = "",
  ...props
}) {
  const styles = {
    outline: `
      bg-white
      border
      border-[#ddd]
      text-[#444]
      hover:border-[#26a69a]
      hover:text-[#26a69a]
    `,
    primary: `
      bg-[#1a5c54]
      text-white
      hover:bg-[#26a69a]
      shadow-[0_4px_12px_rgba(26,92,84,0.25)]
    `,
  };

  return (
    <button
      className={`
        rounded-full
        px-[22px]
        py-[11px]
        font-bold
        text-[0.9rem]
        transition-all
        ${styles[variant]}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}