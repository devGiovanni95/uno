import { Router, response } from "express";
import cardRoute from "./card";
import userRoute from "./user";

// import photoRoutes from "./photo/photos.routes";

const routes = Router();

routes.use('/card', cardRoute)
routes.use('/game', cardRoute)
routes.use('/user', userRoute)

// //rota para ver a documentação da api em swagger docs
// routes.use('/api-docs', swaggagerUi.serve, swaggagerUi.setup(swaggerDocs))

// //rota do swagger 
// routes.get('/swagger', (request, response) => {
//     return response.sendFile(process.cwd() + "/src/documentation/swaggerv1.json")
// })

// routes.get('/docs', (request, response) => {
//     return response.sendFile(process.cwd() + "/index.html")
// })

export default routes