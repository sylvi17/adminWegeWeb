const statusStyles = {
  HADIR: "bg-[#d4f0ec] text-[#00897b]",
  IZIN: "bg-[#fff8e1] text-[#f9a825]",
  "BELUM HADIR": "bg-[#eeeeee] text-[#999999]",
};

export default function PengajarAttendance({
  data,
  today,
}) {
  return (
    <div className="rounded-[18px] bg-white p-6 shadow-sm">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-[1.05rem] font-extrabold text-[#1a1a1a]">
          Kehadiran Pengajar Hari Ini
        </h2>

        <span className="text-[0.72rem] font-bold tracking-[0.5px] text-[#aaa]">
          {today}
        </span>
      </div>

      {/* List Kehadiran */}
      <div className="flex flex-col gap-1">
        {data.map((item, index) => (
          <div
            key={index}
            className="
              flex items-center justify-between
              border-b border-[#f0f0f0]
              py-3
              last:border-none
            "
          >
            <div>
              <p className="text-[0.92rem] font-bold text-[#1a1a1a]">
                {item.nama}
              </p>

              <p className="mt-0.5 text-[0.75rem] text-[#aaa]">
                {item.kelas}
              </p>
            </div>

            <span
              className={`
                rounded-full
                px-4
                py-1.5
                text-[0.75rem]
                font-extrabold
                tracking-[0.3px]
                ${statusStyles[item.status]}
              `}
            >
              {item.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}