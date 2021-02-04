<template>
  <div>
    <h1>Google</h1>
    <v-btn :disabled="signedIn" @click="handleLogin"><v-icon>mdi-google</v-icon></v-btn>
    <div>
      <p> 로그인 여부: {{signedIn}}</p>
      <img :src="userImage" width="50" height="50"/>
      <p> 로그인 사용자 이름: {{ userName }} </p>
      <p> 로그인 사용자 이메일: {{ userEmail }} </p>
    </div>
    
    <router-link :to="{name:'Login'}"><v-btn>Back</v-btn></router-link>
  </div>
</template>

<script lang='ts'>
import ElectronGoogleOAuth2 from '@getstation/electron-google-oauth2';

export default {
  name: 'GoogleLogin',
  data: () => ({
    signedIn: false,
    userName: null,
    userEmail: null,
    userImage: null,
  }),
  methods: {
    handleLogin: function () {
      const client = '613406129704-omk18m4bqaei962v5s2hsn654cj2den2.apps.googleusercontent.com'
      const myApiOauth = new ElectronGoogleOAuth2(
        client,
        'FHTLcGOSPrgC0c9CNtSmj43U',
        ['https://www.googleapis.com/auth/drive.metadata.readonly']
      );
    
      myApiOauth.openAuthWindowAndGetTokens()
        .then(token => {
          console.log(token)
        });
    }
  }
}
</script>

<style>

</style>