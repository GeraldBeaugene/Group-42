<template>
  <div>
    <div class="modal-backdrop" v-if="state">
      <div class="popup">
        <h1 v-if="state" class="font-extrabold">{{msg1}}</h1>
        <hr>
        <h3 v-if="state">This action is irreversible</h3>
        <hr>
        <div class="row" v-if="state">
          <button class="btn btn-outline-success col-sm-4" @click="close(false)">Cancel</button>
          <button class="btn btn-outline-danger col-sm-4" @click="close(true)" id="confirm">Confirm</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Dialog",
  props:['state', 'msg1'],
  data(){
    return{
    }
  },
  methods:{
    close(choice){
      this.$emit('Dialog-buttons', {close:false, choice:choice})
    },
  }}
</script>

<style scoped>
.btn{
  margin:auto
}
.row{
  margin-top:30px
}
.modal-backdrop{
  text-align: center;
  margin: auto;
  background:#333333;
  opacity:90%
}
.popup{
  margin-top:150px;
  margin-left:auto;
  margin-right:auto;
  color:white;
  font-size: 30px;
  width: 30%;
  padding: 15px;
  background:black;
  border-radius: 20px;
}
</style>