import jwt from "jsonwebtoken";


//en base a los parametros, genera el token, que es un string
//el string se genera a raiz de todo esto que le pasamos, es una encriptacion de todos los parametros que le pasamios
export const getSignedToken = () => {
    const userId = "pedro";
    const userMail = `${userId}@example.com`;
    const token = jwt.sign(
      {
        payload: "custom payload",
        userEmail: userMail,
      },
      process.env.AUTH_HS256_KEY,
      {
        issuer: "http://hola.com",
        subject: userId,
        audience: ["http://localhost/"],
        expiresIn: 60 * 24 * 24,
      }
    );
  
    return token;
  };