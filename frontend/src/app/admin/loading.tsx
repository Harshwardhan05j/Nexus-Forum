import Skeleton from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <main className="max-w-[1300px] mx-auto px-6 pt-[120px] pb-20 min-h-screen relative z-10">
      {/* Header Skeleton */}
      <div className="mb-12">
        <Skeleton className="h-3 w-20 mb-3" />
        <Skeleton className="h-10 w-48 mb-2" />
        <Skeleton className="h-4 w-[280px]" />
      </div>

      {/* Stat Cards Skeleton */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-12">
        {[1, 2, 3, 4, 5].map(i => (
          <div key={i} className="bg-[#0e0e0e] border border-white/5 rounded-xl p-5">
            <Skeleton className="h-8 w-12 mb-2" />
            <Skeleton className="h-3 w-24" />
          </div>
        ))}
      </div>

      {/* Table Section Skeleton */}
      {[1, 2].map(section => (
        <section key={section} className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <Skeleton className="h-6 w-56" />
            <Skeleton className="h-5 w-8 rounded-full" />
          </div>
          <div className="bg-[#0e0e0e] border border-white/5 rounded-xl overflow-hidden p-6 space-y-4">
            {/* Table Header Placeholder */}
            <div className="flex justify-between border-b border-white/5 pb-4">
               {[1, 2, 3, 4, 5, 6].map(i => <Skeleton key={i} className="h-3 w-16" />)}
            </div>
            {/* Table Rows Placeholder */}
            {[1, 2, 3, 4, 5].map(row => (
              <div key={row} className="flex justify-between py-2">
                 {[1, 2, 3, 4, 5, 6].map(i => <Skeleton key={i} className={`h-4 ${i === 2 ? 'w-32' : 'w-12'} opacity-40`} />)}
              </div>
            ))}
          </div>
        </section>
      ))}
    </main>
  );
}
