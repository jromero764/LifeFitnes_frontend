import Navbar from './components/navbar';
import Sidebar from './components/sidebar';
import Footerbar from './components/footerbar';
import UserContainer from './widgets_socios/UserContainer';

const socios = () => {
	return (
		<div className='home'>
			<div className='row'>
				<div className='col-12 bg-dark'>
					<Navbar />
				</div>
				<div className='col-2 text-bg-dark'>
					<Sidebar />
				</div>
				<div className='col-10'>
					{/* <User_table /> */}
					<UserContainer />
				</div>

				<div className='col-12 footer text-bg-dark'>
					<Footerbar />
				</div>
			</div>
		</div>
	);
};

export default socios;
