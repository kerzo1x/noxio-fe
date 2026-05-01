<script setup lang="ts">
import { onMounted } from 'vue';
import api from '../../api';
import HeaderComponent from './components/HeaderComponent.vue';

onMounted(async () => {
  try {
    // Просто делаем запрос. 
    // Если токен протух — интерцептор сам его обновит и вернет данные.
    // Если токен совсем плохой — интерцептор выкинет на /login.
    const { data } = await api.get('/auth/me'); 
    console.log('User data:', data.data);
  } catch (err) {
    console.log('error');
  }
});
</script>

<template>
    <div>
        <HeaderComponent/>
        <h1>HOME PAGE</h1>
    </div>
</template>