<script setup lang="ts">
import { ref } from 'vue'
import router from '../../router'
</script>

<template>
    <div class="grid grid-cols-2">
        <!-- left side -->
        <div class="bg-brand-gray">

        </div>
        <!-- right side -->
        <div class="flex flex-col items-center justify-center min-h-screen">
            <div class="flex flex-col items-center">
                <h1 class="self-start pb-[48px]">Log In</h1>
                <form class="flex flex-col" action="">
                    <label class="default"for="email">Email Address:</label>
                    <input type="email" id="email" name="email">
                    <label class="default" for="passworf">Password:</label>
                    <input type="password" id="password" name="password">
                </form>
                <p class="default self-end">Forgot password?</p>
                <button>Log In</button>
            </div>
            <p class="or">or</p>
            <button>Log in with Google</button>
            <p class="default">Do you have account? Sign Up</p>
        </div>
    </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100..900;1,100..900&display=swap');
input {
    
}
h1 {
    font-family: Roboto;
    font-weight: 700;
    font-style: Bold;
    font-size: 42px;
    line-height: 110.00000000000001%;

}
.default{
    font-family: Roboto;
    font-weight: 400;
    font-style: Regular;
    font-size: 14px;
    line-height: 140%;
}
.or {
    font-family: Roboto;
    font-weight: 500;
    font-style: Medium;
    font-size: 16px;
    line-height: 100%;
    letter-spacing: 0.5px;
    color: #21272A;
}
</style>