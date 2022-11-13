import { sectionType } from "src/app/base/components/note/note.model";

export interface INote {
  id: number;
  title?: string;
  sections: INoteSection[];
  dateTimeEdited: Date;
}

export interface INoteSection {
  id: number;
  type: sectionType;
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
