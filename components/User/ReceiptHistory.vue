<template>
<div>
    <!-- ReceiptHistory -->
    <!-- <h1>hello world</h1> -->
    <v-card>
        <v-card-title primary-title>
            ประวัติการสั่งซื้อ
        </v-card-title>
        <v-card-text>
            <v-simple-table>
                <thead>
                    <th>ลำดับ</th>
                    <th>หมายเลขการสั่งซื้อ</th>
                    <th>จำนวนที่ต้องชำระ</th>
                    <th>วันที่สั่งซื้อ</th>
                    <th>สถานะ</th>
                    <th>ติดตามสินค้า</th>
                    <th></th>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>100000000</td>
                        <td>1000</td>
                        <td>25-10-21</td>
                        <td>รอชำระเงิน</td>
                        <td>EP1111</td>
                        <td>
                            <v-card-actions>
                                <v-btn color="success">
                                    <v-icon>mdi-magnify</v-icon>
                                </v-btn>
                                <v-btn color="warning">
                                    <v-icon>mdi-receipt</v-icon>
                                </v-btn>
                                <v-btn color="info">
                                    <v-icon>mdi-credit-card-outline</v-icon>
                                </v-btn>
                                <v-btn color="accent">
                                    <v-icon>mdi-truck-fast-outline</v-icon>
                                </v-btn>
                                <v-btn color="error">
                                    <v-icon>mdi-cancel</v-icon>
                                </v-btn>
                            </v-card-actions>
                        </td>
                    </tr>
                </tbody>
            </v-simple-table>
        </v-card-text>
    </v-card>
    <v-dialog v-model="receiptinfo" :overlay="false" max-width="1000px" transition="dialog-transition">
        <v-card>
            <template>
                <v-card-title class="justify-center">SALAFEX</v-card-title>
                <v-card-title class="justify-center">ใบสั่งซื้อสินค้า</v-card-title>
                <v-card-text>
                    <div>
                        <v-row>
                            <v-col cols="4">
                                <div>ข้อมูลลูกค้า</div>
                                <div>ชื่อ:</div>
                                <div>เบอร์:</div>
                                <div>ที่อยู่:</div>
                            </v-col>
                            <v-col cols="4">
                                <div>ข้อมูลติดต่อร้าน:</div>
                                <div>เบอร์:</div>
                                <div>ที่อยู่:</div>
                            </v-col>
                            <v-col cols="4">
                                <div>วันที่สั่งซื้อ:</div>
                                <div>เลขที่สั่งซื้อ:</div>
                            </v-col>
                        </v-row>
                    </div>
                </v-card-text>
                <v-card-text>
                    <v-simple-table>
                        <thead>
                            <th>ลำดับ</th>
                            <th>รูปสินค้า</th>
                            <th>สินค้า</th>
                            <th>จำนวน</th>
                            <th>ราคา</th>
                            <th>ภาษี</th>
                            <th>ราคารวม</th>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>image</td>
                                <td>เสื้อโปโล</td>
                                <td>1</td>
                                <td>1000</td>
                                <td>100</td>
                                <td>1100</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td colspan="2" class="align-end">ราคาไม่รวมภาษี</td>
                                <td>0</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td colspan="2">ราคารวมภาษี</td>
                                <td>0</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td colspan="2">รวมที่ต้องชำระทั้งหมด</td>
                                <td>0</td>
                            </tr>
                        </tbody>
                    </v-simple-table>
                </v-card-text>
            </template>
        </v-card>
    </v-dialog>
</div>
</template>

<script>
export default {
    data: () => ({
        receiptinfo: true
    })
}
</script>

<style>

</style>
