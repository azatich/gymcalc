"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { signout } from "@/lib/auth-actions";
import { LogOut } from "lucide-react";

const LoginButton = () => {
  const [user, setUser] = useState<any>(null);
  const supabase = createClient();
  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };
    fetchUser();
  }, []);
  
  return (
    <button
      className="bg-red-500 text-white text-md hover:bg-red-900 w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-200"
      onClick={() => {
        signout();
        setUser(null);
      }}
    >
      <LogOut />
      Выйти
    </button>
  );
};

export default LoginButton;
