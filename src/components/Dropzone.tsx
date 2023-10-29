import {useCallback, useEffect, useState} from 'react'
import {FileRejection, useDropzone} from 'react-dropzone'
import { uploadFile } from '~/utils/file';

interface DropzoneProps {
  // className: string;
  files: any[];
  setFiles: React.Dispatch<React.SetStateAction<any[]>>;
  // disabled: boolean;
}

const Dropzone = ({files,setFiles}: DropzoneProps) =>{
  const [rejected,setRejectedFiles]=useState<FileRejection[]>([]);
  const [uploadStatus,setUploadStatus]=useState("");


  // detects drag and drop
  const onDrop = useCallback((acceptedFiles:File[],rejectedFiles:FileRejection[]) => {
    if(acceptedFiles.length){
      setFiles((previousFiles)=>[...previousFiles,...acceptedFiles.map((file)=>Object.assign(file,{preview:URL.createObjectURL(file)}))])
    }
    if(rejectedFiles?.length){
      setRejectedFiles((previousFiles)=>[
        ...previousFiles, ...rejectedFiles
      ]);
    }
   
  }, [setFiles]);

  useEffect(()=>{
    return ()=>{files.forEach((file)=>URL.revokeObjectURL(file.preview))}
  },[files])

  // accepts images
  const {getRootProps, getInputProps, isDragActive} = useDropzone({
    onDrop,
    accept:{
      "image/*":[]
    }
  });

  // Function for deleting the image
  const handleDelete = (index:any)=>{ 
    setFiles((image)=>image.filter((_,id)=>id!==index))
  }


  // Function for uploading the image
  const handleUpload = async(e:any)=>{
    e.preventDefault();
    setUploadStatus("Uploading....")
    try {
      files.forEach((file)=>{
        console.log(uploadFile(file));
      })
      setUploadStatus("Upload Succesful");
    } catch (error) {
      console.log("imageUpload" + error)
      setUploadStatus("Upload Failed...");
    }
    
  }


  return (
    <div className='container'>
    <div className='dropzone' {...getRootProps({
      onClick: (event:any) => console.log(event),
      role: 'button',
      'aria-label': 'drag and drop area',
    })}>
      <input {...getInputProps()} />
      {
        isDragActive ?
          <p>Drop your ID card here</p> :
          <p>Drop your ID card here</p>
      }
    </div>
    {files.length>0 && <div className='flex-col justify-center items-center'>
      {files.map((image,index)=>
      <>
      <img src={image} key={index}/>
      <button onClick={()=>handleDelete(index)}>x</button>   
      </>
      )}

    

    //Upload Button
    <p>{uploadStatus}</p>
      </div>}
    </div>
  )
}

export default Dropzone;