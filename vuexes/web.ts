import { VuexModule, Module, Mutation, Action } from "vuex-class-modules";

@Module({generateMutationSetters:true}) //สามารถตั้งค่าในตัวแปล Vuexได้
class WebModule extends VuexModule {

    public loading:boolean = false    
    public loadingText:string = 'Data'

    public async onLoad(text:string){
        this.loadingText = text
        this.loading = true
    }
    public async switchLoad(state:boolean){
        this.loadingText = 'Data'
        this.loading = state
    }
}

import store from '@/vuexes'
export const Web = new WebModule({store,name:"Web"})
