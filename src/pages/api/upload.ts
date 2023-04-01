import { IncomingForm } from "formidable";
import cloudinary from "cloudinary";

// @ts-ignore
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function upload(req: any, res: any) {
  const userId = req.cookies.userId;
  if (req.method === "POST") {
    // @ts-ignore
    const data = await new Promise((resolve, reject) => {
      const form = new IncomingForm();

      form.parse(req, (err, fields, files) => {
        if (err) return reject(err);
        resolve({ fields, files });
      });
    });
    // @ts-ignore
    const file = data?.files?.inputFile?.filepath;
    // @ts-ignore
    const fileName = data?.files?.inputFile?.originalFilename;
    
    try {
      await cloudinary.v2.uploader.upload(file, {
        public_id: fileName,
      });
      const jwt = req.cookies.token;
      const userResponse = await fetch(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}users/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,
          },
          body: JSON.stringify({
            imageUri: fileName,
          }),
        }
      );
      
      return res.json({ message: "success" });
    } catch (error) {
      console.error(JSON.stringify(error));
    }
  } else {
    return res.status(403).send("Forbidden");
  }
}
