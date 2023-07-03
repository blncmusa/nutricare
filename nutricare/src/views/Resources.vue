<template>
  <div class="container">
    <div class="article" v-for="(article, index) in articles" :key="index">
        <img :src="article.image" alt="article cover">
        <div class="text">
          <h3>{{ article.title }}</h3>
          <p>{{ article.description }}</p>
          <a :href="article.link" target="_blank"> 
            <p class="link">Read article → </p>
          </a>
        </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue'
import img from '/src/assets/img/eh-article-1.jpg'
import articlesData from "../../data/articles.json"

export default {
  setup(){
    const articles = ref([]);

    onMounted(() => {
      articles.value = articlesData
      console.log(articles.image)
    })

    return { articles }
  }
}
</script>

<style scoped>

  .container {
    margin: 50px 0;
  }

  .article {
    box-sizing: border-box;
    width: 80%;
    background-color: white;
    height: 200px;
    margin-bottom: 20px;
    margin-left: 200px;
    padding-left: 20px;
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    transition: all 0.4s ease
  }

  .article:hover {
    transform: scale(1.05);
  }

  img {
    height: 150px;
    width: 150px;
    object-fit: cover;
    border-radius: 20px;
  }
  
  .text {
    padding: 0px 40px;
  }

  .link {
    text-align: right;
    cursor: pointer;
  }
</style>