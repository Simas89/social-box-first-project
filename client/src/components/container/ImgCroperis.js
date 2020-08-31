import React from "react";
import Cropper from "react-easy-crop";
import getCroppedImg from "../../functions/cropImage";
import "./css/ImgCropperis.css";

const ImgCroperis = (props) => {
	const [crop, setCrop] = React.useState({ x: 0, y: 0 });
	const [rotation, setRotation] = React.useState(0);
	const [zoom, setZoom] = React.useState(1);
	const [croppedAreaPixels, setCroppedAreaPixels] = React.useState(null);
	// eslint-disable-next-line
	const [croppedImage, setCroppedImage] = React.useState(null);

	const onCropComplete = React.useCallback((croppedArea, croppedAreaPixels) => {
		setCroppedAreaPixels(croppedAreaPixels);
	}, []);

	const showCroppedImage = React.useCallback(async () => {
		try {
			const croppedImage = await getCroppedImg(
				props.imgurl,
				croppedAreaPixels,
				rotation
			);

			setCroppedImage(croppedImage);
			props.uploadResult(croppedImage);
			setZoom(1);
		} catch (e) {
			console.error(e);
		}
	}, [croppedAreaPixels, rotation, props]);

	return (
		<div className='cropper-body'>
			{props.imgurl && (
				<React.Fragment>
					<div className='raw'>
						<Cropper
							image={props.imgurl}
							crop={crop}
							rotation={rotation}
							zoom={zoom}
							aspect={4 / 3}
							onCropChange={setCrop}
							onRotationChange={setRotation}
							onCropComplete={onCropComplete}
							onZoomChange={setZoom}
						/>
					</div>
					<div className='btns'>
						<button onClick={showCroppedImage}>UPLOAD</button>
						<button onClick={() => props.cancel()}>Cancel</button>
					</div>
				</React.Fragment>
			)}
		</div>
	);
};

export default ImgCroperis;
