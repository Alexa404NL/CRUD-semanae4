import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
	Table,
	Button,
	Container,
	FormGroup,
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
} from "reactstrap";


const data = [
	{
		id: 1,
		nombre: "pikmin 1",
		serie: "me and the pikmins",
		alive: true,
		mail: "pikmin1@example.com",
		fecha: "2023-01-01",
		color: "#ff0000",
	},
	{
		id: 2,
		nombre: "bert",
		serie: "plaza sesamo",
		alive: true,
		mail: "bert@example.com",
		fecha: "2023-02-02",
		color: "#00ff00",
	},
	{
		id: 3,
		nombre: "ernie",
		serie: "plaza sesamo",
		alive: true,
		mail: "ernie@example.com",
		fecha: "2023-03-03",
		color: "#0000ff",
	},
	{ id: 4, nombre: "alex", serie: "yo", alive: true, mail: "alex@example.com", fecha: "2023-04-04", color: "#aaaaaa" },
	{ id: 5, nombre: "elliot", serie: "stardew", alive: true, mail: "elliot@example.com", fecha: "2023-05-05", color: "#ff8800" },
	{ id: 6, nombre: "harvey", serie: "stardew", alive: true, mail: "harvey@example.com", fecha: "2023-06-06", color: "#88ff00" },
	{ id: 7, nombre: "luciel", serie: "messangers", alive: true, mail: "luciel@example.com", fecha: "2023-07-07", color: "#0088ff" },
	{ id: 8, nombre: "viktor", serie: "on the ice", alive: true, mail: "viktor@example.com", fecha: "2023-08-08", color: "#880088" },
	{ id: 9, nombre: "illya", serie: "a rivalry", alive: true, mail: "illya@example.com", fecha: "2023-09-09", color: "#00aaaa" },
];

class App extends React.Component {
	state = {
		data: data,
		modalActualizar: false,
		modalInsertar: false,
		form: {
			id: "",
			nombre: "",
			serie: "",
			mail: "",
			fecha: "",
			color: "#000000",
			alive: false,
		},
	};

	mostrarModalActualizar = (dato) => {
		this.setState({
			form: dato,
			modalActualizar: true,
		});
	};

	cerrarModalActualizar = () => {
		this.setState({ modalActualizar: false });
	};

	mostrarModalInsertar = () => {
		this.setState({
			modalInsertar: true,
		});
	};

	cerrarModalInsertar = () => {
		this.setState({ modalInsertar: false });
	};

	editar = (dato) => {
		var contador = 0;
		var arreglo = this.state.data;
		arreglo.map((registro) => {
			if (dato.id === registro.id) {
				arreglo[contador].nombre = dato.nombre;
				arreglo[contador].serie = dato.serie;
                arreglo[contador].alive = dato.alive;
                arreglo[contador].mail = dato.mail;
                arreglo[contador].fecha = dato.fecha;
                arreglo[contador].color = dato.color;
			}
			contador++;
		});
		this.setState({ data: arreglo, modalActualizar: false });
	};

	eliminar = (dato) => {
		var opcion = window.confirm(
			"Estás Seguro que deseas Eliminar el elemento " + dato.id,
		);
		if (opcion === true) {
			var contador = 0;
			var arreglo = this.state.data;
			arreglo.map((registro) => {
				if (dato.id === registro.id) {
					arreglo.splice(contador, 1);
				}
				contador++;
			});
			this.setState({ data: arreglo, modalActualizar: false });
		}
	};
	insertar = () => {
		var valorNuevo = { ...this.state.form };
		valorNuevo.id = this.state.data.length + 1;
		var lista = this.state.data;
		lista.push(valorNuevo);
		this.setState({ modalInsertar: false, data: lista });
	};

	handleChange = (e) => {
		const { name, type, value, checked } = e.target;
		this.setState({
			form: { ...this.state.form, [name]: type === "checkbox" ? checked : value },
		});
	};

