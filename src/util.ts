export function toReal(value) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "brl",
  });
}

export function genText(items, total) {
  let txt = `*Proposta orçamentária*\n`;
  items.forEach((e) => {
    txt += `\n- ${e.title}`;
  });
  txt += `\n\n *Valor de mão de obra*: ${toReal(total)}`;
  return txt;
}

export function genLink(num, text) {
  return `https://api.whatsapp.com/send?phone=${num}&text=${text.replace(
    /(?:\r\n|\r|\n)/g,
    "%0A"
  )}`;
}
