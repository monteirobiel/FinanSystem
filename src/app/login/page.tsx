import { Button } from "@/components/ui/button";
import { SignInButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { LogInIcon } from "lucide-react";
import Image from "next/image";
import { redirect } from "next/navigation";

const LoginPage = async () => {
  const { userId } = await auth();

  if (userId) {
    redirect("/");
  }

  return (
    <div className="grid h-screen w-screen grid-cols-1 lg:grid-cols-2 bg-black mt-[-64px]">
      <div className="flex items-center justify-center">
        /
        <div className="flex h-full w-[488px] max-w-full flex-col justify-center gap-8 mb-20">
          <Image
            src="/login-logo.png"
            alt="FinanSystem"
            width={173.57}
            height={30}
          />

          <div className="flex flex-col gap-3 text-white mt-[-50px] pl-3">
            <h1 className="text-4xl font-bold ">Seja bem-vindo</h1>

            <p className="text-muted-foreground">
              A FinanSystem é uma plataforma/sistema de controle de finanças
              onde voce pode fazer o controle de suas finanças de forma simples
              e prática. Com um design minimalista e simples de utilizar.
            </p>
          </div>

          <div className="w-full">
            <SignInButton>
              <Button
                variant="outline"
                className="w-110 ml-5 bg-black text-white border-solid border-2 rounded-2xl text-lg"
              >
                <LogInIcon className="mr-2 size-5" />
                Acesse agora!
              </Button>
            </SignInButton>
          </div>
        </div>
      </div>
      <div className="relative hidden h-full w-full lg:block">
        <Image
          src="/login-bg.png"
          alt="Preview dashboard"
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
};

export default LoginPage;
