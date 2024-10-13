import React, { useState, useEffect } from "react";
import axios from "axios";
import "./index.css";

const App = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [vehiculos, setVehiculos] = useState([]);
  const [nombreUsuario, setNombreUsuario] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [tipoUsuario, setTipoUsuario] = useState("");
  const [placa, setPlaca] = useState("");
  const [marca, setMarca] = useState("");
  const [modelo, setModelo] = useState("");
  const [color, setColor] = useState("");
  const [idUsuario, setIDusuario] = useState("");
  const [editandoUsuario, setEditandoUsuario] = useState(null);
  const [editandoVehiculo, setEditandoVehiculo] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [loginNombreUsuario, setLoginNombreUsuario] = useState("");
  const [loginContrasena, setLoginContrasena] = useState("");

  // Obtener usuarios y vehículos al cargar la página
  useEffect(() => {
    if (loggedIn) {
      obtenerUsuarios();
      obtenerVehiculos();
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

  // Manejar vehículo
  const manejarVehiculo = async () => {
    const nuevoVehiculo = {
      placa,
      marca,
      modelo,
      color,
      id_usuario: idUsuario,
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
    setIDusuario("");
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
    setIDusuario(vehiculo.id_usuario);
    setEditandoVehiculo(vehiculo);
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
    } else {
      console.error("Error en el login: Verifica tus credenciales");
    }
  };

  // Si no está logueado, mostrar el formulario de login
  if (!loggedIn) {
    return (
      <div className="p-8 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold">Iniciar sesión</h1>
        <div className="mt-4">
          <input
            type="text"
            placeholder="Nombre de usuario"
            value={loginNombreUsuario}
            onChange={(e) => setLoginNombreUsuario(e.target.value)}
            className="border p-2 rounded mr-2"
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={loginContrasena}
            onChange={(e) => setLoginContrasena(e.target.value)}
            className="border p-2 rounded mr-2"
          />
          <button onClick={handleLogin} className="bg-blue-500 text-white p-2 rounded">Iniciar sesión</button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold">Gestión de Vehículos</h1>
      <div className="mt-4">
        <h2 className="text-xl">Agregar/Editar Vehículo</h2>
        <input
          type="text"
          placeholder="Placa"
          value={placa}
          onChange={(e) => setPlaca(e.target.value)}
          className="border p-2 rounded mr-2"
        />
        <input
          type="text"
          placeholder="Marca"
          value={marca}
          onChange={(e) => setMarca(e.target.value)}
          className="border p-2 rounded mr-2"
        />
        <input
          type="text"
          placeholder="Modelo"
          value={modelo}
          onChange={(e) => setModelo(e.target.value)}
          className="border p-2 rounded mr-2"
        />
        <input
          type="text"
          placeholder="Color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="border p-2 rounded mr-2"
        />
        <select
          value={idUsuario}
          onChange={(e) => setIDusuario(e.target.value)}
          className="border p-2 rounded mr-2"
        >
          <option value="">Selecciona un Usuario</option>
          {usuarios.map((usuario) => (
            <option key={usuario.id_usuario} value={usuario.id_usuario}>
              {usuario.nombre_usuario}
            </option>
          ))}
        </select>
        <button onClick={manejarVehiculo} className="bg-green-500 text-white p-2 rounded">
          {editandoVehiculo ? "Actualizar Vehículo" : "Agregar Vehículo"}
        </button>
      </div>

      <h2 className="text-xl mt-6">Lista de Vehículos</h2>
      <table className="min-w-full mt-4 border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">ID</th>
            <th className="border border-gray-300 px-4 py-2">Placa</th>
            <th className="border border-gray-300 px-4 py-2">Marca</th>
            <th className="border border-gray-300 px-4 py-2">Modelo</th>
            <th className="border border-gray-300 px-4 py-2">Color</th>
            <th className="border border-gray-300 px-4 py-2">Usuario</th>
            <th className="border border-gray-300 px-4 py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {vehiculos.map((vehiculo) => (
            <tr key={vehiculo.id_vehiculo}>
              <td className="border border-gray-300 px-4 py-2">{vehiculo.id_vehiculo}</td>
              <td className="border border-gray-300 px-4 py-2">{vehiculo.placa}</td>
              <td className="border border-gray-300 px-4 py-2">{vehiculo.marca}</td>
              <td className="border border-gray-300 px-4 py-2">{vehiculo.modelo}</td>
              <td className="border border-gray-300 px-4 py-2">{vehiculo.color}</td>
              <td className="border border-gray-300 px-4 py-2">{vehiculo.usuario.nombre_usuario}</td>
              <td className="border border-gray-300 px-4 py-2">
                <button onClick={() => editarVehiculo(vehiculo)} className="bg-yellow-500 text-white p-1 rounded mr-1">Editar</button>
                <button onClick={() => eliminarVehiculo(vehiculo.id_vehiculo)} className="bg-red-500 text-white p-1 rounded">Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 className="text-xl mt-6">Agregar/Editar Usuario</h2>
      <input
        type="text"
        placeholder="Nombre de usuario"
        value={nombreUsuario}
        onChange={(e) => setNombreUsuario(e.target.value)}
        className="border p-2 rounded mr-2"
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={contrasena}
        onChange={(e) => setContrasena(e.target.value)}
        className="border p-2 rounded mr-2"
      />
      <input
        type="text"
        placeholder="Tipo de usuario"
        value={tipoUsuario}
        onChange={(e) => setTipoUsuario(e.target.value)}
        className="border p-2 rounded mr-2"
      />
      <button onClick={manejarUsuario} className="bg-green-500 text-white p-2 rounded">
        {editandoUsuario ? "Actualizar Usuario" : "Agregar Usuario"}
      </button>

      <h2 className="text-xl mt-6">Lista de Usuarios</h2>
      <table className="min-w-full mt-4 border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">ID</th>
            <th className="border border-gray-300 px-4 py-2">Nombre</th>
            <th className="border border-gray-300 px-4 py-2">Tipo</th>
            <th className="border border-gray-300 px-4 py-2">Creación</th>
            <th className="border border-gray-300 px-4 py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <tr key={usuario.id_usuario}>
              <td className="border border-gray-300 px-4 py-2">{usuario.id_usuario}</td>
              <td className="border border-gray-300 px-4 py-2">{usuario.nombre_usuario}</td>
              <td className="border border-gray-300 px-4 py-2">{usuario.tipo_usuario}</td>
              <td className="border border-gray-300 px-4 py-2">{new Date(usuario.creacion).toLocaleString()}</td>
              <td className="border border-gray-300 px-4 py-2">
                <button onClick={() => editarUsuario(usuario)} className="bg-yellow-500 text-white p-1 rounded mr-1">Editar</button>
                <button onClick={() => eliminarUsuario(usuario.id_usuario)} className="bg-red-500 text-white p-1 rounded">Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
