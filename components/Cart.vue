<template>
  <div>
    <v-btn @click="cartdialog=!cartdialog"><i class="fas fa-shopping-cart"></i></v-btn>
    <v-dialog v-model="cartdialog" :overlay="false" max-width="800px" transition="dialog-transition">
      <v-card>
        <v-card-title primary-title>
          ตะกร้าสินค้า
        </v-card-title>
        <v-card-text>
          <v-simple-table fixed-header max-height="600px">
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="">สินค้า</th>
                  <th class="">ราคาต่อชิ้น</th>
                  <th class="">จำนวน</th>
                  <th class="">ราคารวม</th>
                  <th class=""></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in desserts" :key="item.name">
                  <td>
                    <div class="d-inline-flex align-center">
                      <div><img class="cartimage" src="http://localhost:8080/img/product/be02f7ec07ae4be1a8d516ce8e42fd69.jpg" alt=""></div>
                      <div class="ml-3">{{ item.name }}</div>
                    </div>
                  </td>
                  <td>
                    {{ item.calories }}
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>          
        </v-card-text>
      </v-card>
         
    </v-dialog>
 
  </div>

</template>

<script>
  export default {
    data () {
      return {
        cartdialog: false,
        desserts: [
          {
            name: 'Frozen Yogurt',
            calories: 159,
          },
          {
            name: 'Ice cream sandwich',
            calories: 237,
          },
          {
            name: 'Eclair',
            calories: 262,
          },
          {
            name: 'Cupcake',
            calories: 305,
          },
          {
            name: 'Gingerbread',
            calories: 356,
          },
          {
            name: 'Gingerbread',
            calories: 356,
          },
          {
            name: 'Gingerbread',
            calories: 356,
          },
          {
            name: 'Gingerbread',
            calories: 356,
          },
          {
            name: 'Gingerbread',
            calories: 356,
          },
          {
            name: 'Gingerbread',
            calories: 356,
          },
          {
            name: 'Gingerbread',
            calories: 356,
          },
          {
            name: 'Gingerbread',
            calories: 356,
          },
          {
            name: 'Gingerbread',
            calories: 356,
          },
          {
            name: 'Gingerbread',
            calories: 356,
          },
          {
            name: 'Gingerbread',
            calories: 356,
          },
          {
            name: 'Gingerbread',
            calories: 356,
          },
          {
            name: 'Gingerbread',
            calories: 356,
          },
          {
            name: 'Gingerbread',
            calories: 356,
          }
        ],
      }
    },
  }
</script>

<style>
.cartimage{
  max-width: 4.375rem;
  max-height: 4.375rem;
}
</style>