import React, { useRef } from 'react';
import * as tus from 'tus-js-client'

const Upload = () => {
    const imputEl = useRef(null)

    return (
        <div>
            <h1>Uploader</h1>
            <p>Stavové informace v konzoli (F12)...</p>
            <input ref={imputEl} type="file" name="filedata" onChange={e => {
                var file = e.target.files[0]

                // Create a new tus upload
                var upload = new tus.Upload(file, {
                    // Endpoint is the upload creation URL from your tus server
                    endpoint: "https://localhost:44368/files/",
                    // Retry delays will enable tus-js-client to automatically retry on errors
                    retryDelays: [0, 3000, 5000, 10000, 20000],
                    // Attach additional meta data about the file for the server
                    metadata: {
                        filename: file.name,
                        filetype: file.type
                    },
                    // Callback for errors which cannot be fixed using retries
                    onError: function (error) {
                        console.log("Failed because: " + error)
                    },
                    // Callback for reporting upload progress
                    onProgress: function (bytesUploaded, bytesTotal) {
                        var percentage = (bytesUploaded / bytesTotal * 100).toFixed(2)
                        console.log(bytesUploaded, bytesTotal, percentage + "%")
                    },
                    // Callback for once the upload is completed
                    onSuccess: function () {
                        console.log("Download %s from %s", upload.file.name, upload.url)
                    }
                })

                upload.findPreviousUploads().then(function (previousUploads) {
                    // Found previous uploads so we select the first one. 
                    if (previousUploads.length) {
                        upload.resumeFromPreviousUpload(previousUploads[0])
                    }

                    // Start the upload
                    upload.start()
                })

            }} />
        </div>)
}
 
export default Upload

