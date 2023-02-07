import Resizer from "react-image-file-resizer";

export const resizeFileTypeFile = (file) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      500,
      600,
      "JPEG",
      100,
      0,
      (uri) => {
        resolve(uri);
      },
      "file",
      400,
      500
    );
  });
export const resizeFileTypeBase64 = (file) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      500,
      600,
      "JPEG",
      100,
      0,
      (uri) => {
        resolve(uri);
      },
      "base64",
      400,
      500
    );
  });
