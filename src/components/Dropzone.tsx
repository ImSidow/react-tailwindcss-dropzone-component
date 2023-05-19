import React, { useEffect, useRef, useState } from "react";
import DropzoneClass from "dropzone";

const Dropzone = () => {
    const [showPreview, setShowPreview] = useState(false);
    const [uploadedFiles, setUploadedFiles] = useState<any[]>([]);

    useEffect(() => {
        new DropzoneClass("div#dropzone", {
            url: "/",
            accept: function (file, done) {
                // if (file.name == "justinbieber.jpg") {
                //     done("Naha, you don't.");
                // } else {
                //     done();
                // }
            },
            addedfile: (file) => {
                const fileType = file.type.split("/")[0];

                if (fileType === "image") {
                    setUploadedFiles((prev) => [...prev, { file, type: "image", imgURL: URL.createObjectURL(file) }]);
                } else {
                    setUploadedFiles((prev) => [...prev, { file, type: "file" }]);
                }

                setShowPreview(true);
            },
        });
    }, []);

    const dropzoneEmptyClass = "flex-col";
    const dropzonePreviewClass = "space-x-4 px-5";

    return (
        <div className="border-[3px] border-dotted border-gray-400 w-[40%] h-[30%] relative">
            <div
                id="dropzone"
                className={`w-full h-full flex justify-center items-center ${showPreview ? dropzonePreviewClass : dropzoneEmptyClass}`}
            >
                {!showPreview ? (
                    <>
                        <UploadIcon className="w-10 h-10 text-gray-600" />
                        <h2 className="text-gray-700 text-xl font-light mt-2"> Drop file(s) here or click to upload. </h2>
                        <small className="text-gray-400 text-sm font-light"> supported file type: png, jpeg, gif, pdf </small>
                    </>
                ) : (
                    uploadedFiles.map((file, index) => (
                        <div className="w-[40%] h-[60%] rounded-md overflow-hidden" key={index.toString()}>
                            <img src={file.imgURL} />
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

const UploadIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="512" height="512" x="0" y="0" viewBox="0 0 32 32" {...props}>
            <path
                d="M23.75 11.044a7.99 7.99 0 0 0-15.5-.009A8 8 0 0 0 9 27h3a1 1 0 0 0 0-2H9a6 6 0 0 1-.035-12 1.038 1.038 0 0 0 1.1-.854 5.991 5.991 0 0 1 11.862 0A1.08 1.08 0 0 0 23 13a6 6 0 0 1 0 12h-3a1 1 0 0 0 0 2h3a8 8 0 0 0 .75-15.956z"
                fill="currentColor"
                data-original="currentColor"
            ></path>
            <path
                d="M20.293 19.707a1 1 0 0 0 1.414-1.414l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414L15 16.414V29a1 1 0 0 0 2 0V16.414z"
                fill="currentColor"
                data-original="currentColor"
            ></path>
        </svg>
    );
};

export default Dropzone;
