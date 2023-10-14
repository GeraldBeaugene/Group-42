<template>
  <div class="container">
    <div class="row">
      <img :src="image" alt="Profile-pic" class="rounded-circle">
      <input type="file" accept="image/*" hidden="hidden" @change="change($event)" ref="file">
    </div>
    <br><br>
    <div class="row">
      <button @click="browse()" class="btn btn-outline-primary">Upload Image</button>
    </div>
  </div>
</template>

<script>
export default{
  name:'Upload',
  data(){
    return{
      image: 'https://cvhrma.org/wp-content/uploads/2015/07/default-profile-photo.jpg'
    }
  },
  methods:{
    browse(){
      this.$refs.file.click()
    },
    change(e){
      this.$emit('input', e.target.files[0])
      let reader = new FileReader()
      reader.readAsDataURL(e.target.files[0])
      reader.onload = (e) => {
        this.image = e.target.result
      }
    }
  },
}
</script>

<style scoped>
.rounded-circle{
  scale:170%
}
.row{
  text-align: center;
  margin: auto;
  width: 30%;
  padding-top: 30px;
  padding-bottom:20px;
  position: relative;
}
.container{
  text-align: center;
  margin: auto;
  width: 35%;
  padding-top: 30px;
  padding-bottom:20px;
  position: relative;
}

</style>