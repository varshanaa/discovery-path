<template>
  <div>
    <button id="buttonSubtract" v-on:click= "decrement()"> -</button>
    <span>{{qty}}</span>
    <button id="buttonAdd" v-on:click= "increment()">+</button>
  </div>
</template>

<script>
export default {
    data(){
       return {
           qty: 0
       } 
    },
    methods: {
        decrement: function() {
            if (this.qty!=0) {
                this.qty = this.qty-1;
                this.$emit('counter', this.item, this.qty)
            }    
        },
        increment: function() {
            if (this.qty==10) {
                alert("You cannot buy more than 10 items.");
            }
            else if (this.qty < 10) {
                this.qty++;
                this.$emit('counter', this.item, this.qty)
            }
        }
    },
    props: {
        item: {
          type: Object
        }
    }
}
</script>

<style scoped>
#buttonSubtract{
font-family: sans-serif;
text-align: center; 
color: #504146ee;
 background-color: #e09db4ee;
 padding-right: 20px;
 padding-left: 20px;
 padding-top: 15px;
 padding-bottom: 15px;
 margin-right: 20px;
 }
 #buttonAdd{
font-family: sans-serif;
text-align: center; 
color: #504146ee;
 background-color: #e09db4ee;
 padding-right: 20px;
 padding-left: 20px;
 padding-top: 15px;
 padding-bottom: 15px;
 margin-left: 20px;
 }
</style>