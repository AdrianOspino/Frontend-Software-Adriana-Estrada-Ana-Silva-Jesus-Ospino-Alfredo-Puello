import React, { useState, useEffect } from "react";
import axios from "axios";
import "./index.css";

const App = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [vehiculos, setVehiculos] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [facturas, setFacturas] = useState([]);
  const [nombreUsuario, setNombreUsuario] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [tipoUsuario, setTipoUsuario] = useState("");
  const [placa, setPlaca] = useState("");
  const [marca, setMarca] = useState("");
  const [modelo, setModelo] = useState("");
  const [color, setColor] = useState("");
  const [horaEntrada, setHoraEntrda] = useState("");
  const [horaSalida, setHoraSalida] = useState("");
  const [tarifa, setTarifa] = useState("");
  const [monto, setMonto] = useState("");
  const [editandoUsuario, setEditandoUsuario] = useState(null);
  const [editandoVehiculo, setEditandoVehiculo] = useState(null);
  const [editandoTicket, setEditandoTicket] = useState(null);
  const [editandoFactura, setEditandoFactura] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [loginNombreUsuario, setLoginNombreUsuario] = useState("");
  const [loginContrasena, setLoginContrasena] = useState("");

  // Obtener usuarios al cargar la página
  useEffect(() => {
    if (loggedIn) {
      obtenerUsuarios();
      obtenerVehiculos();
      obtenerTickets();
      obtenerFacturas();
    }
  }, [loggedIn]);

  const obtenerUsuarios = async () => {
    try {
      const response = await axios.get("http://localhost:8000/user/v1/usuarios");
      setUsuarios(response.data);
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
    }
  };

  const obtenerVehiculos = async () => {
    try {
      const response = await axios.get("http://localhost:8000/vehiculo/v1/vehiculos");
      setVehiculos(response.data);
    } catch (error) {
      console.error("Error al obtener vehículos:", error);
    }
  };

  const obtenerTickets = async () => {
    try {
      const response = await axios.get("http://localhost:8000/ticket/v1/tickets");
      setTickets(response.data);
    } catch (error) {
      console.error("Error al obtener tickets:", error);
    }
  };

  const obtenerFacturas = async () => {
    try {
      const response = await axios.get("http://localhost:8000/factura/v1/facturas");
      setFacturas(response.data);
    } catch (error) {
      console.error("Error al obtener facturas:", error);
    }
  };

  // Manejar usuario
  const manejarUsuario = async () => {
    const nuevoUsuario = {
      nombre_usuario: nombreUsuario,
      contrasena: contrasena,
      tipo_usuario: tipoUsuario,
    };

    if (editandoUsuario) {
      try {
        await axios.patch(`http://localhost:8000/user/v1/actualizarUsuario/${editandoUsuario.id_usuario}`, nuevoUsuario);
        obtenerUsuarios();
        setEditandoUsuario(null);
      } catch (error) {
        console.error("Error al actualizar usuario:", error);
      }
    } else {
      try {
        await axios.post("http://localhost:8000/user/v1/crearUsuario", nuevoUsuario);
        obtenerUsuarios();
      } catch (error) {
        console.error("Error al crear usuario:", error);
      }
    }

    setNombreUsuario("");
    setContrasena("");
    setTipoUsuario("");
  };

  const eliminarUsuario = async (id_usuario) => {
    try {
      await axios.delete(`http://localhost:8000/user/v1/eliminarUsuario/${id_usuario}`);
      obtenerUsuarios();
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
    }
  };

  const editarUsuario = (usuario) => {
    setNombreUsuario(usuario.nombre_usuario);
    setContrasena(usuario.contrasena);
    setTipoUsuario(usuario.tipo_usuario);
    setEditandoUsuario(usuario);
  };

  // Manejar vehiculo
  const manejarVehiculo = async () => {
    const nuevoVehiculo = {
      placa: placa,
      marca:marca,
      modelo: modelo,
      color: color,
    };

    if (editandoVehiculo) {
      try {
        await axios.patch(`http://localhost:8000/vehiculo/v1/actualizarVehiculo/${editandoVehiculo.id_vehiculo}`, nuevoVehiculo);
        obtenerVehiculos();
        setEditandoVehiculo(null);
      } catch (error) {
        console.error("Error al actualizar vehículo:", error);
      }
    } else {
      try {
        await axios.post("http://localhost:8000/vehiculo/v1/crearVehiculo", nuevoVehiculo);
        obtenerVehiculos();
      } catch (error) {
        console.error("Error al crear vehículo:", error);
      }
    }
    setPlaca("");
    setMarca("");
    setModelo("");
    setColor("");
  };

  const eliminarVehiculo = async (id_vehiculo) => {
    try {
      await axios.delete(`http://localhost:8000/vehiculo/v1/eliminarVehiculo/${id_vehiculo}`);
      obtenerVehiculos();
    } catch (error) {
      console.error("Error al eliminar vehículo:", error);
    }
  };

  const editarVehiculo = (vehiculo) => {
    setPlaca(vehiculo.placa);
    setMarca(vehiculo.marca);
    setModelo(vehiculo.modelo);
    setColor(vehiculo.color);
    setEditandoVehiculo(vehiculo);
  };

  // Manejar ticket
  const manejarTicket = async () => {
    const nuevoTicket = {
      hora_entrada: horaEntrada,
      horaSalida: horaSalida,
      tarifa: tarifa,
    };

    if (editandoTicket) {
      try {
        await axios.patch(`http://localhost:8000/ticket/v1/actualizarTicket/${editandoTicket.id_ticket}`, nuevoTicket);
        obtenerTickets();
        setEditandoTicket(null);
      } catch (error) {
        console.error("Error al actualizar ticket:", error);
      }
    } else {
      try {
        await axios.post("http://localhost:8000/ticket/v1/crearTicket", nuevoTicket);
        obtenerTickets();
      } catch (error) {
        console.error("Error al crear ticket:", error);
      }
    }
    setHoraEntrda("");
    setHoraSalida("");
    setTarifa("");
  };

  const eliminarTicket = async (id_ticket) => {
    try {
      await axios.delete(`http://localhost:8000/ticket/v1/eliminarTicket/${id_ticket}`);
      obtenerTickets();
    } catch (error) {
      console.error("Error al eliminar ticket:", error);
    }
  };

  const editarTicket = (ticket) => {
    setHoraEntrda(ticket.horaEntrada);
    setHoraSalida(ticket.horaSalida);
    setTarifa(ticket.tarifa);
    setEditandoTicket(ticket);
  };

  // Manejar factura
  const manejarFactura = async () => {
    const nuevaFactura = {
      monto:monto,
    };

    if (editandoFactura) {
      try {
        await axios.patch(`http://localhost:8000/factura/v1/actualizarFactura/${editandoFactura.id_factura}`, nuevaFactura);
        obtenerFacturas();
        setEditandoFactura(null);
      } catch (error) {
        console.error("Error al actualizar factura:", error);
      }
    } else {
      try {
        await axios.post("http://localhost:8000/factura/v1/crearFactura", nuevaFactura);
        obtenerFacturas();
      } catch (error) {
        console.error("Error al crear factura:", error);
      }
    }
    setMonto("");
  };

  const eliminarFactura = async (id_factura) => {
    try {
      await axios.delete(`http://localhost:8000/factura/v1/eliminarFactura/${id_factura}`);
      obtenerFacturas();
    } catch (error) {
      console.error("Error al eliminar factura:", error);
    }
  };

  const editarFactura = (factura) => {
    setMonto(factura.monto);
    setEditandoFactura(factura);
  };

  // Función para manejar el login
  const handleLogin = async () => {
    const response = await fetch("http://localhost:8000/user/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        username: loginNombreUsuario,
        password: loginContrasena,
      }),
    });

    if (response.ok) {
      setLoggedIn(true);
      obtenerUsuarios();
      obtenerVehiculos();
      obtenerTickets();
      obtenerFacturas();
    } else {
      console.error("Error en el login");
    }
  };

