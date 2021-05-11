<template>
  <form class="card auth-card" @submit.prevent="submitHandler">
    <div class="card-content">
      <span class="card-title">{{ 'Home accounting' | localize}}</span>
      <div class="input-field">
        <input
          id="email"
          type="text"
          v-model.trim="email"
          :class="{invalid: ($v.email.$dirty && !$v.email.required) || ($v.email.$dirty && !$v.email.email)}"
        >
        <label for="email">{{ 'Email' | localize}}</label>
        <small
          class="helper-text invalid"
          v-if="$v.email.$dirty && !$v.email.required"
        >
          {{ 'The Email field should not be empty' | localize}}
        </small>
        <small
          class="helper-text invalid"
          v-else-if="$v.email.$dirty && !$v.email.email"
        >
          {{ 'Enter the correct Email address' | localize}}
        </small>
      </div>
      <div class="input-field">
        <input
          id="password"
          type="password"
          v-model.trim="password"
          :class="{invalid: ($v.password.$dirty && !$v.password.required) || ($v.password.$dirty && !$v.password.minLength)}"
        >
        <label for="password">{{ 'Password' | localize}}</label>
        <small class="helper-text invalid"
               v-if="$v.password.$dirty && !$v.password.required">
          {{ 'Enter the password' | localize}}</small>
        <small class="helper-text invalid"
               v-if="$v.password.$dirty && !$v.password.minLength">
          {{ 'The password must consist' | localize}} {{ $v.password.$params.minLength.min }} символов.Сейчас он {{ password.length }}</small>
      </div>
    </div>
    <div class="card-action">
      <div>
        <button
          class="btn waves-effect waves-light auth-submit"
          type="submit"
        >
          {{ 'Enter' | localize}}
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        {{ 'No account' | localize}}?
        <router-link to="/register">{{ 'Register' | localize}}</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import {email, required, minLength} from 'vuelidate/lib/validators'
import messages from "../utils/messages";
import localizeFilter from "../filters/localize.filter";

export default {
  metaInfo(){
    return{
      title: this.$title('Login')
    }
  },
  name: 'login',
  data: () => ({
    email: '',
    password: '',
    isRuLocale: true
  }),
  validations: {
    email: {email, required},
    password: {required, minLength: minLength(6)}
  },
  mounted() {
    if(messages[this.$route.query.message]){
      this.$message(messages[this.$route.query.message])
    }
  },
  methods: {
    async  submitHandler(){
      if(this.$v.$invalid){
        this.$v.$touch()
        return
      }
      const formData = {
        email: this.email,
        password: this.password
      }
      try {
        await this.$store.dispatch('login', formData )
        this.$router.push('/')
      } catch (e){}
    }
  }
}
</script>
