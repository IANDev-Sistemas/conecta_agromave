import { getHashSHA1 } from "./getHash";

export const tKeyGenerator = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");
  
    const formattedDate = `${year}-${month}-${day}`;
  
    const tKey = getHashSHA1(
      `346a78ff-872f-4157-9f6f-4e3f56afc100.${formattedDate}`
    );
  
    return tKey;
  };