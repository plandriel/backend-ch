import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

// mongoose.connect(process.env.MONGO_URI, (err) => {
//     err
//         ? console.log("⛔ Error al conectarse a MongoDB")
//         : console.log("🆗 Conectados a MongoDB")
// })

// export default mongoose;

const connectionDB={
    connectionMongo: () => {
        try{
        console.log("Conectando a mongo...")
            mongoose.connect(process.env.MONGO_URI, (err) => {
                err
                    ? console.log("⛔ Error al conectarse a MongoDB")
                    : console.log("🆗 Conectados a MongoDB")
            })
        } catch (error){
        console.log(error.message);
        }
    },
    connectionFireBase: () => {
        try {
            console.log("Conectando a firebase...")
        } catch (error) {
            console.log("Ocurrio un error en la conexcion: ",error.message)
        }
    }
}

export default connectionDB;