import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function VerifactuPage() {
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
          <h2 className="text-2xl font-bold">VERI*FACTU</h2>
          <div className="flex space-x-2">
            <Button variant="outline">Verificar Documento</Button>
            <Button>Sincronizar</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Documentos Registrados</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-slate-500 mt-1">+5 desde a última semana</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Documentos Pendentes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2</div>
              <p className="text-xs text-slate-500 mt-1">Aguardando registro</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Estado do Sistema</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-green-700 font-medium">Conectado</span>
              </div>
              <p className="text-xs text-slate-500 mt-1">Última sincronização: 27/04/2025 11:30</p>
            </CardContent>
          </Card>
        </div>

        <div className="mb-6">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <CardTitle>Documentos VERI*FACTU</CardTitle>
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
                    <TableHead>Documento</TableHead>
                    <TableHead>Código Público</TableHead>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Hash</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>FACT-2025001</TableCell>
                    <TableCell>FACT-2025001</TableCell>
                    <TableCell>Tech Solutions Ltd</TableCell>
                    <TableCell>27/04/2025</TableCell>
                    <TableCell><span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Registrado</span></TableCell>
                    <TableCell className="text-xs">sample_hash_20250427104530</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">Ações</Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Ver Documento</DropdownMenuItem>
                          <DropdownMenuItem>Verificar</DropdownMenuItem>
                          <DropdownMenuItem>Baixar Certificado</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">Cancelar Registro</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>FACT-2024098</TableCell>
                    <TableCell>FACT-2024098</TableCell>
                    <TableCell>Digital Marketing SL</TableCell>
                    <TableCell>20/04/2025</TableCell>
                    <TableCell><span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">Cancelado</span></TableCell>
                    <TableCell className="text-xs">sample_hash_20250420093015</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">Ações</Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Ver Documento</DropdownMenuItem>
                          <DropdownMenuItem>Verificar</DropdownMenuItem>
                          <DropdownMenuItem>Baixar Certificado</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>FACT-2025002</TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>Consultoria ABC</TableCell>
                    <TableCell>26/04/2025</TableCell>
                    <TableCell><span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">Pendente</span></TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">Ações</Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Ver Documento</DropdownMenuItem>
                          <DropdownMenuItem>Registrar</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="border-t px-3 py-2 flex justify-between">
              <div className="text-sm text-slate-500">Mostrando 3 de 26 documentos</div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" disabled>Anterior</Button>
                <Button variant="outline" size="sm">Próximo</Button>
              </div>
            </CardFooter>
          </Card>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-bold mb-4">Verificação Pública</h2>
          <Card>
            <CardHeader>
              <CardTitle>Verificar Documento</CardTitle>
              <CardDescription>
                Verifique a autenticidade de um documento usando seu código público e o NIF do cliente.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="public-code">Código Público</Label>
                  <Input id="public-code" placeholder="Ex: FACT-2025001" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nif">NIF do Cliente</Label>
                  <Input id="nif" placeholder="Ex: 12345678Z" />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Verificar</Button>
            </CardFooter>
          </Card>
        </div>

        {/* Verification Result Dialog */}
        <Dialog>
          <DialogTrigger asChild>
            <Button className="hidden">Resultado da Verificação</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Resultado da Verificação</DialogTitle>
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
                  <span className="font-medium">Cliente:</span>
                  <span>Tech Solutions Ltd</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">NIF:</span>
                  <span>12345678Z</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Data do Documento:</span>
                  <span>27/04/2025</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Valor Total:</span>
                  <span>€1,845.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Hash:</span>
                  <span className="text-sm">sample_hash_20250427104530</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Estado:</span>
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Registrado</span>
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
