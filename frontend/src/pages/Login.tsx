import { Button } from "@/components/ui/button";
import { LogInIcon } from "lucide-react";

import loginPageBg from "@/assets/login-bg.png";
import { SignInButton, useAuth } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import ThemeButton from "@/components/ThemeButton";

export default function LoginPage() {
  const { userId } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (userId) {
      navigate("/");
    }
  });
  return (
    <div className="grid grid-cols-2">
      <div className="flex h-screen flex-col items-center justify-center gap-3 p-5">
        <ThemeButton />
        <h1 className="text-4xl">Bem-vindo</h1>
        <p className="text-zinc-400">
          Faça login ou cadastre-se para uma saborosa experiência!
        </p>
        <SignInButton mode="modal">
          <Button>
            <LogInIcon />
            Fazer login ou criar conta
          </Button>
        </SignInButton>
      </div>
      <div className="h-[100vh] w-full">
        <img src={loginPageBg} alt="" className="h-[100vh] w-full" />
      </div>
    </div>
  );
}
