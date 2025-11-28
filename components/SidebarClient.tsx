"use client";

import {
  Home,
  ListChecks,
  PlusCircle,
  TrendingUp,
  Menu,
  User,
  Database,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LoginButton from "./LoginLogoutButton";
import { useState, useEffect } from "react";

type Screen = "home" | "foods" | "add" | "progress" | "history" | "profile";
type UserData = {
  username: string;
} | null;

export default function SidebarClient({ user }: { user: UserData }) {
  const [showMenu, setShowMenu] = useState(false);
  const currentScreen = usePathname();

  useEffect(() => {
    if (showMenu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [showMenu]);

  const navigationItems = [
    { id: "home" as Screen, label: "Главная", icon: Home },
    { id: "diary" as Screen, label: "Дневник", icon: ListChecks },
    { id: "meals" as Screen, label: "Добавить", icon: PlusCircle },
    { id: "library" as Screen, label: "Библиотека", icon: Database },
    // { id: "progress" as Screen, label: "Прогресс", icon: TrendingUp },
    { id: "profile" as Screen, label: "Профиль", icon: User },
  ];

  return (
    <div>
      {/* Desktop: Sidebar Navigation (768px+) */}
      <div className="hidden md:flex">
        <aside className="fixed left-0 top-0 h-screen w-80 bg-white border-r border-gray-200 p-8 flex flex-col">
          <div className="mb-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-linear-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center text-white text-xl font-bold">
                G
              </div>
              <h1 className="text-3xl font-bold">GymCalc</h1>
            </div>
            <p className="text-gray-800">Здравствуйте, {user?.username}</p>
          </div>

          <nav className="flex-1 flex flex-col py-3">
            <div className="space-y-2 flex-1">
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
            </div>
            <div className="mt-auto pt-4">
              <LoginButton />
            </div>
          </nav>
        </aside>
      </div>

      {/* Mobile: Header & Menu */}
      <div className="md:hidden">
        {/* Fixed Header */}
        <header className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-lg border-b border-gray-200 px-5 py-4 z-30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-linear-to-br from-indigo-500 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">
                G
              </div>
              <h1 className="text-xl font-bold">GymCalc</h1>
            </div>
            <button
              onClick={() => setShowMenu(true)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Открыть меню"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </header>

        {/* Overlay */}
        <div
          className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300 ${
            showMenu ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          onClick={() => setShowMenu(false)}
        />

        {/* Sliding Menu */}
        <nav
          className={`fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white border-l border-gray-200 z-50 shadow-2xl transition-transform duration-300 ease-in-out ${
            showMenu ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Menu Header с кнопкой закрытия */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-linear-to-br from-indigo-500 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">
                G
              </div>
              <h2 className="text-xl font-bold">Меню</h2>
            </div>
            <button
              onClick={() => setShowMenu(false)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Закрыть меню"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* User Info */}
          {user && (
            <div className="px-5 py-4 border-b border-gray-100">
              <p className="text-sm text-gray-600">Здравствуйте,</p>
              <p className="text-lg font-semibold text-gray-900">
                {user.username}
              </p>
            </div>
          )}

          {/* Navigation Items */}
          <div className="flex flex-col gap-1 p-4 overflow-y-auto h-[calc(100vh-180px)]">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentScreen === `/${item.id}`;

              return (
                <Link
                  key={item.id}
                  href={`/${item.id}`}
                  onClick={() => setShowMenu(false)}
                  className={`flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all ${
                    isActive
                      ? "bg-black text-white shadow-lg shadow-indigo-200"
                      : "text-gray-700 hover:bg-gray-50 active:bg-gray-100"
                  }`}
                >
                  <Icon className="w-6 h-6" />
                  <span className="text-base font-medium">{item.label}</span>
                </Link>
              );
            })}

            {/* Login Button in Menu */}
            <div className="mt-4 pt-4 border-t border-gray-200">
              <LoginButton />
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}
