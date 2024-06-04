import React, { useEffect, useState } from 'react';
import { Html5Qrcode } from "html5-qrcode";
import { FileButton, Button } from '@mantine/core';

const qrcodeId = "reader";

const QuaggaWebCam = () => {
  const [file, setFile] = useState(null);
  let html5QrCode;

  useEffect(() => {
    if (!html5QrCode) {
      html5QrCode = new Html5Qrcode(qrcodeId);
      const qrCodeSuccessCallback = (decodedText, decodedResult) => {
        console.log(decodedText);
        console.log(decodedResult);
        /* handle success */
      };

      const config = { fps: 10, qrbox: { width: 250, height: 250 }, aspectRatio: 1.777778 };

      html5QrCode.start(
        { facingMode: "environment" },
        config,
        qrCodeSuccessCallback
      );
    }

    return () => {
      if (html5QrCode) {
        html5QrCode.stop().catch(err => console.error(err));
      }
    };
  }, []);

  const handleFileChange = async (file) => {
    setFile(file);

    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageData = event.target.result;

        html5QrCode.scanFile(imageData, true)
          .then(decodedText => {
            console.log("Decoded text: ", decodedText);
          })
          .catch(err => {
            console.error("Error scanning file: ", err);
          });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <div id={qrcodeId} style={{ width: '100%', height: '100%' }}>
      </div>
      <FileButton onChange={handleFileChange} accept="image/png,image/jpeg">
        {(props) => <Button {...props}>Upload image</Button>}
      </FileButton>
    </div>
  );
};

export default QuaggaWebCam;
