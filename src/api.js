import axios from "axios";

export const myLoginRoutine = user =>
  new Promise((resolve, reject) => {
    let url = "http://sgmshop.danone.id:9000/v1/consumers/login";
    let config = {
      headers: {
        client_id: "sgmshop-staging",
        client_key:
          "$2y$12$3vYx3mvYafU5TN7AeXQZdu68BD/.wPDQYWhtOScDDIVClQXz4jXAe"
      }
    };

    axios({ url: url, data: user, headers: config.headers, method: "POST" })
      .then(res => {
        const token = res.data.data.access_token;
        localStorage.setItem("access_token", token);
        resolve(res);
      })
      .catch(err => {
        localStorage.removeItem("access_token");
        reject(err);
      });
  });
