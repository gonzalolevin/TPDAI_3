USE [master]
GO
/****** Object:  Database [Disney]    Script Date: 10/5/2023 09:00:18 ******/
CREATE DATABASE [Disney]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'Disney', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL14.MSSQLSERVER\MSSQL\DATA\Disney.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'Disney_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL14.MSSQLSERVER\MSSQL\DATA\Disney_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
GO
ALTER DATABASE [Disney] SET COMPATIBILITY_LEVEL = 140
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [Disney].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [Disney] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [Disney] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [Disney] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [Disney] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [Disney] SET ARITHABORT OFF 
GO
ALTER DATABASE [Disney] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [Disney] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [Disney] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [Disney] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [Disney] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [Disney] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [Disney] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [Disney] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [Disney] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [Disney] SET  DISABLE_BROKER 
GO
ALTER DATABASE [Disney] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [Disney] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [Disney] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [Disney] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [Disney] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [Disney] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [Disney] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [Disney] SET RECOVERY FULL 
GO
ALTER DATABASE [Disney] SET  MULTI_USER 
GO
ALTER DATABASE [Disney] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [Disney] SET DB_CHAINING OFF 
GO
ALTER DATABASE [Disney] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [Disney] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [Disney] SET DELAYED_DURABILITY = DISABLED 
GO
EXEC sys.sp_db_vardecimal_storage_format N'Disney', N'ON'
GO
ALTER DATABASE [Disney] SET QUERY_STORE = OFF
GO
USE [Disney]
GO
/****** Object:  User [alumno]    Script Date: 10/5/2023 09:00:18 ******/
CREATE USER [alumno] FOR LOGIN [alumno] WITH DEFAULT_SCHEMA=[dbo]
GO
/****** Object:  Table [dbo].[Pelicula]    Script Date: 10/5/2023 09:00:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Pelicula](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Imagen] [varchar](5000) NOT NULL,
	[Titulo] [varchar](50) NOT NULL,
	[FechaDeCreacion] [date] NOT NULL,
	[Calificacion] [int] NOT NULL,
 CONSTRAINT [PK_Pelicula] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Personaje]    Script Date: 10/5/2023 09:00:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Personaje](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Imagen] [varchar](5000) NOT NULL,
	[Nombre] [varchar](50) NOT NULL,
	[Edad] [int] NOT NULL,
	[Peso] [int] NOT NULL,
	[Historia] [varchar](5000) NOT NULL,
 CONSTRAINT [PK_Personaje] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PersonajeXPelicula]    Script Date: 10/5/2023 09:00:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PersonajeXPelicula](
	[IdPersonaje] [int] NOT NULL,
	[IdPelicula] [int] NOT NULL,
 CONSTRAINT [PK_PersonajeXPelicula] PRIMARY KEY CLUSTERED 
(
	[IdPersonaje] ASC,
	[IdPelicula] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[Pelicula] ON 

INSERT [dbo].[Pelicula] ([Id], [Imagen], [Titulo], [FechaDeCreacion], [Calificacion]) VALUES (1, N'forestgump.jpg', N'Forrest Gump', CAST(N'1994-10-06' AS Date), 10)
INSERT [dbo].[Pelicula] ([Id], [Imagen], [Titulo], [FechaDeCreacion], [Calificacion]) VALUES (2, N'lobo.jpg', N'Lobo de Wall Street', CAST(N'2014-01-02' AS Date), 9)
INSERT [dbo].[Pelicula] ([Id], [Imagen], [Titulo], [FechaDeCreacion], [Calificacion]) VALUES (3, N'cars.jpg', N'Cars', CAST(N'2006-06-29' AS Date), 8)
SET IDENTITY_INSERT [dbo].[Pelicula] OFF
GO
SET IDENTITY_INSERT [dbo].[Personaje] ON 

INSERT [dbo].[Personaje] ([Id], [Imagen], [Nombre], [Edad], [Peso], [Historia]) VALUES (1, N'imagen1.jpg', N'Forrest Gump', 36, 81, N'Forrest Gump es un hombre sencillo con un corazón enorme.')
INSERT [dbo].[Personaje] ([Id], [Imagen], [Nombre], [Edad], [Peso], [Historia]) VALUES (2, N'imagen2.jpg', N'Jenny Curran', 35, 58, N'Jenny Curran es la amiga de la infancia de Forrest y su gran amor.')
INSERT [dbo].[Personaje] ([Id], [Imagen], [Nombre], [Edad], [Peso], [Historia]) VALUES (3, N'imagen3.jpg', N'Teniente Dan Taylor', 47, 72, N'Teniente Dan Taylor es el superior de Forrest en el ejército.')
INSERT [dbo].[Personaje] ([Id], [Imagen], [Nombre], [Edad], [Peso], [Historia]) VALUES (4, N'imagen4.jpg', N'Bubba Blue', 21, 77, N'Bubba Blue es el mejor amigo de Forrest durante la guerra de Vietnam.')
INSERT [dbo].[Personaje] ([Id], [Imagen], [Nombre], [Edad], [Peso], [Historia]) VALUES (5, N'imagen5.jpg', N'Lieutenant Dan', 47, 72, N'Lieutenant Dan es el superior de Forrest en el ejército.')
INSERT [dbo].[Personaje] ([Id], [Imagen], [Nombre], [Edad], [Peso], [Historia]) VALUES (6, N'imagen6.jpg', N'Mama Gump', 72, 63, N'Mama Gump es la madre de Forrest y su gran apoyo en la vida.')
INSERT [dbo].[Personaje] ([Id], [Imagen], [Nombre], [Edad], [Peso], [Historia]) VALUES (7, N'imagen7.jpg', N'Sargento Simms', 40, 80, N'Sargento Simms es el instructor brutal de Forrest en la escuela militar.')
INSERT [dbo].[Personaje] ([Id], [Imagen], [Nombre], [Edad], [Peso], [Historia]) VALUES (8, N'jordan_belfort.jpg', N'Jordan Belfort', 22, 75, N'Jordan es un ambicioso corredor de bolsa que se convierte en un millonario gracias a su astucia y deshonestidad.')
INSERT [dbo].[Personaje] ([Id], [Imagen], [Nombre], [Edad], [Peso], [Historia]) VALUES (9, N'donnie_azoff.jpg', N'Donnie Azoff', 27, 85, N'Donnie es el mejor amigo y mano derecha de Jordan. Juntos fundan Stratton Oakmont y se convierten en los reyes de Wall Street.')
INSERT [dbo].[Personaje] ([Id], [Imagen], [Nombre], [Edad], [Peso], [Historia]) VALUES (10, N'rayo_mcqueen.jpg', N'Rayo McQueen', 25, 78, N'Rayo McQueen es un auto de carreras novato que aprende la importancia del trabajo en equipo.')
INSERT [dbo].[Personaje] ([Id], [Imagen], [Nombre], [Edad], [Peso], [Historia]) VALUES (11, N'mate.jpg', N'Mate', 50, 80, N'Mate es el mejor amigo de Rayo McQueen y un auto de remolque con un gran corazón.')
SET IDENTITY_INSERT [dbo].[Personaje] OFF
GO
INSERT [dbo].[PersonajeXPelicula] ([IdPersonaje], [IdPelicula]) VALUES (1, 1)
INSERT [dbo].[PersonajeXPelicula] ([IdPersonaje], [IdPelicula]) VALUES (2, 1)
INSERT [dbo].[PersonajeXPelicula] ([IdPersonaje], [IdPelicula]) VALUES (3, 1)
INSERT [dbo].[PersonajeXPelicula] ([IdPersonaje], [IdPelicula]) VALUES (4, 1)
INSERT [dbo].[PersonajeXPelicula] ([IdPersonaje], [IdPelicula]) VALUES (5, 1)
INSERT [dbo].[PersonajeXPelicula] ([IdPersonaje], [IdPelicula]) VALUES (6, 1)
INSERT [dbo].[PersonajeXPelicula] ([IdPersonaje], [IdPelicula]) VALUES (7, 1)
INSERT [dbo].[PersonajeXPelicula] ([IdPersonaje], [IdPelicula]) VALUES (8, 2)
INSERT [dbo].[PersonajeXPelicula] ([IdPersonaje], [IdPelicula]) VALUES (9, 2)
INSERT [dbo].[PersonajeXPelicula] ([IdPersonaje], [IdPelicula]) VALUES (10, 3)
INSERT [dbo].[PersonajeXPelicula] ([IdPersonaje], [IdPelicula]) VALUES (11, 3)
GO
ALTER TABLE [dbo].[PersonajeXPelicula]  WITH CHECK ADD  CONSTRAINT [FK_PersonajeXPelicula_Pelicula] FOREIGN KEY([IdPelicula])
REFERENCES [dbo].[Pelicula] ([Id])
GO
ALTER TABLE [dbo].[PersonajeXPelicula] CHECK CONSTRAINT [FK_PersonajeXPelicula_Pelicula]
GO
ALTER TABLE [dbo].[PersonajeXPelicula]  WITH CHECK ADD  CONSTRAINT [FK_PersonajeXPelicula_Personaje] FOREIGN KEY([IdPersonaje])
REFERENCES [dbo].[Personaje] ([Id])
GO
ALTER TABLE [dbo].[PersonajeXPelicula] CHECK CONSTRAINT [FK_PersonajeXPelicula_Personaje]
GO
USE [master]
GO
ALTER DATABASE [Disney] SET  READ_WRITE 
GO
