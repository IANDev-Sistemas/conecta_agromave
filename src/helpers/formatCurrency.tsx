export const formatCurrency = (value: number | undefined) => {
    if(value === undefined)
      value = 0
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };