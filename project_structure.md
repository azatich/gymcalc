# 📁 gymcalc - Project Structure

*Generated on: 11/19/2025, 1:23:56 PM*

## 📋 Quick Overview

| Metric | Value |
|--------|-------|
| 📄 Total Files | 63 |
| 📁 Total Folders | 35 |
| 🌳 Max Depth | 5 levels |
| 🛠️ Tech Stack | React, Next.js, TypeScript, CSS, Node.js |

## ⭐ Important Files

- 🟡 🚫 **.gitignore** - Git ignore rules
- 🔵 🔍 **eslint.config.mjs** - ESLint config
- 🟡 ▲ **next.config.ts** - Next.js config
- 🟡 🔒 **package-lock.json** - Dependency lock
- 🔴 📦 **package.json** - Package configuration
- 🔴 📖 **README.md** - Project documentation
- 🟡 🔷 **tsconfig.json** - TypeScript config

## 📊 File Statistics

### By File Type

- ⚛️ **.tsx** (React TypeScript files): 29 files (46.0%)
- 🔷 **.ts** (TypeScript files): 20 files (31.7%)
- 🎨 **.svg** (SVG images): 5 files (7.9%)
- ⚙️ **.json** (JSON files): 4 files (6.3%)
- 📄 **.mjs** (Other files): 2 files (3.2%)
- 🚫 **.gitignore** (Git ignore): 1 files (1.6%)
- 🎨 **.css** (Stylesheets): 1 files (1.6%)
- 📖 **.md** (Markdown files): 1 files (1.6%)

### By Category

- **React**: 29 files (46.0%)
- **TypeScript**: 20 files (31.7%)
- **Assets**: 5 files (7.9%)
- **Config**: 4 files (6.3%)
- **Other**: 2 files (3.2%)
- **DevOps**: 1 files (1.6%)
- **Styles**: 1 files (1.6%)
- **Docs**: 1 files (1.6%)

### 📁 Largest Directories

- **root**: 63 files
- **app**: 20 files
- **components**: 11 files
- **features\library**: 9 files
- **features**: 9 files

## 🌳 Directory Structure

```
gymcalc/
├── 🟡 🚫 **.gitignore**
├── 🚀 app/
│   ├── 📂 (auth)/
│   │   ├── 📂 auth/
│   │   │   └── 📂 callback/
│   │   │   │   └── 🔷 route.ts
│   │   ├── ⚛️ layout.tsx
│   │   ├── 📂 login/
│   │   │   ├── 🧩 components/
│   │   │   │   ├── ⚛️ LoginForm.tsx
│   │   │   │   └── ⚛️ SignInWithGoogleButton.tsx
│   │   │   └── ⚛️ page.tsx
│   │   ├── 📂 logout/
│   │   │   └── ⚛️ page.tsx
│   │   └── 📂 signup/
│   │   │   ├── 🧩 components/
│   │   │   │   └── ⚛️ SignUpForm.tsx
│   │   │   └── ⚛️ page.tsx
│   ├── 📂 (routes)/
│   │   ├── 📂 home/
│   │   │   └── ⚛️ page.tsx
│   │   ├── ⚛️ layout.tsx
│   │   └── 📂 library/
│   │   │   └── ⚛️ page.tsx
│   ├── 🔌 api/
│   │   ├── 📂 auth/
│   │   │   └── 📂 me/
│   │   │   │   └── 🔷 route.ts
│   │   └── 📂 library/
│   │   │   ├── 📂 add/
│   │   │   │   └── 🔷 route.ts
│   │   │   ├── 📂 delete/
│   │   │   │   └── 📂 [id]/
│   │   │   │   │   └── 🔷 route.ts
│   │   │   └── 📂 get/
│   │   │   │   └── 🔷 route.ts
│   ├── ⚛️ layout.tsx
│   ├── ⚛️ page.tsx
│   ├── 📂 providers/
│   │   ├── ⚛️ query-provider.tsx
│   │   └── ⚛️ toaster.tsx
│   └── 🎨 styles/
│   │   └── 🎨 globals.css
├── 🧩 components/
│   ├── ⚛️ LoginLogoutButton.tsx
│   ├── ⚛️ Sidebar.tsx
│   ├── ⚛️ SidebarClient.tsx
│   ├── 🎨 ui/
│   │   ├── ⚛️ button.tsx
│   │   ├── ⚛️ card.tsx
│   │   ├── ⚛️ dialog.tsx
│   │   ├── ⚛️ input.tsx
│   │   ├── ⚛️ label.tsx
│   │   ├── ⚛️ select.tsx
│   │   └── ⚛️ sonner.tsx
│   └── ⚛️ UserGreetText.tsx
├── ⚙️ components.json
├── 🔵 🔍 **eslint.config.mjs**
├── 📂 features/
│   └── 📂 library/
│   │   ├── 🔌 api/
│   │   │   └── 🔷 api.ts
│   │   ├── 🧩 components/
│   │   │   ├── ⚛️ AddProductLibrary.tsx
│   │   │   ├── ⚛️ FoodLists.tsx
│   │   │   ├── ⚛️ FoodListsSkeleton.tsx
│   │   │   └── ⚛️ SearchProduct.tsx
│   │   ├── 🔷 constants.ts
│   │   └── 🎣 hooks/
│   │   │   ├── 🔷 useDeleteFoodLibraryMutation.ts
│   │   │   ├── 🔷 useFoodLibraryMutation.ts
│   │   │   └── 🔷 useFoodLibraryQuery.ts
├── 📚 lib/
│   ├── 🔷 auth-actions.ts
│   ├── 🔷 axios.ts
│   └── 🔷 utils.ts
├── 🔷 middleware.ts
├── 🔷 next-env.d.ts
├── 🟡 ▲ **next.config.ts**
├── 🟡 🔒 **package-lock.json**
├── 🔴 📦 **package.json**
├── 📄 postcss.config.mjs
├── 🌐 public/
│   ├── 🎨 file.svg
│   ├── 🎨 globe.svg
│   ├── 🎨 next.svg
│   ├── 🎨 vercel.svg
│   └── 🎨 window.svg
├── 🔴 📖 **README.md**
├── 📂 shared/
│   └── 🔌 api/
│   │   └── 🔷 query-client.ts
├── 🟡 🔷 **tsconfig.json**
└── 🔧 utils/
│   └── 📂 supabase/
│   │   ├── 🔷 client.ts
│   │   ├── 🔷 middleware.ts
│   │   └── 🔷 server.ts
```

## 📖 Legend

### File Types
- 🚫 DevOps: Git ignore
- 🔷 TypeScript: TypeScript files
- ⚛️ React: React TypeScript files
- 🎨 Styles: Stylesheets
- ⚙️ Config: JSON files
- 📄 Other: Other files
- 🎨 Assets: SVG images
- 📖 Docs: Markdown files

### Importance Levels
- 🔴 Critical: Essential project files
- 🟡 High: Important configuration files
- 🔵 Medium: Helpful but not essential files
