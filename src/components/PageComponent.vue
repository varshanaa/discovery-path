<template>
  <div>
    <div id="fooditems" class="navbar">
      <nav>
        <ul id = "navUL">
          <li id = "navLI">
            <router-link to="/" exact>Home</router-link>
          </li>
          <li id = "navLI"><router-link to="/orders" exact>Orders</router-link>
          </li>
          <li id="navLI">
            <router-link to="/dashboard" exact>Dashboard</router-link>
          </li>
        </ul>
      </nav>
    </div>
    <ul id="itemsList">
      <li id="list" v-for="item in items" v-bind:key="item.id">
        {{ item.name }} <br /><br />
        <img :src="item.imageURL" /> <br /><br />
        ${{ item.price }} <br /><br />
        <qtyCounter v-bind:item="item" v-on:counter="onCounter"></qtyCounter>
      </li>
    </ul>
    <basket id="shoppingBasket" v-bind:selected="itemsSelected"></basket>
  </div>
</template>

<script>
import database from "../firebase.js";
import QuantityCounter from "./QuantityCounter.vue";
import Basket from "./Basket.vue";

export default {
  data() {
    return {
      itemsSelected: [],
      items: [],
    };
  },
  // props: {
  //     itemsList: {
  //       type: Object
  //     }
  // },
  components: {
    qtyCounter: QuantityCounter,
    basket: Basket,
  },
  methods: {
    fetchItems: function () {
      database
        .collection("menu")
        .get()
        .then((snapshot) => {
          let item = {};
          snapshot.docs.forEach((doc) => {
            item = doc.data();
            this.items.push(item);
          });
        });
    },

    onCounter: function (item, count) {
      if (this.itemsSelected.length === 0 && count > 0) {
        //If there is nothing in items selected, push the ORDER in
        this.itemsSelected.push([item.name, count, item.price]);
      } else {
        var contains = false;
        // Loop through everything to check what is not in the basket
        for (let i = 0; i < this.itemsSelected.length; i++) {
          const curr_item = this.itemsSelected[i];
          const item_name = curr_item[0];

          // if item_name is the same as item.name and the count is more than 0, update this.itemsSelected
          if (item_name === item.name && count > 0) {
            this.itemsSelected.splice(i, 1, [item.name, count, item.price]);
            contains = true;
          }
          // Next, if item_name is the same as item.name and the count is 0, remove it from itemsSelected.
          else if (item_name === item.name && count == 0) {
            this.itemsSelected.splice(i, 1);
            contains = true;
          }
        }
        // otherwise, if the item is not in itemSelected, add it to itemsSelected by pushing the ORDER in.
        if (!contains) {
          this.itemsSelected.push([item.name, count, item.price]);
        }
      }
    },
  },
  created() {
    this.fetchItems();
  },
};
</script>

<style>
#itemsList {
  width: 100%;
  max-width: 70%;
  margin: 0px;
  padding: 0 5px;
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  padding: 0;
}

#navUL {
  width: 100%;
  max-width: 70%;
  margin: 0px;
  padding: 0 5px;
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  padding: 0;
}

#list {
  flex-grow: 1;
  flex-basis: 250px;
  text-align: center;
  padding: 10px;
  border: 1px solid #222;
  margin: 10px;
  font-size: 20px;
}

#navLI {
  flex-grow: 1;
  flex-basis: 250px;
  text-align: center;
  padding: 10px;
  border: 1px solid #222;
  margin: 10px;
  font-size: 20px;
}

img {
  width: 135px;
  height: 135px;
}

#shoppingBasket {
  position: absolute;
  top: 20%;
  left: 73%;
}
</style>