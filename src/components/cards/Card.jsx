export default function Card({ children, className = "" }) {
  return (
    <div
      className={`
        bg-white
        rounded-[18px]
        shadow-[0_2px_8px_rgba(0,0,0,0.05)]
        ${className}
      `}
    >
      {children}
    </div>
  );
}