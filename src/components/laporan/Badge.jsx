const styles = {
  Lancar:
    "bg-[#d4f0ec] text-[#00897b]",

  "Kurang Lancar":
    "bg-[#fff3e0] text-[#ef6c00]",

  "Tidak Lancar":
    "bg-[#fde8e8] text-[#e53935]",
};

export default function StatusBadge({ status }) {
  return (
    <span
      className={`
        inline-block
        rounded-full
        px-4
        py-1.5
        text-[0.78rem]
        font-bold
        ${styles[status]}
      `}
    >
      {status}
    </span>
  );
}