export interface AppUser {
  uid: string;
  email: string | null;
  displayName: string | null;
}

export interface UserNote {
  id: string;
  title: string;
  textContent: string;
  updatedAt: number;
}

export interface Subtopic {
  id: string;
  title: string;
  bodyText: string;
  keyDefinitions: string[];
  diagramImageUrls: string[];
}

export interface Topic {
  id: string;
  title: string;
  subtopics: Subtopic[];
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}
