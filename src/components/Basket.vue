<template>
  <div>
      <label id = "menu" for="menu"> Menu: </label><br>
      <ul>
       <li id="basketList" v-for= "order in selected" v-bind:key = "order[0]"> {{order[0]}} x {{order[1]}} <br><br> </li>
       </ul>
       <button id="totalButton" v-on:click= "findTotal(); sendOrder()" >Add Order</button>
       <p id="subTotal" v-show= "this.subt>0">Subtotal: ${{subt}}</p>
       <p id="grandTotal" v-show= "this.grandt>0">Grand Total: ${{grandt}}</p>
  </div>
</template>

<script>
import database from '../firebase.js'
export default {
  data() {
      return {
          subt: 0
      }
  },
  props: {
      selected: {
        type: Object
      }
  },
  methods: {
        sendOrder: function() {
            var items = {
                'Prawn omelette': {
                    name: 'Prawn omelette',
                    count: 0
                },
                'Dry Beef Hor Fun': {
                    name: 'Dry Beef Hor Fun',
                    count: 0
                },
                'Sambal KangKung': {
                    name: 'Sambal KangKung',
                    count: 0
                },
                'Pork Fried Rice': {
                    name: 'Pork Fried Rice',
                    count: 0
                },
                'Mapo Tofu': {
                    name: 'Mapo Tofu',
                    count: 0
                },
                'Cereal Prawn': {
                    name: 'Cereal Prawn',
                    count: 0
                }
            }

            for (let n = 0; n < this.selected.length; n++) {
                const current = this.selected[n];
                const arr = {name: current[0], count: current[1]}
                this.$set(items, current[0], arr);
                // database.collection('orders').add(this.selected).then(() => {location.reload();}); 
            }
            database.collection('orders').add(items).then(() => {location.reload()});
        },
        findTotal: function() {
          this.subt = 0;
          for (let n = 0; n < this.selected.length; n++) {
              const dish = this.selected[n];
              const dish_qty = dish[1];
              const dish_price = dish[2];
              this.subt += dish_qty*dish_price;
          }
      }
  },
  computed: {
      grandt: function() {
          return (this.subt*1.07).toFixed(2);
      }
  }
}
</script>

<style scoped>
#menu {
    font-size: 20px;
}
#basketList {
    font-size: 20px;    
}
#totalButton {
    background-color: rgb(230, 212, 243);
    font-family: Arial, Helvetica, sans-serif;
    margin-top: 10px;
    padding-top:3px;
    padding-bottom: 3px;
    padding-right: 6px;
    padding-left: 6px;
    font-size: 15px;
    border-radius: 8px;

}
#subTotal {
    font-size: 20px;
}
#grandTotal {
    font-size: 20px;
}
</style>