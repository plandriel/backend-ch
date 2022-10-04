// const authMiddleware = app.use((req, res, next) => { 
    //si se coloca app.use() el middleware se aplica a toda la app.
const authMiddleware= (req, res, next)=> { // si quitamos el app.use, queda listo para aplicar a cualquier ruta.
    req.header('authorization') == process.env.TOKEN 
        ? next()
        : res.status(401).json({"error": "unauthorized"})
}

module.exports= authMiddleware;