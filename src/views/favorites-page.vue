<template>
  <div class="favorites">
    <header class="favorites_header">
      <div class="container">
        <div class="header">
          <div class="logo">
            <a href="/"><img src="../../public/assets/images/logo.png" alt="Logo" /></a>
          </div>
          <div>
            <a class="home_a" href="/"
              ><img src="../../public/assets/images/search_white.png" alt="Heart" style="padding-right: 10px" />
              <span class="favorites_text" style="font-size: 18px; color: white; margin-right: 38px">Найти</span></a
            >
            <a href="/favorites"
              ><img src="../../public/assets/images/heart.png" alt="Heart" style="padding-right: 10px" />
              <span class="favorites_text" style="font-size: 18px; color: white">Избранное</span></a
            >
          </div>
        </div>
      </div>
    </header>
    <div class="photos">
      <div class="container">
        <div class="row">
          <h2 class="photos_h2">Избранное</h2>
          <div class="col-md-4" v-for="photo in wishlist" :key="photo.id">
            <router-link :to="'/photo-view/' + photo.id">
              <img class="all_Images" :src="photo.url" alt="" />
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      wishlist: []
    }
  },
  mounted() {
    const wishlist = localStorage.getItem('wishlist')

    if (wishlist) {
      this.wishlist = JSON.parse(wishlist)
    }
  }
}
</script>
