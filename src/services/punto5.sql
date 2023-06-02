SELECT Personaje.*, STRING_AGG(Pelicula.Titulo, ',') 
FROM Personaje
LEFT JOIN PersonajeXPelicula ON Personaje.IdPersonaje = PersonajeXPelicula.IdPersonaje
LEFT JOIN Pelicula ON PersonajeXPelicula.IdPelicula = Pelicula.IdPelicula
GROUP BY Personaje.IdPersonaje,Personaje.Imagen,Personaje.Edad,Personaje.Historia, Personaje.Peso, Personaje.Nombre

SELECT Pelicula.*, String_AGG(Personaje.Nombre, ', ') 
FROM Pelicula
LEFT JOIN PersonajeXPelicula ON Pelicula.Id = PersonajeXPelicula.IdPelicula
LEFT JOIN Personaje ON PersonajeXPelicula.IdPersonaje= Personaje.Id
GROUP BY Pelicula.Calificacion, Pelicula.FechaDeCreacion, Pelicula.Imagen, Pelicula.Titulo