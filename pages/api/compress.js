import sharp from "sharp";

export default async function compress(req, res) {
  const { input, type, compression } = req.body;

  let compressionLevel = 5;

  switch (compression) {
    case 25:
      compressionLevel = 6;
      break;
    case 50:
      compressionLevel = 7;
      break;
    case 75:
      compressionLevel = 8;
      break;
    case 100:
      compressionLevel = 9;
    default:
      break;
  }

  if (input) {
    let imgParts = input.split(";");
    let mimType = imgParts[0].split(":")[1];
    let imageData = imgParts[1].split(",")[1];

    const image = Buffer.from(imageData, "base64");

    sharp(image)
      .toFormat(type, { compressionLevel, palette: true })
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
