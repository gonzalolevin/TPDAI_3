import Personaje from '../Models/personaje.js';
import sql from 'mssql'; //permite conectarse al mssqsl
import config from '../Models/db.js';


export const getAll = async (name, age, weight, movies) =>{ 
    const conn = await sql.connect (config); // para conectar a la base de datos
    let query = 'SELECT Personaje.Imagen, Personaje.Nombre, Personaje.Id FROM Personaje INNER JOIN PersonajeXPelicula ON Personaje.Id = PersonajeXPelicula.IdPersonaje';
    const params = {}; // crea el objeto params
    let isWhere = false

    if(name != undefined)
    {
        query += ' WHERE Nombre = @name ';
        params.name = name; //se la agrega la propiedad "name" al params
        isWhere = true
    }

    if(age != undefined)
    {
        if(isWhere) {
            query += ' AND Edad = @age ';

        } else {
            query += ' WHERE Edad = @age ';
            isWhere = true;

        }
        params.age = age;
    }

    if(weight != undefined)
    {
        if(isWhere) {
            query += ' AND Peso = @weight ';

        } else {
            query += ' WHERE Peso = @weight ';
            isWhere = true;

        }
        params.weight = weight;
    }

    if(movies != undefined)
    {
        if(isWhere) {
            query += ' AND PersonajeXPelicula.IdPelicula = @movies ';
        } else {
            query += ' WHERE PersonajeXPelicula.IdPelicula = @movies ';
            isWhere = true;

        }
        params.movies = movies;
    }
    const results = await conn.request() 
    // ¿Por qué los parametros van asi?
   .input ("name",sql.VarChar,name) //se quiere sustituir el "name" por el nuevo name pasado por parametro
   .input ("age",sql.Int,age)
   .input ("weight",sql.Int,weight)
   .input ("movies",sql.Int,movies)
   .query(query, params)//le pasamos la query que armamos y el params pasa los valores del parametro.
    return results.recordset;
}

export const Create = async (personaje) =>{
    const conn = await  sql.connect(config);// para conectar a la base de datos
    const results2 = await conn.request() // para guardar el resultado 
    .input ("pNombre",sql.VarChar,personaje.nombre)//indica que el personaje.nombre se va a usar para el Nombre del insert.
    .input ("pImagen",sql.VarChar,personaje.imagen)
    .input ("pEdad",sql.Int,personaje.edad)
    .input ("pPeso",sql.Int,personaje.peso)
    .input("pHistoria",sql.VarChar,personaje.historia)
    .query('INSERT INTO Personaje (Nombre,Imagen,Edad,Peso,Historia) VALUES (@pNombre, @pImagen, @pEdad, @pPeso, @pHistoria)');
    //los parametros con el @ son reemplazados con los valores bajados del .input
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
    await conn.request().input ("pId", Id).query('Delete from PersonajeXPelicula where IdPersonaje = @pId')
    const results5 = await conn.request().input ("pId",Id).query('Delete from Personaje where Id = @pId')
    return results5.recordset; 
}


export const getById = async (Id) => {
    const conn = await sql.connect(config);
    const results6 = await conn.request()
    .input("pId",sql.Int,Id)
    .query("SELECT Personaje.*, STRING_AGG(Pelicula.Titulo, ',') as PeliculaTitulo FROM Personaje LEFT JOIN PersonajeXPelicula ON Personaje.Id = PersonajeXPelicula.IdPersonaje LEFT JOIN Pelicula ON PersonajeXPelicula.IdPelicula = Pelicula.Id WHERE Personaje.Id = @pId GROUP BY Personaje.Id,Personaje.Imagen,Personaje.Edad,Personaje.Historia, Personaje.Peso, Personaje.Nombre")
    //La query trae informacion sobre un personaje en base a su id
    //el left join devuelve todos los resultados de Personaje, sin importar su asociacion con Peliculas
    //de esta forma, se pueden traer personajes aunque no esten relacionados con peliculas
    //STRING_AGG es una funcion para concatenar 
    //primero va la expresion a concatenar (pelicula.titulo) y despues va la expresion que se usa entre lo concatenado
    //se concatenan los titulos de las peliculas separados por una coma
    return results6.recordset;  
}

//HAY QUE INCLUIR ESTO DENTRO DEL getAll
//hay que hacer todos los ifs para que se puedan madnar solo algunos parametros
//de esta forma, usando los or, si me mandan un personaje llamada "bob" y que pesa 30 kilos, me duelve todos los que se llaman bob y aparte todos los que pesan 30 kilos, no solo los que se llamen bob y pesesn 30 kilos.