// Si no está logueado, mostrar el formulario de login
if (!loggedIn) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-cyan-100 to-blue-600 relative overflow-hidden">
      {/* Círculos animados de fondo */}
      <div className="absolute w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
      <div className="absolute w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute w-80 h-80 bg-blue-700 rounded-full mix-blend-multiply filter blur-xl opacity-25 animate-blob animation-delay-4000"></div>
      
      <div className="relative max-w-md w-full bg-white p-8 rounded-xl shadow-xl transition-shadow hover:shadow-2xl">
        <h1 className="text-4xl text-center mb-8 bg-gradient-to-r from-blue-600 via-blue-500 to-white-400 text-white py-4 rounded-md font-semibold italic">
          Bienvenido
        </h1>
        <div className="space-y-6">
          <input
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-200 transition"
            type="text"
            placeholder="Nombre de Usuario"
            value={loginNombreUsuario}
            onChange={(e) => setLoginNombreUsuario(e.target.value)}
          />
          <input
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-white-200 transition"
            type="password"
            placeholder="Contraseña"
            value={loginContrasena}
            onChange={(e) => setLoginContrasena(e.target.value)}
          />
        </div>
        <div className="flex justify-center">
          <button
            className="w-3/5 py-3 mt-6 bg-gradient-to-r from-blue-600 via-blue-400 to-blue-50 text-white rounded-lg font-semibold text-lg italic hover:bg-gradient-to-l transition-transform transform hover:scale-110 hover:rotate-1 duration-300"
            onClick={handleLogin}
          >
            IniciarSesion
          </button>
        </div>
      </div>
    </div>
  );
}
      return (
        <div className="p-8 bg-gradient-to-br from-blue-100 via-cyan-100 to-blue-600 min-h-screen">
          <h1 className="text-3xl font-bold text-center mb-8">Gestión de Usuarios</h1>
          {/* Formulario para Usuarios */}
          <div className="max-w-md mx-auto bg-white p-6 rounded-md shadow-md mb-8">
            <input
              className="w-full p-2 mb-4 border rounded-md"
              type="text"
              placeholder="Nombre de Usuario"
              value={nombreUsuario}
              onChange={(e) => setNombreUsuario(e.target.value)}
            />
            <input
              className="w-full p-2 mb-4 border rounded-md"
              type="password"
              placeholder="Contraseña"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
            />
            <input
              className="w-full p-2 mb-4 border rounded-md"
              type="text"
              placeholder="Tipo de Usuario"
              value={tipoUsuario}
              onChange={(e) => setTipoUsuario(e.target.value)}
            />
            <button
              className="w-full p-2 bg-blue-500 text-white rounded-md"
              onClick={manejarUsuario}
            >
              {editandoUsuario ? "Actualizar Usuario" : "Crear Usuario"}
            </button>
          </div>
  
          {/* Lista de Usuarios */}
          <ul className="max-w-md mx-auto">
            {usuarios.map((usuario) => (
              <li key={usuario.id_usuario} className="flex justify-between items-center mb-4 bg-white p-4 rounded-md shadow-md">
                <div>
                  <h2 className="text-xl font-semibold">ID: {usuario.id_usuario}</h2>
                  <p><strong>Username:</strong> {usuario.nombre_usuario}</p>
                  <p><strong>Rol:</strong> {usuario.tipo_usuario}</p>
                </div>
                <div>
                  <button
                    className="bg-green-500 text-white px-2 py-1 rounded-md mr-2"
                    onClick={() => editarUsuario(usuario)}
                  >
                    Editar
                  </button>
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded-md"
                    onClick={() => eliminarUsuario(usuario.id_usuario)}
                  >
                    Eliminar
                  </button>
                </div>
              </li>
            ))}
          </ul>
  
          <h1 className="text-3xl font-bold text-center mb-8 mt-10">Gestión de Vehículos</h1>
          {/* Formulario para Vehículos */}
          <div className="max-w-md mx-auto bg-white p-6 rounded-md shadow-md mb-8">
          <input
              className="w-full p-2 mb-4 border rounded-md"
              type="text"
              placeholder="Placa"
            />
            <input
              className="w-full p-2 mb-4 border rounded-md"
              type="text"
              placeholder="Marca"
            />
            <input
              className="w-full p-2 mb-4 border rounded-md"
              type="text"
              placeholder="Modelo"
            />
            <input
              className="w-full p-2 mb-4 border rounded-md"
              type="text"
              placeholder="Color"
            />
            <input
              className="w-full p-2 mb-4 border rounded-md"
              type="text"
              placeholder="ID Usuario"
            />
            <button
              className="w-full p-2 bg-blue-500 text-white rounded-md"
              onClick={manejarVehiculo}
            >
              {editandoVehiculo ? "Actualizar Vehículo" : "Crear Vehículo"}
            </button>
          </div>
  
          {/* Lista de Vehículos */}
          <ul className="max-w-md mx-auto">
            {vehiculos.map((vehiculo) => (
              <li key={vehiculo.id_vehiculo} className="flex justify-between items-center mb-4 bg-white p-4 rounded-md shadow-md">
                <div>
                  <h2 className="text-xl font-semibold">{vehiculo.id_vehiculo}</h2>
                  <p>{vehiculo.placa}</p>
                  <p>{vehiculo.marca}</p>
                  <p>{vehiculo.modelo}</p>
                  <p>{vehiculo.color}</p>
                  <p type="int">{vehiculo.idUsuario}</p>
                </div>
                <div>
                  <button
                    className="bg-green-500 text-white px-2 py-1 rounded-md mr-2"
                    onClick={() => editarVehiculo(vehiculo)}
                  >
                    Editar
                  </button>
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded-md"
                    onClick={() => eliminarVehiculo(vehiculo.id_vehiculo)}
                  >
                    Eliminar
                  </button>
                </div>
              </li>
            ))}
          </ul>
  
          <h1 className="text-3xl font-bold text-center mb-8 mt-10">Gestión de Tickets</h1>
          {/* Formulario para Tickets */}
          <div className="max-w-md mx-auto bg-white p-6 rounded-md shadow-md mb-8">
          <input
              className="w-full p-2 mb-4 border rounded-md"
              type="text"
              placeholder="ID Vehiculo"
            />
            <input
              className="w-full p-2 mb-4 border rounded-md"
              type="text"
              placeholder="Hora Entrada"
            />
            <input
              className="w-full p-2 mb-4 border rounded-md"
              type="text"
              placeholder="Hora Salida"
            />
            <input
              className="w-full p-2 mb-4 border rounded-md"
              type="text"
              placeholder="Tarifa"
            />
            <button
              className="w-full p-2 bg-blue-500 text-white rounded-md"
              onClick={manejarTicket}
            >
              {editandoTicket ? "Actualizar Ticket" : "Crear Ticket"}
            </button>
          </div>
  
          {/* Lista de Tickets */}
          <ul className="max-w-md mx-auto">
            {tickets.map((ticket) => (
              <li key={ticket.id_ticket} className="flex justify-between items-center mb-4 bg-white p-4 rounded-md shadow-md">
                <div>
                  <p className="text-xl font-semibold">{ticket.id_ticket}</p>
                  <p className="text-xl font-semibold">{ticket.horaEntrada}</p>
                  <p className="text-xl font-semibold">{ticket.horaSalida}</p>
                  <p className="text-xl font-semibold">{ticket.tarifa}</p>
                </div>
                <div>
                  <button
                    className="bg-green-500 text-white px-2 py-1 rounded-md mr-2"
                    onClick={() => editarTicket(ticket)}
                  >
                    Editar
                  </button>
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded-md"
                    onClick={() => eliminarTicket(ticket.id_ticket)}
                  >
                    Eliminar
                  </button>
                </div>
              </li>
            ))}
          </ul>
  
          <h1 className="text-3xl font-bold text-center mb-8 mt-10">Gestión de Facturas</h1>
          {/* Formulario para Facturas */}
          <div className="max-w-md mx-auto bg-white p-6 rounded-md shadow-md mb-8">
            <input
              className="w-full p-2 mb-4 border rounded-md"
              type="text"
              placeholder="ID Ticket"
            />
            <input
              className="w-full p-2 mb-4 border rounded-md"
              type="text"
              placeholder="Monto"
            />
            <button
              className="w-full p-2 bg-blue-500 text-white rounded-md"
              onClick={manejarFactura}
            >
              {editandoFactura ? "Actualizar Factura" : "Crear Factura"}
            </button>
          </div>
  
          {/* Lista de Facturas */}
          <ul className="max-w-md mx-auto">
            {facturas.map((factura) => (
              <li key={factura.id_factura} className="flex justify-between items-center mb-4 bg-white p-4 rounded-md shadow-md">
                <div>
                  <h2 className="text-xl font-semibold">{factura.numero_factura}</h2>
                </div>
                <div>
                  <button
                    className="bg-green-500 text-white px-2 py-1 rounded-md mr-2"
                    onClick={() => editarFactura(factura)}
                  >
                    Editar
                  </button>
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded-md"
                    onClick={() => eliminarFactura(factura.id_factura)}
                  >
                    Eliminar
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      );
  };
  
  export default App;
  
