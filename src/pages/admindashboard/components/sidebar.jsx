import { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import ModalChangePassword from '../../../Utils/ModalChangePassword';
import './components_style.css';

const Sidebar = () => {
	const [modalChangePassword, setModalChangePassword] = useState(false);

	return (
		<Fragment>
			<div className='sidebar'>
				<hr />
				<div className='py-3 list h-100'>
					<div className='flex-shrink-0 d-flex flex-column'>
						<ul className='nav nav-pills d-flex justify-content-between'>
							<li className='w-100'>
								<Link to='/home'>
									<div
										className='text-white nav-link d-inline-flex d-flex justify-content-center w-100'
										aria-current='page'
									>
										<i className='bi bi-house me-2'></i>
										<p className='me-1'>INICIO</p>
									</div>
								</Link>
							</li>
							<li className='py-2 w-100'>
								<Link to='/socios'>
									<div className='text-white nav-link d-inline-flex d-flex justify-content-center w-100'>
										<i className='bi bi-person-circle me-2'></i>
										<p>SOCIOS</p>
									</div>
								</Link>
							</li>
							<li className='py-2 w-100'>
								<Link to='/pagos'>
									<div className='text-white nav-link d-inline-flex d-flex justify-content-center w-100'>
										<i className='bi bi-clipboard-check me-2'></i>
										<p>PAGOS</p>
									</div>
								</Link>
							</li>
							<li className='py-2 w-100'>
								<Link to='/caja'>
									<div className='text-white nav-link d-inline-flex d-flex justify-content-center w-100'>
										<i className='bi bi-cash-coin me-2'></i>
										<p className='me-2'>CAJA</p>
									</div>
								</Link>
							</li>
							<li className='py-2 w-100'>
								<Link to='/productos'>
									<div className='text-white nav-link d-inline-flex d-flex justify-content-center w-100'>
										<i className='bi bi-basket me-2'></i>
										<p>PRODUCTOS</p>
									</div>
								</Link>
							</li>
							<li className='py-2 w-100'>
								<div className='btn-group'>
									<i className='bi bi-person-circle me-2'></i>
									<button
										type='button'
										className=' dropdown-toggle'
										data-bs-toggle='dropdown'
										aria-expanded='false'
									>
										PERFIL
									</button>
									<ul className='dropdown-menu'>
										<li>
											<Link
												to='#'
												className='dropdown-item'
												onClick={() => {
													setModalChangePassword(true);
												}}
											>
												Cambiar Password
											</Link>
										</li>
										<li>
											<hr className='dropdown-divider'></hr>
										</li>
										<Link to='/'>
											<li>
												<a
													className='dropdown-item'
													href='#'
												>
													Cerrar Sesion
												</a>
											</li>
										</Link>
									</ul>
								</div>
							</li>
						</ul>
					</div>
				</div>
				<hr />
			</div>

			<ModalChangePassword
				show={modalChangePassword}
				onHide={() => setModalChangePassword(false)}
			/>
		</Fragment>
	);
};

export default Sidebar;
