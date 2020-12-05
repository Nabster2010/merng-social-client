import { useContext, useState } from 'react';
import { Icon, Label, Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
const MenuBar = () => {
	const context = useContext(AuthContext);
	const [activeItem, setActiveItem] = useState(
		window.location.pathname.substr(1)
	);
	const handleItemClick = (e, { name }) => setActiveItem(name);
	const menuBar = context.user ? (
		<div>
			<Menu pointing secondary size='massive' color='teal'>
				<Menu.Item
					name='home'
					active={activeItem === 'home'}
					onClick={handleItemClick}
					as={Link}
					to='/'
				/>
				<Menu.Item
					name={context.user.username}
					active={activeItem === 'user'}
					onClick={handleItemClick}
					as={Link}
					to={`/profile/${context.user.id}`}
				/>

				{/* TODO: notification count */}
				<Menu.Item as='a'>
					<Icon name='bell' />
					<Label color='red'>0</Label>
				</Menu.Item>

				<Menu.Menu position='right'>
					<Menu.Item name='logout' onClick={() => context.logout()} />
				</Menu.Menu>
			</Menu>
		</div>
	) : (
		<div>
			<Menu pointing secondary size='massive' color='teal'>
				<Menu.Item
					name='home'
					active={activeItem === 'home'}
					onClick={handleItemClick}
					as={Link}
					to='/'
				/>

				<Menu.Menu position='right'>
					<Menu.Item
						name='register'
						active={activeItem === 'register'}
						onClick={handleItemClick}
						as={Link}
						to='/register'
					/>
					<Menu.Item
						name='login'
						active={activeItem === 'login'}
						onClick={handleItemClick}
						as={Link}
						to='/login'
					/>
				</Menu.Menu>
			</Menu>
		</div>
	);
	return menuBar;
};

export default MenuBar;
