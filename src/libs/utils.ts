export const round2 = (numb: number) =>
  Math.round((numb + Number.EPSILON) * 100) / 100;

export function converDocToObj(doc: any) {
  doc._id = doc._id.toString();
  return doc;
}
