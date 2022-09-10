export interface INote {
  id: number;
  title?: string;
  sections: INoteSection[];
}

export interface INoteSection {
  id: number;
  type: 'text' | 'checklist';
  textArea: ITextAreaSection;
  checkList: ICheckListSection[];
}

export interface ITextAreaSection {
  value: string;
}

export interface ICheckListSection {
  id: number;
  checked: boolean;
  value: string;
}
