<script lang="ts" setup>
import { ref, watch, provide, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router';
import Footers from './pages/Footer.vue';
import { useCardBtnStore } from './components/data/store';

// 路由資訊
const route = useRoute();

//共用狀態
const store = useCardBtnStore();

// 圖片前綴 (避免 SSR 錯誤)
const isAddable = ref('');
const config = useRuntimeConfig();
isAddable.value = (config.app.baseURL === '/')?'':config.app.baseURL; // Nuxt 會自動給正確值

//往下提供前綴字串
provide('frontpath', isAddable.value);


function normalizePath(path: string) {
    path = path.toLowerCase();
    path = path.split('?')[0].split('#')[0];
    return path.endsWith('/') ? path : `${path}/`;
}

// 選單狀態與卡片按鈕狀態
const show = ref(store.Cardbutton);
const showCardBtn = computed(() => {
    return store.Cardbutton;
});

onMounted(() => {
    show.value = window.innerWidth < 500

    // 根據初始路由設置
    updateHeader(route.path);

});

// 監聽路由變化
watch(
  () => route.path,
  (newPath) => {
    updateHeader(newPath)
  }
)

function updateHeader(path: string) {
    show.value = window.innerWidth < 500;

    path = normalizePath(path);
    
    const map: Record<string, number> = {
        '/': 1
    };

    const index = map[path];
    if (index !== undefined) {
        addDash(index);
    }

    //showCardBtn.value = ((path === '/card/')&&store.Cardbutton);
}

function showMenu() {
    if (!import.meta.client) return
    const menu = document.getElementById('headerMenu')
    show.value = !show.value
    if (menu) menu.classList.toggle('expand', show.value)
}

function addDash(index:number) {
    const menuLink = document.querySelectorAll('.link')
    const menuLink2 = document.querySelectorAll('.sublink');

    //配合目前的路徑 將對應路由按鈕底色改掉
    menuLink.forEach((el, i) => {
        el.classList.toggle('redText', i === index - 1)
    });
    menuLink2.forEach((el, i) => {
        el.classList.toggle('redText', i === index - 1)
    });

    document.getElementById('headerMenu')?.classList.remove('expand')
}

function startMatch() {
    store.StartMatch();
}

function changeSearchMode() {
    store.TextOrCondition = !store.TextOrCondition;
}

function callcalculator() {
    store.CalculateMode = !store.CalculateMode;
}


</script>
<template>
   <header class="header">
        <div class="menu flex flex-row justify-between max-[700px]:flex-col" id="biggerHeader">
            <div class="flex flex-row max-[350px]:flex-col">
                <h1 class="text-[28px] font-bold text-red-600 mr-3">時光牌圖鑑</h1>
                <Switch ref="b1" @refresh="changeSearchMode" :text1="'條件搜尋'" :text2="'文字搜尋'"/>
            </div>
            <div class="!p-0 !flex gap-2 items-center" v-if="showCardBtn">
                <button class="searchBtn bg-amber-800 
                text-white border-amber-800 w-[100px] h-[35px] rounded-md text-xl" @click="startMatch">開始匹配</button>
                <button type="button" class="text-white border-b-white border-b-[1px] h-min" @click="callcalculator">琉璃計算器</button>
            </div>
        </div>
    </header>
    
    <div class="app">
        <NuxtPage />
    </div>
    <Footers />
</template>

<style lang="scss" scoped>
@use 'assets/css/menu.scss';


</style>
<style>
body {
   background-color: rgb(11, 11, 11);
   margin: 0px;
}
</style>
