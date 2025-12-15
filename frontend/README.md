# 💻 GNN Jandira - Frontend

Interface web do sistema **GNN Jandira**, um portal de comunicação cidadã que permite aos moradores acompanhar notícias da cidade e reportar problemas de infraestrutura (ocorrências) diretamente para a prefeitura.

---

## 🚀 Funcionalidades

### 📰 Notícias
- **Feed de Notícias:** Visualização de notícias recentes com carregamento dinâmico.
- **Destaque:** Notícia principal em destaque no topo da página.
- **Categorias:** Filtragem de notícias (Geral, Infraestrutura, Segurança, etc.).
- **Upload de Capa:** Admin pode cadastrar notícias com foto de capa.

### ⚠️ Ocorrências (Reportar Problemas)
- **Cadastro:** Registro de ocorrências com título, descrição, categoria e nível de urgência.
- **Geolocalização:** Integração com **ViaCEP** para preenchimento automático de endereço.
- **Evidências:** Upload de fotos para comprovar o problema.
- **Timeline de Histórico:** Acompanhamento visual das mudanças de status (Pendente -> Em Análise -> Resolvido), com data e responsável pela alteração.
- **Feed da Cidade:** Visualização de ocorrências públicas de outros cidadãos.

### 👤 Usuário
- **Autenticação:** Login e Cadastro de novos usuários.
- **Perfil:** Edição de dados pessoais e foto de perfil.
- **Admin:** Controles exclusivos para administradores (Botão de criar notícia).

### 🚧 Em Desenvolvimento
- **Comentários:** Interface preparada para interação em notícias e ocorrências.

---

## 🛠️ Tecnologias Utilizadas

O projeto foi construído utilizando tecnologias nativas da web, focando em performance e aprendizado dos fundamentos.

- **HTML5** (Semântico)
- **CSS3** (Variáveis CSS, Flexbox, Grid Layout e Design Responsivo)
- **JavaScript ES6+** (Modules, Async/Await, Fetch API)
- **FontAwesome** (Ícones)
- **Integrações:**
  - API Própria (Node.js/Express)
  - ViaCEP (Autocompletar endereços)
  - Cloudinary (Via Backend para armazenamento de imagens)

---

## 📂 Estrutura de Pastas

```bash
frontend/
│
├── assets/
│   ├── css/           # Estilos globais (global.css) e componentes
│   ├── img/           # Ícones, logos e placeholders
│   └── js/            # Serviços de integração com API (noticias.js, ocorrencias.js, etc.)
│
├── pages/
│   ├── home/          # Página Principal (Feed de Notícias)
│   ├── login/         # Telas de Login e Cadastro
│   ├── ocorrencias/   # Gestão de Ocorrências e Timeline
│   └── perfil/        # Edição de Perfil do Usuário
│
└── index.html         # Redirecionamento inicial