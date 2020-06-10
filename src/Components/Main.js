import React from 'react';
import { ResizableBox } from 'react-resizable';
import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.min.css';
import './imageCropper.css';
import './styles.css';
import './test.css';
class Main extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			file: null,
			width: 0,
			height: 0,
			imageStatus: 'loading',
			dimensions: {}
		};
		this.imageElement = React.createRef();
		this.handleChange = this.handleChange.bind(this);
	}
	handleChange(event) {
		this.setState({
			file: URL.createObjectURL(event.target.files[0])
		});
	}
	onResize = (event, { element, size, handle }) => {
		this.setState({ width: size.width, height: size.height });
	};
	onImgLoad = ({ target: img }) => {
		console.log(img.naturalWidth, img.naturalHeight);
		if (this.props.maxWidth >= img.naturalWidth) {
			this.setState({
				imageStatus: 'loaded',
				width: img.offsetWidth,
				height: img.offsetHeight,
				dimensions: {
					height: img.offsetHeight,
					width: img.offsetWidth
				}
			});
		} else {
			this.setState({
				imageStatus: 'loaded',
				width: this.props.maxWidth,
				height: img.offsetHeight,
				dimensions: {
					height: img.offsetHeight,
					width: img.offsetWidth
				}
			});
		}
	};
	componentDidMount() {
		const cropper = new Cropper(this.imageElement.current, {
			zoomable: false,
			cropBoxResizable: true,
			scalable: false,
			aspectRatio: 1,
			viewMode: 1,
			crop: () => {
				const canvas = cropper.getCroppedCanvas();
				this.setState({ imageDestination: canvas.toDataURL('image/png'), width: this.props.maxWidth });
			}
		});
	}
	render() {
		const { width, height, dimensions, file } = this.state;
		console.log(dimensions, width, height);
		return (
			<div>
				<div className="Upload">
					<input type="file" onChange={this.handleChange} />
				</div>
				{file && (
					<div>
						<div className="Static">
							{/* <ResizableBox
								className="box"
								align="center"
								width={width}
								height={height}
								lockAspectRatio={true}
								axis="none"
								maxConstraints={[ width, height ]}
							> */}
							<img
								ref={this.imageElement}
								onLoad={this.onImgLoad}
								className="image"
								src={file}
								alt="Image"
							/>
							{/* </ResizableBox> */}
						</div>
					</div>
				)}
			</div>
		);
	}
}
export default Main;
