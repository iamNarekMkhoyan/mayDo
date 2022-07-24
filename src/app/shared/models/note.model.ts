export interface INote {
  id: number;
  title?: string;
  sections?: [
    {
      id: number;
      type: 'text' | 'checklist';
    }
  ];
}
