# Bus Stops Panel

Painel de gerenciamento de paradas de ônibus em Next.js + shadcn/ui + Zod.

## Estrutura de arquivos

```
app/
  dashboard/
    layout.tsx           ← Layout com Sidebar
    page.tsx             ← Dashboard home
    paradas/
      page.tsx           ← Página principal (CRUD completo)

components/
  Sidebar.tsx            ← Sidebar com navegação
  BusStopTable.tsx       ← Tabela com edit/delete
  BusStopForm.tsx        ← Formulário com Zod validation
  StatsCards.tsx         ← Cards de estatísticas

schemas/
  busStopSchema.ts       ← Zod schema

types/
  busStop.ts             ← Interface BusStop

data/
  mockData.ts            ← Dados mock (substitua por API)
```

## Setup

### 1. Instalar dependências

```bash
npm install react-hook-form @hookform/resolvers zod lucide-react sonner
```

### 2. Instalar componentes shadcn

```bash
npx shadcn@latest add button input label form table badge dialog alert-dialog
```

### 3. Copiar arquivos para seu projeto Next.js

Copie os arquivos respeitando a estrutura acima.

### 4. Substituir dados mock por API

Em `app/dashboard/paradas/page.tsx`, troque o `useState(mockBusStops)` 
e as funções `handleCreate`, `handleEdit`, `handleDelete` por chamadas à sua API.

Exemplo com fetch:
```ts
const handleCreate = async (data: BusStopFormData) => {
  await fetch("/api/paradas", {
    method: "POST",
    body: JSON.stringify(data),
  });
  // refetch ou atualizar estado
};
```

## Modelo de dados

```ts
interface BusStop {
  id: string;
  nome: string;
  latitude: number;
  longitude: number;
  linhas: string[];
  criadoEm?: string;
}
```

## Features incluídas

- ✅ Listagem com tabela
- ✅ Busca por nome e linha
- ✅ Criar parada (Dialog + Form + Zod)
- ✅ Editar parada
- ✅ Excluir com confirmação (AlertDialog)
- ✅ Cards de estatísticas
- ✅ Sidebar com navegação ativa
- ✅ Toast notifications (sonner)
- ✅ Validação de formulário com mensagens de erro
- ✅ Tags de linhas com add/remove dinâmico