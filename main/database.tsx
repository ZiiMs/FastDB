import mongoose, { Connection } from 'mongoose'

// const Admin = mongoose.mongo.Admin

export const connect = async (URI: string, port: string) => {
    const connString = `mongodb://${URI}:${port}`
    console.log(port)
    const conn = await mongoose
        .createConnection(connString, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .catch((err) => {
            console.log(err)
            return err
        })
    return conn
}

export const loadDatabases = (conn: Connection) => {
    console.log(`Load Databases: ${conn}`)
    conn.db.admin().listDatabases((err: any, results: any) => {
        if (err) {
            console.log(`Error: ${err}`)
            return
        }
        console.log(results.databases)
    })
}
