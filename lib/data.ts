export interface Comic {
  id: string;
  name: string;
  chapters: Chapter[];
}

export interface Chapter {
  id: string;
  name: string;
}

export const comics: Comic[] = [
  {
    id: "cot-nhan-6317",
    name: "Cốt Nhân",
    chapters: [
      { id: "chapter-1-9664", name: "Chapter 1" },
      { id: "chapter-2", name: "Chapter 2" },
      { id: "chapter-3", name: "Chapter 3" },
    ],
  },
  {
    id: "another-comic-123",
    name: "Another Comic",
    chapters: [
      { id: "chapter-1", name: "Chapter 1" },
      { id: "chapter-2", name: "Chapter 2" },
    ],
  },
];
