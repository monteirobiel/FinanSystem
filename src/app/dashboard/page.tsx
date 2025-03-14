"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowUpRight,
  ArrowDownLeft,
  Wallet,
  Landmark,
  CreditCard,
  Briefcase,
  CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Menu,
  Home,
  Receipt,
  CreditCard as CreditCardIcon,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const Dashboard = () => {
  const pathname = usePathname();
  const [selectedMonth, setSelectedMonth] = useState("Março");
  const [selectedYear, setSelectedYear] = useState("2025");
  const [selectedDay, setSelectedDay] = useState(14);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

  const [tempMonth, setTempMonth] = useState("Março");
  const [tempYear, setTempYear] = useState("2025");
  const [tempDay, setTempDay] = useState(14);

  const months = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  type Month = (typeof months)[number];

  const daysInMonth: Record<Month, number> = {
    Janeiro: 31,
    Fevereiro: 28,
    Março: 31,
    Abril: 30,
    Maio: 31,
    Junho: 30,
    Julho: 31,
    Agosto: 31,
    Setembro: 30,
    Outubro: 31,
    Novembro: 30,
    Dezembro: 31,
  };

  const getDaysInMonth = (month: Month, year: string) => {
    if (
      month === "Fevereiro" &&
      Number(year) % 4 === 0 &&
      (Number(year) % 100 !== 0 || Number(year) % 400 === 0)
    ) {
      return 29;
    }
    return daysInMonth[month];
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 7 }, (_, i) =>
    String(currentYear - 3 + i)
  );

  const getFirstDayOfMonth = (month: string, year: string) => {
    const monthIndex = months.indexOf(month);
    return new Date(Number(year), monthIndex, 1).getDay();
  };

  const nextMonth = () => {
    const currentMonthIndex = months.indexOf(tempMonth);
    if (currentMonthIndex === 11) {
      setTempMonth(months[0]);
      setTempYear(String(Number(tempYear) + 1));
    } else {
      setTempMonth(months[currentMonthIndex + 1]);
    }
  };

  const previousMonth = () => {
    const currentMonthIndex = months.indexOf(tempMonth);
    if (currentMonthIndex === 0) {
      setTempMonth(months[11]);
      setTempYear(String(Number(tempYear) - 1));
    } else {
      setTempMonth(months[currentMonthIndex - 1]);
    }
  };

  const applyDate = () => {
    setSelectedMonth(tempMonth);
    setSelectedYear(tempYear);
    setSelectedDay(tempDay);
    setIsCalendarOpen(false);
  };

  const handleOpenChange = (
    open: boolean | ((prevState: boolean) => boolean)
  ) => {
    setIsCalendarOpen(open);
    if (open) {
      setTempMonth(selectedMonth);
      setTempYear(selectedYear);
      setTempDay(selectedDay);
    }
  };

  const goToToday = () => {
    const today = new Date();
    setTempMonth(months[today.getMonth()]);
    setTempYear(String(today.getFullYear()));
    setTempDay(today.getDate());
  };

  const toggleSidebar = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };

  const generateCalendarDays = () => {
    const firstDay = getFirstDayOfMonth(tempMonth, tempYear);
    const daysCount = getDaysInMonth(tempMonth, tempYear);
    const prevMonthIndex = months.indexOf(tempMonth) - 1;
    const prevMonth = prevMonthIndex < 0 ? months[11] : months[prevMonthIndex];
    const prevYear =
      prevMonthIndex < 0 ? String(Number(tempYear) - 1) : tempYear;
    const prevMonthDays = getDaysInMonth(prevMonth, prevYear);
    const days = [];

    for (let i = 0; i < firstDay; i++) {
      days.push({
        day: prevMonthDays - firstDay + i + 1,
        month: prevMonth,
        year: prevYear,
        isCurrentMonth: false,
      });
    }

    for (let i = 1; i <= daysCount; i++) {
      days.push({
        day: i,
        month: tempMonth,
        year: tempYear,
        isCurrentMonth: true,
      });
    }

    const nextMonthIndex = months.indexOf(tempMonth) + 1;
    const nextMonth = nextMonthIndex > 11 ? months[0] : months[nextMonthIndex];
    const nextYear =
      nextMonthIndex > 11 ? String(Number(tempYear) + 1) : tempYear;

    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        day: i,
        month: nextMonth,
        year: nextYear,
        isCurrentMonth: false,
      });
    }

    return days;
  };

  const isSelectedDate = (day: number, month: string, year: string) => {
    return day === tempDay && month === tempMonth && year === tempYear;
  };

  // Sidebar navigation items - Corrigido o caminho do Dashboard para /dashboard
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
        return "Assinatura";
      default:
        return "Dashboard";
    }
  };

  // Sidebar para mobile - Corrigido para usar o path correto
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
            <div className="flex items-center">
              <Image
                src="/f_logo.png"
                alt="FinanSystem"
                width={50}
                height={30}
              />
              <span className="ml-3 font-semibold text-lg text-white">
                financesystem
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
    <div className="flex h-screen bg-black mt-[-60px]">
      {/* Desktop Sidebar */}
      <div
        className={`fixed top-0 left-0 bottom-0 bg-zinc-950 border-r border-zinc-800 transition-all duration-300 ease-in-out z-10 ${
          isSidebarExpanded ? "w-64" : "w-16"
        }`}
      >
        <div className="flex items-center h-16 px-6 border-b border-zinc-800 justify-between">
          <div className="flex items-center space-x-[-20px] space-y-[-7px]">
            <Image src="/f_logo.png" alt="FinanSystem" width={50} height={30} />

            {isSidebarExpanded && (
              <span className="ml-3 font-semibold text-xl mr-35 text-white">
                finansystem
              </span>
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
        {/* Header */}
        <header className="h-16 flex items-center justify-between px-6 border-b border-zinc-800">
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
          <div className="flex items-center space-x-4 pr-10">
            {/* Calendário com Popover */}
            <Popover open={isCalendarOpen} onOpenChange={handleOpenChange}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="hidden md:flex items-center text-zinc-400 border-zinc-700 bg-black"
                >
                  <CalendarIcon size={16} className="mr-2" />
                  {selectedDay} de {selectedMonth} {selectedYear}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-0 bg-zinc-900 border-zinc-700">
                <div className="p-4 border-b border-zinc-800">
                  <div className="flex items-center justify-between">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-7 w-7 bg-zinc-800 border-zinc-700 text-zinc-400"
                      onClick={previousMonth}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <div className="flex items-center space-x-2">
                      <Select value={tempMonth} onValueChange={setTempMonth}>
                        <SelectTrigger className="w-[120px] h-8 bg-zinc-800 border-zinc-700 text-zinc-300">
                          <SelectValue placeholder="Mês" />
                        </SelectTrigger>
                        <SelectContent className="bg-zinc-800 border-zinc-700">
                          {months.map((month) => (
                            <SelectItem
                              key={month}
                              value={month}
                              className="text-zinc-300"
                            >
                              {month}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Select value={tempYear} onValueChange={setTempYear}>
                        <SelectTrigger className="w-[80px] h-8 bg-zinc-800 border-zinc-700 text-zinc-300">
                          <SelectValue placeholder="Ano" />
                        </SelectTrigger>

                        <SelectContent className="bg-zinc-800 border-zinc-700">
                          {years.map((year) => (
                            <SelectItem
                              key={year}
                              value={year}
                              className="text-zinc-300"
                            >
                              {year}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-7 w-7 bg-zinc-800 border-zinc-700 text-zinc-400"
                      onClick={nextMonth}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="p-4">
                  <div className="grid grid-cols-7 gap-1 mb-2">
                    {["D", "S", "T", "Q", "Q", "S", "S"].map((day, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-center h-8 text-xs font-medium text-zinc-400"
                      >
                        {day}
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-7 gap-1">
                    {generateCalendarDays().map((date, index) => (
                      <Button
                        key={index}
                        variant="ghost"
                        size="sm"
                        className={`h-8 w-8 p-0 ${
                          !date.isCurrentMonth
                            ? "text-zinc-600"
                            : isSelectedDate(date.day, date.month, date.year)
                            ? "bg-indigo-900/20 text-indigo-400 ring-1 ring-indigo-400"
                            : "text-zinc-300 hover:bg-zinc-800"
                        }`}
                        onClick={() => {
                          if (date.isCurrentMonth) {
                            setTempDay(date.day);
                          } else {
                            setTempMonth(date.month);
                            setTempYear(date.year);
                            setTempDay(date.day);
                          }
                        }}
                        disabled={!date.isCurrentMonth}
                      >
                        {date.day}
                      </Button>
                    ))}
                  </div>
                </div>
                <div className="p-4 border-t border-zinc-800 flex justify-between">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-zinc-400"
                    onClick={goToToday}
                  >
                    Hoje
                  </Button>
                  <Button
                    variant="default"
                    size="sm"
                    className="bg-indigo-600 text-white hover:bg-indigo-700"
                    onClick={applyDate}
                  >
                    Aplicar
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </header>

        {/* Main Content Scroll Area */}
        <div className="flex-1 overflow-auto p-6 bg-black pt-5">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Card className="p-4 border-none shadow-sm bg-zinc-900">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-zinc-400">Saldo Total</span>
                <div className="p-2 rounded-full bg-emerald-900/20 text-emerald-400">
                  <Wallet size={14} />
                </div>
              </div>
              <div className="flex items-baseline justify-between">
                <h3 className="text-2xl font-bold text-white">R$ 24.785,00</h3>
                <span className="text-xs px-2 py-1 rounded-full bg-emerald-900/20 text-emerald-400">
                  +2.4%
                </span>
              </div>
            </Card>

            <Card className="p-4 border-none shadow-sm bg-zinc-900">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-zinc-400">Receitas</span>
                <div className="p-2 rounded-full bg-blue-900/20 text-blue-400">
                  <ArrowUpRight size={14} />
                </div>
              </div>
              <div className="flex items-baseline justify-between">
                <h3 className="text-2xl font-bold text-white">R$ 8.450,00</h3>
                <span className="text-xs px-2 py-1 rounded-full bg-emerald-900/20 text-emerald-400">
                  +5.2%
                </span>
              </div>
            </Card>

            <Card className="p-4 border-none shadow-sm bg-zinc-900">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-zinc-400">Despesas</span>
                <div className="p-2 rounded-full bg-rose-900/20 text-rose-400">
                  <ArrowDownLeft size={14} />
                </div>
              </div>
              <div className="flex items-baseline justify-between">
                <h3 className="text-2xl font-bold text-white">R$ 3.255,00</h3>
                <span className="text-xs px-2 py-1 rounded-full bg-rose-900/20 text-rose-400">
                  -1.8%
                </span>
              </div>
            </Card>

            <Card className="p-4 border-none shadow-sm bg-zinc-900">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-zinc-400">Investimentos</span>
                <div className="p-2 rounded-full bg-indigo-900/20 text-indigo-400">
                  <Briefcase size={14} />
                </div>
              </div>
              <div className="flex items-baseline justify-between">
                <h3 className="text-2xl font-bold text-white">R$ 15.000,00</h3>
                <span className="text-xs px-2 py-1 rounded-full bg-emerald-900/20 text-emerald-400">
                  +8.5%
                </span>
              </div>
            </Card>
          </div>

          {/* Main Content Tabs */}
          <Tabs defaultValue="overview" className="mb-8">
            <TabsList className="mb-6 bg-zinc-800">
              <TabsTrigger
                value="overview"
                className="data-[state=active]:bg-zinc-700 text-zinc-300 data-[state=active]:text-white tab-hover"
              >
                Visão Geral
              </TabsTrigger>
              <TabsTrigger
                value="transactions"
                className="data-[state=active]:bg-zinc-700 text-zinc-300 data-[state=active]:text-white tab-hover"
              >
                Transações
              </TabsTrigger>
              <TabsTrigger
                value="analysis"
                className="data-[state=active]:bg-zinc-700 text-zinc-300 data-[state=active]:text-white tab-hover"
              >
                Análise
              </TabsTrigger>
              <TabsTrigger
                value="budgets"
                className="data-[state=active]:bg-zinc-700 text-zinc-300 data-[state=active]:text-white tab-hover"
              >
                Orçamentos
              </TabsTrigger>
            </TabsList>

            <TabsContent
              value="overview"
              className="grid grid-cols-1 lg:grid-cols-3 gap-6"
            >
              {/* Chart & Stats */}
              <Card className="col-span-2 p-6 border-none shadow-sm bg-zinc-900">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-medium text-white">Fluxo de Caixa</h3>
                  <Button variant="ghost" size="sm" className="text-zinc-300">
                    <CalendarIcon size={16} className="mr-2" />
                    Últimos 30 dias
                  </Button>
                </div>

                {/* Chart Placeholder */}
                <div className="h-64 bg-zinc-800 rounded-lg mb-4 flex items-center justify-center">
                  <div className="flex items-center space-x-6">
                    <div className="flex flex-col items-center">
                      <div className="w-16 h-64 bg-zinc-700 rounded-lg relative">
                        <div className="absolute bottom-0 w-full h-1/3 bg-blue-500 rounded-b-lg"></div>
                      </div>
                      <span className="mt-2 text-xs text-zinc-400">Jan</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-16 h-64 bg-zinc-700 rounded-lg relative">
                        <div className="absolute bottom-0 w-full h-1/2 bg-blue-500 rounded-b-lg"></div>
                      </div>
                      <span className="mt-2 text-xs text-zinc-400">Fev</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-16 h-64 bg-zinc-700 rounded-lg relative">
                        <div className="absolute bottom-0 w-full h-3/4 bg-blue-500 rounded-b-lg"></div>
                      </div>
                      <span className="mt-2 text-xs text-zinc-400">Mar</span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                    <span className="text-sm text-zinc-400">Receitas</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-rose-500"></div>
                    <span className="text-sm text-zinc-400">Despesas</span>
                  </div>
                </div>
              </Card>

              {/* Recent Transactions */}
              <Card className="p-6 border-none shadow-sm bg-zinc-900">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-medium text-white">
                    Transações Recentes
                  </h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 px-2 text-xs text-zinc-300"
                  >
                    Ver todas
                  </Button>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-zinc-800/50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 rounded-full bg-blue-900/20 text-blue-400">
                        <Landmark size={16} />
                      </div>
                      <div>
                        <p className="font-medium text-sm text-white">
                          Salário
                        </p>
                        <p className="text-xs text-zinc-400">14 de março</p>
                      </div>
                    </div>
                    <span className="text-emerald-400 font-medium">
                      + R$ 5.400,00
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-zinc-800/50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 rounded-full bg-rose-900/20 text-rose-400">
                        <CreditCard size={16} />
                      </div>
                      <div>
                        <p className="font-medium text-sm text-white">
                          Supermercado
                        </p>
                        <p className="text-xs text-zinc-400">12 de março</p>
                      </div>
                    </div>
                    <span className="text-rose-400 font-medium">
                      - R$ 235,80
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-zinc-800/50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 rounded-full bg-rose-900/20 text-rose-400">
                        <CreditCard size={16} />
                      </div>
                      <div>
                        <p className="font-medium text-sm text-white">
                          Netflix
                        </p>
                        <p className="text-xs text-zinc-400">10 de março</p>
                      </div>
                    </div>
                    <span className="text-rose-400 font-medium">
                      - R$ 39,90
                    </span>
                  </div>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="transactions">
              <Card className="p-6 border-none shadow-sm bg-zinc-900">
                <h3 className="font-medium mb-4 text-white">
                  Histórico de Transações
                </h3>
                <p className="text-zinc-400">
                  Conteúdo da aba de transações aparecerá aqui.
                </p>
              </Card>
            </TabsContent>

            <TabsContent value="analysis">
              <Card className="p-6 border-none shadow-sm bg-zinc-900">
                <h3 className="font-medium mb-4 text-white">Análise</h3>
              </Card>
            </TabsContent>

            <TabsContent value="budgets">
              <Card className="p-6 border-none shadow-sm bg-zinc-900">
                <h3 className="font-medium mb-4 text-white">Orçamentos</h3>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
