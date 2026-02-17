import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useThemeStore = defineStore('themeData', () => {
  const savedState = JSON.parse(localStorage.getItem('theme_settings')) || {};
  
  const isDark = ref(savedState.isDark ?? false);
  const header = ref(savedState.header ?? 'green');
  const font = ref(savedState.font ?? 'black');

  const toggleTheme = () => {
    isDark.value = !isDark.value;
    header.value = isDark.value ? 'black' : 'green';
    font.value = isDark.value ? 'white' : 'black';
  };

  return { isDark, header, font, toggleTheme };
});

export function registerThemePersistence(store, vuetifyTheme) {
  store.$subscribe((mutation, state) => {
    localStorage.setItem('theme_settings', JSON.stringify(state));
    vuetifyTheme.name.value = state.isDark ? 'dark' : 'light';
  });
}