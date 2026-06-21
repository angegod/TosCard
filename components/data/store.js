import { defineStore } from 'pinia'

export const useCardBtnStore = defineStore('CardButton', {
    state: () => ({
        //控制頂端按鈕顯示與否
        Cardbutton:true,
        //控制搜尋模式，true為條件搜尋，false為文字搜尋
        TextOrCondition:true,
        //計算器模式
        CalculateMode:false,
        isMatch:false
    }),
    actions: {
        showCardBtn(){
            this.Cardbutton = true;
        },
        HideCardBtn(){
            this.Cardbutton = false;
        },
        StartMatch(){
            this.isMatch = true;
        },
        StopMatch(){
            this.isMatch = false;
        }
    }
});