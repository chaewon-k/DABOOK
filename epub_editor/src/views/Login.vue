<template>
  <div>
    <v-card class="ma-auto" max-width="500">
      <v-card-title class="title font-weight-regular justify-space-between">
        <span>Login</span>
      </v-card-title>
      <v-window>
        <v-window-item :value="1">
          <v-card-text>
            <v-text-field
              label="Email"
              v-model="inputEmail"
            ></v-text-field>
            <v-text-field
              label="Password"
              type="password"
              v-model="inputPassword"
            ></v-text-field>

            <div class="float-right text-primary">
              <p>비밀번호를 잊으셨나요?</p>
            </div>
          </v-card-text>
        </v-window-item>
      </v-window>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn>LOGIN</v-btn>
        <v-btn>SIGNUP</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>
<script>
  export default {
    name: 'Login',
    data: function () {
      return {
        inputEmail: '',
        inputPassword: ''
      }
    }
  }
</script>