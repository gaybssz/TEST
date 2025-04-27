import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ClientsPage() {
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
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Clientes</h2>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Novo Cliente
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Adicionar Novo Cliente</DialogTitle>
                <DialogDescription>
                  Preencha os dados do cliente. Clique em salvar quando terminar.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <Tabs defaultValue="info" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="info">Informações Básicas</TabsTrigger>
                    <TabsTrigger value="contacts">Contatos</TabsTrigger>
                  </TabsList>
                  <TabsContent value="info" className="space-y-4 mt-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="client-type">Tipo de Cliente</Label>
                        <div className="flex space-x-4">
                          <div className="flex items-center space-x-2">
                            <input type="radio" id="person" name="client-type" defaultChecked />
                            <Label htmlFor="person">Pessoa Física</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <input type="radio" id="company" name="client-type" />
                            <Label htmlFor="company">Pessoa Jurídica</Label>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="doc-type">Tipo de Documento</Label>
                        <Select>
                          <option>DNI</option>
                          <option>NIF</option>
                          <option>Passaporte</option>
                        </Select>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="doc-number">Número do Documento</Label>
                        <Input id="doc-number" placeholder="12345678Z" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="name">Nome / Razão Social</Label>
                        <Input id="name" placeholder="Nome completo ou empresa" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="first-name">Primeiro Nome</Label>
                        <Input id="first-name" placeholder="Primeiro nome" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="last-name">Sobrenome</Label>
                        <Input id="last-name" placeholder="Sobrenome" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address-type">Endereço</Label>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="street-type">Tipo de Via</Label>
                          <Select>
                            <option>Calle</option>
                            <option>Avenida</option>
                            <option>Plaza</option>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="street-name">Nome da Via</Label>
                          <Input id="street-name" placeholder="Nome da rua" />
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="number">Número</Label>
                        <Input id="number" placeholder="123" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="floor">Andar</Label>
                        <Input id="floor" placeholder="2º" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="door">Porta / Complemento</Label>
                        <Input id="door" placeholder="Porta B" />
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="postal-code">Código Postal</Label>
                        <Input id="postal-code" placeholder="28001" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="city">Cidade</Label>
                        <Input id="city" placeholder="Madrid" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="province">Província</Label>
                        <Input id="province" placeholder="Madrid" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="country">País</Label>
                      <Select>
                        <option>Espanha</option>
                        <option>Portugal</option>
                        <option>França</option>
                      </Select>
                    </div>
                  </TabsContent>
                  <TabsContent value="contacts" className="space-y-4 mt-4">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-medium">Email</h3>
                        <Button variant="outline" size="sm">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                          </svg>
                          Adicionar Email
                        </Button>
                      </div>
                      <div className="space-y-2 border p-3 rounded-md">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center space-x-2">
                            <input type="checkbox" id="primary-email" />
                            <Label htmlFor="primary-email">Principal</Label>
                          </div>
                          <Button variant="ghost" size="sm">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </Button>
                        </div>
                        <Input placeholder="email@exemplo.com" />
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-medium">Telefone</h3>
                        <Button variant="outline" size="sm">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                          </svg>
                          Adicionar Telefone
                        </Button>
                      </div>
                      <div className="space-y-2 border p-3 rounded-md">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center space-x-2">
                            <input type="checkbox" id="primary-phone" defaultChecked />
                            <Label htmlFor="primary-phone">Principal</Label>
                          </div>
                          <Button variant="ghost" size="sm">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </Button>
                        </div>
                        <Input placeholder="+34 612 345 678" />
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-medium">WhatsApp</h3>
                        <Button variant="outline" size="sm">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                          </svg>
                          Adicionar WhatsApp
                        </Button>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
              <DialogFooter>
                <Button variant="outline">Cancelar</Button>
                <Button>Salvar Cliente</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="mb-6">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <CardTitle>Lista de Clientes</CardTitle>
                <div className="flex space-x-2">
                  <Input placeholder="Buscar cliente..." className="w-64" />
                  <Button variant="outline" size="icon">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                    </svg>
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3">Nome / Empresa</th>
                    <th className="text-left p-3">NIF</th>
                    <th className="text-left p-3">Email</th>
                    <th className="text-left p-3">Telefone</th>
                    <th className="text-left p-3">Cidade</th>
                    <th className="text-left p-3">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b hover:bg-slate-50">
                    <td className="p-3">Tech Solutions Ltd</td>
                    <td className="p-3">12345678Z</td>
                    <td className="p-3">info@techsolutions.com</td>
                    <td className="p-3">+34 612 345 678</td>
                    <td className="p-3">Madrid</td>
                    <td className="p-3">
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm">Editar</Button>
                        <Button variant="ghost" size="sm">Ver</Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">Mais</Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Nova Fatura</DropdownMenuItem>
                            <DropdownMenuItem>Novo Orçamento</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">Excluir</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </td>
                  </tr>
                  <tr className="border-b hover:bg-slate-50">
                    <td className="p-3">Digital Marketing SL</td>
                    <td className="p-3">87654321X</td>
                    <td className="p-3">contact@digitalmarketing.es</td>
                    <td className="p-3">+34 698 765 432</td>
                    <td className="p-3">Barcelona</td>
                    <td className="p-3">
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm">Editar</Button>
                        <Button variant="ghost" size="sm">Ver</Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">Mais</Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Nova Fatura</DropdownMenuItem>
                            <DropdownMenuItem>Novo Orçamento</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">Excluir</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="p-3">Consultoria ABC</td>
                    <td className="p-3">56789012B</td>
                    <td className="p-3">info@consultoriaabc.es</td>
                    <td className="p-3">+34 634 567 890</td>
                    <td className="p-3">Valencia</td>
                    <td className="p-3">
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm">Editar</Button>
                        <Button variant="ghost" size="sm">Ver</Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">Mais</Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Nova Fatura</DropdownMenuItem>
                            <DropdownMenuItem>Novo Orçamento</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">Excluir</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </CardContent>
            <CardFooter className="border-t px-3 py-2 flex justify-between">
              <div className="text-sm text-slate-500">Mostrando 3 de 18 clientes</div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" disabled>Anterior</Button>
                <Button variant="outline" size="sm">Próximo</Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  );
}
