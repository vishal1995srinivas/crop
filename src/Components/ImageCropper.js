import React, { Component } from 'react';
import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.min.css';
import './imageCropper.css';
import { ResizableBox } from 'react-resizable';
import './styles.css';
import './test.css';
class ImageCropper extends Component {
	constructor(props) {
		super(props);
		this.state = {
			file: null,
			width: 1,
			height: 0,
			imageStatus: 'loading',
			dimensions: {}
		};
		this.imageElement = React.createRef();
		this.handleChange = this.handleChange.bind(this);
	}
	componentDidMount() {
		const cropper = new Cropper(this.imageElement.current, {
			zoomable: false,
			scalable: false,
			aspectRatio: 1,
			viewMode: 3,
			crop: () => {
				const canvas = cropper.getCroppedCanvas();
				this.setState({ imageDestination: canvas.toDataURL('image/png') });
			}
		});
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
	render() {
		const { width, height, dimensions, file } = this.state;
		console.log(width, height);
		return (
			<div>
				<div>
					<ResizableBox
						className="box"
						align="center"
						width={width}
						height={height}
						lockAspectRatio={true}
						axis="none"
						maxConstraints={[ width, height ]}
						resizeHandles={[]}
					>
						<img
							ref={this.imageElement}
							className="image-container"
							src={this.props.src}
							alt="Source"
							onLoad={this.onImgLoad}
						/>
					</ResizableBox>
				</div>
				<div className="image">
					I can specify the dimensions of this preview image. Kindly let me know what to do with this preview
					image.
					<img className="image-preview" src={this.state.imageDestination} alt="Destination" />
				</div>
			</div>
		);
	}
}

export default ImageCropper;
