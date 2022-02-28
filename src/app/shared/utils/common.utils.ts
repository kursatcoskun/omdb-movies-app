export const chunks = <T>(items: T[]) =>
  items.reduce((chunks: T[][], item: T, index) => {
    const chunk = Math.floor(index / 10);
    chunks[chunk] = ([] as T[]).concat(chunks[chunk] || [], item);
    return chunks;
  }, []);
