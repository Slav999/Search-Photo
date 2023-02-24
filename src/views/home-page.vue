<template>
  <div class="home">
    <header>
      <div class="container">
        <div class="header">
          <div class="logo">
            <a href="/"><img src="../../public/assets/images/logo.png" alt="Logo" /></a>
          </div>
          <div class="favorites">
            <a href="/favorites"
              ><img src="../../public/assets/images/heart.png" alt="Heart" style="padding-right: 10px" />
              <span class="favorites_text">Избранное</span></a
            >
          </div>
        </div>
      </div>
    </header>
    <div class="search">
      <div class="container">
        <div class="search_input">
          <input @input="fetchSearch" class="search_input_item" type="text" placeholder="Поиск" v-model="searchText" />
        </div>
      </div>
    </div>
    <div class="photos">
      <div class="container">
        <div class="row">
          <div class="col-md-4" v-for="item in images" :key="item.i">
            <router-link :to="'/photo-view/' + item.id">
              <img class="all_Images" :src="item.urls.regular" alt="" />
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import debounce from 'debounce'

export default {
  name: 'home-page',
  data() {
    return {
      searchText: '',
      images: [],
      accessKey: 'dWLC8mestIbB2pi8_jk8iQelO__ErN2JZFkuQ1VW5kc',
      urlRandom: 'https://api.unsplash.com/photos/random',
      urlSearch: 'https://api.unsplash.com/search/photos'
    }
  },
  props: ['item'],
  methods: {
    async fetchRandomPhotos() {
      const response = await fetch(this.urlRandom + `?client_id=${this.accessKey}&count=9&query=art`)
      const newRandomPhotos = await response.json()
      this.images.push(...newRandomPhotos)
    },
    fetchSearch: debounce(async function () {
      if (this.searchText.length) {
        const response = await fetch(
          this.urlSearch + `?client_id=${this.accessKey}&query=${this.searchText}&per_page=9`
        )
        this.images = (await response.json()).results
      } else {
        await this.fetchRandomPhotos()
      }
    }, 500),
    handleScroll() {
      const scrollPosition = window.innerHeight + window.pageYOffset
      const documentHeight = document.documentElement.scrollHeight
      if (scrollPosition >= documentHeight && this.searchText.length) {
        this.fetchSearch()
      } else if (scrollPosition >= documentHeight) {
        this.fetchRandomPhotos()
      }
    }
  },
  created() {
    this.fetchRandomPhotos()
    window.addEventListener('scroll', this.handleScroll)
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll)
  }
}
</script>
