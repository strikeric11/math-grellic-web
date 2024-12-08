import dayjs from '#/config/dayjs.config';

import { supabase } from '#/config/supabase-client.config'; // remove after testing

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const STORAGE_BASE_PATH = import.meta.env.VITE_SUPABASE_STORAGE_BASE_PATH;

export function transformToBaseModel(
  id: number,
  createdAt: string,
  updatedAt: string,
  deletedAt?: string,
) {
  return {
    id,
    createdAt: dayjs(createdAt).toDate(),
    updatedAt: dayjs(updatedAt).toDate(),
    deletedAt: deletedAt ? dayjs(deletedAt).toDate() : undefined,
  };
}

export function getQuestionImageUrl(filePath: string) {

  try {
    const { data } = supabase
      .storage
      .from('math-grellic-bucket')
      .getPublicUrl(filePath);

    console.log("getQuestionImageUrl data: ", data);
    
    if (!data || !data.publicUrl) {
      throw new Error('Failed to get public URL. Check if the file path or bucket is correct.');
    }
  
    console.log("data.publicUrl: ", data.publicUrl);  // Log the public URL to the console
    console.log("filePath: ", filePath);
  } catch (err) {
    console.error('Error fetching public URL: ', err);
  }

  console.log("SUPABASE_URL: ", SUPABASE_URL);

  console.log("STORAGE_BASE_PATH: ", STORAGE_BASE_PATH);

  return `${SUPABASE_URL}/${STORAGE_BASE_PATH}/${filePath}?${Date.now()}`;

}

// export async function getQuestionImageUrl(filePath: string) {

//   // try {
//   //   const { data } = supabase
//   //     .storage
//   //     .from('math-grellic-bucket')
//   //     .getPublicUrl(filePath);
    
//   //   if (!data || !data.publicUrl) {
//   //     throw new Error('Failed to get public URL. Check if the file path or bucket is correct.');
//   //   }
  
//   //   console.log("data.publicUrl: ", data.publicUrl);  // Log the public URL to the console
//   //   console.log("filePath: ", filePath);
//   // } catch (err) {
//   //   console.error('Error fetching public URL: ', err);
//   // }

//   try {
//     const { data, error } = await supabase
//       .storage
//       .from('math-grellic-bucket')
//       .list('', { limit: 100 }); // You can adjust the limit as needed.
  
//     if (error) {
//       console.error('Error listing files in bucket:', error);
//     } else {
//       console.log('Files in bucket:', data);
//     }
//   } catch (err) {
//     console.error('Error fetching bucket data:', err);
//   }

//   const url = `${SUPABASE_URL}/${STORAGE_BASE_PATH}/${filePath}?${Date.now()}`;
  
//   try {
//     const response = await fetch(url, { method: 'HEAD' });
//     if (response.ok) {
//       console.log(`Access to the image URL is successful: ${url}`);
//     } else {
//       console.log(`Failed to access the image URL: ${url} - Status: ${response.status}`);
//     }
//   } catch (error) {
//     console.error(`Error accessing the image URL: ${url} - Error: ${error}`);
//   }
  
//   return url;
// }
