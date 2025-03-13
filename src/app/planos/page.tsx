"use client"; // Garantir que o componente seja tratado no cliente

import { useRouter } from "next/navigation";
import Image from "next/image";
import { FiArrowUp } from "react-icons/fi";
import { LuArrowDown } from "react-icons/lu";

const PlanosPage = () => {
  const router = useRouter();

  return (
    <div className="bg-gray-950">
      <div className="bg-gradient-to-t text-white h-screen mt-[-80px]">
        {/* Main Content */}
        <main className="flex flex-col items-left space-y-[-60px] pl-10 ">
          <Image
            src="/f_logo.png"
            alt="FinanSystem"
            width={70}
            height={60}
            className="pt-10"
          ></Image>
          <h1 className="text-2xl font-semibold pb-25 pl-13 pt-1">
            Assinaturas
          </h1>

          {/* Planos Section */}
          <div className="flex justify-center space-x-10 pt-10 ">
            {/* Plano Gratuito */}
            <div className="bg-gray-950 border-solid border-gray-500 border-1  p-6 rounded-xl shadow-lg w-90 h-150  flex flex-col items-center">
              <h3 className="text-2xl font-semibold text-white mb-5 mt-5">
                Plano Gratuito
              </h3>
              <div className="inline-flex items-baseline pb-20">
                <span className="text-5xl font-semibold text-white">R$ 0</span>
                <span className="text-xl text-gray-600">/ mês</span>
              </div>
              <ul className="text-white mt-4 space-y-3 font-semibold w-100 pl-10">
                <li className="flex items-center">
                  <FiArrowUp className="mr-2" color="green" size={20} />
                  Controle basico do seu financeiro
                </li>
                <li className="flex items-center">
                  <FiArrowUp className="mr-2" color="green" size={20} />
                  Crie somente 10 transações ao mês
                </li>
                <li className="flex items-center">
                  <FiArrowUp className="mr-2" color="green" size={20} />
                  Crie apenas 5 novas categorias
                </li>
                <li className="flex items-center text-gray-700">
                  <LuArrowDown className="mr-2" color="red" size={20} />
                  Registro de gastos e receitas Ilimitados
                </li>
                <li className="flex items-center text-gray-700">
                  <LuArrowDown className="mr-2" color="red" size={20} />
                  Crie categorias ilimitadas
                </li>
                <li className="flex items-center text-gray-700">
                  <LuArrowDown className="mr-2" color="red" size={20} />
                  Suporte prioriatário 24 horas
                </li>
              </ul>
              <button
                className="w-80 mt-20 py-3  bg-purple-800 hover:bg-purple-900 text-white rounded-4xl"
                onClick={() => router.push("/login")}
              >
                Escolher Plano
              </button>
            </div>

            {/* Plano Premium */}
            <div className="bg-gray-950 border-solid border-gray-500 border-1 p-6 rounded-xl shadow-lg w-90 h-150 flex flex-col items-center">
              <h3 className="text-2xl font-semibold text-white mb-5 mt-5">
                Plano Premium
              </h3>
              <div className="inline-flex items-baseline">
                <span className="text-5xl font-semibold text-white pb-20">
                  R$ 9,90
                </span>
                <span className="text-xl text-gray-600">/ mês</span>
              </div>
              <ul className="text-white mt-4 space-y-3 font-semibold w-100 pl-10">
                <li className="flex items-center">
                  <FiArrowUp className="mr-2" color="green" size={20} />
                  Controle basico do seu financeiro
                </li>
                <li className="flex items-center">
                  <FiArrowUp className="mr-2" color="green" size={20} />
                  Crie somente 10 transações ao mês
                </li>
                <li className="flex items-center">
                  <FiArrowUp className="mr-2" color="green" size={20} />
                  Crie apenas 5 novas categorias
                </li>
                <li className="flex items-center">
                  <FiArrowUp className="mr-2" color="green" size={20} />
                  Registro de gastos e receitas Ilimitados
                </li>
                <li className="flex items-center">
                  <FiArrowUp className="mr-2" color="green" size={20} />
                  Crie categorias ilimitadas
                </li>
                <li className="flex items-center">
                  <FiArrowUp className="mr-2" color="green" size={20} />
                  Suporte prioriatário 24 horas
                </li>
              </ul>
              <button className="w-80 mt-20 py-3 bg-purple-800 hover:bg-purple-900 text-white rounded-4xl">
                Escolher Plano
              </button>
            </div>
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="text-center py-1 text-gray-400 pt-40">
        <p>&copy; 2025 FinanSystem. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
};

export default PlanosPage;
