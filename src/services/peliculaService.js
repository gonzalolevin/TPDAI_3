import Pelicula from '../Models/pelicula.js';
import sql from 'mssql';
import config from '../Models/db.js';

export const getAll = async (name, order) =>{
    const conn = await sql.connect (config); // para conectar a la base de datos
    let query = "SELECT Id, Imagen, Titulo, FechaDeCreacion FROM Pelicula"
    const params = {};


    if (name != undefined)
    {
        query += " WHERE Titulo = @name"
        params.name = name;

    }

    if (order != undefined)
    {
        query += ` ORDER BY FechaDeCreacion ${order}`;
        params.order = order;
    }

    const results = await conn.request() 
    .input ("name",sql.VarChar,name)
    .input ("order",sql.VarChar,order)
    .query(query, params)  
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
    await conn.request().input ("pId", Id).query('Delete from PersonajeXPelicula where IdPelicula = @pId')
    const results5 = await conn.request().input ("pId",Id).query('Delete from Pelicula where Id = @pId')
    return results5.rowsAffected; 
}

export const getById = async (Id) => {
    const conn = await sql.connect(config);
    const results6 = await conn.request()
    .input("pId",sql.Int,Id)
    .query("SELECT Pelicula.*, String_AGG(Personaje.Nombre, ', ') as PersonajesPelicula FROM Pelicula LEFT JOIN PersonajeXPelicula ON Pelicula.Id = PersonajeXPelicula.IdPelicula LEFT JOIN Personaje ON PersonajeXPelicula.IdPersonaje = Personaje.Id WHERE Pelicula.Id = @pId GROUP BY Pelicula.Calificacion, Pelicula.FechaDeCreacion, Pelicula.Id, Pelicula.Imagen, Pelicula.Titulo ")
    return results6.recordset;  
}


