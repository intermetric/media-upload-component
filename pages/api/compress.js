import sharp from "sharp";

export default async function compress(req, res) {
  const { input, type, compression } = req.body;

  if (input) {
    let imgParts = input.split(";");
    let mimType = imgParts[0].split(":")[1];
    let imageData = imgParts[1].split(",")[1];

    const image = Buffer.from(imageData, "base64");

    sharp(image)
      .toFormat(type, { compressionLevel: compression, palette: true })
      .toBuffer((err, data, info) => {
        let compressedImageData = data.toString("base64");
        let compressedBase64 = `data:${mimType};base64,${compressedImageData}`;

        res.json(
          err
            ? { message: "Error occurred, try again." }
            : { data: compressedBase64, compressedSize: info.size }
        );
      });
  } else {
    res.json({ message: "No file received for compression, try again." });
  }
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "5mb",
    },
  },
};
