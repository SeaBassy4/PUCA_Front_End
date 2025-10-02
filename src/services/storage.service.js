import { supabase } from "../../supabaseClient";

const hashFile = async (file) => {
  const arrayBuffer = await file.arrayBuffer();
  const hashBuffer = await crypto.subtle.digest("SHA-256", arrayBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
};

export const uploadImage = async (file) => {
  try {
    const hash = await hashFile(file);
    const fileName = `${hash}.png`;

    const { data: existingFiles } = await supabase.storage
      .from("productos")
      .list("", { search: fileName });

    if (existingFiles.length > 0) {
      const { data: publicUrlData } = supabase.storage
        .from("productos")
        .getPublicUrl(fileName);
      return publicUrlData.publicUrl;
    }

    const { data, error } = await supabase.storage
      .from("productos")
      .upload(fileName, file);

    if (error) throw error;

    const { data: publicUrlData } = supabase.storage
      .from("productos")
      .getPublicUrl(fileName);

    return publicUrlData.publicUrl;
  } catch (err) {
    console.error("Error subiendo imagen:", err.message);
    return null;
  }
};
