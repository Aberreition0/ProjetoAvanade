CREATE DATABASE AVANADE;
GO

USE AVANADE;
GO

-- TIPO USUARIO
CREATE TABLE tipoUsuario(
	idTipoUsuario INT PRIMARY KEY IDENTITY,
	tipoUsuario VARCHAR(20) UNIQUE NOT NULL
);
GO

SELECT * FROM tipoUsuario
GO;

-- USUARIO
CREATE TABLE usuarios (
	idUsuario INT PRIMARY KEY IDENTITY,
	idTipoUsuario INT FOREIGN KEY REFERENCES tipoUsuario(idTipoUsuario),
	nomeUsuario VARCHAR(50) NOT NULL,
	email VARCHAR(70) UNIQUE NOT NULL,
	senha VARCHAR(20) NOT NULL,
	dataNascimento DATE NOT NULL,
	cpf CHAR(11) UNIQUE NOT NULL,
	pontos BIT DEFAULT 0,
	saldo SMALLMONEY
);
GO


SELECT * FROM usuarios
GO;

-- VAGAS
CREATE TABLE vagas(
	idVaga INT PRIMARY KEY IDENTITY,
	idBicicletario INT FOREIGN KEY REFERENCES bicicletarios(idBicicletario),
	statusVaga BIT DEFAULT 0
);
GO

SELECT * FROM vagas
GO;

-- RESERVAS
CREATE TABLE reservas(
	idReserva INT PRIMARY KEY IDENTITY,
	idUsuario INT FOREIGN KEY REFERENCES usuarios(idUsuario),
	idVaga INT FOREIGN KEY REFERENCES vagas(idVaga),
	abreTrava DATETIME,
	fechaTrava DATETIME,
	preco SMALLMONEY,
	statusPagamento BIT DEFAULT 0
);
GO


SELECT * FROM reservas
GO;

-- BICICLETARIOS 
CREATE TABLE bicicletarios(
	idBicicletario INT PRIMARY KEY IDENTITY,
	nome VARCHAR(30) NOT NULL,
	rua VARCHAR(50) NOT NULL,
	numero INT,
	bairro VARCHAR(20) NOT NULL,
	cidade VARCHAR(40) NOT NULL,
	cep VARCHAR(10) NOT NULL,
	horarioAberto DATETIME,
	horarioFechado DATETIME,
);
GO

SELECT * FROM bicicletarios
GO;


