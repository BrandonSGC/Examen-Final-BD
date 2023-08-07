USE ExamenFinalBD;
INSERT INTO Rol (RolID, Descripción_del_rol)
VALUES
    (1, 'Administrador'),
    (2, 'Agente de ventas'),
    (3, 'Pasajero');

INSERT INTO Usuario (UserID, Email, Contraseña, RolID)
VALUES
    (1, 'admin@example.com', 'admin123', 1),
    (2, 'agente@example.com', 'agente456', 2),
    (3, 'usuario1@example.com', 'pass123', 3),
    (4, 'usuario2@example.com', 'pass456', 3);

INSERT INTO Permiso (PermisoID, Descripción_del_permiso)
VALUES
    (1, 'Gestionar usuarios'),
    (2, 'Realizar ventas'),
    (3, 'Ver vuelos');

INSERT INTO RolPermiso (RolPermisoID, RolID, PermisoID)
VALUES
    (1, 1, 1),
    (2, 2, 2),
    (3, 3, 3);

INSERT INTO Configuracion (ConfiguracionID, Moneda)
VALUES
    (1, 'USD'),
    (2, 'EUR'),
    (3, 'MXN');

INSERT INTO Pais (PaisID, Nombre_del_país)
VALUES
    (1, 'Estados Unidos'),
    (2, 'España'),
    (3, 'México');

INSERT INTO Ciudad (CiudadID, Nombre_de_la_ciudad, PaisID)
VALUES
    (1, 'Nueva York', 1),
    (2, 'Madrid', 2),
    (3, 'Ciudad de México', 3);

INSERT INTO Aeropuerto (AeropuertoID, Nombre_del_aeropuerto, CiudadID)
VALUES
    (1, 'JFK International Airport', 1),
    (2, 'Adolfo Suárez Madrid-Barajas Airport', 2),
    (3, 'Benito Juárez International Airport', 3);

INSERT INTO TipoTarifa (TipoTarifaID, Descripción)
VALUES
    (1, 'Económica'),
    (2, 'Ejecutiva'),
    (3, 'Primera clase');

INSERT INTO Vuelo (VueloID, Origen, Destino, FechaVuelo, HoraSalida, HoraLlegada, TipoTarifaID)
VALUES
    (1, 1, 3, '2023-08-15', '09:00:00', '14:30:00', 1),
    (2, 2, 3, '2023-09-10', '15:45:00', '20:10:00', 2),
    (3, 3, 1, '2023-08-20', '11:30:00', '19:15:00', 3);

INSERT INTO Tarifa_del_Vuelo (TarifaVueloID, VueloID, TipoTarifaID, Precio)
VALUES
    (1, 1, 1, 250.00),
    (2, 2, 2, 450.00),
    (3, 3, 3, 750.00);

INSERT INTO Detalles_del_Vuelo (VueloID, Tipo_de_avión, Duración_del_vuelo, Detalles_de_la_aerolínea, TarifaVueloID, TipoTarifaID)
VALUES
    (1, 'Boeing 737', '5h 30m', 'Aerolíneas Tres patos', 1, 1),
    (2, 'Airbus A320', '4h 25m', 'Aerolíneas Hormigas', 2, 2),
    (3, 'Boeing 787', '7h 45m', 'Aerolíneas Gaviota', 3, 3);

INSERT INTO Detalle_del_Usuario (UserID, Identificacion, Nombre, Apellido, Fecha_de_nacimiento, Número_de_teléfono)
VALUES
    (1, '1234567890', 'Robert', 'Adminson', '1990-01-01', '+1 123-456-7890'),
    (2, '9876543210', 'Marc', 'Agentesito', '1985-05-15', '+34 987-654-3210'),
    (3, '1111111111', 'Angel', 'Usuarito', '1995-12-10', '+52 55 1234-5678');

INSERT INTO Reserva (ReservaID, UserID, VueloID, FechaReserva)
VALUES
    (1, 3, 1, '2023-08-01'),
    (2, 3, 2, '2023-08-02'),
    (3, 3, 3, '2023-08-03');

INSERT INTO Asiento (AsientoID, VueloID, Número_de_asiento, Clase_de_asiento)
VALUES
    (1, 1, 'A1', 'Económica'),
    (2, 1, 'B2', 'Económica'),
    (3, 2, 'C3', 'Ejecutiva'),
    (4, 2, 'D4', 'Ejecutiva'),
    (5, 3, 'E5', 'Primera clase'),
    (6, 3, 'F6', 'Primera clase');

INSERT INTO ReservaAsiento (ReservaAsientoID, ReservaID, AsientoID)
VALUES
    (1, 1, 1),
    (2, 1, 2),
    (3, 2, 3),
    (4, 2, 4),
    (5, 3, 5),
    (6, 3, 6);

INSERT INTO Pago (PagoID, ReservaID, FechaPago, Monto, Factura)
VALUES
    (1, 1, '2023-08-01', 250.00, 'FACT-001'),
    (2, 2, '2023-08-02', 450.00, 'FACT-002'),
    (3, 3, '2023-08-03', 750.00, 'FACT-003');

INSERT INTO MetodoPago (MetodoPagoID, DescripcionFormaPago)
VALUES
    (1, 'Tarjeta de crédito'),
    (2, 'PayPal'),
    (3, 'Transferencia bancaria');

INSERT INTO Historial_de_Pago (HistorialPagoID, PagoID, Fecha_de_pago, Monto, MetodoPagoID)
VALUES
    (1, 1, '2023-08-01', 250.00, 1),
    (2, 2, '2023-08-02', 450.00, 2),
    (3, 3, '2023-08-03', 750.00, 3);

INSERT INTO Detalles_de_la_Factura (FacturaID, Detalles_de_la_tarifa, Cargos_adicionales, Total, MetodoPagoID)
VALUES
    (1, 'Tarifa base: 250.00', 'Impuestos: 10.00', 260.00, 1),
    (2, 'Tarifa base: 450.00', 'Impuestos: 20.00', 470.00, 2),
    (3, 'Tarifa base: 750.00', 'Impuestos: 30.00', 780.00, 3);

INSERT INTO Estado_del_Vuelo (EstadoVueloID, VueloID, Estado)
VALUES
    (1, 1, 'Programado'),
    (2, 2, 'En vuelo'),
    (3, 3, 'Finalizado');
