<template>
  <div>
    <div id="fooditems" class="navbar">
      <nav>
        <ul id="navibar">
          <li id="navibarlist">
            <router-link to="/" exact>Home</router-link>
          </li>
          <li id="navibarlist">
            <router-link to="/orders" exact>Orders</router-link>
          </li>
          <li id="navibarlist">
            <router-link to="/dashboard" exact>Dashboard</router-link>
          </li>
        </ul>
      </nav>
    </div>
    <ul id="dispOrders">
      <li id="disO" v-for= "order in orders" v-bind:key= "order[0]">
        <ul>
          <li id= "innerlist" v-for= "fooditem in order[1]" v-bind:key= "fooditem.name">
            {{fooditem.name}}: {{fooditem.count}} <br />
          </li>
        </ul>
        <button v-bind:id= "order[0]" v-on:click= "deleteItem($event)">Delete</button>
        <button v-bind:id= "order[0]" v-on:click= "route($event)">Modify</button>
      </li>
    </ul>
  </div>
</template>

<script>
import database from "../firebase.js";

export default {
  data() {
    return {
      orders: [],
    };
  },

  methods: {
    fetchItems: function () {
      database
        .collection("orders")
        .get()
        .then((snapshot) => {
          let order = [];
          snapshot.docs.forEach((doc) => {
            order = [doc.id, doc.data()];
            this.orders.push(order);
          });
        });
    },
    deleteItem: function (event) {
        let doc_id = event.target.getAttribute("id");
        database.collection('orders').doc(doc_id).delete().then(() => {location.reload()});
    },
    route: function (event) {
        let doc_id = event.target.getAttribute("id");
        this.$router.push({ name: 'modify', params: {id: doc_id}})
    }
  },
  created() {
    this.fetchItems();
  },
};
</script>

<style scoped> 
#navibar {
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  padding: 0;
}
#navibarlist {
  flex-grow: 1;
  flex-basis: 300px;
  text-align: center;
  padding: 10px;
  border: 1px solid #222;
  margin: 10px;
}

#dispOrders {
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  padding: 0;
}

#disO {
  flex-grow: 1;
  flex-basis: 300px;
  text-align: center;
  padding: 10px;
  border: 1px solid #222;
  margin: 10px;
  min-width: 40%;
}

#innerlist {
    max-width: 55%;
    width:100%;
    float: left;
    list-style-type: none;
}


button {
  width: 65px;
  height: 30px;
  background-color: #f7cac9;
  border-radius: 10px;
  border-width: 1px;
}

</style>

