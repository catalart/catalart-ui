export class Enumeration {
  id: number;
  text: string;
  label: string;

  constructor(id: number, text: string, label?: string) {
    this.id = id;
    this.text = text;
    this.label = label;
  }
}
