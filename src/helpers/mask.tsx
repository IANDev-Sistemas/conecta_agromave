export const applyMask = (value: string, maskType: 'cgc' | undefined) => {
    if (maskType === 'cgc') {
      if (value.length <= 14) {
        return value
          .replace(/\D/g, '')
          .replace(/(\d{3})(\d)/, '$1.$2')
          .replace(/(\d{3})(\d)/, '$1.$2')
          .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
      } else {
        return value
          .replace(/\D/g, '')
          .replace(/(\d{2})(\d)/, '$1.$2')
          .replace(/(\d{3})(\d)/, '$1.$2')
          .replace(/(\d{3})(\d)/, '$1/$2')
          .replace(/(\d{4})(\d{1,2})$/, '$1-$2');
      }
    }
    return value;
  };
  
export const removeMask = (value: string) => {
    return value.replace(/\D/g, '');
};