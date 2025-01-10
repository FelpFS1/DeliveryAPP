import { Button } from "@/components/ui/button";
import { LogInIcon } from "lucide-react";

import loginPageBg from "@/assets/login-bg.png";
import { SignInButton, useAuth } from "@clerk/clerk-react";

import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Loading from "@/components/Loading";

export default function LoginPage() {
  const { userId, isLoaded } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoaded) return;
    if (userId) {
      navigate("/redirect");
    }
  }, [isLoaded, navigate, userId]);
  return (
    <>
      {isLoaded ? (
        <div className="grid h-screen grid-cols-2 overflow-hidden">
          <div className="flex h-screen flex-col items-center justify-center gap-3 p-5">
            <h1 className="text-4xl font-bold">Bem-vindo (a)!</h1>
            <p className="text-zinc-400">
              Faça login ou cadastre-se para uma saborosa experiência!
            </p>
            <SignInButton mode="modal" forceRedirectUrl={"/redirect"}>
              <Button variant="outline" className="font-bold">
                <LogInIcon />
                Fazer login ou criar conta
              </Button>
            </SignInButton>
          </div>
          <div className="h-[100vh] w-full">
            <img src={loginPageBg} alt="" className="h-[100vh] w-full" />
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}
