"use client";

import { loadStripe } from "@stripe/stripe-js";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FiArrowUp } from "react-icons/fi";
import { LuArrowDown } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  Menu,
  Home,
  Receipt,
  CreditCard as CreditCardIcon,
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

const redirectToCheckout = async (): Promise<void> => {
  try {
    // Fazer uma requisição para o seu backend para criar uma sessão de checkout
    const response = await fetch("/api/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        priceId: "price_1R2dYbRheCWJ8RLxhDOmfAlc", // ID do preço do seu produto na Stripe
      }),
    });

    const { sessionId } = await response.json();

    const stripe = await stripePromise;
    if (!stripe) {
      throw new Error("Stripe não foi inicializado corretamente");
    }

    const { error } = await stripe.redirectToCheckout({ sessionId });

    if (error) {
      console.error("Erro ao redirecionar para o checkout:", error);
    }
  } catch (error) {
    console.error(
      "Erro ao criar a sessão de checkout:",
      error instanceof Error ? error.message : "Erro desconhecido"
    );
  }
};

const PlanosPage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };

  const navigateToDashboard = () => {
    router.push("/dashboard");
  };

  // Sidebar navigation items
  const navItems = [
    { icon: <Home size={20} />, label: "Dashboard", path: "/dashboard" },
    { icon: <Receipt size={20} />, label: "Transações", path: "/transactions" },
    {
      icon: <CreditCardIcon size={20} />,
      label: "Assinatura",
      path: "/subscription",
    },
  ];

  // Verifica se um item de navegação está ativo
  const isActive = (path: string) => {
    if (path === "/dashboard" && pathname === "/dashboard") return true;
    if (path !== "/dashboard" && pathname?.startsWith(path)) return true;
    return false;
  };

  // Determina o título da página com base no pathname
  const getPageTitle = () => {
    switch (pathname) {
      case "/dashboard":
        return "Dashboard";
      case "/transactions":
        return "Transações";
      case "/subscription":
        return "Assinaturas";
      default:
        return "Dashboard";
    }
  };

  // Sidebar para mobile
  const MobileSidebar = () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu size={24} className="text-white" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="p-0 w-64 bg-zinc-950 border-r border-zinc-800"
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center h-16 px-6 border-b border-zinc-800">
            <div
              className="flex items-center cursor-pointer"
              onClick={navigateToDashboard}
            >
              <Image
                src="/f_logo.png"
                alt="FinanSystem"
                width={50}
                height={30}
              />
              <span className="ml-3 font-semibold text-lg text-white">
                finansystem
              </span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="ml-auto h-8 w-8 text-zinc-400"
              onClick={toggleSidebar}
            >
              <ChevronLeft size={16} />
            </Button>
          </div>

          <nav className="flex-1 pt-4 space-y-1 px-2">
            {navItems.map((item, index) => {
              const active = isActive(item.path);
              return (
                <Link href={item.path} key={index} className="block">
                  <div className="flex items-center mb-1 p-2 rounded-md group transition-all duration-200 hover:bg-zinc-800">
                    <div
                      className={`flex items-center justify-center h-8 w-8 rounded-md mr-2 transition-colors duration-200 ${
                        active
                          ? "text-indigo-400 bg-indigo-950/50"
                          : "text-zinc-400 group-hover:text-zinc-200"
                      }`}
                    >
                      {item.icon}
                    </div>
                    <span
                      className={`transition-colors duration-200 ${
                        active
                          ? "text-indigo-400"
                          : "text-zinc-400 group-hover:text-zinc-200"
                      }`}
                    >
                      {item.label}
                    </span>
                  </div>
                </Link>
              );
            })}
          </nav>

          <div className="mt-auto p-4 border-t border-zinc-800"></div>
        </div>
      </SheetContent>
    </Sheet>
  );

  return (
    <div className="flex h-screen bg-zinc-950 mt-[-60px] ">
      {/* Desktop Sidebar */}
      <div
        className={`fixed top-0 left-0 bottom-0 bg-zinc-950 border-r border-zinc-800 transition-all duration-300 ease-in-out z-10 ${
          isSidebarExpanded ? "w-64" : "w-16"
        }`}
      >
        <div className="flex items-center h-16 border-b border-zinc-800 justify-between pb-5">
          <div
            className="flex items-center cursor-pointer"
            onClick={navigateToDashboard}
          >
            <Image
              src="/login-logo2.png"
              alt="FinanSystem"
              width={250}
              height={30}
            />

            {isSidebarExpanded && (
              <span className="font-semibold text-xl mr-35 text-white"></span>
            )}
          </div>
          {isSidebarExpanded && (
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-zinc-400"
              onClick={toggleSidebar}
            >
              <ChevronLeft size={16} />
            </Button>
          )}
        </div>

        <nav className="flex-1 pt-6 space-y-1 px-2">
          {navItems.map((item, index) => {
            const active = isActive(item.path);
            return (
              <Link href={item.path} key={index} className="block">
                <div className="flex items-center mb-2 p-2 rounded-md group transition-all duration-200 hover:bg-zinc-800">
                  <div
                    className={`flex items-center justify-center h-8 w-8 rounded-md ${
                      isSidebarExpanded ? "mr-3" : ""
                    } transition-colors duration-200 ${
                      active
                        ? "text-indigo-400 bg-indigo-950/50"
                        : "text-zinc-400 group-hover:text-zinc-200"
                    }`}
                  >
                    {item.icon}
                  </div>
                  {isSidebarExpanded && (
                    <span
                      className={`transition-colors duration-200 ${
                        active
                          ? "text-indigo-400"
                          : "text-zinc-400 group-hover:text-zinc-200"
                      }`}
                    >
                      {item.label}
                    </span>
                  )}
                </div>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Main Content */}
      <div
        className={`flex-1 flex flex-col ${
          isSidebarExpanded ? "ml-64" : "ml-16"
        } transition-all duration-300`}
      >
        {/* Header - Simplificado sem data e avatar */}
        <header className="h-16 flex items-center px-6 border-b border-zinc-800">
          <div className="flex items-center bg-bl">
            <MobileSidebar />
            <Button
              variant="ghost"
              size="icon"
              className="mr-[-5px] mb-2 pr-2 text-white hidden md:flex md:items-center md:justify-center"
              onClick={toggleSidebar}
            >
              {!isSidebarExpanded && <Menu size={20} />}
            </Button>
            <h1 className="text-xl font-bold text-white mb-2">
              {getPageTitle()}
            </h1>
          </div>
        </header>

        {/* Main Content - Planos Section */}
        <div className="flex-1 overflow-auto p-6 bg-zinc-950">
          <div className="flex justify-center space-x-10 pt-8">
            {/* Plano Gratuito */}
            <div className="bg-zinc-900 border-solid border-zinc-700 border-1 p-6 rounded-xl shadow-lg w-90 h-150 flex flex-col items-center relative hover:shadow-xl transition-shadow duration-300">
              {/* Etiqueta "Atual" */}
              <div className="absolute top-4 left-4 bg-green-950 text-green-600 px-3 py-1 rounded-md text-sm font-semibold">
                Atual
              </div>

              <h3 className="text-2xl font-semibold text-white mb-5 mt-5">
                Plano Gratuito
              </h3>
              <div className="inline-flex items-baseline pb-20">
                <span className="text-5xl font-semibold text-white">R$ 0</span>
                <span className="text-xl text-zinc-600">/ mês</span>
              </div>
              <ul className="text-white mt-4 space-y-3 font-semibold w-100 pl-10">
                <li className="flex items-center opacity-80">
                  <FiArrowUp className="mr-2" color="green" size={20} />
                  Controle basico do seu financeiro
                </li>
                <li className="flex items-center opacity-80">
                  <FiArrowUp className="mr-2" color="green" size={20} />
                  Crie somente 10 transações ao mês
                </li>
                <li className="flex items-center opacity-80">
                  <FiArrowUp className="mr-2" color="green" size={20} />
                  Crie apenas 5 novas categorias
                </li>
                <li className="flex items-center text-zinc-600">
                  <LuArrowDown className="mr-2" color="red" size={20} />
                  Registro de gastos e receitas Ilimitados
                </li>
                <li className="flex items-center text-zinc-600">
                  <LuArrowDown className="mr-2" color="red" size={20} />
                  Crie categorias ilimitadas
                </li>
                <li className="flex items-center text-zinc-600">
                  <LuArrowDown className="mr-2" color="red" size={20} />
                  Suporte prioriatário 24 horas
                </li>
              </ul>
              <button
                className="w-80 mt-20 py-3 bg-zinc-900 border-purple-900 border-slid border-1 rounded-4xl text-white font-semibold cursor-not-allowed flex items-center justify-center"
                onMouseOver={(e) => {
                  e.currentTarget.innerHTML =
                    '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg> Plano Atual';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.innerHTML = "Plano Atual";
                }}
              >
                Plano Atual
              </button>
            </div>

            {/* Plano Premium */}
            <div className="bg-zinc-900 border-solid border-zinc-700 border-1 p-6 rounded-xl shadow-lg w-90 h-150 flex flex-col items-center hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-2xl font-semibold text-white mb-5 mt-5">
                Plano Premium
              </h3>
              <div className="inline-flex items-baseline">
                <span className="text-5xl font-semibold text-white pb-20">
                  R$ 9,90
                </span>
                <span className="text-xl text-zinc-600">/ mês</span>
              </div>
              <ul className="text-white mt-4 space-y-3 font-semibold w-100 pl-10">
                <li className="flex items-center opacity-80">
                  <FiArrowUp className="mr-2" color="green" size={20} />
                  Controle basico do seu financeiro
                </li>
                <li className="flex items-center opacity-80">
                  <FiArrowUp className="mr-2" color="green" size={20} />
                  Crie somente 10 transações ao mês
                </li>
                <li className="flex items-center opacity-80">
                  <FiArrowUp className="mr-2" color="green" size={20} />
                  Crie apenas 5 novas categorias
                </li>
                <li className="flex items-center opacity-80">
                  <FiArrowUp className="mr-2" color="green" size={20} />
                  Registro de gastos e receitas Ilimitados
                </li>
                <li className="flex items-center opacity-80">
                  <FiArrowUp className="mr-2" color="green" size={20} />
                  Crie categorias ilimitadas
                </li>
                <li className="flex items-center opacity-80">
                  <FiArrowUp className="mr-2" color="green" size={20} />
                  Suporte prioriatário 24 horas
                </li>
              </ul>
              <button
                className="w-80 mt-20 py-3 bg-purple-900 hover:bg-purple-800 text-white rounded-4xl font-semibold cursor-pointer"
                onClick={redirectToCheckout}
              >
                Alterar plano
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanosPage;
