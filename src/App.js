import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import MenuBar from './components/MenuBar';
import { AuthProvider } from './context/AuthContext';
import AuthRoute from './AuthRoute';
import Post from './pages/Post';
import { Container } from 'semantic-ui-react';
import Profile from './pages/Profile';

const App = () => {
	return (
		<Container>
			<AuthProvider>
				<Router>
					<MenuBar />
					<Route exact path='/' component={Home} />
					<AuthRoute exact path='/login' component={Login} />
					<AuthRoute exact path='/register' component={Register} />
					<Route exact path='/post/:id' component={Post} />
					<Route exact path='/profile/:id' component={Profile} />
				</Router>
			</AuthProvider>
		</Container>
	);
};

export default App;
