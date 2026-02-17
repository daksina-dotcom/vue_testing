import { createUser } from "@/stores/data";
export const authGuard=((to,from,next)=>{
  const userStore = createUser()
  const isAuthenticated = !!userStore.currentUser
  console.log(`Navigating to: ${to.name}`);
  console.log(`Is Authenticated: ${isAuthenticated}`);
  const token = localStorage.getItem('token')
  if(to.meta.requiresAuth && !isAuthenticated){
    next({name:'Login'})
  }
  else if((to.name==='Login'||to.name==='Signup' )&&isAuthenticated){
    next({name:'table'})
  }
  else{
    next()
  }
})