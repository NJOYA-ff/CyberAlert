const translationDictionary: { [key: string]: string } = {
  father: "waah",
  mother: "naah",
  sister: "montaah",
  brother: "montaah",
  with: "poh",
  good: "poohket",
};
export const translateText = (text: string): string => {
  const words = text.toLowerCase().split(" ");
  const translatedWords = words.map(
    (word) => translationDictionary[word] || word
  );
  return translatedWords.join(" ");
};
