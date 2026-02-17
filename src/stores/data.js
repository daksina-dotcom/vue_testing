import { ref, computed } from "vue";
import { defineStore } from "pinia";
import api from "@/services/api";
import router from "@/router";
import Cookies from "js-cookie";
export const createUser = defineStore("userData", () => {
  const newData = ref([]);
  const search = ref("");
  const currentUser = ref(null);
  const editingUser = ref(null)
  const token = ref(Cookies.get('auth_token')||null)
  const paginationMeta = ref(null)

const initAuth = () => {
    const savedToken = Cookies.get('auth_token') || localStorage.getItem('token');
    if (savedToken) {
      token.value = savedToken;
    }
  };

  async function addUser(user) {
    try{const response = await api.post('/signup',user)
      console.log("Full Backend Response:", response);
      console.log("Full Backend Response:", response.data.receivedData);
      
    newData.value.push(response.data.receivedData);
    return response.data
  }
    catch(e){
      throw e.response?.data || "Signup Failed"
    }
  }

  async function loginUser(credentials) {
    try{
      const response = await api.post('/login',credentials)

      const userData = response.data.user
      currentUser.value = userData


      const exists = newData.value.find(u => u.id === userData.id);
    if (!exists) {
      newData.value.push(userData);
    }
      return true
      
    }catch(e){
      console.log("Login Failed: ",e.response?.data)
      return false

    }
  }

async function logoutUser() {
  try {
    await api.post('/logout'); 
    alert("Logged out successfully")
  } finally {
    currentUser.value = null;
    token.value = null;
    Cookies.remove('auth_token');
    Cookies.remove('adonis_session')
    router.push('/login');
  }
}

async function updateUserInfo(updatedData,method='PUT') {
  if (!updatedData || !updatedData.id) {
    throw new Error("User ID is required for update.");
  }

  try {
    const { id, ...dataToSave } = updatedData;
    const response = method === 'PATCH' 
      ? await api.patch(`/users/${id}`, dataToSave)
      : await api.put(`/users/${id}`, dataToSave);
    const serverData = response.data.receivedData
    const index = newData.value.findIndex((u) => u.id === serverData.id)
    if (index !== -1) {
      newData.value[index] = { ...serverData }
      if (currentUser.value && currentUser.value.id === serverData.id) {
        currentUser.value = { ...serverData }
      }
    }
    return response.data
  } catch (e) {
    console.error(`${method} Failed:` , e.response?.data || e.message)
    throw e
  }
}

  async function fetchUserById(id) {
  try {
    const response = await api.get(`/users/${id}`);
    const user = response.data;
    const index = newData.value.findIndex((u) => u.id === user.id);
    if (index !== -1) {
      newData.value[index] = user;
    }
    return user;
  } catch (e) {
    console.error("Failed to fetch user:", e);
    throw e;
  }
}



async function fetchAllUsers(page = 1) {
  try {
    const response = await api.get('/users', {
      params: {
        page,
        search: search.value,
        sortBy: 'id',
        order: 'desc'
      }
    })
    
    newData.value = response.data.data 
    paginationMeta.value = response.data.meta
    
    return response.data
  } catch (e) {
    console.error("Failed to fetch users:", e)
    throw e
  }
}

async function bulkCreateUsers(usersArray) {
  try {
    // Backend expects: { users: [ {name, email, password}, ... ] }
    const response = await api.post('/users/bulk', { users: usersArray })
    newData.value.push(...response.data.receivedData)
    return response.data
  } catch (e) {
    throw e.response?.data || e.message
  }
}

async function bulkUpdateUsers(usersArray) {
  try {
    // Backend expects: { users: [ {id, name, email}, ... ] }
    const response = await api.put('/users/bulk', { users: usersArray })
    // Refresh local data
    await fetchAllUsers() 
    return response.data
  } catch (e) {
    throw e.response?.data || e.message
  }
}

async function bulkDeleteUsers(idsArray) {
  try {
    // Backend expects: { ids: [1, 2, 3] }
    const response = await api.delete('/users/bulk', { data: { ids: idsArray } })
    
    // Locally remove them
    newData.value = newData.value.filter(u => !idsArray.includes(u.id))
    
    return response.data
  } catch (e) {
    throw e.response?.data || e.message
  }
}


async function deleteUser(id) {
  try {
    const response = await api.delete(`/users/${id}`)
    
    // Remove from local array on success
    newData.value = newData.value.filter(u => u.id !== id)
    
    return response.data
  } catch (e) {
    console.error("Delete failed:", e.response?.data || e.message)
    throw e
  }
}

async function promoteUser(userId) {
  try {
    // Matches your backend route: router.post('/admin/promote/:id', ...)
    const response = await api.post(`/admin/promote/${userId}`);

    // Update the local list so the UI reflects the new Admin status
    const index = newData.value.findIndex((u) => u.id === userId);
    if (index !== -1) {
      // We update the local object properties
      newData.value[index].isAdmin = true;
      
      // If the user happens to be the currently logged-in user, update them too
      if (currentUser.value && currentUser.value.id === userId) {
        currentUser.value.isAdmin = true;
      }
    }

    return response.data;
  } catch (e) {
    console.error("Promotion failed:", e.response?.data || e.message);
    throw e.response?.data || e;
  }
}

  const filteredUsers = computed(() => {
    if (search.value === "") {
      return newData.value;
    }

    return newData.value.filter((user) => {
      return user.name.toLowerCase().includes(search.value.toLowerCase());
    });
  });

  return {
    newData,
    currentUser,
    editingUser,
    search,
    addUser,
    deleteUser,
    loginUser,
    filteredUsers,
    updateUserInfo,
    fetchUserById,
    logoutUser,
    initAuth,
    promoteUser,
    bulkCreateUsers,
    bulkUpdateUsers,
    bulkDeleteUsers
  };
});
