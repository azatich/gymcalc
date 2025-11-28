import { useMealDeleteMutation } from "@/features/meals/hooks/useMealDeleteMutation";
import { Loader2, PencilLine, Trash2 } from "lucide-react";
import React from "react";

const MealItemCard = ({
  id,
  name,
  portion,
  calories,
  proteins,
  fats,
  carbs,
  time,
}: {
  id: string;
  name: string;
  portion: string;
  calories: number;
  proteins: number;
  fats: number;
  carbs: number;
  time: string;
}) => {
  const deleteMeal = useMealDeleteMutation();

  return (
    <div className="relative overflow-hidden">
      <div className="bg-white rounded-2xl p-5 border border-gray-100 transition-all duration-300">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="text-lg mb-1">{name}</h3>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span>{portion}</span>
              {time && (
                <>
                  <span>•</span>
                  <span>{time}</span>
                </>
              )}
            </div>
          </div>

          <div className="flex items-start gap-2 mr-4">
            <button className="p-2 hover:bg-gray-100 rounded-xl transition">
              <PencilLine size={18} className="text-gray-600" />
            </button>

            <button
              onClick={() => deleteMeal.mutate(id)}
              disabled={deleteMeal.isPending}
              className="p-2 hover:bg-red-100 rounded-xl transition"
            >
              {deleteMeal.isPending ? (
                <Loader2 className="w-4 h-4 animate-spin text-red-600" />
              ) : (
                <Trash2 size={18} className="text-red-600" />
              )}
            </button>
          </div>

          <div className="text-right">
            <div className="text-2xl text-primary">{calories}</div>
            <div className="text-xs text-gray-500">ккал</div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-indigo-50 rounded-xl p-3 text-center">
            <div className="text-lg text-indigo-600">{proteins}г</div>
            <div className="text-xs text-gray-600 mt-1">Белки</div>
          </div>
          <div className="bg-amber-50 rounded-xl p-3 text-center">
            <div className="text-lg text-amber-600">{fats}г</div>
            <div className="text-xs text-gray-600 mt-1">Жиры</div>
          </div>
          <div className="bg-green-50 rounded-xl p-3 text-center">
            <div className="text-lg text-green-600">{carbs}г</div>
            <div className="text-xs text-gray-600 mt-1">Углев.</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MealItemCard;
