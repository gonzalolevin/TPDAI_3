import Pelicula from '../Models/pelicula.js';
import sql from 'mssql';
import config from '../Models/db.js';

export const getAll = async () =>{
    const conn = await sql.connect (config); // para conectar a la base de datos
    const results = await conn.request().query ('SELECT Id,Imagen,Titulo,FechaDeCreacion FROM Pelicula')
    return results.recordset;
}

export const Create = async (pelicula) =>{
    const conn = await  sql.connect(config);// para conectar a la base de datos
    const results2 = await conn.request() // para guardar el resultado 
    .input ("pImagen",sql.VarChar,pelicula.imagen)
    .input ("pTitulo",sql.VarChar,pelicula.titulo)
    .input ("pFechaDeCreacion",sql.Date,pelicula.fechaDeCreacion)
    .input("pCalificacion",sql.Int,pelicula.calificacion)
    .query('INSERT INTO Pelicula (Imagen,Titulo,FechaDeCreacion,Calificacion) VALUES (@pImagen, @pTitulo, @pFechaDeCreacion, @pCalificacion)');
    return results2;
}

export const Update = async(Id,pelicula)=>{
    const conn = await sql.connect (config); // para conectar a la base de datos
    const results3 = await conn.request()
    .input ("pId",sql.Int, Id)
    .input ("pImagen",sql.VarChar,pelicula.imagen)
    .input ("pTitulo",sql.VarChar,pelicula.titulo)
    .input ("pFechaDeCreacion",sql.Date,pelicula.fechaDeCreacion)
    .input("pCalificacion",sql.Int,pelicula.calificacion)
    .query ('UPDATE Pelicula SET Imagen = @pImagen, Titulo = @pTitulo, FechaDeCreacion = @pFechaDeCreacion, Calificacion = @pCalificacion WHERE Id = @pId')
    return results3.rowsAffected;
}

export const deleteById = async (Id) => {
    const conn = await sql.connect(config);
    const results5 = await conn.request()
    .input("pId",sql.Int,Id).query('Delete from Pelicula where Id = @pId')
    return results5.rowsAffected; 
}

export const getById = async (Id) => {
    const conn = await sql.connect(config);
    const results6 = await conn.request()
    .input("pId",sql.Int,Id)
    .query("SELECT Pelicula.Imagen AS ImagenPelicula, Pelicula.Titulo AS TituloPelicula, Pelicula.FechaDeCreacion, Pelicula.Calificacion, Personaje.Imagen AS ImagenPersonaje, Personaje.Nombre AS NombrePersonaje, Personaje.Edad, Personaje.Peso, Personaje.Historia FROM PersonajeXPelicula INNER JOIN Personaje On Personaje.Id = PersonajeXPelicula.IdPersonaje INNER JOIN Pelicula ON Pelicula.Id = PersonajeXPelicula.IdPelicula  WHERE Personaje.Id = @pId") 
    return results6.recordset;  
}

