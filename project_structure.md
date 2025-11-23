# 📁 gymcalc - Project Structure

*Generated on: 11/22/2025, 4:50:16 AM*

## 📋 Quick Overview

| Metric | Value |
|--------|-------|
| 📄 Total Files | 79 |
| 📁 Total Folders | 40 |
| 🌳 Max Depth | 4 levels |
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

- ⚛️ **.tsx** (React TypeScript files): 39 files (49.4%)
- 🔷 **.ts** (TypeScript files): 30 files (38.0%)
- ⚙️ **.json** (JSON files): 4 files (5.1%)
- 📄 **.mjs** (Other files): 2 files (2.5%)
- 📖 **.md** (Markdown files): 2 files (2.5%)
- 🚫 **.gitignore** (Git ignore): 1 files (1.3%)
- 🎨 **.css** (Stylesheets): 1 files (1.3%)

### By Category

- **React**: 39 files (49.4%)
- **TypeScript**: 30 files (38.0%)
- **Config**: 4 files (5.1%)
- **Other**: 2 files (2.5%)
- **Docs**: 2 files (2.5%)
- **DevOps**: 1 files (1.3%)
- **Styles**: 1 files (1.3%)

### 📁 Largest Directories

- **root**: 79 files
- **app**: 24 files
- **features**: 20 files
- **features\library**: 13 files
- **components**: 12 files

## 🌳 Directory Structure

```
gymcalc/
├── 🟡 🚫 **.gitignore**
├── 🚀 app/
│   ├── 📂 (private)/
│   │   ├── 📂 home/
│   │   │   └── ⚛️ page.tsx
│   │   ├── ⚛️ layout.tsx
│   │   ├── 📂 library/
│   │   │   └── ⚛️ page.tsx
│   │   └── 📂 profile/
│   │   │   └── ⚛️ page.tsx
│   ├── 📂 (public)/
│   │   ├── 📂 auth/
│   │   │   └── 📂 callback/
│   │   │   │   └── 🔷 route.ts
│   │   ├── ⚛️ layout.tsx
│   │   ├── 📂 login/
│   │   │   ├── 🧩 components/
│   │   │   │   ├── ⚛️ LoginForm.tsx
│   │   │   │   └── ⚛️ SignInWithGoogleButton.tsx
│   │   │   ├── 🔷 constants.ts
│   │   │   └── ⚛️ page.tsx
│   │   ├── 📂 logout/
│   │   │   └── ⚛️ page.tsx
│   │   └── 📂 signup/
│   │   │   ├── 🧩 components/
│   │   │   │   └── ⚛️ SignUpForm.tsx
│   │   │   └── ⚛️ page.tsx
│   ├── 🔌 api/
│   │   ├── 📂 auth/
│   │   │   └── 📂 me/
│   │   │   │   └── 🔷 route.ts
│   │   ├── 📂 library/
│   │   │   ├── 📂 [id]/
│   │   │   │   └── 🔷 route.ts
│   │   │   ├── 📂 add/
│   │   │   │   └── 🔷 route.ts
│   │   │   └── 🔷 route.ts
│   │   └── 📂 profile/
│   │   │   └── 🔷 route.ts
│   ├── ⚛️ layout.tsx
│   ├── ⚛️ page.tsx
│   ├── 📂 providers/
│   │   ├── ⚛️ query-provider.tsx
│   │   ├── ⚛️ theme-provider.tsx
│   │   └── ⚛️ toaster.tsx
│   └── 🎨 styles/
│   │   └── 🎨 globals.css
├── 🧩 components/
│   ├── ⚛️ LoginLogoutButton.tsx
│   ├── ⚛️ Sidebar.tsx
│   ├── ⚛️ SidebarClient.tsx
│   ├── ⚛️ ThemeToggle.tsx
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
│   ├── 📂 library/
│   │   ├── 🔌 api/
│   │   │   └── 🔷 api.ts
│   │   ├── 🧩 components/
│   │   │   ├── ⚛️ AddProductItem.tsx
│   │   │   ├── ⚛️ DeleteProductItem.tsx
│   │   │   ├── ⚛️ EditProductItem.tsx
│   │   │   ├── ⚛️ FoodLists.tsx
│   │   │   ├── ⚛️ FoodListsSkeleton.tsx
│   │   │   └── ⚛️ SearchProduct.tsx
│   │   ├── 🔷 constants.ts
│   │   ├── 🎣 hooks/
│   │   │   ├── 🔷 useDeleteFoodLibraryMutation.ts
│   │   │   ├── 🔷 useFoodLibraryMutation.ts
│   │   │   ├── 🔷 useFoodLibraryQuery.ts
│   │   │   └── 🔷 useUpdateFoodFromLibraryMutation.ts
│   │   └── 📂 types/
│   │   │   └── 🔷 types.ts
│   └── 📂 profile/
│   │   ├── 🔌 api/
│   │   │   └── 🔷 api.ts
│   │   ├── 🧩 components/
│   │   │   ├── ⚛️ CalculatedStats.tsx
│   │   │   ├── ⚛️ Header.tsx
│   │   │   └── ⚛️ ProfileForm.tsx
│   │   ├── 🎣 hooks/
│   │   │   ├── ⚛️ useProfileFormMutation.tsx
│   │   │   └── ⚛️ useProfileQuery.tsx
│   │   └── 📂 types/
│   │   │   └── 🔷 types.ts
├── 📚 lib/
│   ├── 🔷 auth-actions.ts
│   ├── 🔷 axios.ts
│   ├── 📂 supabase/
│   │   ├── 🔷 client.ts
│   │   ├── 🔷 middleware.ts
│   │   └── 🔷 server.ts
│   ├── 🔷 useFormHandlers.ts
│   ├── 🔷 utils.ts
│   ├── 🔷 validationLoginSignupForms.ts
│   ├── 🔷 validationProductAddForm.ts
│   └── 🔷 validationProfileForm.ts
├── 🔷 middleware.ts
├── 🔷 next-env.d.ts
├── 🟡 ▲ **next.config.ts**
├── 🟡 🔒 **package-lock.json**
├── 🔴 📦 **package.json**
├── 📄 postcss.config.mjs
├── 📖 project_structure.md
├── 🌐 public/
├── 🔴 📖 **README.md**
├── 📂 shared/
│   └── 🔌 api/
│   │   └── 🔷 query-client.ts
└── 🟡 🔷 **tsconfig.json**
```

## 📖 Legend

### File Types
- 🚫 DevOps: Git ignore
- ⚛️ React: React TypeScript files
- 🔷 TypeScript: TypeScript files
- 🎨 Styles: Stylesheets
- ⚙️ Config: JSON files
- 📄 Other: Other files
- 📖 Docs: Markdown files

### Importance Levels
- 🔴 Critical: Essential project files
- 🟡 High: Important configuration files
- 🔵 Medium: Helpful but not essential files
