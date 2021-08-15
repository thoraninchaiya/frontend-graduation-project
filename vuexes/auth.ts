import { VuexModule, Module, Mutation, Action } from "vuex-class-modules";
import axios from  '@/plugins/axios'

@Module({generateMutationSetters:true}) //สามารถตั้งค่าในตัวแปล Vuexได้
class UserModule extends VuexModule {

    public token:any = localStorage.getItem('token')

    public user:any = {} // javascript => user = null

    // public profile:any = {}
    public profile:any = { // ยังไม่ได้ต่อ หลังบ้าน
      "username":"admin",
      "frist_name":"Thanakorn",
      "last_name":"Mangkhang",
      "admin":true
  }

    public async setUser(user:any){
        this.user = user
    }

    // login
    public async login(form:any){ 
        let user = await Core.post(`/auth/login/`, form)
        if(user.token){
          let key = user.token
          await this.storeToken(key)
          await this.storeTokenToStorage(key)  
          return key
        }else{
          alert('ไม่สามารถเข้าสู่ระบบได้กรุณาตรวจสอบข้อมูลให้ถูกต้อง')
        }
    }

    public async getUser(){
      let user = await Core.get(`/auth/route`)
      return user;
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
        localStorage.setItem('token',token )
      }

    public async storeToken(token:any){
        console.log(token);
        axios.defaults.headers.common['Authorization'] = (token != null )?`Token ${token}`:'';
    }

}

import store from '@/vuexes'
import { Core } from "./core";
export const User = new UserModule({store,name:"User"})
