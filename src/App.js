import React from 'react';
import logo from './logo.svg';
import './App.css';
import ImageCropper from './Components/ImageCropper';
import myImage from './Components/4.jpg';
import Main from './Components/Main';

function App() {
	return (
		<div className="App">
			<ImageCropper src={myImage} />
			{/* <Main maxWidth={400} /> */}
		</div>
	);
}

export default App;
