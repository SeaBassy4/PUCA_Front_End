import { supabase } from "../../supabaseClient";

export const uploadImage = async (file) => {
  try {
    const fileName = `${Date.now()}-${file.name}`;

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
