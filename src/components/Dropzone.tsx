import Image from "next/image";
import {  useCallback, useEffect, useState } from "react";
import { type FileRejection, useDropzone } from "react-dropzone";
import { IoCloseCircle } from "react-icons/io5";

interface DropzoneProps {
	// className: string;
	files: (File & { preview: string })[];
	setFiles: React.Dispatch<
		React.SetStateAction<(File & { preview: string })[]>
	>;
	// disabled: boolean;
}

const Dropzone = ({ files, setFiles }: DropzoneProps) => {
	const [rejected, setRejectedFiles] = useState<FileRejection[]>([]);
	const [uploadStatus, setUploadStatus] = useState("");

	// detects drag and drop
	const onDrop = useCallback(
		(acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
			if (acceptedFiles.length) {
				setFiles((previousFiles) => [
					...previousFiles,
					...acceptedFiles.map((file) =>
						Object.assign(file, {
							preview: URL.createObjectURL(file),
						})
					),
				]);
			}
			if (rejectedFiles?.length) {
				setRejectedFiles((previousFiles) => [
					...previousFiles,
					...rejectedFiles,
				]);
			}
		},
		[setFiles]
	);

	useEffect(() => {
		return () => {
			files.forEach((file) => URL.revokeObjectURL(file.preview));
		};
	}, [files]);

	// accepts images
	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		accept: {
			"image/*": [],
		},
	});

	// Function for deleting the image
	const handleDelete = (index: number) => {
		setFiles((image) => image.filter((_, id) => id !== index));
	};

	return (
		<div className="container">
			{files.length === 0 && <div
				className="dropzone bg-gray-500/50"
				{...getRootProps({
					role: "button",
					"aria-label": "drag and drop area",
				})}
			>
				<input {...getInputProps()} />
				{isDragActive ? (
					<p className="px-2 text-center">Drop your ID card here</p>
				) : (
					<p className="px-2 text-center">Drop your ID card here</p>
				)}
			</div>}
			{files.length > 0 && (
				<div className="flex-col items-center justify-center">
					{files.map((image, index) => (
						<div className="h-40 w-32 relative my-3" key={index} >
							<IoCloseCircle className='absolute top-1 right-3 text-red-600 text-xl md:text-2xl cursor-pointer' onClick={() => handleDelete(index)} />
							<Image src={image.preview} alt="ID Card" className="object-contain object-center h-full w-full" height={100} width={100}/>
						</div>
					))}

					<p>{uploadStatus}</p>
				</div>
			)}
		</div>
	);
};

export default Dropzone;
