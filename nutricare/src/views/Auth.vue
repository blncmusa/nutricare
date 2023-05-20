<template>
<div class="container">
    <div class="left">
        <div class="welcome">
            <h1>Hi there!</h1>
            <p>Welcome to Nutricare.</p>
        </div>
        <div class="login">
            <div class="google-login">
                <button>Log in with Google</button>
            </div>
        </div>
    </div>
    <div class="image-right">
        <img src="nutricare.png" alt="">
    </div>
</div>
</template>

<script>
export default {

}
</script>

<style scoped>
 .image-right {
    position: fixed;
    top: 0;
    right: 0;
    height: 100vh;
    width: 50vw;
    overflow: hidden;
}

img {
  height: 100%;
  width: 100%;
  object-fit: cover;
}

.container {
    height: 100vh;
    width: 100vw;
    display: flex;
}
.left {
    width: 50%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
h1 {
    font-size: 80px;
}
</style>