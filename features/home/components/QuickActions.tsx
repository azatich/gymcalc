'use client'

import { Clock, ListChecks, TrendingUp } from "lucide-react";

const QuickActions = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <button
        onClick={() => (window.location.href = "/library")}
        className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all text-left group"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 bg-indigo-100 rounded-2xl flex items-center justify-center group-hover:bg-indigo-200 transition-colors">
            <ListChecks className="w-6 h-6 text-primary" />
          </div>
          <div className="text-primary">→</div>
        </div>
        <h3 className="text-xl mb-1">Мои продукты</h3>
        <p className="text-sm text-gray-600">Список за сегодня</p>
      </button>

      <button
        onClick={() => (window.location.href = "/diary")}
        className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all text-left group"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center group-hover:bg-purple-200 transition-colors">
            <Clock className="w-6 h-6 text-purple-600" />
          </div>
          <div className="text-purple-600">→</div>
        </div>
        <h3 className="text-xl mb-1">Дневник пищи</h3>
        <p className="text-sm text-gray-600">Прошлые и текущие записи</p>
      </button>

      <button
        onClick={() => (window.location.href = "/profile")}
        className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all text-left group"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center group-hover:bg-green-200 transition-colors">
            <TrendingUp className="w-6 h-6 text-green-600" />
          </div>
          <div className="text-green-600">→</div>
        </div>
        <h3 className="text-xl mb-1">Профиль</h3>
        <p className="text-sm text-gray-600">Постановка цели и активность</p>
      </button>
    </div>
  );
};

export default QuickActions;
