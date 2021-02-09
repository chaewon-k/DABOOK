<template>
  <div>
    <v-card class="ma-auto" max-width="500">
      <v-card-title class="title font-weight-regular justify-space-between">
        <span>Login</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-text-field
              label="Email"
              v-model="inputEmail"
            ></v-text-field>
          </v-row>
          <v-row>
            <v-text-field
              label="Password"
              type="password"
              v-model="inputPassword"
            ></v-text-field>
          </v-row>
        </v-container>
        <div class="float-right">
          <p>비밀번호를 잊으셨나요?</p>
        </div>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn @click="logIn">LOGIN</v-btn>
        <v-btn @click="signUp">SIGNUP</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>
<script>
  import axios from 'axios'
  export default {
    name: 'Login',
    data: function () {
      return {
        inputEmail: '',
        inputPassword: ''
      }
    },
    methods: {
      logIn: function () {
        const data = {"email" : this.inputEmail, "password" : this.inputPassword}
        axios.post("https://i4a103.p.ssafy.io/api/login", data)
          .then(res => {
            const message = res.data.result
            if (message === "ERROR_ID"){console.log(message)}
            else if (message === "ERROR_STATUS"){console.log(message)}
            else if (message === "ERROR_PASSWORD"){console.log(message)}
            else {
              console.log(message)
              this.$router.push({ name: 'Editor'})
            }
          })
          .catch(err => console.log(err))
      },
      signUp: function () {
        this.$router.push({ name: 'Signup'})
      }
    }
  }
</script>