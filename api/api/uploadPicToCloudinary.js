import axios from "axios";

const uplaodPic = async (media) => {
  try {
    const form = new FormData();
    form.append("file", media);
    form.append("upload_preset", "social_media_app");
    form.append("cloud_name", "deywagux7");
    const res = await axios.post(process.env.CLOUDINARY_URL, form);
    return res.data.url;
  } catch (err) {
    return;
  }
};

export default uplaodPic
