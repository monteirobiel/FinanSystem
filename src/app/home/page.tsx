"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FaChartLine } from "react-icons/fa6";
import { FaCcVisa } from "react-icons/fa6";
import { RiSecurePaymentFill } from "react-icons/ri";
import { FaMoneyBillTrendUp } from "react-icons/fa6";

const LandingPage = () => {
  const router = useRouter();

  return (
    <div className="w-screen h-screen flex flex-col font-sans text-white">
      {/* Header */}
      <header className="mt-[-70px] flex justify-between items-center p-5 bg-gradient-to-b from-[#020202]  to-[#121212]">
        <div className="flex items-center ">
          <Image src="/f_logo.png" alt="FinanSystem" width={80} height={50} />
          <h1 className="text-3xl font-bold text-white mb-3 ">FinanSystem</h1>
        </div>
      </header>

      {/* First Section - Fade Transition with Gradual Color Change */}
      <section className="flex flex-col justify-center items-center py-35 text-center space-y-10 bg-gradient-to-b from-[#121212] to-[#4d3771] transition-all duration-1000 ease-in-out mt-[0px]">
        <h2 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-purple-600 mb-6 drop-shadow-lg">
          Organize sua vida financeira <br /> de forma simples e inteligente
        </h2>
        <p className="text-lg text-gray-300 max-w-xl mx-auto mb-12">
          Nossa plataforma ajuda você a controlar e otimizar seus gastos,
          trazendo mais controle para seu dia a dia.
        </p>
        <Button
          variant="default"
          className="bg-green-700 hover:bg-green-900 text-white py-3 px-8 rounded-full h-13 w-62 text-lg"
          onClick={() => router.push("/planos")}
        >
          Conheça Nossos Planos
        </Button>
      </section>

      {/* Benefits Section - Fade Transition with Gradual Color Change */}
      <section
        id="benefits"
        className="bg-gradient-to-b from-[#4d3771] to-[#140e23] py-10 text-center space-y-12 shadow-lg transition-all duration-1000 ease-in-out"
      >
        <h2 className="text-5xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-purple-600 mb-6 drop-shadow-lg pr-90 ">
          Tudo o que você precisa <br /> e muito mais.
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-screen-lg mx-auto">
          {/* Card 1 - Alerta */}
          <div className="border-solid border-black border-3 p-8 rounded-xl shadow-xl hover:scale-105 transition-all col-span-2 h-[250px]">
            <div className="flex justify-center items-center mb-4">
              <div className="">
                <FaChartLine fontSize={50} color="green" />
              </div>
            </div>
            <h3 className="text-2xl font-semibold text-white mb-4">
              Design Simples e Intuitivo
            </h3>
            <p className="text-gray-400">
              Nossa plataforma foi desenvolvida para ser intuitiva e fácil de
              usar. Com uma interface limpa e simples
            </p>
          </div>

          {/* Card 2 - Apps favoritos */}
          <div className="border-solid border-black border-3 p-8 rounded-xl shadow-xl hover:scale-105 transition-all col-span-1 h-[320px]">
            <div className="flex justify-center items-center mb-4">
              <div className="">
                <FaCcVisa fontSize={50} color="black" />
              </div>
            </div>
            <h3 className="text-2xl font-semibold text-white mb-4">
              Controle Completo
            </h3>
            <p className="text-gray-400">
              Gerencie suas finanças com facilidade e tenha controle total sobre
              seus gastos e receitas.
            </p>
          </div>

          {/* Card 3 - Text to Speech */}
          <div className="border-solid border-black border-3 p-5 rounded-xl shadow-xl hover:scale-105 transition-all col-span-1 h-[250px]">
            <div className="flex justify-center items-center mb-4">
              <div className="">
                <FaMoneyBillTrendUp fontSize={50} color="green" />
              </div>
            </div>
            <h3 className="text-2xl font-semibold text-white mb-4">Economia</h3>
            <p className="text-gray-400">
              Com o nosso sistema, você consegue economizar tempo e dinheiro,
              sabendo onde exatamente esta gastando.
            </p>
          </div>

          {/* Card 4 - Censura via IA */}
          <div className="border-solid border-black border-3 p-8 rounded-xl shadow-xl hover:scale-105 transition-all col-span-2 h-[320px]">
            <div className="flex justify-center items-center mb-4">
              <div className="">
                <RiSecurePaymentFill fontSize={50} color="black" />
              </div>
            </div>
            <h3 className="text-2xl font-semibold text-white mb-4">
              Segurança Avançada
            </h3>
            <p className="text-gray-400">
              Seus dados financeiros sempre protegidos, com a criptografia de
              ponta a ponta, garantimos que todas as suas informações
              financeiras sejam mantidas em segurança
            </p>
          </div>
        </div>
      </section>

      {/* Final Section - Fade Transition with Gradual Color Change */}
      <section className="relative flex flex-col justify-center pb-20 items-center py-60 text-center bg-gradient-to-b from-[#2c1f4b] to-[#6a4c9c] transition-all duration-1000 ease-in-out">
        <div className="absolute inset-0 flex justify-center items-center">
          <Image
            src="/login-bg.png"
            alt="Background Image"
            layout="fill"
            objectFit="cover"
            className="w-full h-full opacity-75 max-w-none"
          />
        </div>
        <h2 className="pb-5 text-5xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-purple-200 to-white mb-6 drop-shadow-lg z-10">
          Faça agora sua conta e teste <br /> sem pagar nada!
        </h2>
        <Button
          variant="default"
          className="bg-green-700 hover:bg-green-900 text-white py-3 px-8 rounded-full h-13 w-62 text-lg z-10"
          onClick={() => router.push("/planos")}
        >
          Criar Conta
        </Button>
      </section>
    </div>
  );
};

export default LandingPage;
