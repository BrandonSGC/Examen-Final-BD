--Historial de pagos
CREATE PROCEDURE ConsultarHistorialPagos
    @ReservaID INT
AS
BEGIN
    SELECT hp.HistorialPagoID, hp.Fecha_de_pago, hp.Monto, mp.DescripcionFormaPago
    FROM Historial_de_Pago hp
    INNER JOIN MetodoPago mp ON hp.MetodoPagoID = mp.MetodoPagoID
    WHERE hp.PagoID IN (
        SELECT PagoID
        FROM Pago
        WHERE ReservaID = @ReservaID
    );
END;
--EXEC ConsultarHistorialPagos @ReservaID = 1;

--Consultar Estado del vuelo
CREATE PROCEDURE ConsultarEstadoVuelo
    @VueloID INT
AS
BEGIN
    SELECT EstadoVueloID, Estado
    FROM Estado_del_Vuelo
    WHERE VueloID = @VueloID;
END;

--Reserva asiento
CREATE PROCEDURE ReservarAsiento
    @ReservaID INT,
    @AsientoID INT
AS
BEGIN
    -- Verificar que el asiento esté disponible (opcional, depende de tus requerimientos)
    IF NOT EXISTS (
        SELECT 1
        FROM Asiento
        WHERE AsientoID = @AsientoID
          AND AsientoID NOT IN (
            SELECT AsientoID
            FROM ReservaAsiento
            WHERE ReservaID = @ReservaID
        )
    )
    BEGIN
        RAISERROR('El asiento no está disponible.', 16, 1);
        RETURN;
    END;

    -- Insertar la reserva del asiento
    INSERT INTO ReservaAsiento (ReservaID, AsientoID)
    VALUES (@ReservaID, @AsientoID);
END;

--Consultar vuelo
CREATE PROCEDURE ConsultarVuelo
    @VueloID INT
AS
BEGIN
    SELECT v.VueloID, a1.Nombre_del_aeropuerto AS Origen, a2.Nombre_del_aeropuerto AS Destino,
           v.FechaVuelo, v.HoraSalida, v.HoraLlegada, tt.Descripción AS TipoTarifa,
           dv.Tipo_de_avión, dv.Duración_del_vuelo, dv.Detalles_de_la_aerolínea
    FROM Vuelo v
    INNER JOIN Aeropuerto a1 ON v.Origen = a1.AeropuertoID
    INNER JOIN Aeropuerto a2 ON v.Destino = a2.AeropuertoID
    INNER JOIN TipoTarifa tt ON v.TipoTarifaID = tt.TipoTarifaID
    INNER JOIN Detalles_del_Vuelo dv ON v.VueloID = dv.VueloID
    WHERE v.VueloID = @VueloID;
END;

--Consultar asiento
CREATE PROCEDURE ConsultarAsiento
    @AsientoID INT
AS
BEGIN
    SELECT a.AsientoID, v.VueloID, a.Número_de_asiento, a.Clase_de_asiento
    FROM Asiento a
    INNER JOIN Vuelo v ON a.VueloID = v.VueloID
    WHERE a.AsientoID = @AsientoID;
END;

--Consultar reserva
CREATE PROCEDURE ConsultarReserva
    @ReservaID INT
AS
BEGIN
    SELECT r.ReservaID, u.Email AS Usuario, v.VueloID, v.FechaVuelo, v.HoraSalida, v.HoraLlegada,
           a.Nombre_del_aeropuerto AS Origen, a2.Nombre_del_aeropuerto AS Destino
    FROM Reserva r
    INNER JOIN Usuario u ON r.UserID = u.UserID
    INNER JOIN Vuelo v ON r.VueloID = v.VueloID
    INNER JOIN Aeropuerto a ON v.Origen = a.AeropuertoID
    INNER JOIN Aeropuerto a2 ON v.Destino = a2.AeropuertoID
    WHERE r.ReservaID = @ReservaID;
END;

--Registrar usuario
CREATE PROCEDURE RegistrarUsuario
    @UserID INT,
    @Email VARCHAR(100),
    @Contraseña VARCHAR(50),
    @RolID INT,
    @Identificacion VARCHAR(20),
    @Nombre VARCHAR(50),
    @Apellido VARCHAR(50),
    @Fecha_de_nacimiento DATE,
    @Número_de_teléfono VARCHAR(20)
AS
BEGIN
    -- Insertar registro en la tabla Usuario
    INSERT INTO Usuario (UserID, Email, Contraseña, RolID)
    VALUES (@UserID, @Email, @Contraseña, @RolID);

    -- Insertar registro en la tabla Detalle_del_Usuario
    INSERT INTO Detalle_del_Usuario (UserID, Identificacion, Nombre, Apellido, Fecha_de_nacimiento, Número_de_teléfono)
    VALUES (@UserID, @Identificacion, @Nombre, @Apellido, @Fecha_de_nacimiento, @Número_de_teléfono);
END;

--Consultar usuario
CREATE PROCEDURE ConsultarUsuario
    @UserID INT
AS
BEGIN
    SELECT u.UserID, u.Email, u.RolID, r.Descripción_del_rol AS Rol,
           du.Identificacion, du.Nombre, du.Apellido, du.Fecha_de_nacimiento, du.Número_de_teléfono
    FROM Usuario u
    INNER JOIN Detalle_del_Usuario du ON u.UserID = du.UserID
    INNER JOIN Rol r ON u.RolID = r.RolID
    WHERE u.UserID = @UserID;
END;
