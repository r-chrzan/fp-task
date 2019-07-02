<template>
  <div class="wrap">

    <div id="submit-button" 
         class="submit-container"    
         v-if="posts.length <= 0"
    >
      <div @click="clickedSubmit();" 
           ref="submit-btn" 
           :class="buttonClass" 
           class="submit-btn" 
      >
      <span v-show="!clicked">Pobierz posty</span>
      <span v-show="loaded">✔</span>
      </div>
      <svg v-if="loading" class="loader-svg">
        <path stroke="#CCCCCC" fill="none" stroke-width="4" d="M25,2.5A22.5,22.5 0 1 1 2.5,25A22.5,22.5 0 0 1 25,2.5">
        </path>
      </svg>
      <svg v-if="loading" class="loader-svg">
        <path stroke="#8d20bf" fill="none" stroke-width="4" d="M25,2.5A22.5,22.5 0 1 1 2.5,25A22.5,22.5 0 0 1 25,2.5"
          stroke-dasharray="157" :stroke-dashoffset="loaderOffset"></path>
      </svg>
    </div>

    <div class="fp-task" v-if="!posts.length <= 0">
      <div class="container">
      <div class="grid-row">
      <div class="grid-item" v-for="(post, index) in posts" :key="index" :class="[`grid-item--${index}`]">

      <div class="single-post">
        <div class="content">
        <p>Posted on {{ post.date | formatDate }}</p>
        <h1 v-html="post.title.rendered"></h1>
        <div v-html="post.excerpt.rendered"></div>

        </div>
        <div class="read-more">
        <a v-bind:href="post.link" class="btn">Read more...</a>
        </div>
      </div>
      </div>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'FutureProcessingTask',
    data() {
      const circumference = 157
      return {
        posts: [],
        clicked: false,
        loading: false,
        loaded: false,
        loaderOffset: circumference
      }
    },
    methods: {
      Showpost: function () {
        this.$http.get('wp/v2/posts').then(response => {
          // console.log(response);
          for (let post in response.data) {
            this.posts.push(response.data[post]);
          }
        }, error => {
          alert(error);
        });
      },
      clickedSubmit() {

        if (this.clicked && !this.loaded)
          return

        this.clicked = true

        this.$refs['submit-btn'].addEventListener("transitionend",
          this.animateLoader, false);
      },
      animateLoader() {
        this.loading = true
        this.$refs['submit-btn'].removeEventListener("transitionend",
          this.animateLoader, false);
        TweenLite.to(this, 5, {
          loaderOffset: 0,
          ease: Power4.easeInOut,
          onComplete: this.completeLoading,
        })
      },
      completeLoading() {
        this.loading = false
        this.loaded = true
        this.Showpost();
      },

    },
    computed: {
      buttonClass() {
        if (this.loaded) {
          return 'loaded'
        }

        if (this.clicked) {
          return 'round'
        }

        return ''
      }
    }
  }

</script>
<style lang="scss">
  body,
  html {
    width: 100%;
    height: 100%;
    margin: 0;
  }

  .submit-container {
    position: relative;
    height: 100%;
    width: 100%;

  }

  .wrap {
    height: 100%;
    width: 100%;
  }

  #app {
     height: 100%;
    width: 100%;
  }

  .submit-btn {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    width: 200px;
    color: #8d20bf;
    font-size: 20px;
    font-family: Arial;
    text-align: center;
    text-decoration: none;
    padding: 10px 20px 10px 20px;
    border: solid #8d20bf 4px;
    text-decoration: none;
    cursor: pointer;
    border-radius: 25px;
    transition: width .3s, margin .3s, background-color .3s, color .3s;

    &:hover {
      background-color: #8d20bf;
      color: white;
    }

    &.round {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
      border-color: #CCCCCC;
      background: white;
      width: 2px;
      height: 22px;
    }

    &.loaded {
      color: white;
      background-color: #8d20bf;
    }
  }

  .loader-svg {
    pointer-events: none;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    width: 50px;
    height: 50px;
    transform-origin: 25px 25px 25px;
  }

  .single-post {
    display: flex;
    justify-content: space-around;
    height: 100%;
    flex-direction: column;
    h1 {
      font-family: 'Montserrat', sans-serif;
      font-weight: 900;
      color: #fff;
      font-size: 1.5rem;
    }
    p {
      color: #fff;
    }
  }
// .container {
//   max-width: 1335px;
//   margin: 0 auto;
// }
.grid-row {
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
}
.grid-item {
  min-height: 490.5px;
  flex-basis: 20%;
  -ms-flex: auto;
  width: 259px;
  position: relative;
  padding: 20px;
  box-sizing: border-box;
}
@media(max-width: 1333px) {
  #app{}
  .grid-item {
    flex-basis: 33.33%;
  }
}
@media(max-width: 1073px) {
   .grid-item {
    flex-basis: 33.33%;
  }
}
@media(max-width: 815px) {
  .grid-item {
    flex-basis: 50%;
  }
}
@media(max-width: 555px) {
  .grid-item {
    flex-basis: 100%;
  }
}

.grid-item {
  &--0 {
    background: #6e3461;
}
  &--1 {
    background: #e8846b;
}
  &--2 {
    background: #16528e;
}
  &--3 {
    background: #e54b4b;
}
  &--4 {
    background: #a2c5bf;
}
  &--5 {
    background: #167c80;
}
  &--6 {
    background: #0082c8;
}
  &--7 {
    background: #40972a;
}
  &--8 {
    background: #90329c;
}
  &--9 {
    background: #16528e;
}
}
.read-more {
  a {
      font-family: 'Montserrat', sans-serif;
      font-weight: 900;
      color: #fff;
      font-size: 1rem;
      text-decoration: none;
      text-transform: uppercase;
      opacity: 0.7;
      transition: all .2s ease-in-out;
      letter-spacing: 1px;
      &:hover {
        opacity: 1;
      }
  }
}

</style>
