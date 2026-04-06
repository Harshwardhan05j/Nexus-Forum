import Skeleton from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[#050505]">
      {/* Background glows match the real page */}
      <div className="absolute top-[-20%] left-[20%] w-[600px] h-[600px] bg-purple-600/10 blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[10%] w-[400px] h-[400px] bg-blue-600/8 blur-[140px] rounded-full pointer-events-none" />

      <div className="z-10 w-full max-w-md px-4">
        {/* Card Placeholder */}
        <div className="bg-[#0e0e0e]/80 border border-white/5 rounded-2xl p-8 md:p-10 shadow-2xl backdrop-blur-xl">
          
          {/* Header Skeleton */}
          <div className="flex flex-col items-center mb-8">
            <Skeleton className="h-8 w-24 mb-4" />
            <Skeleton className="h-6 w-32 mb-2" />
            <Skeleton className="h-4 w-48" />
          </div>

          {/* Google Button Skeleton */}
          <Skeleton className="w-full h-12 rounded-xl mb-6" />

          {/* Divider Skeleton */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 h-px bg-white/5" />
            <Skeleton className="h-3 w-4" />
            <div className="flex-1 h-px bg-white/5" />
          </div>

          {/* Form Skeletons */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-12 w-full rounded-xl" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-12 w-full rounded-xl" />
            </div>
            {/* Submit Button Skeleton */}
            <Skeleton className="w-full h-12 rounded-xl mt-6" />
          </div>

          {/* Footer Text Skeleton */}
          <div className="flex justify-center mt-6">
            <Skeleton className="h-4 w-40" />
          </div>
        </div>
        
        {/* Terms Skeleton */}
        <div className="flex justify-center mt-6">
          <Skeleton className="h-3 w-56 opacity-50" />
        </div>
      </div>
    </div>
  );
}
