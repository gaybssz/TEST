import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function DocumentsPage() {
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
          <h2 className="text-2xl font-bold">Documentos</h2>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Novo Documento
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Nova Fatura</DropdownMenuItem>
              <DropdownMenuItem>Novo Orçamento</DropdownMenuItem>
              <DropdownMenuItem>Nova Nota de Crédito</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="mb-6">
          <Tabs defaultValue="all">
            <TabsList>
              <TabsTrigger value="all">Todos</TabsTrigger>
              <TabsTrigger value="invoices">Faturas</TabsTrigger>
              <TabsTrigger value="quotes">Orçamentos</TabsTrigger>
              <TabsTrigger value="credit-notes">Notas de Crédito</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="mt-4">
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-center">
                    <CardTitle>Todos os Documentos</CardTitle>
                    <div className="flex space-x-2">
                      <Input placeholder="Buscar documento..." className="w-64" />
                      <Button variant="outline" size="icon">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                        </svg>
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Número</TableHead>
                        <TableHead>Tipo</TableHead>
                        <TableHead>Cliente</TableHead>
                        <TableHead>Data</TableHead>
                        <TableHead>Valor</TableHead>
                        <TableHead>Estado</TableHead>
                        <TableHead>VERI*FACTU</TableHead>
                        <TableHead>Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>FACT-2025001</TableCell>
                        <TableCell>Fatura</TableCell>
                        <TableCell>Tech Solutions Ltd</TableCell>
                        <TableCell>27/04/2025</TableCell>
                        <TableCell>€1,845.00</TableCell>
                        <TableCell><span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Pago</span></TableCell>
                        <TableCell><span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Registrado</span></TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">Ações</Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>Ver</DropdownMenuItem>
                              <DropdownMenuItem>Editar</DropdownMenuItem>
                              <DropdownMenuItem>Baixar PDF</DropdownMenuItem>
                              <DropdownMenuItem>Enviar por Email</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>Verificar VERI*FACTU</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>FACT-2025002</TableCell>
                        <TableCell>Fatura</TableCell>
                        <TableCell>Digital Marketing SL</TableCell>
                        <TableCell>26/04/2025</TableCell>
                        <TableCell>€950.00</TableCell>
                        <TableCell><span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">Pendente</span></TableCell>
                        <TableCell><span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">Pendente</span></TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">Ações</Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>Ver</DropdownMenuItem>
                              <DropdownMenuItem>Editar</DropdownMenuItem>
                              <DropdownMenuItem>Baixar PDF</DropdownMenuItem>
                              <DropdownMenuItem>Enviar por Email</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>Registrar no VERI*FACTU</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>ORCM-2025005</TableCell>
                        <TableCell>Orçamento</TableCell>
                        <TableCell>Consultoria ABC</TableCell>
                        <TableCell>25/04/2025</TableCell>
                        <TableCell>€1,200.00</TableCell>
                        <TableCell><span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">Rascunho</span></TableCell>
                        <TableCell>-</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">Ações</Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>Ver</DropdownMenuItem>
                              <DropdownMenuItem>Editar</DropdownMenuItem>
                              <DropdownMenuItem>Baixar PDF</DropdownMenuItem>
                              <DropdownMenuItem>Enviar por Email</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>Converter em Fatura</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
                <CardFooter className="border-t px-3 py-2 flex justify-between">
                  <div className="text-sm text-slate-500">Mostrando 3 de 24 documentos</div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" disabled>Anterior</Button>
                    <Button variant="outline" size="sm">Próximo</Button>
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="invoices" className="mt-4">
              {/* Similar content for invoices tab */}
            </TabsContent>
            <TabsContent value="quotes" className="mt-4">
              {/* Similar content for quotes tab */}
            </TabsContent>
            <TabsContent value="credit-notes" className="mt-4">
              {/* Similar content for credit notes tab */}
            </TabsContent>
          </Tabs>
        </div>

        {/* Document Editor Dialog */}
        <Dialog>
          <DialogTrigger asChild>
            <Button className="hidden">Editar Documento</Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>Nova Fatura</DialogTitle>
              <DialogDescription>
                Crie uma nova fatura. Preencha todos os campos obrigatórios.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <Tabs defaultValue="details" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="details">Detalhes</TabsTrigger>
                  <TabsTrigger value="items">Itens</TabsTrigger>
                  <TabsTrigger value="settings">Configurações</TabsTrigger>
                </TabsList>
                <TabsContent value="details" className="space-y-4 mt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="client">Cliente</Label>
                      <Select>
                        <option>Selecione um cliente</option>
                        <option>Tech Solutions Ltd</option>
                        <option>Digital Marketing SL</option>
                        <option>Consultoria ABC</option>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="document-type">Tipo de Documento</Label>
                      <Select>
                        <option>Fatura</option>
                        <option>Orçamento</option>
                        <option>Nota de Crédito</option>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="document-number">Número do Documento</Label>
                      <Input id="document-number" value="FACT-2025003" readOnly />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="document-date">Data do Documento</Label>
                      <Input id="document-date" type="date" defaultValue="2025-04-27" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="due-date">Data de Vencimento</Label>
                      <Input id="due-date" type="date" defaultValue="2025-05-27" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="payment-method">Forma de Pagamento</Label>
                      <Select>
                        <option>Transferência Bancária</option>
                        <option>Cartão de Crédito</option>
                        <option>Dinheiro</option>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="notes">Observações</Label>
                    <Textarea id="notes" placeholder="Observações ou notas adicionais" />
                  </div>
                </TabsContent>
                <TabsContent value="items" className="space-y-4 mt-4">
                  <div className="flex justify-end">
                    <Button>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      Adicionar Item
                    </Button>
                  </div>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Descrição</TableHead>
                        <TableHead>Quantidade</TableHead>
                        <TableHead>Preço</TableHead>
                        <TableHead>Imposto</TableHead>
                        <TableHead>Total</TableHead>
                        <TableHead></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>
                          <Input placeholder="Descrição do item" defaultValue="Consultoria Web" />
                        </TableCell>
                        <TableCell>
                          <Input type="number" defaultValue="10" min="1" />
                        </TableCell>
                        <TableCell>
                          <Input type="number" defaultValue="150.00" min="0" step="0.01" />
                        </TableCell>
                        <TableCell>
                          <Select>
                            <option>23%</option>
                            <option>10%</option>
                            <option>6%</option>
                            <option>0%</option>
                          </Select>
                        </TableCell>
                        <TableCell>€1,500.00</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </Button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                  <div className="flex justify-end space-y-2">
                    <div className="w-64 space-y-2">
                      <div className="flex justify-between">
                        <span>Subtotal:</span>
                        <span>€1,500.00</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Imposto (23%):</span>
                        <span>€345.00</span>
                      </div>
                      <div className="flex justify-between font-bold">
                        <span>Total:</span>
                        <span>€1,845.00</span>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="settings" className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="template">Modelo de Documento</Label>
                    <Select>
                      <option>Clássico</option>
                      <option>Moderno</option>
                      <option>Profissional</option>
                      <option>Minimalista</option>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="logo">Logo da Empresa</Label>
                    <div className="border-2 border-dashed border-slate-200 p-6 rounded-md text-center">
                      <Button variant="outline">Selecionar arquivo</Button>
                      <p className="text-sm text-slate-500 mt-2">PNG, JPG ou SVG (recomendado)</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Opções de Documento</Label>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="show-borders" />
                        <Label htmlFor="show-borders">Mostrar Bordas</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="rounded-corners" />
                        <Label htmlFor="rounded-corners">Cantos Arredondados</Label>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="verifactu-options">Opções VERI*FACTU</Label>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="register-verifactu" defaultChecked />
                        <Label htmlFor="register-verifactu">Registrar automaticamente no VERI*FACTU</Label>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
            <DialogFooter>
              <Button variant="outline">Cancelar</Button>
              <Button variant="outline">Salvar Rascunho</Button>
              <Button>Finalizar Documento</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* VERI*FACTU Verification Dialog */}
        <Dialog>
          <DialogTrigger asChild>
            <Button className="hidden">Verificar VERI*FACTU</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Verificação VERI*FACTU</DialogTitle>
              <DialogDescription>
                Detalhes da verificação do documento no sistema VERI*FACTU.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="bg-green-50 border border-green-200 rounded-md p-4">
                <div className="flex items-center space-x-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="font-medium text-green-800">Documento verificado com sucesso</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="font-medium">Número do Documento:</span>
                  <span>FACT-2025001</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Código Público:</span>
                  <span>FACT-2025001</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Hash:</span>
                  <span className="text-sm">sample_hash_20250427104530</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Data de Registro:</span>
                  <span>27/04/2025 10:45:30</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Estado:</span>
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Registrado</span>
                </div>
              </div>
              <div className="border-t pt-4">
                <h4 className="font-medium mb-2">Histórico de Operações</h4>
                <div className="space-y-2">
                  <div className="bg-slate-50 p-2 rounded-md">
                    <div className="flex justify-between text-sm">
                      <span>Registro Inicial</span>
                      <span>27/04/2025 10:45:30</span>
                    </div>
                    <div className="text-xs text-slate-500">
                      Documento registrado com sucesso no sistema VERI*FACTU.
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-center">
                <div className="border p-4 rounded-md">
                  {/* QR Code placeholder */}
                  <div className="w-32 h-32 bg-slate-200 flex items-center justify-center">
                    QR Code
                  </div>
                  <div className="text-center text-sm mt-2">
                    Código de Verificação
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline">Baixar Certificado</Button>
              <Button>Fechar</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
}
