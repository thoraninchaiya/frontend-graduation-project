<template>
  <v-container grid-list-xs>
      <v-card>
        <v-card-title primary-title>
            ทำการสั่งซื้อ
        </v-card-title>

      </v-card>

      <v-card class="mt-3">
          <v-card-text>
              <p class="font-weight-bold">ที่อยู่ในการจัดส่ง</p>
              <v-divider></v-divider>
              address
          </v-card-text>
      </v-card>

      <v-card class="mt-3">
          <v-card-text>
              <p class="font-weight-bold">รายการสินค้า</p>
              <v-divider></v-divider>
              <v-card-text>
                  <v-simple-table>
                      <template>
                          <thead>
                              <tr>
                                  <th></th>
                                  <th>สินค้า</th>
                                  <th>ราคาต่อชิ้น</th>
                                  <th>จำนวน</th>
                                  <th>ราคารวม</th>
                              </tr>
                          </thead>
                          <tbody>
                              <template>
                                  <tr>
                                      <td>img</td>
                                      <td>เสื้อ</td>
                                      <td>1</td>
                                      <td>&#3647;&nbsp;50</td>
                                      <td>&#3647;&nbsp;50</td>
                                  </tr>
                                  <tr>
                                      <td></td>
                                      <td></td>
                                      <td></td>
                                      <td>ราคารวม</td>
                                      <td>price</td>
                                  </tr>
                              </template>
                          </tbody>
                      </template>
                  </v-simple-table>
              </v-card-text>
              <div class="d-flex justify-end">
                  <v-btn color="success">ยืนยันการสั่งซื้อสินค้า</v-btn>
              </div>
          </v-card-text>
      </v-card>
  </v-container>
</template>

<script>
export default {

}
</script>

<style>

</style>