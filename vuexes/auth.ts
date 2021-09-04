import { VuexModule, Module, Mutation, Action } from "vuex-class-modules";
import axios from  '@/plugins/axios'

@Module({generateMutationSetters:true}) //สามารถตั้งค่าในตัวแปล Vuexได้
class UserModule extends VuexModule {

    public token:any = localStorage.getItem('token')

    public user:any = {} // javascript => user = null

    // public profile:any = {}
    public profile:any = {}

    public async setUser(user:any){
        this.user = user
    }

    // login
    public async login(form:any){ 
        let user = await Core.post(`/auth/login/`, form)
        if(user.token){
          let key = user.token
          console.log(key)
          await this.storeToken(key)
          await this.storeTokenToStorage(key)  
          return key
        }else{
          return(user)
        }
    }

    public async register(form:any){
      let user = await Core.post(`/auth/register`, form)
      if(user.status == 201){
        return (user)
      }else{
        return (user.message)
      }
    }

    public async getUser(){
      // console.log("this token: " + this.token)

      let user = await Core.get(`/user/profile`)
      // console.log(user)
      if(user.status != 401 || user.status != 400){
        return user;
      }else{
        return (user)
      }
    }

    public async loadUserlogined(){
      if(this.token){
          this.user = this.profile
      }
    }

    public async logout(){
      await localStorage.clear()
      await location.reload();
    }

    public async storeTokenToStorage(token:any){
      localStorage.setItem('token',token)
        // $storage.setLocalStorage('token',token)
    }

    public async storeToken(token:any){
      axios.defaults.headers.common['Authorization'] = (token != null )?`Token ${token}`:'';
    }

}

import store from '@/vuexes'
import { Core } from "./core";
export const User = new UserModule({store,name:"User"})
