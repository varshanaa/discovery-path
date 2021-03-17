<template>
  <div>
    <ul>
      <li v-bind:key= "index" v-for= "(fooditem, index) in datapacket[0]">
        {{ fooditem.name }}: {{ fooditem.count }} <br /><br />
        <input v-bind:id= "index" placeholder= "0" type= "number" min= "0" /> <br /><br />
      </li>
      <button v-on:click = "updateOrder">Update Order</button>
    </ul>
  </div>
</template>


<script>
import database from "../firebase.js";

export default {
  data() {
    return {
      datapacket: [],
    };
  },
  props: {
    id: {
      type: String,
    },
  },
  methods: {
    fetchItems: function () {
        database
        .collection("orders")
        .get()
        .then((snapshot) => {
            let order = [];
          snapshot.docs.forEach((doc) => {
            if (doc.id == this.id) {
                order = doc.data();
                this.datapacket.push(order);
            }
          });
        });
    },
    updateOrder: function () {
        var list = [];
        for (let i=0; i<this.datapacket.length; i++) {
            list[i] = this.datapacket[i];
        }
        const orderlist = list[0];
        for (const foodkey in orderlist) {
            const value = orderlist[foodkey];
            const name = value.name;
            const count = value.count;
            var compareId = document.getElementById(name);
            if (compareId.value.length>0 && compareId.value != count) {
                const arr = {name: name, count: parseInt(compareId.value)};
                orderlist[name] = arr;
            }
        } 
        database.collection('orders').doc(this.id).set(orderlist).then(() => {this.$router.push('/orders')});
    }
  },
  created() {
    this.fetchItems();
  },
};
</script>

<style scoped>
ul {
  list-style-type: none;
  margin-left: 0px;
  padding-left: 0px;
}

button {
  width: 130px;
  height: 40px;
  background-color: #f7cac9;
  border-radius: 10px;
  border-width: 1px;
  font-size: 18px;
}
</style>