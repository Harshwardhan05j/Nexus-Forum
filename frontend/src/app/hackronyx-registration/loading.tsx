import Skeleton from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <main className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-purple-600/20 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full"></div>

      <div className="w-full max-w-[600px] relative z-10">
        {/* Header Skeleton */}
        <div className="text-center mb-12">
           <Skeleton className="h-4 w-32 mx-auto mb-4" />
           <Skeleton className="h-12 w-[80%] mx-auto mb-4" />
           <Skeleton className="h-4 w-full mx-auto opacity-50 mb-2" />
           <Skeleton className="h-4 w-[70%] mx-auto opacity-50" />
        </div>

        {/* Form Card Skeleton */}
        <div className="bg-[#0e0e0e]/70 backdrop-blur-xl border border-white/10 rounded-2xl p-8 md:p-12 shadow-2xl space-y-8">
           {[1, 2, 3, 4].map(i => (
             <div key={i} className="space-y-2">
                <Skeleton className="h-3 w-20" />
                <Skeleton className="h-14 w-full rounded-xl" />
             </div>
           ))}
           <Skeleton className="h-14 w-full rounded-xl mt-4" />
        </div>
      </div>
    </main>
  );
}
