<template>
  <div class="photo">
    <template v-if="loading">
      <div>
        <span style="text-align: center; padding-top: 20px">Загрузка...</span>
      </div>
    </template>
    <template v-else>
      <div v-show="photo.isFullscreen"></div>
      <header v-show="!photo.isFullscreen">
        <div class="container">
          <div class="header">
            <div class="logo">
              <a href="/"><img src="../../public/assets/images/logo.png" alt="Logo" /></a>
            </div>
            <div>
              <a class="home_a" href="/"
                ><img
                  class="home_img"
                  src="../../public/assets/images/search_white.png"
                  alt="Heart"
                  style="padding-right: 10px"
                />
                <span class="favorites_text" style="font-size: 18px; color: white; margin-right: 38px">Найти</span></a
              >
              <a href="/favorites"
                ><img class="favorites_img" src="../../public/assets/images/heart.png" alt="Heart" />
                <span class="favorites_text" style="font-size: 18px; color: white">Избранное</span></a
              >
            </div>
          </div>
        </div>
      </header>
      <div :style="{ backgroundImage: `url(${photo.url})` }" class="view_photo">
        <div class="container">
          <div class="view_photo_items">
            <div class="person">
              <img class="person_img" src="../../public/assets/images/square_face.png" alt="" />
              <p class="person_text">
                <span class="person_span_name">Vincent van Gogh </span> <br />
                <span class="person_span_tag">@vincentvangogh</span>
              </p>
            </div>
            <div class="buttons">
              <a class="btn_heart_black" :class="{ liked: photo.liked }" @click="addToWishlist"
                ><img src="../../public/assets/images/heart_black.png" alt=""
              /></a>
              <a class="btn_download" @click="downloadImage"
                ><img src="../../public/assets/images/download.png" alt="" />
                <span class="btn_download_span">Download</span></a
              >
            </div>
          </div>
          <div :class="{ view_photo_fullscreen: photo.isFullscreen }" style="position: relative">
            <img class="view_photo_img" :src="photo.url" alt="" @click="toggleFullscreen" />
            <a class="view_photo_stroke" @click="toggleFullscreen"
              ><img src="../../public/assets/images/stroke.png" alt=""
            /></a>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      loading: true,
      wishlist: [],
      photo: {
        id: '',
        url: '',
        liked: false,
        name: 'image',
        isFullscreen: false
      },
      apiUrl: 'https://api.unsplash.com',
      clientId: 'dWLC8mestIbB2pi8_jk8iQelO__ErN2JZFkuQ1VW5kc'
    }
  },
  methods: {
    async downloadImage() {
      const response = await axios({
        method: 'GET',
        url: this.photo.url,
        responseType: 'blob'
      })
      const blob = new Blob([response.data], { type: response.headers['content-type'] })
      const link = document.createElement('a')
      link.href = window.URL.createObjectURL(blob)
      link.download = this.photo.name
      link.click()
    },
    toggleFullscreen() {
      this.photo.isFullscreen = !this.photo.isFullscreen
    },
    addToWishlist() {
      const photoIndex = this.wishlist.findIndex((item) => item.id === this.photo.id)

      if (photoIndex === -1) {
        this.photo.liked = true

        this.wishlist.push(this.photo)
      } else {
        this.photo.liked = false

        this.wishlist.splice(photoIndex, 1)
      }

      localStorage.setItem('wishlist', JSON.stringify(this.wishlist))
    }
  },
  async mounted() {
    const res = await axios.get(`${this.apiUrl}/photos/${this.$route.params.id}`, {
      params: {
        client_id: this.clientId
      }
    })

    Object.assign(this.photo, {
      id: res.data.id,
      url: res.data.urls.regular,
      liked: false,
      name: 'image',
      isFullscreen: false
    })

    const wishlist = localStorage.getItem('wishlist')

    if (wishlist) {
      this.wishlist = JSON.parse(wishlist)

      const photo = this.wishlist.find((item) => item.id === this.photo.id)

      if (photo) {
        this.photo.liked = true
      }
    }

    this.loading = false
  }
}
</script>
