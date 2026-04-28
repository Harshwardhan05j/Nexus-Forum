import Skeleton from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <div className="min-h-screen bg-[#050505] relative overflow-hidden">
      {/* Background blobs stay visible to maintain ambient feel during load */}
      <div className="ambient-blobs">
        <div className="blob orange-blob"></div>
        <div className="blob red-blob"></div>
        <div className="blob blue-blob"></div>
        <div className="blob purple-blob"></div>
      </div>

      <main className="relative z-10 pt-[100px]">
        {/* Ticker Bar Skeleton */}
        <div className="w-full bg-white/5 py-4 mb-4">
          <Skeleton className="h-4 w-[60%] mx-auto opacity-20" />
        </div>

        <div className="max-w-[1200px] mx-auto px-5 md:px-12">
          {/* Hero Section Skeleton */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center min-h-[calc(100vh-184px)] py-[120px]">
            <div className="max-w-[600px]">
              {/* Title Skeleton */}
              <Skeleton className="h-[4.5rem] w-[80%] mb-6" />
              {/* Paragraph Skeleton */}
              <Skeleton className="h-6 w-full mb-3" />
              <Skeleton className="h-6 w-[90%] mb-10" />
              
              {/* Button Skeletons */}
              <div className="flex gap-4">
                <Skeleton className="h-12 w-36 rounded-md" />
                <Skeleton className="h-12 w-32 rounded-md" />
              </div>
            </div>
            
            {/* Visual element placeholder (the chart box) */}
            <div className="hidden md:flex h-full justify-end items-center">
              <div className="w-[440px] h-[440px] bg-white/5 rounded-2xl border border-white/5 p-10 flex items-end gap-4">
                 <Skeleton className="flex-1 h-[40%]" />
                 <Skeleton className="flex-1 h-[70%]" />
                 <Skeleton className="flex-1 h-[50%]" />
                 <Skeleton className="flex-1 h-[90%] opacity-30" />
                 <Skeleton className="flex-1 h-[60%]" />
              </div>
            </div>
          </section>
        </div>

        {/* Stats Grid Skeleton */}
        <section className="bg-[#0e0e0e] border-y border-white/5 py-16">
          <div className="max-w-[1200px] mx-auto px-5 md:px-12 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <Skeleton className="h-14 w-24 mb-2" />
                <Skeleton className="h-4 w-32" />
              </div>
            ))}
          </div>
        </section>

        {/* Featured Clubs Grid Skeleton Hint */}
        <div className="max-w-[1200px] mx-auto px-5 md:px-12 py-14 md:py-[120px]">
           <Skeleton className="h-10 w-64 mb-16" />
           <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <Skeleton className="h-[240px] rounded-[24px]" />
              <Skeleton className="h-[240px] rounded-[24px]" />
              <Skeleton className="h-[240px] rounded-[24px]" />
           </div>
        </div>
      </main>
    </div>
  );
}
