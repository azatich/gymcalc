import React from "react";

const FoodListsSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({length: 6}).map((_, i) => (
        <div
        key={i}
        className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
      >
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <div className="bg-neutral-300 animate-pulse w-24 h-4 rounded-lg" />
          </div>
          <div className="text-right">
            <div className="bg-neutral-300 animate-pulse w-8 h-4 rounded-lg" />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="bg-neutral-300 rounded-lg p-2 text-center h-6"/>
          <div className="bg-neutral-300 rounded-lg p-2 text-center h-6" />
          <div className="bg-neutral-300 rounded-lg p-2 text-center h-6" />
        </div>

        <div className="flex gap-2 animate-pulse">
          <div className="bg-neutral-300 animate-pulse flex-1 w-auto h-6 rounded-lg" />
          <div className="bg-neutral-300 animate-pulse w-12 h-6 rounded-lg" />
        </div>
      </div>
      ))}
    </div>
  );
};

export default FoodListsSkeleton;
