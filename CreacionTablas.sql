CREATE DATABASE ExamenFinalBD;
USE ExamenFinalBD;

-- Creaci�n de la tabla Roles
CREATE TABLE Rol (
    RolID INT PRIMARY KEY,
    Descripci�n_del_rol VARCHAR(100)
);

-- Creaci�n de la tabla Usuarios
CREATE TABLE Usuario (
    UserID INT PRIMARY KEY,
    Email VARCHAR(100),
    Contrase�a VARCHAR(50),
    RolID INT FOREIGN KEY REFERENCES Rol(RolID)
);

-- Creaci�n de la tabla Permisos
CREATE TABLE Permiso (
    PermisoID INT PRIMARY KEY,
    Descripci�n_del_permiso VARCHAR(100)
);

-- Creaci�n de la tabla RolPermiso
CREATE TABLE RolPermiso (
    RolPermisoID INT PRIMARY KEY,
    RolID INT FOREIGN KEY REFERENCES Rol(RolID),
    PermisoID INT FOREIGN KEY REFERENCES Permiso(PermisoID)
);

-- Creaci�n de la tabla Configuracion
CREATE TABLE Configuracion (
    ConfiguracionID INT PRIMARY KEY,
    Moneda VARCHAR(50)
);

-- Creaci�n de la tabla Pais
CREATE TABLE Pais (
    PaisID INT PRIMARY KEY,
    Nombre_del_pa�s VARCHAR(100)
);

-- Creaci�n de la tabla Ciudad
CREATE TABLE Ciudad (
    CiudadID INT PRIMARY KEY,
    Nombre_de_la_ciudad VARCHAR(100),
    PaisID INT FOREIGN KEY REFERENCES Pais(PaisID)
);

-- Creaci�n de la tabla Aeropuerto
CREATE TABLE Aeropuerto (
    AeropuertoID INT PRIMARY KEY,
    Nombre_del_aeropuerto VARCHAR(100),
    CiudadID INT FOREIGN KEY REFERENCES Ciudad(CiudadID)
);

-- Creaci�n de la tabla TipoTarifa
CREATE TABLE TipoTarifa (
    TipoTarifaID INT PRIMARY KEY,
    Descripci�n VARCHAR(100)
);

-- Creaci�n de la tabla Vuelo
CREATE TABLE Vuelo (
    VueloID INT PRIMARY KEY,
    Origen INT FOREIGN KEY REFERENCES Aeropuerto(AeropuertoID),
    Destino INT FOREIGN KEY REFERENCES Aeropuerto(AeropuertoID),
    FechaVuelo DATE,
    HoraSalida TIME,
    HoraLlegada TIME,
    TipoTarifaID INT FOREIGN KEY REFERENCES TipoTarifa(TipoTarifaID)
);

-- Creaci�n de la tabla Tarifas del Vuelo
CREATE TABLE Tarifa_del_Vuelo (
    TarifaVueloID INT PRIMARY KEY,
    VueloID INT FOREIGN KEY REFERENCES Vuelo(VueloID),
    TipoTarifaID INT FOREIGN KEY REFERENCES TipoTarifa(TipoTarifaID),
    Precio DECIMAL(10, 2)
);

-- Creaci�n de la tabla Detalles del Vuelo
CREATE TABLE Detalles_del_Vuelo (
    VueloID INT PRIMARY KEY,
    Tipo_de_avi�n VARCHAR(50),
    Duraci�n_del_vuelo VARCHAR(50),
    Detalles_de_la_aerol�nea VARCHAR(200),
    TarifaVueloID INT FOREIGN KEY REFERENCES Tarifa_del_Vuelo(TarifaVueloID),
    TipoTarifaID INT FOREIGN KEY REFERENCES TipoTarifa(TipoTarifaID)
);


-- Creaci�n de la tabla Detalles del Usuario
CREATE TABLE Detalle_del_Usuario (
    UserID INT PRIMARY KEY,
    Identificacion VARCHAR(20),
    Nombre VARCHAR(50),
    Apellido VARCHAR(50),
    Fecha_de_nacimiento DATE,
    N�mero_de_tel�fono VARCHAR(20)
);

-- Creaci�n de la tabla Reservas
CREATE TABLE Reserva (
    ReservaID INT PRIMARY KEY,
    UserID INT FOREIGN KEY REFERENCES Usuario(UserID),
    VueloID INT FOREIGN KEY REFERENCES Vuelo(VueloID),
    FechaReserva DATE
);

-- Creaci�n de la tabla Asientos
CREATE TABLE Asiento (
    AsientoID INT PRIMARY KEY,
    VueloID INT FOREIGN KEY REFERENCES Vuelo(VueloID),
    N�mero_de_asiento VARCHAR(20),
    Clase_de_asiento VARCHAR(50)
);

-- Creaci�n de la tabla ReservaAsiento
CREATE TABLE ReservaAsiento (
    ReservaAsientoID INT PRIMARY KEY,
    ReservaID INT FOREIGN KEY REFERENCES Reserva(ReservaID),
    AsientoID INT FOREIGN KEY REFERENCES Asiento(AsientoID)
);

-- Creaci�n de la tabla Pagos
CREATE TABLE Pago (
    PagoID INT PRIMARY KEY,
    ReservaID INT FOREIGN KEY REFERENCES Reserva(ReservaID),
    FechaPago DATE,
    Monto DECIMAL(10, 2),
    Factura VARCHAR(100)
);

-- Creaci�n de la tabla MetodoPago
CREATE TABLE MetodoPago (
    MetodoPagoID INT PRIMARY KEY,
    DescripcionFormaPago VARCHAR(50)
);


-- Creaci�n de la tabla Historial de Pagos
CREATE TABLE Historial_de_Pago (
    HistorialPagoID INT PRIMARY KEY,
    PagoID INT FOREIGN KEY REFERENCES Pago(PagoID),
    Fecha_de_pago DATE,
    Monto DECIMAL(10, 2),
    MetodoPagoID INT FOREIGN KEY REFERENCES MetodoPago(MetodoPagoID)
);

-- Creaci�n de la tabla Detalles de la Factura
CREATE TABLE Detalles_de_la_Factura (
    FacturaID INT PRIMARY KEY,
    Detalles_de_la_tarifa VARCHAR(200),
    Cargos_adicionales VARCHAR(200),
    Total DECIMAL(10, 2),
    MetodoPagoID INT FOREIGN KEY REFERENCES MetodoPago(MetodoPagoID)
);

-- Creaci�n de la tabla Estado del Vuelo
CREATE TABLE Estado_del_Vuelo (
    EstadoVueloID INT PRIMARY KEY,
    VueloID INT FOREIGN KEY REFERENCES Vuelo(VueloID),
    Estado VARCHAR(50)
);

