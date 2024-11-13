import { Button } from "@/components/ui/button";
import { LogInIcon } from "lucide-react";

import loginPageBg from "@/assets/login-bg.png";

export default function LoginPage() {
  return (
    <div className="grid grid-cols-2">
      <div className="flex h-screen flex-col items-center justify-center gap-3 bg-zinc-800 p-5">
        <h1 className="text-4xl text-white">Bem-vindo</h1>
        <p className="text-zinc-400">
          Faça login ou cadastre-se para uma saborosa experiência!
        </p>
        <Button variant="outline">
          <LogInIcon />
          Fazer login ou criar conta
        </Button>
      </div>
      <div className="h-[100vh] w-full">
        <img src={loginPageBg} alt="" className="h-[100vh] w-full" />
      </div>
    </div>
  );
}
