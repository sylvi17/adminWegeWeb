import { useState } from "react";

export default function PengajarActivityLog({ activities }) {
  const ITEMS_PER_PAGE = 5;

  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(activities.length / ITEMS_PER_PAGE);

  // const currentActivities = activities.slice(
  //   (page - 1) * ITEMS_PER_PAGE,
  //   page * ITEMS_PER_PAGE,
  // );
  const [visible, setVisible] = useState(5);

  const currentActivities = activities.slice(0, visible);

  return (
    <div className="rounded-[18px] bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-[1.05rem] font-extrabold text-[#1a1a1a]">
        Log Aktivitas Admin
      </h2>

      <div className="flex flex-col gap-4">
        {currentActivities.map((activity) => (
          <div key={activity.id} className="flex items-start gap-3.5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#e8f5f3] text-base">
              {activity.icon}
            </div>

            <div>
              <p className="text-[0.85rem] leading-relaxed text-[#444]">
                <span className="font-bold text-[#26a69a]">
                  {activity.text}
                </span>{" "}
                {activity.highlight}
              </p>

              <p className="mt-1 text-[0.7rem] tracking-[0.3px] text-[#bbb]">
                {activity.time}
              </p>
            </div>
          </div>
        ))}
      </div>
      
      {visible < activities.length && (
        <button
          onClick={() => setVisible((v) => v + 5)}
          className="mt-5 w-full rounded-lg border py-2 hover:bg-gray-50"
        >
          Lihat lebih banyak
        </button>
      )}

      
    </div>
  );
}
