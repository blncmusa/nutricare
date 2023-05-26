<template>
<div class="container">
    <div class="left">
        <div class="logo">
            <i class="fa-solid fa-leaf"></i>
        </div>
        <div class="welcome">
            <h1>Hi there!</h1>
            <p>Welcome to <strong>Nutricare</strong>: Healthy Eating Community</p>
        </div>
        <div class="login">
            <div class="google-login">
                <button @click='handleGoogleLogin'>
                    <i class="fa-brands fa-google"></i>
                    <span v-if='newUser'>Sign up with Google</span>
                    <span v-if='!newUser'>Log in with Google</span>
                    <div v-if='errorSignup' class="error">{{ errorGoogle }}</div>
                </button>
            </div>
            <div class="separator">
                 <span>Or</span>
             </div>
            <div class="login-form">
                <form v-if='newUser' id='form-signup' @submit.prevent='handleSignup'>
                    <input type="text" required v-model="userName" placeholder="Username">
                    <input type="email" required v-model="email" placeholder="Email">
                    <input type="password" required v-model="password" placeholder="Password">
                    <div v-if='errorSignup' class="error">{{ errorSignup }}</div>
                    <button class="btn">Sign up</button>
                </form>
                <form v-if='!newUser' id='form-login' @submit.prevent="handleLogin">
                    <input type="email" required v-model="email" placeholder="Email">
                    <input type="password" required v-model="password" placeholder="Password">
                    <div v-if='errorLogin' class="error">{{ errorLogin }}</div>
                    <button class="btn">Log in</button>
                </form>
                <p v-if='!newUser'>Don't have an account? <button class='switch-btn' @click="newUser = !newUser">Sign up</button></p>
                <p v-if='newUser'>Already have an account? <button class='switch-btn' @click="newUser = !newUser">Log in</button></p>
            </div>

        </div>
    </div>
     <div class="image-right">
        <div class="logo-text">
            <h1>Nutricare</h1>
            <i class="fa-solid fa-leaf" style="color: #ffffff;"></i>
        </div>
        <img src="@/assets/img/nutricare.png" alt="">
    </div>
</div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import useSignup from '@/composables/useSignup.js'
import useLogin from '@/composables/useLogin.js'
import getUser from '@/composables/getUser'
import useGoogleAuth from '@/composables/useGoogleAuth.js'

export default {
  components: {},
  setup() {
    const email = ref('')
    const password = ref('')
    const userName = ref('')

    const { user } = getUser()

    console.log(user)

    const router = useRouter()
    const newUser = ref(false)

    const { signup, error: errorSignup } = useSignup()
    const { login, error: errorLogin } = useLogin()

    const handleLogin = async () => {
      await login(email.value, password.value)
      if (!errorLogin.value) {
        router.push('/')
      }
    }

    const handleSignup = async () => {
      await signup(email.value, password.value, userName.value)
      if (!errorSignup.value) {
        router.push('/')
      }
    }

    const redirectAfterGoogleLogin = () => {
      router.push('/')
    }

    const { handleGoogleLogin, error: errorGoogle } = useGoogleAuth(redirectAfterGoogleLogin)

    return {
      email,
      password,
      userName,
      newUser,
      errorSignup,
      handleLogin,
      handleSignup,
      errorLogin,
      handleGoogleLogin,
      errorGoogle
    }
  }
}
</script>

<style scoped>
.container {
    height: 100vh;
    width: 100vw;
    display: flex;
    overflow: hidden;
}
.left {
    width: 50%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    z-index: 2
}
h1 {
    font-size: 100px;
    margin: 0;
    padding: 0;
}
p {
    font-size: 15px;
    text-align: center;
}

.google-login button {
    padding: 10px 100px;
    background: transparent;
    box-shadow: none;
    border: 1px solid black;
    border-radius: 20px;
    margin: 50px;
    cursor: pointer;
}

.google-login button:active {
    background: black;
    color: white;
}

.google-login button span {
    margin: 0px 10px;
}

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

.login-form form {
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin: 20px;
}

input {
    padding: 10px 20px;
    border-radius: 20px;
    border: 1px solid #777778
}

.btn {
    background-color: black;
    color: white;
    padding: 15px 20px;
    border-radius: 20px;
    border: none;
    cursor: pointer;
}

.btn:active {
    transform: scale(0.98);
}

/* separator */

.separator {
  overflow: hidden;
  text-align: center;
  margin-bottom: 50px;
}

.separator:before,
.separator:after {
  background-color: #000;
  content: "";
  display: inline-block;
  height: 1px;
  position: relative;
  vertical-align: middle;
  width: 25%;
}

.separator:before {
  right: 0.5em;
  margin-left: -50%;
}

.separator:after {
  left: 0.5em;
  margin-right: -50%;
}

.image-right {
    position: relative;
    z-index: 1;
    transition: transform 0.3s ease;
}

.image-right img {
    transition: transform 0.3s ease;
}

.image-right img:hover {
    transform: scale(1.1);
}

.logo-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: white;
  z-index: 3;
}

.logo-text i {
    font-size: 90px;
}

.switch-btn {
    padding: 5px;  
    margin-left: 10px;  
}

.logo i {
    position: absolute;
    top: 0;
    left: 0;
    font-size: 40px;
    margin: 30px;    
    transition: transform 0.3s ease;      
    z-index: 4;
}

.logo i:hover { 
    transform: rotate(10deg);
}
</style>