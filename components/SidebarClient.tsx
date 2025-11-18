"use client";

import {
  Home,
  ListChecks,
  PlusCircle,
  TrendingUp,
  Menu,
  User,
  Database,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LoginButton from "./LoginLogoutButton";

type Screen = "home" | "foods" | "add" | "progress" | "history" | "profile";
type UserData = {
  username: string;
} | null;

export default function SidebarClient({ user }: { user: UserData }) {
  const currentScreen = usePathname();

  const navigationItems = [
    { id: "home" as Screen, label: "Главная", icon: Home },
    { id: "foods" as Screen, label: "Продукты", icon: ListChecks },
    { id: "add" as Screen, label: "Добавить", icon: PlusCircle },
    { id: "library" as Screen, label: "Библиотека", icon: Database },
    { id: "progress" as Screen, label: "Прогресс", icon: TrendingUp },
    { id: "profile" as Screen, label: "Профиль", icon: User },
  ];

  return (
    <div>
      {/* Desktop: Sidebar Navigation (1440px+) */}
      <div className="hidden md:flex">
        <aside className="fixed left-0 top-0 h-screen w-80 bg-white border-r border-gray-200 p-8 flex flex-col">
          <div className="mb-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center text-white text-xl">
                G
              </div>
              <h1 className="text-3xl">GymCalc</h1>
            </div>
            <p className="text-gray-800">Здравствуйте, {user?.username}</p>
          </div>

          <nav className="flex-1 space-y-2">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentScreen === `/${item.id}`;

              return (
                <Link
                  key={item.id}
                  href={`/${item.id}`}
                  className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all text-md ${
                    isActive
                      ? "bg-black text-white shadow-lg shadow-indigo-200"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <Icon className="w-6 h-6" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Кнопка выйти */}
          <div className="mb-4">
            <LoginButton />
          </div>

          <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-2xl p-6 text-white">
            <div className="text-sm text-indigo-200 mb-2">Дневная норма</div>
            <div className="text-3xl mb-1">2000</div>
            <div className="text-sm text-indigo-200">калорий</div>
          </div>
        </aside>
      </div>

      {/* Mobile: Top Header + Bottom Tab Bar (390px-768px) */}
      <div className="md:hidden">
        <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-lg border-b border-gray-200 px-5 py-4 z-20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg flex items-center justify-center text-white">
                G
              </div>
              <h1 className="text-xl">GymCalc</h1>
            </div>
            <button className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center">
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </header>

        <nav className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-lg border-t border-gray-200 z-20">
          <div className="flex justify-around items-center px-2 py-2">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.id}
                  href={`/${item.id}`}
                  className={`flex flex-col items-center gap-1 px-4 py-3 rounded-2xl transition-all min-w-[72px]`}
                >
                  <Icon className={`w-6 h-6 transition-transform`} />
                  <span className={`text-xs`}>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </nav>
      </div>
    </div>
  );
}