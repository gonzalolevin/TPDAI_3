import Personaje from '../Models/personaje.js';
import sql from 'mssql';
import config from '../Models/db.js';


export const getAll = async () =>{
    const conn = await sql.connect (config); // para conectar a la base de datos
    const results = await conn.request().query ('SELECT Imagen, Nombre, Id FROM Personaje')
    return results.recordset;
}

export const Create = async (personaje) =>{
    const conn = await  sql.connect(config);// para conectar a la base de datos
    const results2 = await conn.request() // para guardar el resultado 
    .input ("pNombre",sql.VarChar,personaje.nombre)
    .input ("pImagen",sql.VarChar,personaje.imagen)
    .input ("pEdad",sql.Int,personaje.edad)
    .input ("pPeso",sql.Int,personaje.peso)
    .input("pHistoria",sql.VarChar,personaje.historia)
    .query('INSERT INTO Personaje (Nombre,Imagen,Edad,Peso,Historia) VALUES (@pNombre, @pImagen, @pEdad, @pPeso, @pHistoria)');
    return results2;
}

export const Update = async(Id,personaje)=>{
    const conn = await sql.connect (config); // para conectar a la base de datos
    const results3 = await conn.request()
    .input ("pId",sql.Int, Id)
    .input ("pNombre",sql.VarChar,personaje.nombre)
    .input ("pImagen",sql.VarChar,personaje.imagen)
    .input ("pEdad",sql.Int,personaje.edad)
    .input ("pPeso",sql.Int,personaje.peso)
    .input("pHistoria",sql.VarChar,personaje.historia)
    .query ('UPDATE Personaje SET Nombre = @pNombre, Imagen = @pImagen, Edad = @pEdad, Peso = @pPeso, Historia = @pHistoria WHERE Id = @pId')
    return results3.rowsAffected;
}

export const deleteById = async (Id) => {
    const conn = await sql.connect(config);
    const results5 = await conn.request()
    .input("pId",sql.Int,Id).query('Delete from Personaje where Id = @pId')
    return results5.rowsAffected; 
}


export const getById = async (Id) => {
    const conn = await sql.connect(config);
    const results6 = await conn.request()
    .input("pId",sql.Int,Id)
    .query("SELECT Personaje.Imagen, Personaje.Nombre, Personaje.Edad, Personaje.Peso, Personaje.Historia, Pelicula.Imagen, Pelicula.Titulo, Pelicula.FechaDeCreacion, Pelicula.Calificacion FROM PersonajeXPelicula INNER JOIN Personaje On Personaje.Id = PersonajeXPelicula.IdPersonaje INNER JOIN Pelicula ON Pelicula.Id = PersonajeXPelicula.IdPelicula  WHERE Personaje.Id = @pId") 
    return results6.recordset;  
}

/*
console.log('This is a function on the service');
        const pool = await sql.connect(config);
        const response = await pool.request()
        .input('Id',sql.Int, id)
        .query(`Select * FROM ${PersonajeTabla} WHERE Personaje.Id = @Id`);
                
        const pool2 = await sql.connect(config);
        const response2 = await pool2.request()
        .input('Id',sql.Int, id)
        .query(`Select Pelicula.Titulo FROM Pelicula inner join PersonajesAsociados on PersonajesAsociados.FkPeliculas = Pelicula.Id WHERE PersonajesAsociados.FkPersonajes = @Id`);

        console.log(response)
        const personaje = response.recordset[0]
        personaje.pelicula = response2.recordset;
        return personaje;
*/