	render() {
		return (
			<>
				<Container fluid className="app-container">
					<div className="header-section">
						<h1 className="app-title">👥 Gestor de Usuarios</h1>
						<Button 
							color="success" 
							className="btn-crear" 
							onClick={() => this.mostrarModalInsertar()}
						>
							✨ Crear Nuevo
						</Button>
					</div>

					<div className="table-wrapper">
						<Table striped hover className="usuarios-table">
							<thead>
								<tr>
									<th>#</th>
									<th>👤 Nombre</th>
									<th>📺 Serie</th>
									<th>📧 Email</th>
									<th>📅 Fecha</th>
									<th>🎨 Color</th>
									<th>❤️ Estado</th>
									<th>⚙️ Acciones</th>
								</tr>
							</thead>
							<tbody>
							{this.state.data.map((dato) => (
								<tr key={dato.id} className="table-row-custom">
									<td className="id-cell"><strong>{dato.id}</strong></td>
									<td className="nombre-cell">{dato.nombre}</td>
									<td className="serie-cell">{dato.serie}</td>
									<td className="mail-cell">
										<a href={`mailto:${dato.mail}`}>{dato.mail}</a>
									</td>
									<td className="fecha-cell">{dato.fecha}</td>
									<td className="color-cell">
										<div
											className="color-swatch"
											style={{
												backgroundColor: dato.color,
											}}
											title={dato.color}
										/>
									</td>
									<td className="alive-cell">
										<span className={`alive-badge ${dato.alive ? "alive" : "dead"}`}>
											{dato.alive ? "✅ Vivo" : "❌ Muerto"}
										</span>
									</td>
									<td className="action-cell">
										<Button
											color="primary"
											size="sm"
											className="btn-action"
											onClick={() => this.mostrarModalActualizar(dato)}>
											✏️ Editar
										</Button>
										<Button 
											color="danger" 
											size="sm"
											className="btn-action"
											onClick={() => this.eliminar(dato)}>
											🗑️ Eliminar
										</Button>
									</td>
								</tr>
							))}
						</tbody>
					</Table>
				</div>
			</Container>

				<Modal isOpen={this.state.modalActualizar} className="custom-modal">
					<ModalHeader className="modal-header-custom">
						<h3>✏️ Editar Registro</h3>
					</ModalHeader>
					<ModalBody>
						<FormGroup>
							<label>🆔 ID</label>
							<input
								className="form-control"
								readOnly
								type="text"
								value={this.state.form.id}
							/>
						</FormGroup>
						<FormGroup>
							<label>👤 Nombre</label>
							<input
								className="form-control"
								name="nombre"
								type="text"
								onChange={this.handleChange}
								value={this.state.form.nombre}
								placeholder="Ingresa el nombre completo"
							/>
						</FormGroup>
						<FormGroup>
							<label>📺 Serie</label>
							<input
								className="form-control"
								name="serie"
								type="text"
								onChange={this.handleChange}
								value={this.state.form.serie}
								placeholder="¿De qué serie proviene?"
							/>
						</FormGroup>
						<FormGroup>
							<label>✉️ Email</label>
							<input
								className="form-control"
								name="mail"
								type="email"
								onChange={this.handleChange}
								value={this.state.form.mail}
								placeholder="correo@ejemplo.com"
							/>
						</FormGroup>
						<FormGroup>
							<label>📅 Fecha</label>
							<input
								className="form-control"
								name="fecha"
								type="date"
								onChange={this.handleChange}
								value={this.state.form.fecha}
							/>
						</FormGroup>
						<FormGroup>
							<label>🎨 Color Favorito</label>
							<div className="color-picker-wrapper">
								<input
									className="color-input"
									name="color"
									type="color"
									onChange={this.handleChange}
									value={this.state.form.color}
								/>
								<span className="color-value">{this.state.form.color}</span>
							</div>
						</FormGroup>
						<FormGroup check>
							<label>
								<input
									name="alive"
									type="checkbox"
									onChange={this.handleChange}
									checked={this.state.form.alive}
									className="form-check-input"
								/>
								<span className="form-check-label">💚 ¿Está vivo?</span>
							</label>
						</FormGroup>
					</ModalBody>
					<ModalFooter>
						<Button
							color="primary"
							onClick={() => this.editar(this.state.form)}>
							✅ Guardar Cambios
						</Button>
						<Button color="secondary" onClick={() => this.cerrarModalActualizar()}>
							❌ Cancelar
						</Button>
					</ModalFooter>
				</Modal>

				<Modal isOpen={this.state.modalInsertar} className="custom-modal">
					<ModalHeader className="modal-header-custom">
						<h3>✨ Crear Nuevo Usuario</h3>
					</ModalHeader>
					<ModalBody>
						<FormGroup>
							<label>🆔 ID</label>
							<input
								className="form-control"
								readOnly
								type="text"
								value={this.state.data.length + 1}
							/>
						</FormGroup>
						<FormGroup>
							<label>👤 Nombre</label>
							<input
								className="form-control"
								name="nombre"
								type="text"
								onChange={this.handleChange}
								placeholder="Ingresa el nombre completo"
							/>
						</FormGroup>
						<FormGroup>
							<label>📺 Serie</label>
							<input
								className="form-control"
								name="serie"
								type="text"
								onChange={this.handleChange}
								placeholder="¿De qué serie proviene?"
							/>
						</FormGroup>
						<FormGroup>
							<label>✉️ Email</label>
							<input
								className="form-control"
								name="mail"
								type="email"
								onChange={this.handleChange}
								placeholder="correo@ejemplo.com"
							/>
						</FormGroup>
						<FormGroup>
							<label>📅 Fecha</label>
							<input
								className="form-control"
								name="fecha"
								type="date"
								onChange={this.handleChange}
							/>
						</FormGroup>
						<FormGroup>
							<label>🎨 Color Favorito</label>
							<div className="color-picker-wrapper">
								<input
									className="color-input"
									name="color"
									type="color"
									onChange={this.handleChange}
									defaultValue="#000000"
								/>
								<span className="color-value">{this.state.form.color}</span>
							</div>
						</FormGroup>
						<FormGroup check>
							<label>
								<input
									name="alive"
									type="checkbox"
									onChange={this.handleChange}
									className="form-check-input"
								/>
								<span className="form-check-label">💚 ¿Está vivo?</span>
							</label>
						</FormGroup>
					</ModalBody>
					<ModalFooter>
						<Button color="success" onClick={() => this.insertar()}>
							✅ Crear Usuario
						</Button>
						<Button color="secondary" onClick={() => this.cerrarModalInsertar()}>
							❌ Cancelar
						</Button>
					</ModalFooter>
				</Modal>
			</>
		);
	}
}

export default App;
