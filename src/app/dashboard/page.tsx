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
  Briefcase,
  CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Menu,
  Home,
  Receipt,
  CreditCard as CreditCardIcon,
  PlusIcon,
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

const Dashboard = () => {
  const pathname = usePathname();
  const [selectedMonth, setSelectedMonth] = useState("Março");
  const [selectedYear, setSelectedYear] = useState("2025");
  const [selectedDay, setSelectedDay] = useState(14);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [isTransactionDialogOpen, setIsTransactionDialogOpen] = useState(false);

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
        return "Assinatura";
      default:
        return "Dashboard";
    }
  };

  // Get current date for the transaction form
  const getCurrentDate = () => {
    const today = new Date();
    const day = today.getDate().toString().padStart(2, "0");
    const year = today.getFullYear();
    return `${day} de ${months[today.getMonth()]} de ${year}`;
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
            <div className="flex items-center">
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

  // Transaction Dialog Component
  const TransactionDialog = () => (
    <Dialog
      open={isTransactionDialogOpen}
      onOpenChange={setIsTransactionDialogOpen}
    >
      <DialogContent className="bg-zinc-950 border-zinc-800 text-white sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-white text-xl font-semibold">
            Adicionar transação
          </DialogTitle>
          <p className="text-zinc-400 text-sm">Insira as informações abaixo</p>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="space-y-2">
            <label
              htmlFor="title"
              className="text-sm font-medium text-zinc-200"
            >
              Título
            </label>
            <Input
              id="title"
              placeholder="Digite o título da transação..."
              className="bg-zinc-900 border-zinc-800 text-white"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="value"
              className="text-sm font-medium text-zinc-200"
            >
              Valor
            </label>
            <Input
              id="value"
              placeholder="Digite o valor..."
              className="bg-zinc-900 border-zinc-800 text-white"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="type" className="text-sm font-medium text-zinc-200">
              Tipo da transação
            </label>
            <Select>
              <SelectTrigger className="bg-zinc-900 border-zinc-800 text-white">
                <SelectValue placeholder="Selecione o tipo da transação" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-900 border-zinc-800 text-white">
                <SelectItem value="receita">Receita</SelectItem>
                <SelectItem value="despesa">Despesa</SelectItem>
                <SelectItem value="investimento">Investimento</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="category"
              className="text-sm font-medium text-zinc-200"
            >
              Selecione uma categoria
            </label>
            <Select>
              <SelectTrigger className="bg-zinc-900 border-zinc-800 text-white">
                <SelectValue placeholder="Outro" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-900 border-zinc-800 text-white">
                <SelectItem value="outro">Outro</SelectItem>
                <SelectItem value="alimentacao">Alimentação</SelectItem>
                <SelectItem value="transporte">Transporte</SelectItem>
                <SelectItem value="lazer">Lazer</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button
            variant="outline"
            className="w-full bg-zinc-900 border-zinc-800 text-indigo-400 flex items-center justify-center gap-2"
          >
            <PlusIcon size={16} />
            Adicionar nova Categoria
          </Button>

          <div className="space-y-2">
            <label
              htmlFor="paymentMethod"
              className="text-sm font-medium text-zinc-200"
            >
              Método de pagamento
            </label>
            <Select>
              <SelectTrigger className="bg-zinc-900 border-zinc-800 text-white">
                <SelectValue placeholder="Dinheiro" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-900 border-zinc-800 text-white">
                <SelectItem value="dinheiro">Dinheiro</SelectItem>
                <SelectItem value="credito">Cartão de Crédito</SelectItem>
                <SelectItem value="debito">Cartão de Débito</SelectItem>
                <SelectItem value="pix">PIX</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label htmlFor="date" className="text-sm font-medium text-zinc-200">
              Data da transação
            </label>
            <Button
              variant="outline"
              className="w-full justify-start text-left font-normal bg-zinc-900 border-zinc-800 text-white"
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {getCurrentDate()}
            </Button>
          </div>
        </div>

        <DialogFooter className="flex space-x-2 justify-end sm:justify-end">
          <DialogClose asChild>
            <Button
              variant="outline"
              className="bg-transparent text-white border-zinc-700"
            >
              Cancelar
            </Button>
          </DialogClose>
          <Button className="bg-indigo-600 hover:bg-indigo-700">
            Adicionar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
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
            {/* Card 1: Saldo Total */}
            <Card className="p-4 border-none shadow-sm bg-zinc-900 h-full">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-zinc-400">Saldo Total</span>
                <div className="p-2 rounded-full bg-emerald-900/20 text-emerald-400">
                  <Wallet size={14} />
                </div>
              </div>
              <div className="flex items-baseline justify-between">
                <h3 className="text-2xl font-bold text-white">R$ 0,00</h3>
                <span className="text-xs px-2 py-1 rounded-full bg-emerald-900/20 text-emerald-400">
                  0%
                </span>
              </div>
            </Card>

            {/* Card 2: Receitas */}
            <Card className="p-4 border-none shadow-sm bg-zinc-900 h-full">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-zinc-400">Receitas</span>
                <div className="p-2 rounded-full bg-blue-900/20 text-blue-400">
                  <ArrowUpRight size={14} />
                </div>
              </div>
              <div className="flex items-baseline justify-between">
                <h3 className="text-2xl font-bold text-white">R$ 0,00</h3>
                <span className="text-xs px-2 py-1 rounded-full bg-emerald-900/20 text-emerald-400">
                  0%
                </span>
              </div>
            </Card>

            {/* Card 3: Despesas */}
            <Card className="p-4 border-none shadow-sm bg-zinc-900 h-full">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-zinc-400">Despesas</span>
                <div className="p-2 rounded-full bg-rose-900/20 text-rose-400">
                  <ArrowDownLeft size={14} />
                </div>
              </div>
              <div className="flex items-baseline justify-between">
                <h3 className="text-2xl font-bold text-white">R$ 0,00</h3>
                <span className="text-xs px-2 py-1 rounded-full bg-rose-900/20 text-rose-400">
                  0%
                </span>
              </div>
            </Card>

            {/* Card 4: Investimentos */}
            <Card className="p-4 border-none shadow-sm bg-zinc-900 h-full">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-zinc-400">Investimentos</span>
                <div className="p-2 rounded-full bg-indigo-900/20 text-indigo-400">
                  <Briefcase size={14} />
                </div>
              </div>
              <div className="flex items-baseline justify-between">
                <h3 className="text-2xl font-bold text-white">R$ 0,00</h3>
                <span className="text-xs px-2 py-1 rounded-full bg-emerald-900/20 text-emerald-400">
                  0%
                </span>
              </div>
            </Card>
          </div>

          {/* Botão de Nova Transação */}
          <div className="mb-8">
            <Button
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-full w-50 flex items-center justify-center gap-2"
              onClick={() => setIsTransactionDialogOpen(true)}
            >
              <PlusIcon size={16} />
              Adicionar Transação
            </Button>
          </div>

          {/* Transaction Dialog */}
          <TransactionDialog />

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

                {/* Empty Chart Placeholder */}
                <div className="h-64 bg-zinc-800 rounded-lg mb-4 flex items-center justify-center">
                  <p className="text-zinc-500">Sem dados de fluxo de caixa</p>
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

                {/* Empty State for Transactions */}
                <div className="flex flex-col items-center justify-center h-48 text-center">
                  <Receipt size={40} className="text-zinc-700 mb-3" />
                  <p className="text-zinc-500 mb-1">
                    Nenhuma transação recente
                  </p>
                  <p className="text-zinc-600 text-sm">
                    Adicione transações para visualizá-las aqui
                  </p>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="transactions">
              <Card className="p-6 border-none shadow-sm bg-zinc-900">
                <h3 className="font-medium mb-4 text-white">
                  Histórico de Transações
                </h3>
                <div className="flex flex-col items-center justify-center h-48 text-center">
                  <Receipt size={40} className="text-zinc-700 mb-3" />
                  <p className="text-zinc-500 mb-1">
                    Nenhuma transação encontrada
                  </p>
                  <p className="text-zinc-600 text-sm">
                    As transações aparecerão aqui quando forem adicionadas
                  </p>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="analysis">
              <Card className="p-6 border-none shadow-sm bg-zinc-900">
                <h3 className="font-medium mb-4 text-white">Análise</h3>
                <div className="flex flex-col items-center justify-center h-48 text-center">
                  <p className="text-zinc-500 mb-1">Sem dados para análise</p>
                  <p className="text-zinc-600 text-sm">
                    Adicione transações para gerar análises
                  </p>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="budgets">
              <Card className="p-6 border-none shadow-sm bg-zinc-900">
                <h3 className="font-medium mb-4 text-white">Orçamentos</h3>
                <div className="flex flex-col items-center justify-center h-48 text-center">
                  <p className="text-zinc-500 mb-1">
                    Nenhum orçamento configurado
                  </p>
                  <p className="text-zinc-600 text-sm">
                    Configure orçamentos para acompanhar seus gastos
                  </p>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
