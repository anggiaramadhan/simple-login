<template>
  <v-container grid-list-md fluid fill-height>
    <v-layout align-center justify-center row wrap>
      <v-flex xs12 md8 lg8>
        <v-card>
          <v-img :src="LoginBackground">
            <v-container fill-height fluid>
              <v-layout align-center justify-center row wrap>
                <v-flex xs12 md6 lg6>
                  <v-form ref="form" @submit.prevent="login" v-model="valid" lazy-validation>
                    <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>
                    <v-text-field
                      :append-icon="showPassword ? 'visibility_off' : 'visibility'"
                      :type="showPassword ? 'text' : 'password'"
                      v-model="password"
                      :counter="15"
                      :rules="passwordRules"
                      label="Password"
                      @click:append="showPassword = !showPassword"
                      required
                    ></v-text-field>
                    <v-layout align-center align-content-space-between row wrap>
                      <v-flex lg6>
                        <v-checkbox v-model="remember" label="Remember me" required></v-checkbox>
                      </v-flex>
                      <v-flex lg6 class="text-lg-right">
                        <router-link to="/forgot-password">Forgot password?</router-link>
                      </v-flex>
                      <v-flex lg12 class="text-lg-center text-md-center">
                        <v-btn type="submit" round color="primary">Sign In Now
                          <v-icon right>arrow_right_alt</v-icon>
                        </v-btn>
                      </v-flex>
                      <v-flex lg12 class="text-lg-center text-md-center">Dont have an account?
                        <router-link to="/register" color="primary">Register</router-link>
                      </v-flex>
                    </v-layout>
                  </v-form>
                </v-flex>
              </v-layout>
            </v-container>
          </v-img>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapMutations } from "vuex";
import LoginBackground from "@/assets/login-background.jpeg";
import { myLoginRoutine } from "@/api.js";

export default {
  data() {
    return {
      LoginBackground,
      showPassword: false,
      valid: true,
      password: "",
      passwordRules: [
        v => !!v || "Password is required",
        v => (v && v.length >= 5) || "Password must be more than 5 characters"
      ],
      email: "",
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+/.test(v) || "E-mail must be valid"
      ],
      remember: false
    };
  },

  methods: {
    ...mapMutations(["setAuthenticated", "setConsumer"]),
    login() {
      if (this.$refs.form.validate()) {
        const { email, password } = this;
        myLoginRoutine({ email, password })
          .then(res => {
            let { consumer } = res.data.data;
            this.setAuthenticated(true);
            this.setConsumer(consumer);
          })
          .then(() => this.$router.push("/"));
      }
    }
  }
};
</script>
