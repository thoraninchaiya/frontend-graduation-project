import { VuexModule, Module, Mutation, Action } from "vuex-class-modules";
import axios from '@/plugins/axios'

@Module({generateMutationSetters:true}) //สามารถตั้งค่าในตัวแปล Vuexได้
class CoreModule extends VuexModule {

        //get ค่า
        public async get(url:string){
            return await axios.get(url)
            .then((r:any)=>{return r.data})
            .catch((e:any)=>{return e.response.data});
        }

        //post put delete ค่า ต้องมี form เข้ามาอยู่ด้วยเพื่อที่จะได้ส่ง form ได้
        public async post(url:string,form:object){
            return await axios.post(url,form)
            .then((r:any)=>{return r.data})
            .catch((e:any)=>{return e.response.data});
        }

        public async put(url:string,form:object){
            return await axios.put(url,form)
            .then((r:any)=>{return r.data})
            .catch((e:any)=>{return e.response.data});
        }

        public async delete(url:string,form:object){
            return await axios.delete(url,form)
            .then((r:any)=>{return r.data})
            .catch((e:any)=>{return e.response.data});
        }

}

import store from '@/vuexes'
export const Core = new CoreModule({store,name:"Core"})
