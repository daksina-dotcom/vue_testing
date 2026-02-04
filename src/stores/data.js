import {ref,computed} from 'vue'
import { defineStore } from 'pinia'
export const createUser = defineStore('userData',()=>{
    const newData = ref([])
    function addUser(user){
        newData.value.push({...user,id: newData.value.length + 1});
    }

    const filterUsers = computed(()=>{
    if (search.value == ""){
        return userStore.newData
    }

    return userStore.newData.filter(user=>{
        user.name.toLowerCase().includes(search)
    })
})



    return {newData,addUser,filterUsers}
})