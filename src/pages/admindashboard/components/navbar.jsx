import { Link } from 'react-router-dom';
const logo = require('../../images/logo.png');

const navbar = () => {
	return (
		<div className='row'>
			<div className='col-2'>
				<div className='text-white d-flex align-items-center justify-content-center h-100'>
					<div>
						<div className='logo'>
							<img
								src={logo}
								alt='logo'
								className='my-2 logo_image'
							/>
							<p className='py-2'>SALVAJE Life Fitness</p>
						</div>
					</div>
				</div>
			</div>
			<div className='col-8'></div>
			<div className='col-2'>
				<div className='d-flex align-items-center justify-content-center h-100'>
					<div>
						<Link to='/'>
							<button className='btn btn-danger'>SALIR</button>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default navbar;
