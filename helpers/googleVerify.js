const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client( process.env.CLIENTE_GOOGLE_ID );



const googleverify = async( idToken = '' ) => {
  const ticket = await client.verifyIdToken({
      idToken,
      audience:  process.env.CLIENTE_GOOGLE_ID,  // Specify the CLIENT_ID of the app that accesses the backend
      // Or, if multiple clients access the backend:
      //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
  });

  
  // const payload = ticket.getPayload(); // destructuramos el payload
  // cambiamos de nombre delas variables de google por el nombre de mi oomdelo usuario
  const { email:email, picture:images, name:name }= ticket.getPayload(); // destructuramos el payload
  return {
    email,
    images, 
    name
  }; // retornar el payload
}


module.exports = {
  googleverify
}