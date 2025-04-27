import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <h1 className="text-xl font-bold">InvoiceX</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm">Ajuda</Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Avatar>
                    <AvatarFallback>US</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Perfil</DropdownMenuItem>
                <DropdownMenuItem>Configurações</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Sair</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total de Faturas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-slate-500 mt-1">+12% em relação ao mês anterior</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Valor Total</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">€4,550.00</div>
              <p className="text-xs text-slate-500 mt-1">+8% em relação ao mês anterior</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Clientes Ativos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">18</div>
              <p className="text-xs text-slate-500 mt-1">+2 novos este mês</p>
            </CardContent>
          </Card>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-bold mb-4">Atividade Recente</h2>
          <Tabs defaultValue="documents">
            <TabsList>
              <TabsTrigger value="documents">Documentos</TabsTrigger>
              <TabsTrigger value="clients">Clientes</TabsTrigger>
              <TabsTrigger value="verifactu">VERI*FACTU</TabsTrigger>
            </TabsList>
            <TabsContent value="documents" className="mt-4">
              <Card>
                <CardContent className="p-0">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-3">Número</th>
                        <th className="text-left p-3">Cliente</th>
                        <th className="text-left p-3">Data</th>
                        <th className="text-left p-3">Valor</th>
                        <th className="text-left p-3">Estado</th>
                        <th className="text-left p-3">Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b hover:bg-slate-50">
                        <td className="p-3">FACT-2025001</td>
                        <td className="p-3">Tech Solutions Ltd</td>
                        <td className="p-3">27/04/2025</td>
                        <td className="p-3">€1,845.00</td>
                        <td className="p-3"><span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Registrado</span></td>
                        <td className="p-3">
                          <Button variant="ghost" size="sm">Ver</Button>
                        </td>
                      </tr>
                      <tr className="border-b hover:bg-slate-50">
                        <td className="p-3">FACT-2025002</td>
                        <td className="p-3">Digital Marketing SL</td>
                        <td className="p-3">26/04/2025</td>
                        <td className="p-3">€950.00</td>
                        <td className="p-3"><span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">Pendente</span></td>
                        <td className="p-3">
                          <Button variant="ghost" size="sm">Ver</Button>
                        </td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                        <td className="p-3">FACT-2025003</td>
                        <td className="p-3">Consultoria ABC</td>
                        <td className="p-3">25/04/2025</td>
                        <td className="p-3">€1,200.00</td>
                        <td className="p-3"><span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">Rascunho</span></td>
                        <td className="p-3">
                          <Button variant="ghost" size="sm">Ver</Button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </CardContent>
                <CardFooter className="border-t px-3 py-2">
                  <Button variant="outline" size="sm">Ver Todos</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="clients" className="mt-4">
              <Card>
                <CardContent className="p-0">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-3">Nome</th>
                        <th className="text-left p-3">NIF</th>
                        <th className="text-left p-3">Email</th>
                        <th className="text-left p-3">Telefone</th>
                        <th className="text-left p-3">Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b hover:bg-slate-50">
                        <td className="p-3">Tech Solutions Ltd</td>
                        <td className="p-3">12345678Z</td>
                        <td className="p-3">info@techsolutions.com</td>
                        <td className="p-3">+34 612 345 678</td>
                        <td className="p-3">
                          <Button variant="ghost" size="sm">Ver</Button>
                        </td>
                      </tr>
                      <tr className="border-b hover:bg-slate-50">
                        <td className="p-3">Digital Marketing SL</td>
                        <td className="p-3">87654321X</td>
                        <td className="p-3">contact@digitalmarketing.es</td>
                        <td className="p-3">+34 698 765 432</td>
                        <td className="p-3">
                          <Button variant="ghost" size="sm">Ver</Button>
                        </td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                        <td className="p-3">Consultoria ABC</td>
                        <td className="p-3">56789012B</td>
                        <td className="p-3">info@consultoriaabc.es</td>
                        <td className="p-3">+34 634 567 890</td>
                        <td className="p-3">
                          <Button variant="ghost" size="sm">Ver</Button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </CardContent>
                <CardFooter className="border-t px-3 py-2">
                  <Button variant="outline" size="sm">Ver Todos</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="verifactu" className="mt-4">
              <Card>
                <CardContent className="p-0">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-3">Documento</th>
                        <th className="text-left p-3">Código Público</th>
                        <th className="text-left p-3">Data</th>
                        <th className="text-left p-3">Estado</th>
                        <th className="text-left p-3">Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b hover:bg-slate-50">
                        <td className="p-3">FACT-2025001</td>
                        <td className="p-3">FACT-2025001</td>
                        <td className="p-3">27/04/2025</td>
                        <td className="p-3"><span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Registrado</span></td>
                        <td className="p-3">
                          <Button variant="ghost" size="sm">Verificar</Button>
                        </td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                        <td className="p-3">FACT-2024098</td>
                        <td className="p-3">FACT-2024098</td>
                        <td className="p-3">20/04/2025</td>
                        <td className="p-3"><span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">Cancelado</span></td>
                        <td className="p-3">
                          <Button variant="ghost" size="sm">Verificar</Button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </CardContent>
                <CardFooter className="border-t px-3 py-2">
                  <Button variant="outline" size="sm">Ver Todos</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Ações Rápidas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full justify-start" variant="outline">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Nova Fatura
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Novo Cliente
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Gerar Relatório
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Estado VERI*FACTU</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Sistema Conectado</span>
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Ativo</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Documentos Registrados</span>
                  <span className="font-medium">24</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Documentos Pendentes</span>
                  <span className="font-medium">2</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Última Sincronização</span>
                  <span className="text-sm text-slate-500">27/04/2025 10:30</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
