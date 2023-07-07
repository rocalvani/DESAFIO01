import { userModel } from "../dao/managers/db/models/users.js";
import { generateJWToken } from "../utils.js";
import { validPass } from ".././utils.js";
import { cartService} from "../dao/managers/factory.js";
import { createHash} from ".././utils.js";
import UserDTO from "../dao/dto/user.dto.js";
import { userServices } from "../dao/repository/index.js";
import CustomError from "../errors/CustomError.js";
import { generateDuplicateErrorInfo, generateLogInErrorInfo, generateUserErrorInfo } from "../errors/messages/userCreationError.message.js";
import EErrors from "../errors/enums.js";
import { generateServerError } from "../errors/messages/serverError.message.js";

export const logIn = async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await userServices.find(email)
      if (!user) {
        req.logger.warning(`User search failed @ ${req.method} ${req.url}` )

        CustomError.createError({
          name: "user logging error",
          cause: generateLogInErrorInfo(),
          message: "User does not exist.",
          code: EErrors.NOT_FOUND
        })
        return res.status(404).send({error: "Not found", message: "User not found!"});
       }
      if (!validPass(user,password)) {
        req.logger.warning(`User credentials were incorrect @ ${req.method} ${req.url}` )

          CustomError.createError({
            name: "user logging error",
            cause: generateUserErrorInfo(),
            message: "Credentials are incorrect.",
            code: EErrors.INVALID_TYPES_ERROR
          })

          return res.status(401).send({status:"error",error:"credentials are not correct"});
         
      }
      const tokenUser = {
        name: `${user.name}`,
        email: email,
        age: `${user.age}`,
        role: `${user.role}`,
      };
      const accessToken = generateJWToken(tokenUser);
  
      // CON COOKIES
      res.cookie("jwtCookieToken", accessToken, {
        maxAge: 1800000,
        httpOnly: true,
      });
      // CREA CART EN LOGIN
      let cart = await cartService.findByUser(user._id);
  
      if (!cart) {
        let result = await cartService.save({ user: user._id });
      }
      res.status(200)
      .send({message: "successful login"})
      // .redirect('http://localhost:3000/shop');
    } catch {
      req.logger.fatal(`Server error @ ${req.method} ${req.url}` )

      // CustomError.createError({
      //   name: "Server error",
      //   cause: generateServerError(),
      //   message: "Something went wrong on server end.",
      //   code: EErrors.DATABASE_ERROR
      // })
    }
  }

  export const signUp = async (req, res) => {
    const { first_name, last_name, email, age, password } = req.body;
  
 if (!password || !email) {
  req.logger.warning(`User credentials were incorrect @ ${req.method} ${req.url}` )

  CustomError.createError({
    name: "user creation error",
    cause: generateUserErrorInfo({first_name, last_name, email}),
    message: "User could not be created.",
    code: EErrors.INVALID_TYPES_ERROR
  })
 }

    const exists = await userServices.find(email);
    if (exists) {
      return CustomError.createError({
          name: "user creation error",
          cause: generateDuplicateErrorInfo(),
          message: "User already exists.",
          code: EErrors.INVALID_TYPES_ERROR
        })
       
    }
  
    const user = {
      first_name,
      last_name,
      email,
      age,
      password: createHash(password),
    };
    const result = await userServices.create(user)
    res
      .status(201)
      .send({ status: "success", message: "user has successfully been created" });
  }

  // CURRENT 
  export const current = async (req, res)=>{
    let result = await userServices.censor(req.user.email)
      res.render("profile",{user: result})
  }

