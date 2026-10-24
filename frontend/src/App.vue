<script setup>
import { RouterLink, RouterView } from 'vue-router'
import {GlobalLoading} from "./components/index.js";

// Cada elemento del menú: ruta, texto e icono (path SVG de Heroicons, estilo outline)
const menuItems = [
  {
    to: '/',
    label: 'Inicio',
    icon: 'm2.25 12 8.954-8.955a1.126 1.126 0 0 1 1.592 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25',
  },
]
</script>

<template>
  <!-- <GlobalLoading></GlobalLoading> -->
  <!--
    Móvil/tablet (< lg): columna -> contenido arriba, menú abajo.
    Escritorio (>= lg): fila -> menú a la izquierda, contenido a la derecha.
  -->
  <div class="fixed inset-0 flex flex-col bg-white text-slate-900 lg:flex-row">
    <!-- Contenido de la ruta -->
    <main class="min-h-0 flex-1 overflow-y-auto p-4 sm:p-6 lg:order-2 lg:p-8">
      <RouterView />
    </main>

    <!-- Menú -->
    <nav
        aria-label="Navegación principal"
        class="shrink-0 border-t border-slate-200 bg-white pb-[env(safe-area-inset-bottom)]
             lg:order-1 lg:w-64 lg:border-r lg:border-t-0 lg:pb-0"
    >
      <ul class="flex items-stretch justify-around lg:flex-col lg:justify-start lg:gap-1 lg:p-4">
        <li v-for="item in menuItems" :key="item.to" class="flex-1 lg:flex-none">
          <RouterLink
              :to="item.to"
              class="flex flex-col items-center justify-center gap-1 px-2 py-2 text-xs font-medium
                   text-slate-500 transition-colors hover:text-slate-900
                   focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-indigo-600
                   lg:flex-row lg:justify-start lg:gap-3 lg:rounded-lg lg:px-3 lg:py-2.5 lg:text-sm
                   lg:hover:bg-slate-100"
              active-class="!text-indigo-600 lg:!bg-indigo-50"
          >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="h-6 w-6 shrink-0"
                aria-hidden="true"
            >
              <path stroke-linecap="round" stroke-linejoin="round" :d="item.icon" />
            </svg>
            <span>{{ item.label }}</span>
          </RouterLink>
        </li>
      </ul>
    </nav>
  </div>
</template>