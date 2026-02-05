import {ref,computed} from 'vue'
import { defineStore } from 'pinia'
export const createUser = defineStore('userData',()=>{
    const newData = ref([])
    const search=ref("")
    function addUser(user){
        newData.value.push({...user,id: newData.value.length + 1});
    }

    const filteredUsers = computed(()=>{
    if (search.value === ""){
        return newData.value
    }

    return newData.value.filter(user=>{
        return user.name.toLowerCase().includes(search.value.toLowerCase())
    })
})

    return {newData,search,addUser,filteredUsers}
})