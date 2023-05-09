import { SectionType } from "@shared/types/note.model";

export interface INote {
  id: number;
  title?: string;
  sections: INoteSection[];
  dateTimeEdited: Date;
}

export class Note implements INote {
  id!: number;
  title?: string;
  sections: INoteSection[];
  dateTimeEdited: Date;

  constructor() {
    this.title = "";
    this.sections = [];
    this.dateTimeEdited = new Date();
  }
}

export interface INoteSection {
  id: number;
  type: SectionType;
  textArea: ITextAreaSection;
  checkList: ICheckListSection[];
}

export class NoteSection implements INoteSection {
  id: number;
  type: SectionType;
  textArea: ITextAreaSection;
  checkList: ICheckListSection[];

  constructor(id: number, type: SectionType) {
    this.id = id;
    this.type = type;
    this.textArea = { value: "" };
    this.checkList = [
      {
        checked: false,
        value: "",
        id: 0,
      },
    ];
  }
}

export interface ITextAreaSection {
  value: string;
}

export interface ICheckListSection {
  id: number;
  checked: boolean;
  value: string;
}

export class CheckListSection implements ICheckListSection {
  id: number;
  checked: boolean;
  value: string;

  constructor(id: number) {
    this.value = "";
    this.checked = false;
    this.id = id;
  }
}
